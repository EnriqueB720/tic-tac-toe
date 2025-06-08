import * as React from 'react';

import _ from 'lodash';

import { BoardItemProps } from '@types';
import { Box, Image } from '../../atoms';
import {  useContext } from 'react';
import { GameContext } from '@/shared/context';

const BoardItem: React.FC<BoardItemProps> = ({
  position,
  sign
}) => {

  const { changePlayer, registerNewMove } = useContext(GameContext);


	const markPlayerSymbol = () => {
		if(sign === null){
      changePlayer();
      registerNewMove(position);
		}
	}

  return (
    <Box
      w={100}
      h={100}
      bg={'#EBEBEB'}
			alignItems={'center'}
			display={'flex'}
      borderRadius={3}
      border={"1px solid #ABABAB"}
			onClick={() => markPlayerSymbol()}
			>
      {
        sign == 'X' ?
          <Image
            src="/images/x-sign.png" />
          :
          sign == 'O' ?
            <Image
              src="images/o-sign.png" />
            :
            undefined
      }

    </Box>
  );
}

export default React.memo(BoardItem, (prevProps, nextProps) => {
  return _.isEqual(prevProps, nextProps);
});