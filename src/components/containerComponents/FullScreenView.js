
import React from 'react';
import { View } from 'react-native';
import { containerStyles } from './styles';

const FullScreenView = (props) => {
    return (
      <View style={[containerStyles.view, props.style]}>
        {props.children}
      </View>
    );
};

export { FullScreenView };
