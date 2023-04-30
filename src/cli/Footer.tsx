import React, { useContext } from "react";
import Spinner from "ink-spinner";
import { Box, Text, Spacer } from "ink";


import { Context } from "../context.js";

export const Footer = () => {
  const { contentArea, contentPosition } = useContext(Context)!;

  return (
    <Box borderStyle="round" flexShrink={0} >
      <Spacer />
      <Text bold>top: <Text color="blue">{contentPosition?.top}</Text></Text>
      <Spacer />
      <Text bold>left: <Text color="blue">{contentPosition?.left}</Text></Text>
      <Spacer />
      <Text bold>height: <Text color="blue">{contentArea?.height}</Text></Text>
      <Spacer />
      <Text bold>width: <Text color="blue">{contentArea?.width}</Text></Text>
      <Spacer />
      <Text color="green">
        <Spinner />{" "}
      </Text>
    </Box>
  );
}
