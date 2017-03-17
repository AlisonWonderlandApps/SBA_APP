import React from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Icon } from 'react-native-vector-icons';
import { FormText } from '../components';


export function renderLeftButton(props) {
  console.log(props.backTitle);
  switch (props.key) {
    case 'api':
    return (
      <View>
        <FormText onPress={Actions.splashscreen}> {props.backTitle} </FormText>
      </View>
    );
    default:
      return (
        <Text> hello </Text>
      );
  }
}

export function renderRightButton(props) {
  console.log(props.rightTitle);
  switch (props.key) {
    case 'api':
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} >
        <FormText onPress={Actions.login}> {this.props.rightTitle} </FormText>
      </View>
      );
    default:
      return (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} >
          <FormText onPress={Actions.login}> {this.props.rightTitle} </FormText>
          <Icon name="facebook" />
        </View>
      );
  }
}
