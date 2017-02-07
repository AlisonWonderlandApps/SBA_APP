
import React from 'react';
import { View } from 'react-native';
import { containerStyles } from './styles';

const BackgroundView = (props) => {
    return (
      <View style={[containerStyles.bgview, props.style]}>
        {props.children}
      </View>
    );
};

export { BackgroundView };
