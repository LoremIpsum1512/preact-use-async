import { match } from "ts-pattern";
import { AsyncBuilderDelegate, AsyncValue, ConnectionState } from "./type";

export const AsyncBuilder = <T extends Object>({
  value,
  data,
  error,
  waiting,
  none,
}: {
  value: AsyncValue<T>;
} & AsyncBuilderDelegate<T>) => {
  return match<AsyncValue<T>>(value)
    .with({ state: ConnectionState.waiting }, waiting)
    .with({ state: ConnectionState.hasData }, ({ data: _data }) => data(_data))
    .with({ state: ConnectionState.hasError }, ({ error: _error }) =>
      error(_error)
    )
    .with({ state: ConnectionState.none }, none)
    .exhaustive();
};
