
import React from 'react';
import { View } from 'react-native';
import { BannerText } from '../textComponents';
import { baseStyles } from './styles';

const Banner = (props) => {
  return (
    <View style={[baseStyles.bannerView, props.style]}>
      <BannerText style={{ color: 'white' }}>{props.children}</BannerText>
    </View>
  );
};

export { Banner };
