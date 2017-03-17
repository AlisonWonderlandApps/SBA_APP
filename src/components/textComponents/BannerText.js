
import React from 'react';
import { Text } from 'react-native';

import { APP_FONT, FONT_SIZE_MEDIUM } from '../../global/fonts';
import { APP_BLACK } from '../../global/colours';

const BannerText = (props) => {
    return (
      <Text style={[styles.text, props.style]}>
        {props.children}
      </Text>
    );
};

const styles = {
  text: {
    fontSize: FONT_SIZE_MEDIUM,
    color: APP_BLACK,
    fontWeight: 'normal',
    fontFamily: APP_FONT
  }
};

export { BannerText };
