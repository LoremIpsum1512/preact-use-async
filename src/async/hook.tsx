import { useCallback, useState } from "preact/hooks";
import { AsyncValue, ConnectionState } from "./type";


interface IUseAsyncReturned<T, Args = undefined> {
  value: AsyncValue<T>;
  execute: (args: Args) => Promise<void>;
  refresh: (args: Args) => Promise<void>;
  reset: () => void;
}


export function useAsync<T, Args = undefined>(
  asyncFunction: (args: Args) => Promise<T>,
  option?: { initialValue?: AsyncValue<T> }
): IUseAsyncReturned<T, Args> {
  const { initialValue } = option ?? {};
  const [value, setValue] = useState<AsyncValue<T>>(
    initialValue ?? {
      state: ConnectionState.none,
    }
  );

  const reset = () => {
    setValue({ state: ConnectionState.none });
  };

  const fetch = (promiseFunction: (args: Args) => Promise<T>, args: Args) => {
    setValue({ state: ConnectionState.waiting });
    return promiseFunction(args)
      .then((data: T) => {
        setValue({ state: ConnectionState.hasData, data: data });
      })
      .catch((error) => {
        setValue({ state: ConnectionState.hasError, error: error });
      });
  };

  const exec = useCallback(
    (args: Args) => {
      return fetch(asyncFunction, args);
    },
    [asyncFunction]
  );

  let refresh = (args: Args) => fetch(asyncFunction, args);

  return {
    value,
    execute: exec,
    refresh,
    reset,
  };
}
