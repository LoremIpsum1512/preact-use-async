import habitat from "preact-habitat";

import Widget, { useAsync, AsyncBuilder, ConnectionState } from "./component";
import type { AsyncBuilderDelegate, AsyncValue } from "./component";

const _habitat = habitat(Widget);

_habitat.render({
  selector: '[data-widget-host="habitat"]',
  clean: true,
});

export {
  useAsync,
  AsyncBuilder,
  AsyncBuilderDelegate,
  AsyncValue,
  ConnectionState,
};
