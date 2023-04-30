import React from 'react';
import { Box, Text } from "ink";
import { loremIpsum } from "lorem-ipsum";
import { Scroller } from "./cli/Scroller.js";
import { Footer } from "./cli/Footer.js";
import { ContextProvider } from "./context.js";

export default function App() {
  return (
    <ContextProvider>
      <Scroller width={80} height={22}>
        <Paragraphs count={10} />
      </Scroller>
      <Footer />
    </ContextProvider>
  );
}

export const Paragraphs = ({ count = 10 }) => {
  const raw = loremIpsum({
    units: "paragraphs",
    count
  });

  const text = [...raw.split("\n"), "~~~"].join("\n\n");

  return (
    <Box>
      <Text>{text}</Text>
    </Box>
  )
};

