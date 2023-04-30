import React, { useRef, useEffect } from "react";

import { Box, useInput, measureElement } from "ink";

import { Context } from "../context.js";

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
  const contentRef = useRef(null);

  const {
    contentArea,
    onLayout,

    contentPosition,
    controls: {
      up, down, left, right
    }
  } = React.useContext(Context)!;

  useEffect(() => {
    if (!contentRef.current) {
      return;
    }

    const newContentArea = measureElement(contentRef.current);
    if (
      !contentArea ||
      newContentArea.height !== contentArea.height ||
      newContentArea.width !== contentArea.width
    ) {
      onLayout({
        boundingArea: {
          height: height,
          width: width
        },
        contentArea: measureElement(contentRef.current)
      });
    }
  }, [contentRef]);

  useInput((input, key) => {
    if (input === "k" || key.upArrow) {
      up();
    } else if (input === "j" || key.downArrow) {
      down();
    } else if (input === "h" || key.leftArrow) {
      left();
    } else if (input === "l" || key.rightArrow) {
      right();
    }
  });


  const scrollPosition = {
    top: -contentPosition.top,
    left: -contentPosition.left
  };

  return (
    <Box
      height={height}
      width={width}
      flexDirection="column"
    >
      <Box
        flexDirection="column"
        overflow="hidden"
      >
        <Box
          ref={contentRef}
          flexShrink={0}
          flexDirection="column"
          marginTop={scrollPosition.top}
          marginLeft={scrollPosition.left}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};


