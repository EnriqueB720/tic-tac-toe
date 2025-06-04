import * as React from 'react';
import _ from "lodash";

import { GridItem as CKGridItem } from '@chakra-ui/react';
import { GridItemProps } from '@types';

const GridItem: React.FC<GridItemProps> = ({
  children,
 ...props
}) => {

  return (
    <CKGridItem
      {...props}
    >
     {children}
    </CKGridItem>
  );
}

export default React.memo(GridItem, (prevProps, nextProps) => {
  return _.isEqual(prevProps, nextProps);
});