//the cardItem

import React from 'react';
import { View } from 'react-native';
import { containerStyles } from './styles';

const CardSection = (props) => {
  return (
    <View style={[containerStyles.cardSection, props.style]}>
      {props.children}
    </View>
  );
};

export { CardSection };
