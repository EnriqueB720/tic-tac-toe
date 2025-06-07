import { PlayerType } from "./player.type";

export interface BoardItemProps{
  position: number;
  sign: PlayerType | null;
}