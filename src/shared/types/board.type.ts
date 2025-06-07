import { PlayerMoves } from "@models";
import { PlayerType } from "./player.type";

export interface BoardProps{
  actualPlayer: PlayerType | null;
  isGameOver: boolean;
  isNewGame: boolean;
  playerMoves: PlayerMoves[] | null;
}