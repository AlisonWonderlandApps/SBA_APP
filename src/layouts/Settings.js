/*
*
*/

import React, { Component } from 'react';
import {
  TouchableHighlight,
  Text,
  Linking,
  AsyncStorage,
  Alert
 } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Communications from 'react-native-communications';

import { layoutStyles } from './styles';
import {
  BackgroundView,
  CardView,
  CardSection,
  SettingsSectionName,
  SettingsSectionSwitch,
  SettingsSectionPlan,
  SettingsSectionUsage
 } from '../components';

import {
  termsString,
  privacyString,
  FAQStr,
  likeAppStr,
  cameraStr,
  imagesStr,
  termsURL,
  privacyURL,
  faqURL
} from './strings';

class Settings extends Component {
  render() {
    return (
      <BackgroundView style={layoutStyles.settingsView}>
        <CardView>
          <SettingsSectionName
            name={this.props.userInfo.name}
            email={this.props.userInfo.email}
          />
        </CardView>

        <CardView>
          <CardSection>
            <TouchableHighlight
              style={{ flex: 1 }}
              onPress={this.onRateClick.bind(this)}
            >
              <Text
                style={{ alignSelf: 'center', paddingTop: 5, paddingBottom: 5 }}
              >
                {likeAppStr}
              </Text>
            </TouchableHighlight>
          </CardSection>
        </CardView>

        <CardView>
          <SettingsSectionUsage name={this.props.curAccName} />
          <SettingsSectionPlan plan={this.props.planType} />
        </CardView>

        <CardView>
          <SettingsSectionSwitch label={cameraStr} />
          <SettingsSectionSwitch label={imagesStr} />
        </CardView>

        <CardView>
          <CardSection>
            <TouchableHighlight
              style={{ flex: 1, paddingTop: 5, paddingLeft: 5 }}
              onPress={this.onTermsClick.bind(this)}
            >
              <Text> {termsString} </Text>
            </TouchableHighlight>
          </CardSection>
          <CardSection>
            <TouchableHighlight
              style={{ flex: 1, paddingTop: 5, paddingLeft: 5 }}
              onPress={this.onFAQClick.bind(this)}
            >
              <Text> {FAQStr} </Text>
            </TouchableHighlight>
          </CardSection>
          <CardSection>
            <TouchableHighlight
              style={{ flex: 1, paddingTop: 5, paddingLeft: 5 }}
              onPress={this.onPrivacyClick.bind(this)}
            >
              <Text> {privacyString} </Text>
            </TouchableHighlight>
          </CardSection>
        </CardView>

        <CardView>
          <CardSection style={{ justifyContent: 'center' }}>
            <TouchableHighlight
              style={{ flex: 1 }}
              onPress={this.onLogoutClick.bind(this)}
            >
              <Text
                style={{ alignSelf: 'center', color: 'red', paddingBottom: 5, paddingTop: 5 }}
              >
                Logout
              </Text>
            </TouchableHighlight>
          </CardSection>
        </CardView>

      </BackgroundView>
    );
  }

  onLogoutClick() {
    console.log('logoutclick');
    Alert.alert(
      'Squirrel Street',
      'Are you sure you want to log out?',
      [
        { text: 'Yes', onPress: () => this.logout() },
        { text: 'Cancel' }
      ]
    );
  }

  logout() {
      console.log('logout');
      AsyncStorage.clear();
      Actions.login();
  }

  onRateClick() {
    console.log('rateclick');
    Alert.alert(
      'Squirrel Street',
      'Do you like this App?',
      [
        { text: 'Love it', onPress: () => this.rateApp() },
        { text: 'Not so much', onPress: () => this.sendFeedback() },
        { text: 'Cancel' }
      ]
    );
  }

  rateApp() {
    console.log('rate it');
    const appID = 11111; //TODO: appid
    //Linking.openURL('itms://itunes.apple.com/app/' + appID);
    Linking.openURL('itms://itunes.apple.com/app/');
  }

  sendFeedback() {
    console.log('send email');
    //email(to, cc, bcc, subject, body)
    Communications.email(['help@team.shoeboxed.com.au'], null, ['help@team.shoeboxed.com.au'], '[Feedback] Squirrel Street Mobile', null);
  }

  onFAQClick() {
    Linking.openURL(faqURL);
  }
  onTermsClick() {
    Linking.openURL(termsURL);
  }
  onPrivacyClick() {
    Linking.openURL(privacyURL);
  }

}

const mapStateToProps = ({ user, accounts }) => {
  const {
    userInfo
  } = user;
  const {
    planType,
    curAccName
  } = accounts;
  return {
    userInfo,
    planType,
    curAccName
  };
};

export default connect(mapStateToProps, {

})(Settings);
