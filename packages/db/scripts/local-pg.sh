#!/usr/bin/env bash
# Local Postgres 16 helper for developing/testing @bower/db without Docker.
#
# Usage:
#   scripts/local-pg.sh start   # initdb (first run only) + start + createdb
#   scripts/local-pg.sh stop    # stop the server
#   scripts/local-pg.sh status  # is it running?
#   scripts/local-pg.sh url     # print the DATABASE_URL for the running instance
#
# Runs Postgres as a dedicated non-root OS user (default: "pg"), because
# postgres refuses to start as root. If that user does not exist yet, create
# it first: `useradd -m pg` (run once, as root).
#
# Env overrides:
#   LOCAL_PG_BIN   default /usr/lib/postgresql/16/bin
#   LOCAL_PG_USER  default pg
#   LOCAL_PG_DATA  default ~<user>/pgdata
#   LOCAL_PG_PORT  default 5544
#   LOCAL_PG_DB    default bower

set -euo pipefail

PG_BIN="${LOCAL_PG_BIN:-/usr/lib/postgresql/16/bin}"
PG_USER="${LOCAL_PG_USER:-pg}"
PG_HOME="$(getent passwd "$PG_USER" | cut -d: -f6)"
if [ -z "$PG_HOME" ]; then
  echo "error: OS user '$PG_USER' does not exist. Create it first: useradd -m $PG_USER" >&2
  exit 1
fi
PGDATA="${LOCAL_PG_DATA:-$PG_HOME/pgdata}"
PORT="${LOCAL_PG_PORT:-5544}"
DB_NAME="${LOCAL_PG_DB:-bower}"
LOGFILE="${LOCAL_PG_LOG:-$PG_HOME/pg.log}"
SOCK_DIR="${LOCAL_PG_SOCK_DIR:-/tmp}"

as_pg() {
  if [ "$(id -un)" = "$PG_USER" ]; then
    "$@"
  else
    su -s /bin/bash "$PG_USER" -c "$(printf '%q ' "$@")"
  fi
}

db_url() {
  echo "postgresql://${PG_USER}@127.0.0.1:${PORT}/${DB_NAME}"
}

is_running() {
  as_pg "$PG_BIN/pg_ctl" -D "$PGDATA" status >/dev/null 2>&1
}

cmd_start() {
  if [ ! -d "$PGDATA" ]; then
    echo "Initializing Postgres data directory at $PGDATA ..." >&2
    as_pg mkdir -p "$PGDATA"
    as_pg "$PG_BIN/initdb" -D "$PGDATA" -U "$PG_USER" -A trust --no-locale --encoding=UTF8 \
      >"$PG_HOME/initdb.log" 2>&1
  fi

  if is_running; then
    echo "Postgres already running." >&2
  else
    as_pg "$PG_BIN/pg_ctl" -D "$PGDATA" \
      -o "-p $PORT -k $SOCK_DIR -c listen_addresses=127.0.0.1" \
      -l "$LOGFILE" -w start
  fi

  for _ in $(seq 1 60); do
    if as_pg "$PG_BIN/pg_isready" -h 127.0.0.1 -p "$PORT" >/dev/null 2>&1; then
      break
    fi
    sleep 0.5
  done

  if ! as_pg "$PG_BIN/pg_isready" -h 127.0.0.1 -p "$PORT" >/dev/null 2>&1; then
    echo "error: Postgres did not become ready. See $LOGFILE" >&2
    exit 1
  fi

  existing="$(as_pg "$PG_BIN/psql" -h 127.0.0.1 -p "$PORT" -U "$PG_USER" -d postgres -tAc \
    "SELECT 1 FROM pg_database WHERE datname = '$DB_NAME'")"
  if [ "$existing" != "1" ]; then
    as_pg "$PG_BIN/createdb" -h 127.0.0.1 -p "$PORT" -U "$PG_USER" "$DB_NAME"
  fi

  db_url
}

cmd_stop() {
  if [ -d "$PGDATA" ] && is_running; then
    as_pg "$PG_BIN/pg_ctl" -D "$PGDATA" -m fast stop
  else
    echo "Postgres is not running." >&2
  fi
}

case "${1:-}" in
  start) cmd_start ;;
  stop) cmd_stop ;;
  status) is_running && echo "running" || echo "stopped" ;;
  url) db_url ;;
  *)
    echo "Usage: $0 {start|stop|status|url}" >&2
    exit 1
    ;;
esac
