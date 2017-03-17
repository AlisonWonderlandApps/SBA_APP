
import React from 'react';
import { View } from 'react-native';
import { FormText } from '../../components';
import { navStyles } from './styles';

const LeftNavTitle = (props) => {
  return (
    <View style={navStyles.view} >
      <FormText onPress={props.onPress}> {props.leftTitle} </FormText>
    </View>
  );
};

export { LeftNavTitle };
