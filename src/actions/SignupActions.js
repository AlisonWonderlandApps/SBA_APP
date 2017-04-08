
import { Alert } from 'react-native';
import axios from 'axios';
import Querystring from 'querystring';
import { Actions } from 'react-native-router-flux';
import RNFetchBlob from 'react-native-fetch-blob';
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
  LOGIN_USER,
  RESET_SU
} from './types';

import {
  saveTokens,
  loginUserSuccess,
  loadAccounts,
  loginUserFail
} from '../actions';

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
  return function (dispatch) {
    dispatch({
      type: SIGNUP_USER
    });
  //get oauth token
  const data = {
    grant_type: ssAuthConfig.clientGrantType,
    client_id: ssAuthConfig.clientId,
    client_secret: ssAuthConfig.clientSecret,
    scope: ssAuthConfig.scopeInternal,
  };

  axios.post(ssAuthConfig.tokenURL, Querystring.stringify(data))
    .then(response => {
      //console.log('signuptoken', response);
      const AuthStr = 'Bearer '.concat(response.data.access_token);
      dispatch(signUp(AuthStr, email, password));
      //saveTokens(response.data.access_token, response.data.refresh_token);
      //dispatch(signupUserSuccess());
      //dispatch(loadUserAccount());
      //dispatch(loadAccounts('Bearer '.concat(response.data.access_token)));
     })
    .catch((err) => {
      //console.log('error', err);
      dispatch(signupUserFail());
    });
  };
};

const signUp = (AuthStr, email, password) => {
  //console.log(AuthStr, email, password);
  const signupURL = (ssApiQueryURL.rootURL).concat('users');
  //console.log(signupURL);

  return function (dispatch) {
    const data = {
      email,
      password
    };

    RNFetchBlob.fetch('POST', signupURL, {
      Authorization: AuthStr,
      'Content-Type': 'application/json',
    }, JSON.stringify(data)).then((resp) => {
      //console.log(resp.data);
      const ans = JSON.parse(resp.data);
      //console.log(ans);
      if (ans.id === undefined) {
        //console.log(ans.code);
        dispatch(signupFail(ans));
      } else {
      //  console.log('success', resp);
        Actions.main();
        dispatch(signupUserSuccess(email, password));
      }

      //dispatch(signupUserSuccess(resp));
    }).catch((err) => {
    //  console.log(err);
      dispatch(signupUserFail(err));
    });
  };
  /*
  return {
    type: SIGNUP_USER_SUCCESS
  }; */
};

export const loginNewUser = (email, password) => {
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
       dispatch(loadAccounts('Bearer '.concat(response.data.access_token)));
      })
     .catch((err) => {
      // console.log('error', err);
       dispatch(loginUserFail());
     });
   };
};

const signupUserSuccess = (email, password) => {
  return function (dispatch) {
    dispatch(loginNewUser(email, password));
  };
};

const signupFail = (errCode) => {
  //console.log(errCode.code);
  return function (dispatch) {
    if (errCode.code === 'EMAIL_ADDRESS_TAKEN_ERROR') {
      Alert.alert(
        'Error! Email already taken',
        'Go to Login screen instead?',
        [
          { text: 'Cancel ',
            onPress: () => dispatch(signupUserFail())
          },
          { text: 'OK',
            onPress: () => dispatch(goToLogin())
          }
        ]
      );
    } else {
      Alert.alert(
        'Error',
        errCode.code,
        [
          { text: 'OK',
            onPress: () => dispatch({
                type: SIGNUP_USER_FAIL
              })
          }
        ]
      );
    }
  };
};

const goToLogin = () => {
  return function (dispatch) {
    dispatch(signupUserFail());
    Actions.login();
  };
};

const signupUserFail = () => {
  return {
    type: SIGNUP_USER_FAIL
  };
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
