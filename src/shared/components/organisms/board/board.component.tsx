import * as React from 'react';

import _ from 'lodash';

import { BoardProps } from '@types';
import { Box, Grid, GridItem } from '../../atoms';
import { useState, useEffect, useContext, useCallback } from 'react';
import { BoardItem } from '../../molecules';
import { GameContext } from '@/shared/context';
import { PlayerMoves } from '@/shared/models';

const Board: React.FC<BoardProps> = ({
  removeLastMoveFlag,
  setRemoveLastMoveFlag
}) => {


  const { historyOfMoves, removeLastMove } = useContext(GameContext);
  const [lastMove, setLastMove] = useState<PlayerMoves | null>(null);

  useEffect(() => {
    if (removeLastMoveFlag && historyOfMoves.length > 0) {
      let lastPlay = removeLastMove();
      setLastMove(lastPlay);
    }
    
    setRemoveLastMoveFlag(false);
  }, [removeLastMoveFlag]);
  

  const getSignAtPosition = useCallback((pos: number) => {
    const move = historyOfMoves.find(move => move._position === pos);
    return move ? move._signMarked : null;
  }, [historyOfMoves]) ;

  return (
    <Box w={335} h={335}>
      <Grid
        templateRows="repeat(3, 1fr)"
        templateColumns="repeat(3, 1fr)"
        gap={4}
      >
        {[...Array(9)].map((_, i) => (
          <GridItem rowSpan={1} colSpan={1} key={i}>
            <BoardItem
              position={i}
              sign={getSignAtPosition(i)!}
            />
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
}

export default React.memo(Board, (prevProps, nextProps) => {
  return _.isEqual(prevProps, nextProps);
});