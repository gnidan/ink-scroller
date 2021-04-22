import React, { useState, useRef, useEffect } from "react";
import { Box, Text, useInput, measureElement } from "ink";

import type { Command, Layout, Position } from "./types";
import { Footer } from "./Footer";

export interface Props {
  height?: number;
  width?: number;
}

interface HasOnLayout {
  onLayout(options: {
    height: number;
    width: number;
    layout: any;
  });
}

// const Body: React.FC<HasOnLayout> = ({ onLayout, children }) => {
//   const ref = useRef();

//   useEffect(() => {

//     setTimeout(
//       () => {
//         // @ts-ignore
//         if (!ref?.current?.yogaNode) {
//           return;
//         }
//         // @ts-ignore
//         const node: Yoga.YogaNode = ref.current.yogaNode;

//         const width = node.getComputedWidth() ?? 0;
//         const height = node.getComputedHeight() ?? 0;
//         const layout = node.getComputedLayout();

//         onLayout({ height, width, layout });
//       },
//       100
//     );
//   }, [onLayout]);

//   // @ts-ignore
//   return <Box ref={ref} flexGrow={0} flexShrink={0}>
//     {children}
//   </Box>;
// };

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

  const [bodyDimensions, setBodyDimensions] = useState({
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
        setTop(Math.min(Infinity /* TODO fix */, top + 1));
        break;
      }
      case "left": {
        setLeft(Math.max(0, left - 1));
        break;
      }
      case "right": {
        setLeft(Math.min(Infinity /* TODO fix */, left + 1));
        break;
      }
    }
  };

  return <Box
    // @ts-ignore
    ref={ref}
    height={height}
    width={width}
    flexDirection="column"
    borderStyle="round"
  >
    <Box
      height={layout.height - footerDimensions.height - 2}
      width={layout.width - 2 /* (for border) */}
      overflow="hidden"
    >
      <Box marginTop={-top} marginLeft={-left}>
        {children}
      </Box>
    </Box>
    <Footer
      onLayout={setFooterDimensions}
      onCommand={handleCommand}
      bodyPosition={{top, left}}
      />
  </Box>;
};
