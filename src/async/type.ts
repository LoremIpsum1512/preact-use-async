import { VNode } from "preact";

export type AsyncValue<T> =
  | { state: ConnectionState.none }
  | { state: ConnectionState.waiting }
  | { state: ConnectionState.hasData; data: T }
  | { state: ConnectionState.hasError; error: Error };

export enum ConnectionState {
  none = "none",
  waiting = "waiting",
  hasData = "hasData",
  // hasEmptyData = "hasEmptyData",
  hasError = "hasError",
}

export interface AsyncBuilderDelegate<T> {
  data: (data: T) => VNode;
  error: (error: Error) => VNode;
  waiting: () => VNode;
  none: () => VNode;
}
