import { createContext } from 'react';
import { PlayerType } from '@types';
import { PlayerMoves } from '../models';

export interface IGameContext {
  actualPlayer?: PlayerType;
  historyOfMoves: PlayerMoves[];
  roundNumber?: number;
  removeLastMove: () => void;
  changePlayer: () => void;
  registerNewMove: (position: number) => void;
}

export const GameContext = createContext<IGameContext>({
  actualPlayer: undefined,
  historyOfMoves: [],
  roundNumber: undefined,
  removeLastMove: () => {},
  changePlayer: () => {},
  registerNewMove: () => {}
});