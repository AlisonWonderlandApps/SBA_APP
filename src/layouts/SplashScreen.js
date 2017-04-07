/*
* TODO: fix checking for user status
* TODO: fix the showing login page error
*
* Actions:
*   check if user is logged in
*   check for network issues
*   fetch users name & associated accounts if logged in
*
* Logic:
*   Redirect to login page if no valid session
*   Redirect to accounts page if >1 account
*   Redirect to main page if only 1 account (additional action req)
*/

import React, { Component } from 'react';
import { AsyncStorage, Alert, NetInfo } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import LoadingSpinner from 'react-native-spinkit';
import {
  LogoSection,
  FullScreenView,
  TitleText
} from '../components';
import { MAIN_LOGO } from '../global/images';
import { APP_WHITE } from '../global/colours';
import { SplashScreenStyles } from './styles';
import {
  AlertErrorTitleStr,
  loadingStr,
  noNetworkStr,
  okStr
} from './strings';

import {
  isUserLoggedIn
} from '../actions';

class SplashScreen extends Component {

  componentWillMount() {
    //AsyncStorage.clear();
    //function that handles logic of checking if user
    //has a current session. Gets a new oAuth token and
    //accounts info if so.
    if (!this.haveNetworkConnectivity) {
      Alert.alert(
        AlertErrorTitleStr,
        noNetworkStr,
        [
          { onPress: Actions.errorscreen(),
           text: okStr }
        ]
      );
    } else {
      this.props.isUserLoggedIn();
    }
  }

  shouldComponentUpdate(nextProps) {
    if (this.props !== nextProps) {
      //console.log('should true', nextProps);
      this.props = nextProps;
      return true;
    }
    return false;
  }

  componentDidUpdate() {
    if (this.props.goToLogin) {
      //console.log('go to login');
      Actions.login();
    } else if (this.props.goToAccounts) {
      Actions.accountslist();
    } else if (this.props.goToMain) {
       Actions.main();
      }
   }

  /******General helpers ******/
  haveNetworkConnectivity() {
    NetInfo.fetch().done((reach) => {
    if (reach === 'none') {
      console.log('no network');
      return false;
    }
      //console.log('lol');
      return true;
    });
  }

  render() {
  //  console.log('render', this.props);
    return (
      <FullScreenView style={{ padding: 50, paddingTop: 20, paddingBottom: 20 }}>
        <LogoSection
          imagePath={MAIN_LOGO}
        />
        <LoadingSpinner
          style={{ alignSelf: 'center', paddingBottom: 60 }}
          isVisible
          size={100}
          type={'ThreeBounce'}
          color={APP_WHITE}
        />
        <TitleText style={SplashScreenStyles.splashTextStyle}>
          {loadingStr}
        </TitleText>
      </FullScreenView>
    );
  }
}

const mapStateToProps = ({ user, auth, accounts }) => {
  const {
    userName
  } = user;
  const {
    isLoading,
    goToLogin
  } = auth;
  const {
    accountsArray,
    goToMain,
    goToAccounts
  } = accounts;
  return {
    userName,
    isLoading,
    goToLogin,
    accountsArray,
    goToMain,
    goToAccounts
  };
};

export default connect(mapStateToProps, {
  isUserLoggedIn
})(SplashScreen);
