import { PlayerType } from "../types";

export class PlayerMoves{

  public _whoIsPlaying: PlayerType;
  public _signMarked: PlayerType;
  public _roundNumber: number;
  public _position: number;

  constructor(whoIsPlaying: PlayerType, signMarked: PlayerType, roundNumber: number, position:number){
    this._whoIsPlaying = whoIsPlaying;
    this._signMarked = signMarked;
    this._roundNumber = roundNumber;
    this._position = position;
  }
}