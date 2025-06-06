import * as React from 'react';

import _ from 'lodash';

import { BoardItemProps, PlayerType } from '@types';
import { Box, Image } from '../../atoms';
import { useState } from 'react';

const BoardItem: React.FC<BoardItemProps> = ({
  WhoIsPlaying
}) => {


  const [selectedImage, setSelectedImage] = useState<PlayerType | null>(null);

  const markPlayerSymbol = (player: PlayerType) => {
    if(selectedImage === null){
      setSelectedImage(player);
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
      onClick={() => markPlayerSymbol(WhoIsPlaying)}
      >
    
    </Box>
  );
}

export default React.memo(BoardItem, (prevProps, nextProps) => {
  return _.isEqual(prevProps, nextProps);
});