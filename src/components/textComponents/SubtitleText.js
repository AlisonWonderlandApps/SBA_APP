
import React from 'react';
import { Text } from 'react-native';

import { APP_FONT, FONT_SIZE_NORMAL } from '../../global/fonts';
import { APP_BLACK } from '../../global/colours';

const SubtitleText = (props) => {
    return (
      <Text style={[styles.text, props.style]}>
        {props.children}
      </Text>
    );
};

const styles = {
  text: {
    fontSize: FONT_SIZE_NORMAL,
    color: APP_BLACK,
    fontWeight: 'normal',
    fontFamily: APP_FONT
  }
};

export { SubtitleText };
