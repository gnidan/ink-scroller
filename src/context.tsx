import React, { createContext, useState } from "react";

import type { Area, Position, Direction } from "./cli/types.js";

export type Controls = {
  [D in Direction]: () => void;
}

export interface ContextValue {
  boundingArea?: Area;
  contentArea?: Area;

  onLayout(layout: {
    boundingArea: Area;
    contentArea: Area;
  }): void;

  contentPosition: Position;
  controls: Controls;
}

export const Context = createContext<ContextValue | undefined>(undefined);

export const ContextProvider: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  const [boundingArea, setBoundingArea] = useState<Area | undefined>();
  const [contentArea, setContentArea] = useState<Area | undefined>();
  const [contentPosition, setContentPosition] = useState<Position>({
    top: 0,
    left: 0
  });

  const onLayout = (layout: {
    boundingArea: Area;
    contentArea: Area;
  }) => {
    setBoundingArea(layout.boundingArea);
    setContentArea(layout.contentArea);
  }

  const maxTop = contentArea && boundingArea
    ? Math.max(0, contentArea.height - boundingArea.height + 10)
    : 0;

  const maxLeft = contentArea && boundingArea
    ? Math.max(0, (contentArea.width) - (boundingArea.width))
    : 0;

  const controls = {
    up() {
      setContentPosition(
        ({ top, left }) => ({
          top: Math.max(top - 1, 0),
          left
        })
      );
    },
    down() {
      setContentPosition(
        ({ top, left }) => ({
          top: Math.min(top + 1, maxTop),
          left
        })
      );
    },
    left() {
      setContentPosition(
        ({ top, left }) => ({
          top,
          left: Math.max(left - 1, 0)
        })
      );
    },
    right() {
      setContentPosition(
        ({ top, left }) => ({
          top,
          left: Math.min(left + 1, maxLeft)
        })
      );
    }
  };

  return <Context.Provider value={{
      boundingArea,
      contentArea,
      onLayout,

      contentPosition,
      controls
  }}>
    {children}
  </Context.Provider>;


};

