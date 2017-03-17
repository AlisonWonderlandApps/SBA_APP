import React from 'react';
import { Text } from 'react-native';

import { APP_FONT, FONT_SIZE_NORMAL } from '../../global/fonts';

const CentreText = (props) => {
    return (
      <Text style={[styles.text, props.style]}>
        {props.children}
      </Text>
    );
};

const styles = {
  text: {
    fontSize: FONT_SIZE_NORMAL,
    fontFamily: APP_FONT,
    alignSelf: 'center'
  }
};

export { CentreText };
