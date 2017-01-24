
import React from 'react';
import { Text } from 'react-native';

import { APP_FONT, FONT_SIZE_SMALL } from '../../global/fonts';
import { LINK_COLOUR } from '../../global/colours';

const LinkText = ({ children, onPress, style }) => {
    return (
      <Text style={[styles.text, style]} onPress={onPress}>
        {children}
      </Text>
    );
};

const styles = {
  text: {
    fontSize: FONT_SIZE_SMALL,
    color: LINK_COLOUR,
    fontWeight: 'normal',
    fontFamily: APP_FONT,
    fontStyle: 'italic',
    textDecorationLine: 'underline'
  }
};

export { LinkText };
