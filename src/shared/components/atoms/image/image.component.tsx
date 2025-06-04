import * as React from 'react';
import _ from "lodash";

import { Image as CKImage } from '@chakra-ui/react';
import { ImageProps } from '@types';

const Image: React.FC<ImageProps> = ({
  ...props
}) => {

  return (
    <CKImage
      {...props}
    />
  );
}

export default React.memo(Image, (prevProps, nextProps) => {
  return _.isEqual(prevProps, nextProps);
});