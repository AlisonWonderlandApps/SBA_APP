
import React from 'react';
import { Text } from 'react-native';

import { APP_FONT, FONT_SIZE_MEDIUM } from '../../global/fonts';
import { PRIMARY_HIGHLIGHT_COLOUR } from '../../global/colours';

const FormText = ({ onPress, children, style }) => {
    return (
      <Text style={[styles.text, style]} onPress={onPress}>
        {children}
      </Text>
    );
};

const styles = {
  text: {
    alignSelf: 'center',
    fontSize: FONT_SIZE_MEDIUM,
    color: PRIMARY_HIGHLIGHT_COLOUR,
    fontWeight: 'normal',
    fontFamily: APP_FONT,
    paddingTop: 10
  }
};

export { FormText };
