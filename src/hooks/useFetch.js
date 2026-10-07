import { useEffect, useState, useCallback } from "react";

/**
 * Runs an async fetcher whenever `deps` change and tracks loading / error / data.
 * Cancels stale requests with AbortController so old responses never overwrite new ones.
 */
export default function useFetch(fetcher, deps = []) {
  const [state, setState] = useState({ data: null, loading: true, error: null });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setState((prev) => ({ ...prev, loading: true, error: null }));

    fetcher(controller.signal)
      .then((data) => setState({ data, loading: false, error: null }))
      .catch((err) => {
        if (err.name === "AbortError") return;
        setState({ data: null, loading: false, error: err.message });
      });

    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, attempt]);

  const retry = useCallback(() => setAttempt((n) => n + 1), []);
  return { ...state, retry };
}
