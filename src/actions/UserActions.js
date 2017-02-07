import { Alert } from 'react-native';
import axios from 'axios';
//import Querystring from 'querystring';
import { ssApiQueryURL } from '../config/auth';

import {
  USER_NAME_FETCH,
  USER_INFO_FETCH,
  USER_INFO_FETCH_SUCCESS,
  USER_INFO_FETCH_FAIL,
  //USER_SETTINGS_FETCH,
  //USER_SETTING_FETCH_SUCCESS,
  //USER_SETTINGS_FETCH_FAIL
} from './types';

export const loadUserInfo = (AuthStr) => {
  console.log('loadUser Info');
  return function (dispatch) {
   dispatch({
     type: USER_INFO_FETCH
   });
   axios.get(ssApiQueryURL.user, { headers: { Authorization: AuthStr } })
       .then(response => {
         console.log(response.data.name);
         dispatch(loadNameSuccess(response.data.name));
         dispatch(loadInfoSuccess(response.data));
       }).catch((error) => {
           console.log('error etf ', error);
           loadInfoFail(error);
         });
    };
};

const loadInfoSuccess = (info) => {
  console.log('loaduserinfosucc', info.name);
  //loadNameSuccess(info.name);
  return {
    type: USER_INFO_FETCH_SUCCESS,
    payload: info
  };
};

const loadNameSuccess = (name) => {
  console.log('name', name);
  return {
    type: USER_NAME_FETCH,
    payload: name
  };
};

export const loadInfoFail = (err) => {
  return function (dispatch) {
    console.log('fail');
    dispatch({
      type: USER_INFO_FETCH_FAIL,
      payload: err
    });
    Alert.alert(
      'OOPS!!',
      'Could not load user info',
      [
        { text: 'OK' }
      ]
    );
  };
};
