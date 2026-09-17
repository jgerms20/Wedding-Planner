import { useCallback, useEffect, useState } from "react";

/**
 * Loads a wedding-scoped entity list from the repo and exposes a `reload`
 * callback for after a mutation. `loader` should be a stable callback (e.g.
 * from `useCallback`) that resolves to `undefined` while its dependencies
 * (repo, weddingId) aren't ready yet.
 */
export function useEntityList<T>(loader: () => Promise<T[] | undefined>) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async () => {
    setLoading(true);
    const next = await loader();
    if (next) setItems(next);
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loader]);

  useEffect(() => {
    reload();
  }, [reload]);

  return { items, setItems, loading, reload };
}
