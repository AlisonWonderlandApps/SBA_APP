
import React, { Component } from 'react';
import { Text, TextInput, View } from 'react-native';
//import { connect } from 'react-redux';
import { CardSection, TitleText, SmallText } from '../../components';
import { PRIMARY_HIGHLIGHT_COLOUR } from '../../global/colours';

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
          <TitleText style={{ paddingLeft: 3, color: PRIMARY_HIGHLIGHT_COLOUR }}> {name} </TitleText>
          <Text style={{ paddingTop: 5, paddingLeft: 2 }}> {email} </Text>
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
    paddingBottom: 5,
    padding: 5
  }
};

export { SettingsSectionName };
