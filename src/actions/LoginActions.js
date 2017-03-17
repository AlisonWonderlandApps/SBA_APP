
import { AsyncStorage, Alert } from 'react-native';
import axios from 'axios';
import Querystring from 'querystring';
import { ssAuthConfig } from '../config/auth';

import {
  AlertErrorTitleStr,
  loginFailedStr,
  okStr
} from './strings';

import {
  EMAIL_CHANGED,
  EMAIL_VALID,
  PASSWORD_CHANGED,
  PASSWORD_VALID,
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_FB_USER,
  LOGIN_GOOGLE_USER,
  RESET_PW,
  RESET
} from './types';

import {
  loadAccounts
} from '../actions';

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const isEmailValid = (num) => {
  return {
    type: EMAIL_VALID,
    payload: num
  };
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};

export const isPasswordValid = (num) => {
  return {
    type: PASSWORD_VALID,
    payload: num
  };
};

export const loginUser = ({ email, password }) => {
  return function (dispatch) {
   dispatch({
     type: LOGIN_USER
   });

   //get oauth token for user
   const data = {
     grant_type: ssAuthConfig.userGrantType,
     client_id: ssAuthConfig.clientId,
     client_secret: ssAuthConfig.clientSecret,
     scope: ssAuthConfig.scopeInternal,
     username: email,
     password
   };

   axios.post(ssAuthConfig.tokenURL, Querystring.stringify(data))
     .then(response => {
       saveTokens(response.data.access_token, response.data.refresh_token);
       dispatch(loginUserSuccess());
       dispatch(loadAccounts('Bearer '.concat(response.data.access_token)));
      })
     .catch((err) => {
       console.log('error', err);
       dispatch(loginUserFail());
     });
   };
};

const loginUserSuccess = () => {
    return {
      type: LOGIN_USER_SUCCESS
    };
};

const saveTokens = (accessToken, refreshToken) => {
  try {
    console.log('access', accessToken);
    AsyncStorage.setItem('accessToken', accessToken);
    console.log('refresh', refreshToken);
    AsyncStorage.setItem('refreshToken', refreshToken);
  } catch (err) {
    console.log('token saving error');
  }
};

export const loginFBUser = () => {
  return (dispatch) => {
    dispatch({ type: LOGIN_FB_USER });
  };
};

export const loginGoogleUser = () => {
  return (dispatch) => {
    dispatch({ type: LOGIN_GOOGLE_USER });
  };
};

const loginUserFail = () => {
  return function (dispatch) {
    console.log('fail');
    dispatch({
      type: RESET_PW
    });
    dispatch({
      type: LOGIN_USER_FAIL,
      payload: true
    });
    Alert.alert(
      AlertErrorTitleStr,
      loginFailedStr,
      [
        { text: okStr }
      ]
    );
  };
};

export const resetPassword = () => {
  return {
    type: RESET_PW
  };
};

export const resetState = () => {
      console.log('reset');
  return {
    type: RESET
  };
};
