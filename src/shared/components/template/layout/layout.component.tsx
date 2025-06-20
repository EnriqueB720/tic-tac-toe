import * as React from 'react';
import Confetti from 'react-confetti'

import _ from 'lodash';

import { Box, Text, Button } from '../../atoms';
import { useState, useEffect, useContext, useCallback } from 'react';
import { GameContext } from '@/shared/context';
import styles from './styles.module.css';
import { Board } from '../../organisms';
import { PlayerType } from '@types';
import { Dialog, Portal } from '@chakra-ui/react';
import { AiPlayerHelper } from '@services';

const Layout: React.FC = () => {

  const { actualPlayer, roundNumber, historyOfMoves, resetGame, registerNewMove, changePlayer } = useContext(GameContext);
  const [removeLastPlay, setRemoveLastPlay] = useState(false);
  const [isNewGame, setNewGame] = useState<boolean>(false);
  const [winner, setWinner] = useState<PlayerType | 'draw' | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [isAIThinking, setIsAIThinking] = useState(false);

  const aiPlayerService: AiPlayerHelper = new AiPlayerHelper();

  const [boardMatrix, setBoardMatrix] = useState<(PlayerType | null)[][]>(
    [[null, null, null],
    [null, null, null],
    [null, null, null]]);

  useEffect(() => {
    if (isNewGame) {
      resetGame();
      setNewGame(false);
      setBoardMatrix([[null, null, null],
      [null, null, null],
      [null, null, null]]);
      setWinner(null);
    }
  }, [isNewGame]);

  useEffect(() => {
    if (historyOfMoves.length > 0) {
      let copyBoardMatrix = [...boardMatrix];
      const row = Math.floor(historyOfMoves[historyOfMoves.length - 1]._position! / 3);
      const col = historyOfMoves[historyOfMoves.length - 1]._position! % 3;

      copyBoardMatrix[row][col] = historyOfMoves[historyOfMoves.length - 1]._signMarked!;
      setBoardMatrix(copyBoardMatrix);
    }

    let result = aiPlayerService.checkWinner(boardMatrix);

    if (result !== null) {
      setWinner(result);
      setOpenModal(true);
    }


    if (actualPlayer === 'O' && result === null) {
      AiPlayerMove();
    }

  }, [roundNumber]);

  const onNewGame = useCallback(() => {
    setNewGame(true);
  }, [isNewGame]);

  const AiPlayerMove = () => {
      setIsAIThinking(true);
      let move = aiPlayerService.getBestMove(boardMatrix, 'O', 'X')!;
      setTimeout(() => {

        if (!move) {
          console.warn("No move returned by AI");
          return;
        }

        let boardPosition = move!.row! * 3 + move!.col!;

        setIsAIThinking(false);
        registerNewMove(boardPosition);
        changePlayer();

      }, 3000);
  }


  return (
    <>
      <Box textAlign={'center'} minW={'430px'}>

        <Box display={'flex'} justifyContent={'center'}>
          {
            winner !== null && winner !== 'draw' ?
              <Confetti />
              :
              undefined
          }

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

        <Box
          mt={20}
          display={'flex'}
          justifyContent={'center'}>
          <Board
            removeLastMoveFlag={removeLastPlay}
            setRemoveLastMoveFlag={setRemoveLastPlay}
          />
        </Box>

        {/*TODO: Enable and disable ai playing {
          roundNumber > 1 ?
            <Button mt={10} onClick={() => {
              setRemoveLastPlay(true)
            }}>Remove last play</Button>
            :
            undefined
        } */}
      </Box>

      {/* Modal */}
      <Dialog.Root
        placement={'center'}
        open={openModal}
        onOpenChange={(e) => {
          setOpenModal(e.open);
          setNewGame(true);
        }}
      >
        <Portal>
          <Dialog.Backdrop minW={'430px'} />
          <Dialog.Positioner minW={'430px'}>
            <Dialog.Content>
              <Dialog.Body>
                <Box h={100} display={'flex'} alignItems={'center'}>
                  {
                    winner !== 'draw' ?
                      <Text textStyle="2xl">
                        The winner is {winner}!
                      </Text>
                      :
                      <Text textStyle="2xl">
                        It's a draw!
                      </Text>
                  }
                 
                </Box>
                 <Text textStyle={'sm'} textAlign={'center'}>
                    (Click outside for a new game!)
                  </Text>
              </Dialog.Body>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>

      <Dialog.Root
        placement={'center'}
        open={isAIThinking}
      >
        <Portal>
          <Dialog.Backdrop minW={'430px'} />
          <Dialog.Positioner minW={'430px'}>
            <Dialog.Content>
              <Dialog.Body>
                <Box h={100} display={'flex'} alignItems={'center'}>
                  <Text textStyle="2xl">
                    The other player is thinking...
                  </Text>
                </Box>
              </Dialog.Body>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>

    </>
  );
}

export default React.memo(Layout, (prevProps, nextProps) => {
  return _.isEqual(prevProps, nextProps);
});