import React from 'react';
import { Text } from 'react-native';

import { APP_FONT, FONT_SIZE_XXLARGE } from '../../global/fonts';
import { APP_BLACK } from '../../global/colours';

const ArrowText = (props) => {
    return (
      <Text style={[styles.text, props.style]}>
        >
      </Text>
    );
};

const styles = {
  text: {
    fontSize: FONT_SIZE_XXLARGE,
    color: APP_BLACK,
    fontWeight: 'bold',
    fontFamily: APP_FONT,
    alignSelf: 'flex-end'
  }
};

export { ArrowText };
