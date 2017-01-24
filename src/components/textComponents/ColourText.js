
import React from 'react';
import { Text } from 'react-native';

import { APP_FONT, FONT_SIZE_NORMAL } from '../../global/fonts';
import { PRIMARY_HIGHLIGHT_COLOUR } from '../../global/colours';

const ColourText = ({ onPress, children, style }) => {
    return (
      <Text style={[styles.text, style]} onPress={onPress}>
        {children}
      </Text>
    );
};

const styles = {
  text: {
    alignSelf: 'center',
    fontSize: FONT_SIZE_NORMAL,
    color: PRIMARY_HIGHLIGHT_COLOUR,
    fontWeight: 'normal',
    fontFamily: APP_FONT
  }
};

export { ColourText };
