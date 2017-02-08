import React from 'react';
import { Text } from 'react-native';

import { APP_FONT, FONT_SIZE_MEDIUM } from '../../global/fonts';
import { PRIMARY_HIGHLIGHT_COLOUR } from '../../global/colours';

const ButtonText = (props) => {
    return (
      <Text style={[styles.text, props.style]}>
        {props.children}
      </Text>
    );
};

const styles = {
  text: {
    color: PRIMARY_HIGHLIGHT_COLOUR,
    backgroundColor: 'rgba(0,0,0,0)',
    fontFamily: APP_FONT,
    alignSelf: 'center',
    fontSize: FONT_SIZE_MEDIUM,
    fontWeight: '800',
    paddingTop: 15,
    paddingBottom: 10
  }
};

export { ButtonText };
