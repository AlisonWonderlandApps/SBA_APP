/*
* Used to sign up a new user with native, FB or Google login
*/


/*** Import Outside Resources ***/
import React, { Component } from 'react';
import { View, Text, Linking, Alert, NetInfo } from 'react-native';
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

import { EMAIL_REGEX, PASSWORD_REGEX } from '../config/regex';

import {
  helpURL,
  termsURL,
  privacyURL,
  helpString,
  termsString,
  privacyString,
  SignUpButtonText,
  HaveAccountString,
  PasswordLabelStr,
  ValidPasswordLabelStr,
  InvalidPasswordLabelStr,
  ConfirmPWStr,
  MatchPWStr,
  NoMatchPWStr,
  EmailLabelStr,
  ValidEmailLabelStr,
  InvalidEmailLabelStr,
  AlertErrorTitleStr,
  //MissingFieldEntryStr,
  okStr
 } from './strings';

 import {
   emailChangedS,
   isEmailValidS,
   passwordChangedS,
   isPasswordValidS,
   confirmPasswordChanged,
   isPasswordMatch,
   signupUser,
   signupFBUser,
   signupGoogleUser,
   resetStateSU
 } from '../actions';

/**** CLASS START ****/
class SignUp extends Component {

  shouldComponentUpdate(nextProps) {
    if (this.props !== nextProps) {
      return true;
    }
    return false;
  }

  componentDidUpdate() {
    if (this.props.goToAccounts) {
      this.props.resetSU();
      Actions.accountslist();
    }
    if (this.props.goToMain) {
      this.props.resetSU();
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
      <FullScreenView style={{ flex: 1 }}>
        <View style={{ paddingTop: 30, padding: 10 }} />
        <View>
          <FormText onPress={this.goToLoginPage}>
            {HaveAccountString}
          </FormText>
            {this.renderError()}
          <CardView>
            <CardSection>
              <View style={container}>
                <FloatingLabel
                    underlineColorAndroid={'transparent'}
                    labelStyle={this.renderEmailLabelStyle()}
                    inputStyle={input}
                    style={formInput}
                    autoCapitalize={'none'}
                    returnKeyType='next'
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
                    returnKeyType='next'
                    onChangeText={this.onPasswordChange.bind(this)}
                    value={this.props.password}
                >
                  {this.renderPasswordLabelText()}
                </FloatingLabel>
                </View>
            </CardSection>
            <CardSection>
              <View style={container}>
                <FloatingLabel
                    underlineColorAndroid={'transparent'}
                    labelStyle={this.renderConfirmPasswordLabelStyle()}
                    inputStyle={input}
                    style={formInput}
                    returnKeyType='done'
                    password
                    onChangeText={this.onPasswordConfirmChange.bind(this)}
                    value={this.props.confirmPassword}
                >
                  {this.renderConfirmPasswordLabelText()}
                </FloatingLabel>
                </View>
            </CardSection>
            <CardSection>
              <View
                style={{
                  flex: 1,
                  width: null,
                  alignItems: 'center',
                  justifyContent: 'center' }}
              >
                <Button
                  style={{ alignSelf: 'center', width: 120 }}
                  onPress={this.onSignUpButtonPress.bind(this)}
                >
                  {SignUpButtonText}
                </Button>
              </View>
            </CardSection>
          </CardView>
          <View style={socialButtonContainer}>
            <FacebookButton
              style={{ flexGrow: 1, alignSelf: 'stretch' }}
              onPress={this.onFBButtonPress.bind(this)}
            >
              Facebook Login
            </FacebookButton>
            <GoogleButton
              style={{ alignSelf: 'stretch', flexGrow: 1 }}
              onPress={this.onGoogleButtonPress.bind(this)}
            >
              Google Login
            </GoogleButton>
          </View>
          <CenterTextView>
            <LinkText
              style={{ fontStyle: 'normal', textDecorationLine: 'none', padding: 5 }}
              onPress={this.onHelpClick.bind(this)}
            >
              {helpString}
            </LinkText>
            <LinkText
              style={{ color: 'white', textDecorationLine: 'none' }}
              onPress={this.onTermsClick.bind(this)}
            >
              {termsString}
            </LinkText>
            <LinkText
              style={{ color: 'white', textDecorationLine: 'none' }}
              onPress={this.onPrivacyClick.bind(this)}
            >
              {privacyString}
            </LinkText>
          </CenterTextView>
        </View>
        <View style={layoutStyles.loginView}>
          <LogoSection />
        </View>
        <Spinner
          visible={this.props.loading}
          textContent={'Loading...'}
          textStyle={{ color: 'white' }}
        />
      </FullScreenView>
    );
  }

  /******General helpers ******/
  haveNetworkConnectivity() {
    NetInfo.fetch().done((reach) => {
      if (reach === 'none') {
      //  console.log('no network');
        return false;
      }
      return true;
    });
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

  renderError() {
    if (this.props.myerror) {
      return <Text style={{ padding: 10 }}> Signup failed </Text>;
    }
  }

  /*
  renderErrorAlert() {
    if (this.props.error) {
      this.showAlert(this.props.errorMsg);
    }
  }
  */
  /******End General helpers ******/

  /******Email helpers ******/
    onEmailChange(text) {
      this.props.emailChangedS(text);
      this.isValidEmail(text);
    }
    isValidEmail(text) {
      if (text.match(EMAIL_REGEX)) {
        this.props.isEmailValidS(1);
      } else {
        this.props.isEmailValidS(2);
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

  /******Password helpers ******/
  onPasswordChange(text) {
    this.props.passwordChangedS(text);
    this.isValidPassword(text);
  }
  isValidPassword(text) {
    if (text.match(PASSWORD_REGEX)) {
      this.props.isPasswordValidS(1);
    } else {
      this.props.isPasswordValidS(2);
    }
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
  /*** ConfirmPassword Helpers ***/
  onPasswordConfirmChange(pass) {
    this.props.confirmPasswordChanged(pass);
    this.isPasswordMatch(pass);
  }
  renderConfirmPasswordLabelStyle() {
    if (this.props.passwordMatch === 0) {
      return LoginStyles.labelInput;
    } else if (this.props.passwordMatch === 1) {
      return LoginStyles.labelInputGood;
    } else if (this.props.passwordMatch === 2) {
      return LoginStyles.labelInputBad;
    }
  }
  renderConfirmPasswordLabelText() {
    if (this.props.passwordMatch === 0) {
      return ConfirmPWStr;
    } else if (this.props.passwordMatch === 1) {
      return MatchPWStr;
    } else if (this.props.passwordMatch === 2) {
      return NoMatchPWStr;
    }
  }
  isPasswordMatch(text) {
    if (this.props.password === text) {
      this.props.isPasswordMatch(1);
    } else {
      this.props.isPasswordMatch(2);
    }
  }
  /******End Password helpers ******/

  /******ButtonPress helpers ******/
  onSignUpButtonPress() {
    const {
      email,
      password,
      emailValid,
      passwordValid,
      passwordMatch
    } = this.props;

     if (emailValid === 0 || passwordValid === 0 || passwordMatch === 0) {
       //showAlert(MissingFieldEntryStr);
      // console.log({ MissingFieldEntryStr });
     } else if (
        emailValid === 1 &&
        passwordValid === 1 &&
        passwordMatch === 1) {
       this.props.signupUser({ email, password });
     } else if (emailValid === 2) {
       //showAlert(InvalidEmailLabelStr);
      // console.log({ InvalidEmailLabelStr });
    } else if (passwordValid === 2) {
      //showAlert(InvalidPasswordLabelStr);
    //  console.log({ InvalidPasswordLabelStr });
    } else if (passwordMatch === 2) {
      //showAlert(NoMatchPWStr);
    //  console.log({ NoMatchPWStr });
    }
  }
  onFBButtonPress() {
  //  console.log('FB Login pressed');
    Alert.alert(
    'Sorry',
    'Function not currently available',
    [
      { text: 'OK' }
    ]
    );
  }
  onGoogleButtonPress() {
  //  console.log('Google Login pressed');
    Alert.alert(
    'Sorry',
    'Function not currently available',
    [
      { text: 'OK' }
    ]
    );
  }
  /******End ButtonPress helpers ******/

  /******LinkAccess helpers ******/
  goToLoginPage() {
    resetStateSU();
    Actions.login();
  }

  onHelpClick() {
    Linking.openURL(helpURL);
  }

  onTermsClick() {
    Linking.openURL(termsURL);
  }

  onPrivacyClick() {
    Linking.openURL(privacyURL);
  }
    /******End LinkAccess helpers ******/
}
/**** CLASS END ****/

const mapStateToProps = ({ signup, login }) => {
  const {
    email,
    emailValid,
    password,
    passwordValid,
    confirmPassword,
    passwordMatch,
    myerror,
    loading
  } = signup;
  const {
    goToMain,
    goToAccounts
  } = login;
  return {
    email,
    emailValid,
    password,
    passwordValid,
    confirmPassword,
    passwordMatch,
    myerror,
    loading,
    goToMain,
    goToAccounts
  };
};

export default connect(mapStateToProps, {
  emailChangedS,
  isEmailValidS,
  passwordChangedS,
  isPasswordValidS,
  confirmPasswordChanged,
  isPasswordMatch,
  signupUser,
  signupFBUser,
  signupGoogleUser,
  resetStateSU
})(SignUp);
