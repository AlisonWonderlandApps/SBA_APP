/*
*
*/
import { AsyncStorage, Alert } from 'react-native';
import axios from 'axios';
import Querystring from 'querystring';
import RNFetchBlob from 'react-native-fetch-blob';
import { Actions } from 'react-native-router-flux';
import { ssApiQueryURL, ssAuthConfig } from '../config/auth';

import {
  USER_NAME_FETCH,
  USER_INFO_FETCH_SUCCESS,
  UPDATE_USERNAME,
  UPDATE_USERNAME_SUCCESS,
  UPDATE_USERNAME_FAIL
} from './types';

import {
  setUserEmail
} from './AccountActions';

//this gets loaded from accountActions - hence not much work to do
export const loadUserInfo = (UserData) => {
  //console.log('loadUser Info', UserData);
  return function (dispatch) {
    dispatch(loadInfoSuccess(UserData));
    dispatch(loadNameSuccess(UserData.name));
    dispatch(setUserEmail(UserData.email));
  };
};

export const updateUserName = (newName) => {
  return {
    type: UPDATE_USERNAME,
    payload: newName
  };
  /*
  return function (dispatch) {
    dispatch({
      type: UPDATE_USERNAME,
      payload: newName
    });

    //do this in Background
    try {
      AsyncStorage.getItem('refreshToken').then((value) => {
        if (value !== null) {
          dispatch(getNewToken(value, newName));
        }
      });
    } catch (err) {
      //console.log('token', err);
      Alert('Error in updateUserName', err);
    }
  }; */
};

export const updateUserNameInDB = (newName) => {
  return function (dispatch) {
      try {
        AsyncStorage.getItem('refreshToken').then((value) => {
          if (value !== null) {
            dispatch(getNewToken(value, newName));
          }
        });
      } catch (err) {
        //console.log('token', err);
        Alert('Error in updateUserName', err);
      }
  };
};

const getNewToken = (oldToken, newName) => {
  return function (dispatch) {
   const data = {
     grant_type: ssAuthConfig.refreshTokenGrantType,
     client_id: ssAuthConfig.clientId,
     client_secret: ssAuthConfig.clientSecret,
     refresh_token: oldToken
   };
   axios.post(ssAuthConfig.tokenURL, Querystring.stringify(data))
     .then(response => {
       if (response !== null) {
         const AuthStr = 'Bearer '.concat(response.data.access_token);
         dispatch(updateName(AuthStr, newName));
       }
     }).catch((err) => {
       Alert.alert(
         'Sorry',
         'An error occurred authorising :(', err,
         [
           { text: 'OK' }
         ]
       );
    //   console.log('no auth token', err);
     });
  };
};

const updateName = (AuthStr, newName) => {
  const updateURL = ssApiQueryURL.user;
  return function (dispatch) {
  axios.get(updateURL, { headers: { Authorization: AuthStr } })
    .then(response => {
      const responseData = JSON.parse(JSON.stringify(response));
      if (response.status === 200) {
        const jsonToUpate = responseData.data;
        jsonToUpate.name = newName;

        RNFetchBlob.fetch('PUT', updateURL, {
            Authorization: AuthStr,
            'Content-Type': 'application/json',
             }, JSON.stringify(jsonToUpate)).then(() => {
               //console.log('success', resp);
               dispatch(updateSuccess(newName));
               Actions.settings();
             }).catch((err) => {
               dispatch(updateFail(err));
             });
      } else {
          dispatch(updateFail('No response'));
      }
    }).catch((error) => {
        dispatch(updateFail(error));
      });
  };
};

const updateSuccess = (newName) => {
  return {
    type: UPDATE_USERNAME_SUCCESS,
    payload: newName
  };
};

const updateFail = (error) => {
  return {
    type: UPDATE_USERNAME_FAIL,
    payload: error
  };
};

const loadInfoSuccess = (info) => {
  return {
    type: USER_INFO_FETCH_SUCCESS,
    payload: info
  };
};

const loadNameSuccess = (name) => {
  return {
    type: USER_NAME_FETCH,
    payload: name
  };
};
