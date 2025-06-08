import { PlayerMoves } from "@models";

export interface BoardProps{
  isGameOver: boolean;
  isNewGame: boolean;
  playerMoves: PlayerMoves[] | null;
  removeLastMoveFlag: boolean;
  setRemoveLastMoveFlag: (value: boolean) => void;
}