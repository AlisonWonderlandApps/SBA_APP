/*
*
*/

import React, { Component } from 'react';
import {
  TouchableHighlight,
  Text,
  View,
  Image,
  TextInput,
  Alert
} from 'react-native';
import { connect } from 'react-redux';
import {
  BackgroundView,
  CardView,
  CardSection,
  Banner
} from '../components';
import {
  NotSureStr,
  ReimburseStr,
  DeductStr
} from './strings';
import { HEADER } from '../global/margins';
import { PRIMARY_HIGHLIGHT_COLOUR } from '../global/colours';

class SaveDoc extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  render() {
    return (
      <BackgroundView
        style={{ padding: 0, flex: 1, justifyContent: 'flex-start', paddingTop: HEADER.height }}
      >
        <Banner style={{ height: 40, width: null }}> This is a receipt </Banner>
        <View style={{ backgroundColor: 'white', padding: 5 }}>
          <TextInput
            style={{ alignItems: 'flex-start', padding: 5, height: 80 }}
            placeholder='+ tap to add note'
            onChangeText={(text) => this.setState({ text })}
            value={this.state.text}
          />
          <View style={{ padding: 5, flexDirection: 'row', width: null }}>
            <CardSection style={{ borderWidth: 1, flex: 1 }}>
              <TouchableHighlight
                style={{ flex: 1 }}
                onPress={this.onContactAddClick.bind(this)}
              >
                <Text
                  style={{
                    color: PRIMARY_HIGHLIGHT_COLOUR,
                    alignSelf: 'center',
                    paddingTop: 5,
                    paddingBottom: 5 }}
                >
                  {ReimburseStr}
                </Text>
              </TouchableHighlight>
            </CardSection>
            <CardSection style={{ borderWidth: 1, flex: 1 }}>
              <TouchableHighlight
                style={{ flex: 1 }}
                onPress={this.onContactAddClick.bind(this)}
              >
                <Text
                  style={{
                    color: PRIMARY_HIGHLIGHT_COLOUR,
                    alignSelf: 'center',
                    paddingTop: 5,
                    paddingBottom: 5 }}
                >
                  {DeductStr}
                </Text>
              </TouchableHighlight>
            </CardSection>
            <CardSection style={{ borderWidth: 1, flex: 1 }}>
              <TouchableHighlight
                style={{ flex: 1 }}
                onPress={this.onContactAddClick.bind(this)}
              >
                <Text
                  style={{
                    color: PRIMARY_HIGHLIGHT_COLOUR,
                    alignSelf: 'center',
                    paddingTop: 5,
                    paddingBottom: 5 }}
                >
                  {NotSureStr}
                </Text>
              </TouchableHighlight>
            </CardSection>
          </View>
        </View>
        <View>
          <Image />
        </View>
      </BackgroundView>
    );
  }

  onContactAddClick() {
    console.log('contactAdd');
    Alert.alert(
      'Squirrel Street',
      'Add Contact',
      [
        { text: 'Yes', onPress: () => console.log('ok') },
        { text: 'Cancel' }
      ]
    );
  }
}

const mapStateToProps = ({ accounts }) => {
  const {
    dropBoxEmail
  } = accounts;
  return {
    dropBoxEmail
  };
};

export default connect(mapStateToProps, {})(SaveDoc);
