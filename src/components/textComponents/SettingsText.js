
import React from 'react';
import { Text } from 'react-native';

import { APP_FONT, FONT_SIZE_MEDIUM } from '../../global/fonts';
import { PRIMARY_HIGHLIGHT_COLOUR } from '../../global/colours';

const SettingsText = ({ onPress, children, style }) => {
    return (
      <Text style={[styles.text, style]} onPress={onPress}>
        {children}
      </Text>
    );
};

const styles = {
  text: {
    fontSize: FONT_SIZE_MEDIUM,
    fontWeight: 'normal',
    fontFamily: APP_FONT,
    paddingTop: 5
  }
};

export { SettingsText };
