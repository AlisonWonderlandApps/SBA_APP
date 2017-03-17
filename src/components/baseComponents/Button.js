//a button!! takes width of screen - has blue border and text, text fades on click
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { ButtonText } from '../textComponents';
import { baseStyles } from './styles';

const Button = (props) => {
  return (
   <TouchableOpacity
    onPress={props.onPress}
    style={[baseStyles.buttonStyle, props.style]}
   >
      <ButtonText>
        {props.children}
      </ButtonText>
    </TouchableOpacity>
  );
};

export { Button };
