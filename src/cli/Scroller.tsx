import React, { useRef, useState, useEffect } from "react";

import { Box, measureElement } from "ink";

import type { Command, Layout } from "./types.js";
import { Footer } from "./Footer.js";

export interface Props {
  height: number;
  width: number;
  children: React.ReactNode;
}

export const Scroller: React.FC<Props> = ({
  height,
  width,
  children
}) => {
  const ref = useRef();

  const [layout, setLayout] = useState<Layout>({
    height: 0,
    width: 0
  });

  useEffect(() => {
    // @ts-ignore
    setLayout(measureElement(ref.current));
  }, [])

  const [footerDimensions, setFooterDimensions] = useState({
    height: 0,
    width: 0
  });

  const [position, setPosition] = useState<{ top: number, left: number }>({
    top: 0,
    left: 0
  });

  const handleCommand = (options: { command: Command }) => {
    const { top, left } = position;

    const { command } = options;
    switch (command.type) {
      case "up": {
        setPosition({
          top: Math.max(top - 1, 0),
          left
        });
        break;
      }
      case "down": {
        setPosition({
          top: Math.min(top + 1, layout.height),
          left
        });
        break;
      }
      case "left": {
        setPosition({
          top,
          left: Math.max(left -1, 0)
        });
        break;
      }
      case "right": {
        setPosition({
          top,
          left: Math.min(left + 1, layout.width)
        });
        break;
      }
    }
  };

  return (
    <Box
      height={height}
      width={width}
      flexDirection="column"
      borderStyle="round"
    >
      <Box
        height={layout.height - footerDimensions.height - 2}
        width={layout.width - 2}
        flexDirection="column"
        overflow="hidden"
      >
        <Box
          // @ts-ignore
          ref={ref}
          flexShrink={0}
          flexDirection="column"
          marginTop={-position.top}
          marginLeft={-position.left}
          width={layout.width - 2}
        >
          {children}
        </Box>
      </Box>
      <Footer
        onLayout={setFooterDimensions}
        onCommand={handleCommand}
        bodyPosition={position}
        />
    </Box>
  );
};
