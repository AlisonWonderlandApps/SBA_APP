
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { CardSection, SettingsText, SmallText } from '../../components';
//import { mainStyles } from './styles';

let Accountname = '';
let total = '';
let used = '';

class SettingsSectionUsage extends Component {
  constructor(props) {
    console.log('SettingsSectionLabel');
    super(props);
    Accountname = props.name;
    total = props.totalAllowable;
    used = props.totalUsed;
  }

  render() {
    return (
      <CardSection>
        <View style={{ flex: 1, padding: 5 }}>
          <SettingsText> {Accountname} </SettingsText>
          <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
            <SmallText style={{ paddingLeft: 2, paddingTop: 10 }}> Usage </SmallText>
            <SmallText style={{ paddingRight: 2, paddingTop: 10 }}> {used}/{total} </SmallText>
          </View>
        </View>
      </CardSection>
    );
  }
}

export { SettingsSectionUsage };
