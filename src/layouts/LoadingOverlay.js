
import React from 'react';
import { View } from 'react-native';
import { DotsLoader, TextLoader } from 'react-native-indicator';
import { LoadingOverlayStyle } from '../styles';

const LoadingOverlay = () => {
    return (
      <View style={LoadingOverlayStyle.containerStyle}>
        <View style={LoadingOverlayStyle.overlayStyle}>
          <DotsLoader size={20} />
          <TextLoader text='Loading' />
        </View>
      </View>
    );
};

export { LoadingOverlay };
