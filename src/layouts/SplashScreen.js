/*
* TODO: fix checking for user status
* TODO: fix the showing login page error
*/


import React, { Component } from 'react';
import { AsyncStorage, Alert, NetInfo } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import LoadingSpinner from 'react-native-spinkit';

import { LogoSection, FullScreenView, TitleText } from '../components';
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
    this.props.isUserLoggedIn();
  }

  componentDidMount() {
    //AsyncStorage.clear();
    //Check network connectivity
    if (!this.haveNetworkConnectivity) {
      Alert.alert(
        AlertErrorTitleStr,
        noNetworkStr,
        [
          { onPress: Actions.errorscreen(),
           text: okStr }
        ]
      );
    }
  }

  shouldComponentUpdate(nextProps) {
    console.log('should', this.props.goToLogin, nextProps.goToLogin);
    if (this.props.goToLogin !== nextProps.goToLogin) {
    //  console.log('gotologin');
      return true;
    }
    if (this.props.userName !== nextProps.userName) {
    //  console.log('gotologin');
      return true;
    }
    console.log(this.props.done, nextProps.done);
    if (this.props.done !== nextProps.done) {
    //  console.log('gotoaccounts');
      return true;
    }
    return false;
  }

  componentDidUpdate() {
    console.log('did update', this.props);
    if (this.props.goToLogin) {
        Actions.login();
    }
    if (this.props.done) {
      Actions.accountslist({
        accList: this.props.accountsArr,
      });
    }
  }

  /******General helpers ******/
    haveNetworkConnectivity() {
      NetInfo.fetch().done((reach) => {
        if (reach === 'none') {
          console.log('no network');
          return false;
        }
        console.log('lol');
        return true;
      });
    }

  render() {
    return (
      <FullScreenView style={{ padding: 50, paddingTop: 20, paddingBottom: 20 }}>
        <LogoSection
          imagePath={MAIN_LOGO}
        />
        <LoadingSpinner
          style={{ alignSelf: 'center', paddingBottom: 60 }}
          isVisible={this.props.isLoading}
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
    accountsArr,
    done
  } = accounts;
  return {
    userName,
    isLoading,
    goToLogin,
    accountsArr,
    done
  };
};

export default connect(mapStateToProps, {
  isUserLoggedIn
})(SplashScreen);
