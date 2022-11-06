import React from 'react';
import { ButtonProps } from './Button.types';
import { Button as ButtonNativeBase, Text } from 'native-base';

export const Button: React.FC<ButtonProps> = props => {
  const {title, type = 'PRIMARY', ...rest} = props;
  return (
    <ButtonNativeBase 
      w="full"
      h={14}
      fontSize={"md"}
      textTransform={"uppercase"}  
      bg={type === 'PRIMARY' ? 'yellow.500' : 'red.500'}
      _pressed={{
        bg: type === 'PRIMARY' ? 'yellow.600' : 'red.600',

      }}
      _loading={{
        _spinner: {color: 'black'}
      }}
      {...rest}
      >
      <Text 
        color={type === 'PRIMARY' ? 'black' : 'white'}
        fontSize="sm"
        fontFamily={"heading"}
      >
        {title}
      </Text>
    </ButtonNativeBase>
  )
}