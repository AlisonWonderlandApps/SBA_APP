/*
*
*/

import {
  USER_NAME_FETCH,
  USER_INFO_FETCH_SUCCESS,
} from './types';

//this gets loaded from accountActions - hence not much work to do
export const loadUserInfo = (UserData) => {
  console.log('loadUser Info', UserData);
  return function (dispatch) {
    dispatch(loadInfoSuccess(UserData));
    dispatch(loadNameSuccess(UserData.name));
  };
};

const loadInfoSuccess = (info) => {
  console.log('loaduserinfosucc', info.name);
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
