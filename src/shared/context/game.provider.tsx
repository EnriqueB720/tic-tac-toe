import React, { FC, useState } from 'react';
import { GameProviderProps, PlayerType } from '@types';
import { GameContext } from '.';
import { PlayerMoves } from '../models';

const GameProvider: FC<GameProviderProps> = ({ children }) => {

  const [actualPlayer, setActualPlayer] = useState<PlayerType>('X');
  const [historyOfMoves, setHistoryOfMoves] = useState<PlayerMoves[]>([]);
  const [roundNumber, setRoundNumber] = useState<number>(1);


  const removeLastMove = (): PlayerMoves => {
    if (historyOfMoves.length === 0) return {};

    const newHistory = [...historyOfMoves];
    const lastMove = newHistory.pop();

    setActualPlayer(lastMove?._whoIsPlaying!)
    setHistoryOfMoves(newHistory);

    return lastMove || {};
  }


  const changePlayer = () => {
    if (actualPlayer === 'X') {
      setActualPlayer('O');
    } else {
      setActualPlayer('X');
    }
  }


  const registerNewMove = (position: number) => {
    let newHistoryOfMoves = [...historyOfMoves];
    newHistoryOfMoves.push({
      _position: position,
      _roundNumber: roundNumber,
      _signMarked: actualPlayer!,
      _whoIsPlaying: actualPlayer!
    });

    setHistoryOfMoves(newHistoryOfMoves);
    setRoundNumber(prev => prev+1);
  }

  const resetGame = () => {
    setHistoryOfMoves([]);
    setRoundNumber(1);
    setActualPlayer('X');
  }


  return (
    <GameContext.Provider value={{
      actualPlayer,
      historyOfMoves,
      roundNumber,
      removeLastMove,
      changePlayer,
      registerNewMove,
      resetGame
    }}>
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;