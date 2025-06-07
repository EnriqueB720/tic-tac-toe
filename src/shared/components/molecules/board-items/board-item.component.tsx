import * as React from 'react';

import _ from 'lodash';

import { BoardItemProps, PlayerType } from '@types';
import { Box, Image } from '../../atoms';
import { useState, useContext } from 'react';
import { GameContext } from '@/shared/context';

const BoardItem: React.FC<BoardItemProps> = ({
  position,
  sign
}) => {

  const { actualPlayer, changePlayer, registerNewMove } = useContext(GameContext);

	const [selectedImage, setSelectedImage] = useState<PlayerType | null>(sign);

	const markPlayerSymbol = (player: PlayerType) => {
		if(selectedImage === null){
			setSelectedImage(player);
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
			onClick={() => markPlayerSymbol(actualPlayer!)}
			>
      {
        selectedImage == 'X' ?
          <Image
            src="/images/x-sign.png" />
          :
          selectedImage == 'O' ?
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