import React from 'react';
import { Box, Text } from "ink";
import { loremIpsum } from "lorem-ipsum";
import { Scroller } from "./cli/Scroller.js";

export default function App() {
  return (
    <Scroller width={80} height={25}>
      <Paragraphs count={10} />
    </Scroller>
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

