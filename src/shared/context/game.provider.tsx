import React, { FC, useState } from 'react';
import { GameProviderProps, PlayerType } from '@types';
import { GameContext } from '.';
import { PlayerMoves } from '../models';

const GameProvider: FC<GameProviderProps> = ({ children }) => {

  const [actualPlayer, setActualPlayer] = useState<PlayerType>();
  const [historyOfMoves, setHistoryOfMoves] = useState<PlayerMoves[]>([]);
  const [roundNumber, setRoundNumber] = useState<number>(0);


  const removeLastMove = () => {
    historyOfMoves.pop();

    let newHistoryOfMoves = [...historyOfMoves];
    setHistoryOfMoves(newHistoryOfMoves);
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
    })

    setHistoryOfMoves(newHistoryOfMoves);
    setRoundNumber(prev => prev++);
  }


  return (
    <GameContext.Provider value={{
      actualPlayer,
      historyOfMoves,
      removeLastMove,
      changePlayer,
      registerNewMove
    }}>
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;