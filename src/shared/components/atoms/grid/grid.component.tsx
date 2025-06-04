import * as React from 'react';
import _ from "lodash";

import { Grid as CKGrid } from '@chakra-ui/react';
import { GridProps } from '@types';

const Grid: React.FC<GridProps> = ({
  children,
 ...props
}) => {

  return (
    <CKGrid
      {...props}
    >
     {children}
    </CKGrid>
  );
}

export default React.memo(Grid, (prevProps, nextProps) => {
  return _.isEqual(prevProps, nextProps);
});