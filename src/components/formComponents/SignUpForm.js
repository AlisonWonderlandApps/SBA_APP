
import React, { Component } from 'react';
import { View, Linking } from 'react-native';
import FloatingLabel from 'react-native-floating-labels';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import { LoginStyles } from './styles';
import {
  helpURL,
  termsURL,
  privacyURL
} from './strings';

import {
  emailChanged,
  passwordChanged,
  loginUser,
  loginFBUser,
  loginGoogleUser
} from '../../actions';

import {
  CardView,
  CardSection,
  Button,
  FacebookButton,
  GoogleButton,
  CenterTextView,
  LinkText,
  FormText
} from '../../components';

class SignUpForm extends Component {

/******Email helpers ******/
  onEmailChange(text) {
    console.log(text);
  }
  onEmailBlur() {
    console.log('#####: onEmailBlur');
  }
  isValidEmail(text) {
    console.log(text);
  }
/******End Email helpers ******/

/******Password helpers ******/
onPasswordChange(text) {
  console.log(text);
}
onPasswordBlur() {
    console.log('#####: onPasswordBlur');
}
isValidPassword(text) {
  console.log(text);
}
/******End Password helpers ******/

/******ButtonPress helpers ******/
onLoginButtonPress() {
  console.log('Login pressed');
}
onFBButtonPress() {
  console.log('FB Login pressed');
}
onGoogleButtonPress() {
  console.log('Google Login pressed');
}
/******End ButtonPress helpers ******/

/******LinkAccess helpers ******/
  onPressLogin() {
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


  render() {
  const {
    labelInput,
    input,
    container,
    formInput
  } = LoginStyles;

    return (
      <View>
        <FormText onPress={this.onPressLogin}>
          Already have an account?
        </FormText>
        <CardView>
          <CardSection>
            <View style={container}>
              <FloatingLabel
                  underlineColorAndroid={'transparent'}
                  labelStyle={labelInput}
                  inputStyle={input}
                  style={formInput}
                  value={this.value}
                  onBlur={this.onEmailBlur}
                  autoFocus
                  autoCapitalize={'none'}
                  onChangeText={this.onEmailChange}
              >
                Email
              </FloatingLabel>
            </View>
          </CardSection>
          <CardSection>
            <View style={container}>
              <FloatingLabel
                  underlineColorAndroid={'transparent'}
                  labelStyle={labelInput}
                  inputStyle={input}
                  style={formInput}
                  value={this.value}
                  onBlur={this.onPasswordBlur}
                  password
                  onChangeText={this.onPasswordChange}
                  //onFocus={this.onFocus}
              >
                Password
              </FloatingLabel>
              </View>
          </CardSection>
          <CardSection>
            <View style={container}>
              <FloatingLabel
                  underlineColorAndroid={'transparent'}
                  labelStyle={labelInput}
                  inputStyle={input}
                  style={formInput}
                  value={this.value}
                  //onBlur={this.onPasswordBlur}
                  password
                //  onChangeText={this.onPasswordChange}
                //  onFocus={this.onFocus}
              >
                Confirm Password
              </FloatingLabel>
              </View>
          </CardSection>
          <CardSection>
            <Button> Sign Up! </Button>
          </CardSection>
        </CardView>
        <View style={{ flexDirection: 'row', padding: 10, justifyContent: 'space-between' }}>
          <FacebookButton
            style={{ flexGrow: 1, alignSelf: 'stretch' }}
          >
            Facebook Login
          </FacebookButton>
          <GoogleButton
            style={{ alignSelf: 'stretch', flexGrow: 1 }}
          >
            Google Login
          </GoogleButton>
        </View>
        <CenterTextView>
          <LinkText
            style={{ fontStyle: 'normal', textDecorationLine: 'none', padding: 5 }}
            onPress={this.onHelpClick.bind(this)}
          >
            Need Help?
          </LinkText>
          <LinkText
            style={{ color: 'white', textDecorationLine: 'none' }}
            onPress={this.onTermsClick.bind(this)}
          >
            Terms & Conditions
          </LinkText>
          <LinkText
            style={{ color: 'white', textDecorationLine: 'none' }}
            onPress={this.onPrivacyClick.bind(this)}
          >
            Privacy Policy
          </LinkText>
        </CenterTextView>
      </View>
    );
  }
}

export { SignUpForm };

/*
export default connect(null, {
  emailChanged,
  passwordChanged,
  loginUser,
  loginFBUser,
  loginGoogleUser
})(SignUpForm);

/*
<ReactPasswordStrength
  minLength={5}
  minScore={2}
  scoreWords={['weak', 'okay', 'good', 'strong', 'stronger']}
  changeCallback={this.onFocus}
  inputProps={{ name: 'password_input', autocomplete: 'off' }}
/>
*/
