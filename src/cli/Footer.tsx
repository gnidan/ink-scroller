import React, { useRef, useEffect } from "react";
import { Box, Text, Spacer, useInput, measureElement } from "ink";
import Spinner from "ink-spinner";

import type { Command } from "./types";

interface HasOnLayout {
  onLayout(options: {
    height: number;
    width: number;
  });
}

interface FooterProps extends HasOnLayout {
  bodyPosition: {
    top: number;
    left: number;
  };
  onCommand(options: {
    command: Command
  });
}

export const Footer = (props: FooterProps) => {
  const {
    // bodyLayout,
    bodyPosition: { top, left },
    onLayout,
    onCommand
  } = props;

  const ref = useRef();

  useInput((input, key) => {
    if (input === "j" || key.downArrow) {
      onCommand({
        command: { type: "down" }
      });
    } else if (input === "k" || key.upArrow) {
      onCommand({
        command: { type: "up" }
      });
    } else if (input === "h" || key.leftArrow) {
      onCommand({
        command: { type: "left" }
      });
    } else if (input === "l" || key.rightArrow) {
      onCommand({
        command: { type: "right" }
      });
    }
  });

  useEffect(() => {
    // @ts-ignore
    onLayout(measureElement(ref.current));
  }, [onLayout]);

  return (
    <Box
      // @ts-ignore
      ref={ref}
      borderStyle="round"
      flexShrink={0}
    >
      <Spacer />
      <Text bold>top: <Text color="blue">{top}</Text></Text>
      <Spacer />
      <Text bold>left: <Text color="blue">{left}</Text></Text>
      <Spacer />
      <Text color="green">
        <Spinner />{" "}
      </Text>
    </Box>
  );
}
