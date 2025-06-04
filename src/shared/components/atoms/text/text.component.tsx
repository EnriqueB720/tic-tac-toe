import * as React from 'react';
import _ from "lodash";

import { Text as CKText } from '@chakra-ui/react';
import { TextProps } from '@types';

const Text: React.FC<TextProps> = ({
  children,
  ...props
}) => {

  return (
    <CKText  {...props}>
      {children}
    </CKText>
  );
}

export default React.memo(Text, (prevProps, nextProps) => {
  return _.isEqual(prevProps, nextProps);
});