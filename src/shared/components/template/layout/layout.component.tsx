import * as React from 'react';

import _ from 'lodash';

import { Box, Text, Button } from '../../atoms';
import { useState, useEffect, useContext, useCallback } from 'react';
import { GameContext } from '@/shared/context';
import styles from './styles.module.css';
import { Board } from '../../organisms';

const Layout: React.FC = () => {

  const { actualPlayer, roundNumber, historyOfMoves, resetGame } = useContext(GameContext);
  const [removeLastPlay, setRemoveLastPlay] = useState(false);
  const [isNewGame, setNewGame] = useState<boolean>(false);
  const [isGameOver, setGameOver] = useState(false);

  const onNewGame = useCallback(() => {
    setNewGame(true);
  }, [isNewGame]);


  useEffect(() => {
    if (isNewGame) {
      resetGame();
      setNewGame(false)
    }
  }, [isNewGame]);


  return (
    <Box textAlign={'center'}>
      <Box display={'flex'} justifyContent={'center'}>
        <Text
          className={styles["glitch-text"]}
          data-text="Tic Tac Toe">Tic Tac Toe</Text>
      </Box>

      <Button
        bg={'black'}
        mt={10}
        onClick={() => onNewGame()}>
        New Game
      </Button>

      <Text
        mt={20}
        textStyle="4xl">
        Player: <b>{actualPlayer}</b>
      </Text>
      {

      }
      <Box
        mt={20}
        display={'flex'}
        justifyContent={'center'}>

        <Board
          removeLastMoveFlag={removeLastPlay}
          setRemoveLastMoveFlag={setRemoveLastPlay}
        />
      </Box>

      {
        roundNumber! > 1 ?
          <Button mt={10} onClick={() => {
            setRemoveLastPlay(true)
          }}>Remove last play</Button>
          :
          undefined
      }

    </Box>
  );
}

export default React.memo(Layout, (prevProps, nextProps) => {
  return _.isEqual(prevProps, nextProps);
});