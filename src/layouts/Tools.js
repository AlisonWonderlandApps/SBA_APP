/*
*
*/

import React, { Component } from 'react';
import {
  TouchableHighlight,
  Text,
  Alert
} from 'react-native';
import { connect } from 'react-redux';
import contacts from 'react-native-contacts';
import {
  BackgroundView,
  CardView,
  CardSection,
  SmallText,
  Banner
} from '../components';
import { HEADER } from '../global/margins';
import { PRIMARY_HIGHLIGHT_COLOUR } from '../global/colours';

class Tools extends Component {
  render() {
    return (
      <BackgroundView
        style={{ padding: 0, flex: 1, justifyContent: 'flex-start', paddingTop: HEADER.height }}
      >
        <Banner style={{ height: 40, width: null }}> Tools </Banner>
        <SmallText
          style={{ alignSelf: 'center', paddingTop: 15, paddingBottom: 2 }}
        >
          Send receipts as attachments or
        </SmallText>
        <SmallText
          style={{ alignSelf: 'center', paddingBottom: 5 }}
        >
          forward your email receipts to:
        </SmallText>
        <Text
          style={{ alignSelf: 'center', paddingTop: 5, paddingBottom: 5 }}
        >
          {this.props.dropBoxEmail}
        </Text>
        <CardView>
        <CardSection>
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
              Add To Contacts
            </Text>
          </TouchableHighlight>
        </CardSection>
        </CardView>
      </BackgroundView>
    );
  }

  onContactAddClick() {
    //console.log('contactAdd');
    const email = this.props.dropBoxEmail;
    const newContact = {
      emailAddresses: [{
        label: 'Squirrel Street Australia',
        email
      }],
      givenName: 'Squirrel Street DropBox'
    };

    contacts.checkPermission((err, permission) => {
      if (permission === 'undefined') {
        contacts.requestPermission(() => {
          Alert.alert(
            'undefined',
            email,
            [
              { text: 'Yes', onPress: () => console.log('ok') },
              { text: 'Cancel' }
            ]
          );
        });
      }
      if (permission === 'authorized') {
        contacts.addContact(newContact, (error) => { console.log(error); });
      }
      if (permission === 'denied') {
        Alert.alert(
          'denied',
          email,
          [
            { text: 'Yes', onPress: () => console.log('ok') },
            { text: 'Cancel' }
          ]
        );
      }
    });
    //contacts.addContact(newContact, (err) => { console.log(err); });
/*
    Alert.alert(
      newContact.givenName,
      email,
      [
        { text: 'Yes', onPress: () => console.log('ok') },
        { text: 'Cancel' }
      ]
    ); */
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

export default connect(mapStateToProps, {})(Tools);
