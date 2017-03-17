
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

import { BRAND_COLOUR_RED } from '../../global/colours';

const GoogleButton = ({ onPress, children }) => {
  return (
    <Icon.Button
      name="google"
      backgroundColor={BRAND_COLOUR_RED}
      onPress={onPress}
      style={{ padding: 15, alignSelf: 'stretch' }}
      activeOpacity={0.7}
    >
      {children}
    </Icon.Button>
  );
};

export { GoogleButton };

//needs fixing - doesnt 'press in' like a button
