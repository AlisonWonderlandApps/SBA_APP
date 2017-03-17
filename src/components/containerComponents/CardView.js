//this will be the styling for a card
//purpose is to wrap other items in it and
//make it look pretty.
//We want reuse of styling.. therefore this is a
//standalone component to add styling to parts of the app

import React from 'react';
import { View } from 'react-native';
import { containerStyles } from './styles';

const CardView = (props) => {
  return (
    <View style={[containerStyles.card, props.style]}>
      {props.children}
    </View>
  );
};

export { CardView };
