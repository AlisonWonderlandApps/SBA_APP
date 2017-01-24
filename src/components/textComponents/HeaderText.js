
import React from 'react';
import { Text } from 'react-native';

import { APP_FONT, FONT_SIZE_XXLARGE } from '../../global/fonts';
import { APP_BLACK } from '../../global/colours';

const HeaderText = (props) => {
    return (
      <Text style={[styles.text, props.style]}>
        {props.children}
      </Text>
    );
};

const styles = {
    text: {
      fontSize: FONT_SIZE_XXLARGE,
      color: APP_BLACK,
      fontWeight: 'bold',
      fontFamily: APP_FONT,
      fontStyle: 'italic'
    }
};

export { HeaderText };
