import { useCallback, useEffect, useState } from "react";
import { useRepoContext } from "./repo-context";

/**
 * Loads a wedding-scoped entity list from the repo and exposes a `reload`
 * callback for after a mutation. `loader` should be a stable callback (e.g.
 * from `useCallback`) that resolves to `undefined` while its dependencies
 * (repo, weddingId) aren't ready yet. Lists also reload whenever the shared
 * `dataVersion` changes (Tell Bower or the Concierge applied something).
 */
export function useEntityList<T>(loader: () => Promise<T[] | undefined>) {
  const { dataVersion } = useRepoContext();
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async () => {
    setLoading(true);
    const next = await loader();
    // A loader that returns undefined means its dependencies (repo, weddingId)
    // are not ready. Staying "loading" keeps seed-when-empty effects from
    // firing against a list that simply has not been read yet.
    if (!next) return;
    setItems(next);
    setLoading(false);
  }, [loader]);

  useEffect(() => {
    reload();
  }, [reload, dataVersion]);

  return { items, setItems, loading, reload };
}
