import React from "react";
import { Box, Text } from "ink";

import { loremIpsum } from "lorem-ipsum";

export const Paragraphs = ({ count = 10 }) => {
  const raw = loremIpsum({
    units: "paragraphs",
    count
  });

  const text = raw.split("\n").join("\n\n");

  return (
    <Box>
      <Text>{text}</Text>
    </Box>
  )
}
