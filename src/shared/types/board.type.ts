import { PlayerMoves } from "@models";

export interface BoardProps{
  removeLastMoveFlag: boolean;
  setRemoveLastMoveFlag: (value: boolean) => void;
}