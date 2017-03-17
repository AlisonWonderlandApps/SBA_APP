
import React from 'react';
import { View } from 'react-native';
import { containerStyles } from './styles';

const CenterTextView = (props) => {
    return (
      <View style={[containerStyles.centerText, props.style]}>
        {props.children}
      </View>
    );
};

export { CenterTextView };
