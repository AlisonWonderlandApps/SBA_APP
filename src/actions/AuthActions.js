//import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import Querystring from 'querystring';
import { ssAuthConfig } from '../config/auth';

import {
  USER_LOGGED_IN,
  //AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  //FETCH_MESSAGE
} from './types';

import {
  loadAccounts
} from '../actions';

//return true if their is a token found in storage
export const isUserLoggedIn = () => {
  console.log('islogged in?');
  return dispatch => {
  try {
    AsyncStorage.getItem('refreshToken').then((value) => {
      if (value !== null) {
        console.log('rToken', value);
        dispatch(getNewToken(value));
      } else {
        dispatch({
          type: USER_LOGGED_IN,
          payload: false
        });
        return false;
      }
    });
  } catch (err) {
    console.log('no refresh token gotten');
    return err;
  }
  };
};

export const notLoggedIn = () => {
  return {
    type: USER_LOGGED_IN,
    payload: false
  };
};

export const getNewToken = (refresher) => {
  console.log('get new auth token');
  return function (dispatch) {
    const data = {
      grant_type: ssAuthConfig.refreshTokenGrantType,
      client_id: ssAuthConfig.clientId,
      client_secret: ssAuthConfig.clientSecret,
      refresh_token: refresher
    };
  axios.post(ssAuthConfig.tokenURL, Querystring.stringify(data))
    .then(response => {
        console.log(response.data.access_token);
        const AuthStr = 'Bearer '.concat(response.data.access_token);
        dispatch(loadAccounts(AuthStr));
        dispatch({
          type: USER_LOGGED_IN,
          payload: true
        });
    })
    .catch((err) => {
      console.log('no auth token', err);
      return err;
    });
  };
};

/*
export function signUpAUser({ email, password }) {
  return function (dispatch) {
    axios.post(`${ROOT_URL}/signup`, { email, password })
      .then(response => {
        dispatch({ type: AUTH_USER });
        AsyncStorage.setItem('token', response.data.token);
      //  browserHistory.push('/feature');
      })
      .catch(response => dispatch(authError(response.data.error)));
  };
}
*/

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export function signoutUser() {
  AsyncStorage.removeItem('token');

  return { type: UNAUTH_USER };
}
