/*
* Used to sign up a new user with native, FB or Google login
*/


/*** Import Outside Resources ***/
import React, { Component } from 'react';
import { View, Linking, Alert } from 'react-native';
import FloatingLabel from 'react-native-floating-labels';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

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
  FormText,
  LoadingModal
} from '../components';

import {
  layoutSyles,
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
  //FBLoginStr,
  //GoogleLoginStr,
  PasswordLabelStr,
  ValidPasswordLabelStr,
  InvalidPasswordLabelStr,
  ConfirmPWStr,
  MatchPWStr,
  NoMatchPWStr,
  EmailLabelStr,
  ValidEmailLabelStr,
  InvalidEmailLabelStr,
  loadingStr,
  AlertErrorTitleStr,
  MissingFieldEntryStr,
  okStr,
  noNetworkStr
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
   signupUserSuccess,
   signupUserFail,
   resetStateSU
 } from '../actions';

/**** CLASS START ****/
class SignUp extends Component {

  componentWillMount() {
    if (!this.haveNetworkConnectivity) {
      this.showAlert(noNetworkStr);
    }
    this.props.resetStateSU();
  }

/*
  shouldComponentUpdate() {
    if (this.props !== this.nextProps) {
      return true;
    }
    return false;
  }
*/

  render() {
    const {
      input,
      container,
      formInput,
      socialButtonContainer
    } = LoginStyles;

    return (
      <FullScreenView style={{ flex: 1 }}>
      <LoadingModal text={loadingStr} visible={this.props.loading} />
        <View style={layoutSyles.loginView}>
          <LogoSection />
        </View>
        <View style={{ paddingTop: 20 }} />
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
                    autoFocus
                    autoCapitalize={'none'}
                    returnKeyType='next'
                    onChangeText={this.onEmailChange.bind(this)}
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
                    value={this.value}
                    returnKeyType='done'
                    password
                    onChangeText={this.onPasswordConfirmChange.bind(this)}
                >
                  {this.renderConfirmPasswordLabelText()}
                </FloatingLabel>
                </View>
            </CardSection>
            <CardSection>
              <Button
                onPress={this.onSignUpButtonPress.bind(this)}
              >
                {SignUpButtonText}
              </Button>
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
      </FullScreenView>
    );
  }

  /******General helpers ******/
  haveNetworkConnectivity() {
    NetInfo.fetch().done((reach) => {
      if (reach === 'none') {
        console.log('no network');
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
        { text: okStr}
      ]
    );
  }

  renderError() {
    if(this.props.myerror) {
      return <ErrorText style={{padding: 10}}> Signup failed </ErrorText>;
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
       showAlert(MissingFieldEntryStr);
     } else if (
        emailValid === 1 &&
        passwordValid === 1 &&
        passwordMatch === 1) {
       this.props.signupUser({ email, password });
     } else if (emailValid === 2) {
       showAlert(InvalidEmailLabelStr);
    } else if (passwordValid === 2) {
      showAlert(InvalidPasswordLabelStr);
    } else if (passwordMatch === 2) {
      showAlert(NoMatchPWStr);
    }
  }
  onFBButtonPress() {
    console.log('FB Login pressed');
  }
  onGoogleButtonPress() {
    console.log('Google Login pressed');
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

const mapStateToProps = ({ signup }) => {
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
  return {
    email,
    emailValid,
    password,
    passwordValid,
    confirmPassword,
    passwordMatch,
    myerror,
    loading
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
