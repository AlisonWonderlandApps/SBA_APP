
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

const FacebookButton = ({ onPress, children }) => {
  return (
    <Icon.Button
      name="facebook"
      backgroundColor="#3b5998"
      style={{ padding: 15, alignSelf: 'stretch' }}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {children}
    </Icon.Button>
  );
};

export { FacebookButton };

//needs fixing - doesnt 'press in' like a button
