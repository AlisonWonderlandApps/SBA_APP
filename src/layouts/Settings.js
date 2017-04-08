/*
*
*/

//TODO: Fix name to be editable
//TODO: Fix Usage level
//TODO: Make toggle buttons functional
//TODO: Fix links to correct places
//TODO: Fix link to app store for user to rate

import React, { Component } from 'react';
import {
  ScrollView,
  TouchableHighlight,
  Text,
  View,
  Linking,
  AsyncStorage,
  Alert
 } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { email } from 'react-native-communications';

import { updateUserName, updateUserNameInDB } from '../actions';
import { layoutStyles } from './styles';
import { FONT_SIZE_LARGE } from '../global/fonts';
import { BACKGROUND_COLOUR, PRIMARY_HIGHLIGHT_COLOUR } from '../global/colours';
import {
  BackgroundView,
  CardView,
  CardSection,
  SettingsSectionSwitch,
  SettingsSectionPlan,
  SettingsSectionUsage,
  FormText
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

/*
  shouldComponentUpdate(nextProps) {
    if (this.props !== nextProps) {
      console.log(nextProps);
      return true;
    }
    return false;
  } */

  render() {
    return (
      <ScrollView style={{ backgroundColor: BACKGROUND_COLOUR, flex: 1 }}>
      <BackgroundView style={layoutStyles.settingsView}>
        <CardView>
          {this.renderNameSection()}
        </CardView>

        <CardView>
          <CardSection>
            <TouchableHighlight
              style={{ flex: 1 }}
              onPress={this.onRateClick.bind(this)}
            >
            <View>
              <FormText
                style={{ alignSelf: 'center', paddingTop: 10, paddingBottom: 5 }}
              >
                {likeAppStr}
              </FormText>
            </View>
            </TouchableHighlight>
          </CardSection>
        </CardView>

        <CardView>
          <SettingsSectionUsage
            name={this.props.curAccountName}
            totalAllowable={this.props.plan.documentLimitPerMonth}
            totalUsed={this.props.numOfReceipts}
          />
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
              <View><FormText> {termsString} </FormText></View>
            </TouchableHighlight>
          </CardSection>
          <CardSection>
            <TouchableHighlight
              style={{ flex: 1, paddingTop: 5, paddingLeft: 5 }}
              onPress={this.onFAQClick.bind(this)}
            >
              <View><FormText> {FAQStr} </FormText></View>
            </TouchableHighlight>
          </CardSection>ß
          <CardSection>
            <TouchableHighlight
              style={{ flex: 1, paddingTop: 5, paddingLeft: 5 }}
              onPress={this.onPrivacyClick.bind(this)}
            >
              <View><FormText> {privacyString} </FormText></View>
            </TouchableHighlight>
          </CardSection>
        </CardView>

        <Text />

        <CardView>
          <CardSection style={{ justifyContent: 'center' }}>
            <TouchableHighlight
              style={{ flex: 1 }}
              onPress={this.onLogoutClick.bind(this)}
            >
              <View>
              <FormText
                style={{
                  fontWeight: 'bold',
                  alignSelf: 'center',
                  color: 'red',
                  paddingBottom: 5,
                  paddingTop: 10 }}
              >
                LOGOUT
              </FormText>
              </View>
            </TouchableHighlight>
          </CardSection>
        </CardView>

      </BackgroundView>
      </ScrollView>
    );
  }

  renderNameSection() {
    return (
      <CardSection>
        <View style={styles.name}>
          <TextInput
            style={{ fontSize: FONT_SIZE_LARGE, paddingLeft: 3, color: PRIMARY_HIGHLIGHT_COLOUR }}
            onChangeText={this.changeName.bind(this)}
            value={this.props.editableName}
            underlineColorAndroid={'transparent'}
            onSubmitEditing={() => this.submitNameChange()}
            //onEndEditing={() => console.log('end')}
            //onEndEditing={this.submitNameChange()}
          />
          <Text
            style={{ paddingTop: 5, paddingLeft: 2 }}
          >
            {this.props.userInfo.email}
          </Text>
        </View>
      </CardSection>
    );
  }

  changeName(name) {
    this.props.updateUserName(name);
    //this.props.updateUserNameInDB(this.props.editableName);
  }

  submitNameChange() {
    this.props.updateUserNameInDB(this.props.editableName);
  }

  onLogoutClick() {
    //console.log('logoutclick');
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
    //  console.log('logout');
      AsyncStorage.clear();
      Actions.login();
  }

  onRateClick() {
  //  console.log('rateclick');
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
    //console.log('rate it');
    //const appID = 11111; //TODO: appid
    //Linking.openURL('itms://itunes.apple.com/app/' + appID);
    //Linking.openURL('itms://itunes.apple.com/app/');
  }

  sendFeedback() {
    //console.log('send email');
    //email(to, cc, bcc, subject, body)
    email(
      ['help@team.shoeboxed.com.au'],
      null,
      ['help@team.shoeboxed.com.au'],
      '[Feedback] Squirrel Street Mobile', null);
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

const styles = {
  name: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingTop: 5,
    paddingBottom: 5,
    padding: 5
  }
};

const mapStateToProps = ({ user, accounts, receipts }) => {
  const {
    userInfo,
    userName,
    editableName
  } = user;
  const {
    plan,
    planType,
    curAccountName
  } = accounts;
  const {
    numOfReceipts
  } = receipts;
  return {
    userInfo,
    userName,
    editableName,
    plan,
    planType,
    curAccountName,
    numOfReceipts
  };
};

export default connect(mapStateToProps, {
  updateUserName, updateUserNameInDB
})(Settings);
