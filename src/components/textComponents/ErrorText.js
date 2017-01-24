import React from 'react';
import { Text } from 'react-native';

import { APP_FONT, FONT_SIZE_XLARGE } from '../../global/fonts';
import { ERROR_COLOUR } from '../../global/colours';

const ErrorText = (props) => {
    return (
      <Text style={[styles.text, props.style]}>
        {props.children}
      </Text>
    );
};

const styles = {
  text: {
    fontSize: FONT_SIZE_XLARGE,
    color: ERROR_COLOUR,
    fontWeight: 'bold',
    fontFamily: APP_FONT,
    alignSelf: 'center'
  }
};

export { ErrorText };
