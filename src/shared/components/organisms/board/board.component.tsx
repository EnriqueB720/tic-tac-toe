import * as React from 'react';

import _ from 'lodash';

import { BoardProps } from '@types';
import { Box, Grid, GridItem } from '../../atoms';
import { useState, useEffect, useContext, useCallback } from 'react';
import { BoardItem } from '../../molecules';
import { GameContext } from '@/shared/context';

const Board: React.FC<BoardProps> = ({
  actualPlayer,
  isGameOver,
  isNewGame,
  playerMoves
}) => {

  const { historyOfMoves } = useContext(GameContext);

  
  useEffect(() => {
    generateBoard();
  }, [historyOfMoves]);

  const [gridItems, setGridItems] = useState<any[]>([]);

  const generateBoard = useCallback(() => {
    let newGridItems = []
    for (let i = 0; i < 9; i++) {
      newGridItems.push({
        item: 
        <GridItem rowSpan={1} colSpan={1} key={i}>
          <BoardItem
            position={i}
            sign={null}
          />
        </GridItem>,
        pos: i
      }
        );
    }

    setGridItems(newGridItems);
  }, [])

  return (
    <Box w={335} h={335}>
      <Grid
        templateRows="repeat(3, 1fr)"
        templateColumns="repeat(3, 1fr)"
        gap={4}
      >
        {gridItems.map(gridItem => (
          gridItem.item
        ))
        }
      </Grid>
    </Box>
  );
}

export default React.memo(Board, (prevProps, nextProps) => {
  return _.isEqual(prevProps, nextProps);
});