
import React, { Component } from 'react';
import { Text, TextInput, View } from 'react-native';
//import { connect } from 'react-redux';
import { CardSection, SmallText } from '../../components';
//import { mainStyles } from './styles';

let name = '';
let email = '';

class SettingsSectionName extends Component {
  constructor(props) {
    console.log('SettingsSectionName');
    super(props);
    name = props.name;
    email = props.email;
  }

  render() {
    return (
      <CardSection>
        <View style={styles.name}>
          <Text> {name} </Text>
          <SmallText style={{ paddingTop: 5, paddingLeft: 2 }}> {email} </SmallText>
        </View>
      </CardSection>
    );
}

}

const styles = {
  name: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingTop: 5,
    paddingBottom: 5
  }
};

export { SettingsSectionName };
