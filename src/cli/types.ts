export type UpCommand = { type: "up"; };
export type DownCommand = { type: "down" };
export type LeftCommand = { type: "left" };
export type RightCommand = { type: "right" };

export type Command =
  | UpCommand
  | DownCommand
  | LeftCommand
  | RightCommand;

export type Layout = {
  height: number;
  width: number;
};

export type Position = {
  top: number;
  left: number;
};
