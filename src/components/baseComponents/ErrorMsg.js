//a button!! takes width of screen - has blue border and text, text fades on click
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { ErrorText } from '../textComponents';
import { baseStyles } from './styles';
//Touchable opacity makes the color fade on click.

const ErrorMsg = ({ children }) => {
  //const { buttonStyle, textStyle } = styles;

  return (
    <TouchableOpacity style={baseStyles.errorStyle}>
      <ErrorText>
        {children}
      </ErrorText>
    </TouchableOpacity>
  );
};

export { ErrorMsg };
