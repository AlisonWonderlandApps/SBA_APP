/*
* This form authorises a user to login to the app
* TODO: fix the reducer to only perform login actions (accounts sep)
*/

/*** Import Outside Resources ***/
import React, { Component } from 'react';
import { View, Linking, Alert, NetInfo } from 'react-native';
import FloatingLabel from 'react-native-floating-labels';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';

/*** Import Internal Resources ***/
import {
  LogoSection,
  FullScreenView,
  CardView,
  CardSection,
  Button,
  FacebookButton,
  GoogleButton,
  CenterTextView,
  LinkText,
  FormText
} from '../components';

import {
  layoutStyles,
  LoginStyles
} from './styles';

import {
  EMAIL_REGEX,
  //PASSWORD_REGEX
} from '../config/regex';

import {
  helpURL,
  ForgotPasswordString,
  LoginButtonText,
  CreateAccountString,
  PasswordLabelStr,
  ValidPasswordLabelStr,
  InvalidPasswordLabelStr,
  EmailLabelStr,
  ValidEmailLabelStr,
  InvalidEmailLabelStr,
  AlertErrorTitleStr,
  MissingFieldEntryStr,
  okStr,
  noNetworkStr
 } from './strings';

 import {
   emailChanged,
   isEmailValid,
   passwordChanged,
   isPasswordValid,
   loginUser,
   loginFBUser,
   loginGoogleUser,
   loginUserSuccess,
   loadAccountsSuccess,
   loginUserFail,
   resetPassword,
   resetState
 } from '../actions';

/**** CLASS START ****/
class Login extends Component {

  componentWillMount() {
    if (!this.haveNetworkConnectivity) {
      Alert.alert(
        AlertErrorTitleStr,
        noNetworkStr,
        [
          { text: okStr, onPress: () => { Actions.errorscreen(); } }
        ]
      );
    }
  }

  shouldComponentUpdate(nextProps) {
    if (this.props !== nextProps) {
      return true;
    }
    if (this.props.goToMain !== nextProps.goToMain) {
      return true; //update to go to accounts list or main page
    }
    if (this.props.goToAccounts !== nextProps.goToAccounts) {
      return true; //update to go to accounts list or main page
    }
    return false;
  }

  componentDidUpdate() {
    //console.log('didA', this.props.accountsArr);
    if (this.props.goToAccounts) {
      this.props.resetState();
      Actions.accountslist();
    }
    if (this.props.goToMain) {
      this.props.resetState();
       Actions.main();
      }
  }

  render() {
    const {
      input,
      container,
      formInput,
      socialButtonContainer
    } = LoginStyles;

    return (
      <FullScreenView>
        <View style={{ paddingTop: 20, padding: 10 }} />
        <View>
          <FormText onPress={this.goToSignupPage} >
            {CreateAccountString}
          </FormText>
          <CardView>
            <CardSection>
              <View style={container}>
                <FloatingLabel
                    underlineColorAndroid={'transparent'}
                    labelStyle={this.renderEmailLabelStyle()}
                    inputStyle={input}
                    style={formInput}
                    autoCorrect={false}
                    autoCapitalize='none'
                    returnKeyType='done'
                    onChangeText={this.onEmailChange.bind(this)}
                    value={this.props.email}
                >
                  {this.renderEmailLabelText()}
                </FloatingLabel>
              </View>
            </CardSection>
            <CardSection>
              <View style={container}>
                <FloatingLabel
                    underlineColorAndroid={'transparent'}
                    labelStyle={this.renderPasswordLabelStyle()}
                    inputStyle={input}
                    style={formInput}
                    password
                    autoCorrect={false}
                    returnKeyType='done'
                    onChangeText={this.onPasswordChange.bind(this)}
                    value={this.props.password}
                >
                  {this.renderPasswordLabelText()}
                </FloatingLabel>
                </View>
            </CardSection>
            <CardSection >
            <View style={{ flex: 1, width: null, alignItems: 'center', justifyContent: 'center' }}>
                <Button
                  style={{ alignSelf: 'center', width: 120 }}
                  onPress={this.onLoginButtonPress.bind(this)}
                >
                  {LoginButtonText}
                </Button>
              </View>
            </CardSection>
          </CardView>
            {this.renderSocialButtons()}
          <CenterTextView>
            <LinkText
              onPress={this.onHelpClick.bind(this)}
            >
              {ForgotPasswordString}
            </LinkText>
          </CenterTextView>
        </View>
        <View style={layoutStyles.loginView}>
          <LogoSection />
        </View>
        <Spinner visible={this.props.loading} textContent={''} textStyle={{ color: 'white' }} />
      </FullScreenView>
    );
  }

/******General helpers ******/
haveNetworkConnectivity() {
  NetInfo.fetch().done((reach) => {
    if (reach === 'none') {
      //console.log('no network');
      return false;
    }
    return true;
  });
}

renderSocialButtons() {
  return <View />;
  /*
  <View style={socialButtonContainer}>
    <FacebookButton
      style={{ flexGrow: 0.9 }}
      onPress={this.onFBButtonPress.bind(this)}
    >
      Facebook Login
    </FacebookButton>
    <GoogleButton
      style={{ flexGrow: 0.9 }}
      onPress={this.onGoogleButtonPress.bind(this)}
    >
      Google Login
    </GoogleButton>
  </View> */
}

showAlert(message) {
  Alert.alert(
    AlertErrorTitleStr,
    message,
    [
      { text: okStr }
    ]
  );
}
/******End General helpers ******/

/******Email helpers ******/
  onEmailChange(text) {
    this.props.emailChanged(text);
    this.isValidEmail(text);
  }
  isValidEmail(text) {
    if (text.match(EMAIL_REGEX)) {
      //console.log('regex match');
      this.props.isEmailValid(1);
    } else {
      this.props.isEmailValid(2);
    }
  }
  renderEmailLabelStyle() {
    if (this.props.emailValid === 0) {
      return LoginStyles.labelInput;
    } else if (this.props.emailValid === 1) {
      return LoginStyles.labelInputGood;
    } else if (this.props.emailValid === 2) {
      return LoginStyles.labelInputBad;
    }
  }
  renderEmailLabelText() {
    if (this.props.emailValid === 0) {
      return EmailLabelStr;
    } else if (this.props.emailValid === 1) {
      return ValidEmailLabelStr;
    } else if (this.props.emailValid === 2) {
      return InvalidEmailLabelStr;
    }
  }
/******End Email helpers ******/

/****** Password helpers ******/
  onPasswordChange(text) {
    this.props.passwordChanged(text);
    this.isValidPassword(text);
  }
  //check if its a valid password (strong enough)
  isValidPassword() {
      this.props.isPasswordValid(1); //always valid
  }
  renderPasswordLabelStyle() {
    if (this.props.passwordValid === 0) {
      return LoginStyles.labelInput;
    } else if (this.props.passwordValid === 1) {
      return LoginStyles.labelInputGood;
    } else if (this.props.passwordValid === 2) {
      return LoginStyles.labelInputBad;
    }
  }
  renderPasswordLabelText() {
    if (this.props.passwordValid === 0) {
      return PasswordLabelStr;
    } else if (this.props.passwordValid === 1) {
      return ValidPasswordLabelStr;
    } else if (this.props.passwordValid === 2) {
      return InvalidPasswordLabelStr;
    }
  }
/******End Password helpers ******/

/******ButtonPress helpers ******/
  onLoginButtonPress() {
    const {
      email,
      password,
      emailValid,
      passwordValid
    } = this.props;

    if (emailValid === 0 || passwordValid === 0) {
        this.showAlert(MissingFieldEntryStr);
    } else if (emailValid === 1 && passwordValid === 1) {
        if (this.haveNetworkConnectivity) {
          this.props.loginUser({ email, password });
        } else {
          this.showAlert(noNetworkStr);
        }
    } else if (emailValid === 2) {
      this.showAlert(InvalidEmailLabelStr);
    } else if (passwordValid === 2) {
      this.showAlert(InvalidPasswordLabelStr);
    }
  }

  onFBButtonPress() {
    Alert.alert(
    'Sorry',
    'Function not currently available',
    [
      { text: 'OK' }
    ]
  );
  }
  onGoogleButtonPress() {
    Alert.alert(
    'Sorry',
    'Function not currently available',
    [
      { text: 'OK' }
    ]
  );
    /*
    GoogleSignin.hasPlayServices({ autoResolve: true }).then(() => {
      //....
    }).catch((err) => {
      console.log('Play services error', err.code, err.message);
    })

    GoogleSignin.configure({
      iosClientId:
    }).then(() => {

    });
*/
    this.props.loginGoogleUser();
  }
  /******End ButtonPress helpers ******/

/******Links helpers ******/
  onHelpClick() {
    Linking.openURL(helpURL);
  }
  goToSignupPage() {
    Actions.signup();
  }
  /******End LinkAccess helpers ******/
}
/**** CLASS END ****/

const mapStateToProps = ({ login, accounts }) => {
  const {
    email,
    emailValid,
    password,
    passwordValid,
    loading
  } = login;
  const {
    accountsArray,
    goToMain,
    goToAccounts
  } = accounts;
  return {
    email,
    emailValid,
    password,
    passwordValid,
    loading,
    accountsArray,
    goToMain,
    goToAccounts
  };
};

export default connect(mapStateToProps, {
  emailChanged,
  isEmailValid,
  passwordChanged,
  isPasswordValid,
  loginUser,
  loginFBUser,
  loginGoogleUser,
  loginUserSuccess,
  loginUserFail,
  loadAccountsSuccess,
  resetPassword,
  resetState
})(Login);
