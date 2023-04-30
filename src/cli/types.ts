export type Direction =
  | "up"
  | "down"
  | "left"
  | "right";

export interface Area {
  height: number;
  width: number;
};

export interface Position {
  top: number;
  left: number;
};

export interface HasOnLayout {
  onLayout(options: {
    height: number;
    width: number;
    layout: any;
  }): void;
}
