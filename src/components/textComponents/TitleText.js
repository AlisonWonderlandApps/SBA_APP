
import React from 'react';
import { Text } from 'react-native';

import { APP_FONT, FONT_SIZE_XLARGE } from '../../global/fonts';
import { APP_BLACK } from '../../global/colours';

const TitleText = (props) => {
    return (
      <Text
        style={[styles.text, props.style]}
        onPress={props.onPress}
      >
        {props.children}
      </Text>
    );
};

const styles = {
  text: {
    fontSize: FONT_SIZE_XLARGE,
    color: APP_BLACK,
    fontWeight: 'bold',
    fontFamily: APP_FONT,
  }
};

export { TitleText };
