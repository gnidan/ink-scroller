import React from "react";
import { render } from "ink";
import meow from "meow";

import { App } from "./App";

const cli = meow(
  `
    Usage
      $ ink-scroller-demo
`);

export async function start() {
  const { waitUntilExit } = render(
    React.createElement(App)
  );

  await waitUntilExit();
}
