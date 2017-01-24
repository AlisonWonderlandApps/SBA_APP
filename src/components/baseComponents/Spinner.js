/*
* Spinner component for wait times
*/

import React from 'react';
import { ActivityIndicator, View } from 'react-native';

import { baseStyles } from './styles';

const Spinner = (props) => {
  return (
    <View style={[baseStyles.spinnerStyle, props.style]}>
      <ActivityIndicator size={props.spinnerSize || 'large'} />
    </View>
  );
};

export { Spinner };
