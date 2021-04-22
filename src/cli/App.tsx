import util from "util";

import React, { useState, useEffect } from "react";
import { Box, Text, Newline, useApp, measureElement } from "ink";
import Spinner from "ink-spinner";
import { Paragraphs } from "./Paragraphs";
import { Scroller } from "./Scroller";


export const App = () => {
  return (
    <Scroller width={80} height={25}>
      <Paragraphs count={10} />
    </Scroller>
  );
}
