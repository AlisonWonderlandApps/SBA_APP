
import React, { Component } from 'react';
import { View, Linking } from 'react-native';
import FloatingLabel from 'react-native-floating-labels';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import { LoginStyles } from './styles';
import {
  helpURL,
  LoginButtonText
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

class LoginForm extends Component {

/******Email helpers ******/
  onEmailChange(text) {
      //action here: this.props comes from connect statement

      //this.props.emailChanged(text);
      //check against regex and show red error until matching

      console.log(text);
  }
  onEmailBlur() {
      //const goodEmail = Isemail.validate(value);
      console.log('blur Email');
    //  console.log(this.props.email);
  }
  isValidEmail(text) {
    //check regex
    console.log(text);
  }
/******End Email helpers ******/

/******Password helpers ******/
  //action to take when password changes
  onPasswordChange(text) {
    //check against regex and show red error until matching
    //this.props.passwordChanged(text);
    console.log(text);
  }
  onPasswordBlur() {
      console.log('#####: onBlur');
  }
  isValidPassword(text) {
    console.log(text);
  }
/******End Password helpers ******/

/******ButtonPress helpers ******/
  onLoginButtonPress() {
    //const { email, password } = this.props;

    //this.props.loginUser({ email, password });
    //console.log(email);
    //console.log(password);
  }
  onFBButtonPress() {
    this.props.loginFBUser();
  }
  onGoogleButtonPress() {
    this.props.loginGoogleUser();
  }
  /******End ButtonPress helpers ******/

/******Links helpers ******/
  onHelpClick() {
    Linking.openURL(helpURL);
  }
  //user wants to create an account
  onPressSignUp() {
    Actions.signup();
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
        <FormText onPress={this.onPressSignUp} >
          Need to Create an Account?
        </FormText>
        <CardView>
          <CardSection>
            <View style={container}>
              <FloatingLabel
                  underlineColorAndroid={'transparent'}
                  labelStyle={labelInput}
                  inputStyle={input}
                  style={formInput}
                //  value={this.props.email}
              //    onBlur={this.onEmailBlur}
                //  onFocus={this.isValidEmail.bind(this)}
                  autoFocus
                  autoCorrect={false}
                  autoCapitalize='none'
              //    onChangeText={this.onEmailChange.bind(this)}
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
              //    value={this.props.password}
              //    onBlur={this.onPasswordBlur}
                  password
              //    onChangeText={this.onPasswordChange.bind(this)}
              //    onFocus={this.isValidPassword.bind(this)}
              >
                Password
              </FloatingLabel>
              </View>
          </CardSection>
          <CardSection>
            <Button onPress={this.onPress}> { LoginButtonText } </Button>
          </CardSection>
        </CardView>
        <View style={{ flexDirection: 'row', padding: 10, justifyContent: 'space-around' }}>
          <FacebookButton style={{ flexGrow: 1 }}> Facebook Login </FacebookButton>
          <GoogleButton style={{ flexGrow: 1 }}> Google Login </GoogleButton>
        </View>
        <CenterTextView>
          <LinkText
            onPress={this.onHelpClick.bind(this)}
          >
            Forgot Password?
          </LinkText>
        </CenterTextView>
      </View>
    );
  }
}

/*
const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading } = auth;
  return { email, password, error, loading };
};
*/

export default connect(null, {
  emailChanged,
  passwordChanged,
  loginUser,
  loginFBUser,
  loginGoogleUser
})(LoginForm);
