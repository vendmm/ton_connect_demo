import { useEffect, useState } from "react";

export const useAsyncInitialize = <T>(
  func: () => Promise<T>,
  deps: unknown[] = []
) => {
  const [state, setState] = useState<T | undefined>();

  useEffect(() => {
    (async () => {
      setState(await func());
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return state;
};
