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

  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);

  const handleCommand = (options: { command: Command }) => {
    const { command } = options;
    switch (command.type) {
      case "up": {
        setTop(Math.max(0, top - 1));
        break;
      }
      case "down": {
        setTop(Math.min(layout.height, top + 1));
        break;
      }
      case "left": {
        setLeft(Math.max(0, left - 1));
        break;
      }
      case "right": {
        setLeft(Math.min(layout.width, left + 1));
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
          marginTop={-top}
          marginLeft={-left}
          width={layout.width - 2}
        >
          {children}
        </Box>
      </Box>
      <Footer
        onLayout={setFooterDimensions}
        onCommand={handleCommand}
        bodyPosition={{top, left}}
        />
    </Box>
  );

  {/* return <Box */}
  {/*   ref={ref} */}
  {/*   height={height} */}
  {/*   width={width} */}
  {/*   flexDirection="column" */}
  {/*   borderStyle="round" */}
  {/* > */}
  {/*   <Box */}
  {/*     height={layout.height - footerDimensions.height - 2} */}
  {/*     width={layout.width - 2 /* (for border) *1/} */}
  {/*     overflow="hidden" */}
  {/*   > */}
  {/*     <Box marginTop={-top} marginLeft={-left}> */}
  {/*       {children} */}
  {/*     </Box> */}
  {/*   </Box> */}
  {/*   <Footer */}
  {/*     onLayout={setFooterDimensions} */}
  {/*     onCommand={handleCommand} */}
  {/*     bodyPosition={{top, left}} */}
  {/*     /> */}
  {/* </Box>; */}
};
