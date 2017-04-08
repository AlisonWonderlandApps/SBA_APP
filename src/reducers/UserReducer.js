/*
* this reducer will be responsible for all user actions
*/

import {
  USER_NAME_FETCH,
  USER_INFO_FETCH_SUCCESS,
  USER_SETTINGS_FETCH,  //the phone settings stored in Async
  USER_SETTING_FETCH_SUCCESS,
  USER_SETTINGS_FETCH_FAIL,
  USER_PLAN_FETCH_SUCCESS,
  UPDATE_USERNAME,
  UPDATE_USERNAME_SUCCESS,
  UPDATE_USERNAME_FAIL
} from '../actions/types';

const INITIAL_STATE = {
  userLoading: false,
  userInfo: [],
  userName: 'Name',
  userPlan: '',
  settings: [], //should come from AsynchStorage
  error: '',
  updatedSuccess: false,
  updateError: '',
  editableName: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_NAME_FETCH:
      return { ...state, userName: action.payload, editableName: action.payload };
    case USER_INFO_FETCH_SUCCESS:
      return { ...state, userLoading: false, userInfo: action.payload };
    case USER_PLAN_FETCH_SUCCESS:
      return { ...state, userLoading: false, userPlan: action.payload };
    case USER_SETTINGS_FETCH:
      return { ...state };
    case USER_SETTING_FETCH_SUCCESS:
      return { ...state };
    case USER_SETTINGS_FETCH_FAIL:
      return { ...state };
    case UPDATE_USERNAME:
      return { ...state, editableName: action.payload };
    case UPDATE_USERNAME_SUCCESS:
      return { ...state, updatedSuccess: true, userName: action.payload };
    case UPDATE_USERNAME_FAIL:
      return { ...state, updatedSuccess: false, updateError: action.payload };
    default:
      return state;
  }
};
