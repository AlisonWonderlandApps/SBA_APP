
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { CardSection, SmallText } from '../../components';
//import { mainStyles } from './styles';

let Accountname = '';

class SettingsSectionUsage extends Component {
  constructor(props) {
    console.log('SettingsSectionLabel');
    super(props);
    Accountname = props.name;
  }

  render() {
    return (
      <CardSection>
        <View style={{ flex: 1, paddingTop: 5, paddingBottom: 5 }}>
          <Text> {Accountname} </Text>
          <SmallText style={{ paddingLeft: 2, paddingTop: 10 }}> Usage </SmallText>
        </View>
      </CardSection>
    );
  }
}

export { SettingsSectionUsage };
