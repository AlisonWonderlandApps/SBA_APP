
import { AsyncStorage, Alert } from 'react-native';
import axios from 'axios';
import Querystring from 'querystring';
import { Actions } from 'react-native-router-flux';
import { ssAuthConfig, ssApiQueryURL } from '../config/auth';

import {
  EMAIL_CHANGED_SU,
  EMAIL_VALID_SU,
  PASSWORD_CHANGED_SU,
  PASSWORD_VALID_SU,
  CONFIRM_PASSWORD_CHANGED,
  PASSWORD_MATCH,
  SIGNUP_USER,
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_FAIL,
  RESET_SU
} from './types';

export const resetStateSU = () => {
  return {
    type: RESET_SU
  };
};

export const emailChangedS = (text) => {
  return {
    type: EMAIL_CHANGED_SU,
    payload: text
  };
};

export const isEmailValidS = (num) => {
  return {
    type: EMAIL_VALID_SU,
    payload: num
  };
};

export const passwordChangedS = (text) => {
  return {
    type: PASSWORD_CHANGED_SU,
    payload: text
  };
};

export const isPasswordValidS = (num) => {
  return {
    type: PASSWORD_VALID_SU,
    payload: num
  };
};

export const confirmPasswordChanged = (text1) => {
  return {
    type: CONFIRM_PASSWORD_CHANGED,
    payload: text1
  };
};

export const isPasswordMatch = (num) => {
  return {
    type: PASSWORD_MATCH,
    payload: num
  };
};

export const signupUser = ({ email, password }) => {
  return (dispatch) => {
   dispatch({ type: SIGNUP_USER }); //loading is true

  };
};

const signupUserSuccess = (dispatch, user) => {
  dispatch({
    type: SIGNUP_USER_SUCCESS,
    payload: user
  });

  Actions.main();
};

const signupUserFail = (dispatch) => {
  dispatch({ type: SIGNUP_USER_FAIL });
};


export const signupFBUser = () => {
  return (dispatch) => {
    dispatch({ type: 'facebook user' });
  };
};

export const signupGoogleUser = () => {
  return (dispatch) => {
    dispatch({ type: 'Google user' });
  };
};
