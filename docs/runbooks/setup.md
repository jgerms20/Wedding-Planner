# Setup runbook

Everything the owners need to do themselves, in one sitting. Each item unlocks a phase; nothing here is needed to read the code or run the tests.

## Now: hosted app for both of you (one click)

1. Open https://github.com/jgerms20/Wedding-Planner/settings/pages
2. Under **Build and deployment → Source**, choose **GitHub Actions**.
3. Re-run the "Deploy web (local mode) to GitHub Pages" workflow from the Actions tab (or push any commit).
4. The app is then live at **https://jgerms20.github.io/Wedding-Planner/**

In this mode all data lives in each browser (IndexedDB). Use **Settings → Export JSON / Import JSON** to move data between your two devices until Phase 0b. First load seeds the app with Joshua & Janel's atlas (six destinations with sourced costs, a plan, an estimated budget, satellite events).

### Troubleshooting: page looks stale, or a nav link 404s

GitHub Pages can take a couple of minutes to catch up after a deploy, and browsers cache the app's files. If something looks broken:

1. Hard-refresh (Ctrl/Cmd+Shift+R), or open the site in a private/incognito window — this rules out a stale cached copy, which is the most common cause.
2. If the Atlas shows no destinations (no Brazil, Jamaica, etc.), that's an old, empty seed stuck in this browser's local storage from before the research was added — it's not overwritten automatically so nothing you've since typed in gets lost. Home shows a "Bring in the atlas" button in that case, or use **Settings → Restore the Joshua & Janel seed**.
3. Still broken in a fresh private window after a minute or two? That points to the GitHub Pages configuration itself rather than the app — check Settings → Pages on GitHub still shows Source: GitHub Actions.

## Turn on the smart features (five minutes)

The Tell Bower bar parses what you say or type into guests, tasks, dates, and notes; the Concierge answers from your whole plan; the Atlas can research venues with sources. These run Claude directly in your browser with your own API key.

1. Create a key at https://console.anthropic.com/settings/keys (this is pay-as-you-go API billing, separate from a Claude subscription; a few dollars covers weeks of use).
2. Open the app → Settings → **Connect Claude** → paste the key → Verify.
3. The key is stored only in that browser. Repeat on your second device, or skip it there and use export/import.

Without a key the app still works: the bar handles simple phrasings ("add my cousin Marcus from Atlanta, must invite") on its own and saves anything else as a note.

## Phase 0b: shared data, accounts, agents

| Service | What to create | What to hand over |
|---|---|---|
| Supabase (free) | New project | Project URL, anon key, service role key, database connection string |
| Anthropic | API key at console.anthropic.com | `ANTHROPIC_API_KEY` |
| Vercel (free) | Import the GitHub repo, root directory `apps/web` | Nothing else; env vars get pasted into the project |
| Railway or Fly.io | Service from the repo running `apps/worker` | Nothing else; same env vars |
| GitHub | Repository secrets for CI (`SUPABASE_*`, `ANTHROPIC_API_KEY`) | Set in Settings → Secrets → Actions |
| Google Cloud (optional, later) | OAuth consent screen + client for "Sign in with Google" | Client ID and secret |

Paste secrets into Vercel, Railway, and GitHub Secrets directly. Do not paste them into chat.

## Phase 2: vendor email

| Service | What to create |
|---|---|
| Domain | A domain for the product (e.g. `bower.<tld>`), or a subdomain of one you own for the mail inbox |
| Postmark | Server + inbound domain (MX record) so every wedding gets `{slug}@mail.<domain>` |

## Local development

```
pnpm install
useradd -m pg                              # once, root
packages/db/scripts/local-pg.sh start      # prints DATABASE_URL
export DATABASE_URL=postgresql://pg@127.0.0.1:5544/bower
pnpm db:migrate && pnpm db:seed
pnpm typecheck && pnpm lint && pnpm test
NEXT_PUBLIC_DATA_MODE=local pnpm --filter @bower/web dev   # http://localhost:3000
ANTHROPIC_FAKE=1 pnpm --filter @bower/worker dev -- dry-run hello "what's next?"
```
