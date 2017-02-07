/*
* this reducer will be responsible for all authentication logic
*/

import {
  USER_NAME_FETCH,
  USER_INFO_FETCH,
  USER_INFO_FETCH_SUCCESS,
  USER_INFO_FETCH_FAIL,
  USER_SETTINGS_FETCH,
  USER_SETTING_FETCH_SUCCESS,
  USER_SETTINGS_FETCH_FAIL,
  USER_PLAN_FETCH,
  USER_PLAN_FETCH_SUCCESS,
  USER_PLAN_FETCH_FAIL
} from '../actions/types';

const INITIAL_STATE = {
  userLoading: true,
  userInfo: [],
  userName: 'Name',
  userPlan: '',
  settings: [],
  error: '',
  message: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_NAME_FETCH:
      return { ...state, userName: action.payload };
    case USER_INFO_FETCH:
      return { ...state, userLoading: true };
    case USER_INFO_FETCH_SUCCESS:
      return { ...state, userLoading: false, userInfo: action.payload };
    case USER_INFO_FETCH_FAIL:
      return { ...state, userLoading: false, error: action.payload };
    case USER_PLAN_FETCH:
      return { ...state };
    case USER_PLAN_FETCH_SUCCESS:
      return { ...state, userLoading: false, userPlan: action.payload };
    case USER_PLAN_FETCH_FAIL:
      return { ...state, userLoading: false, error: action.payload };
    case USER_SETTINGS_FETCH:
      return { ...state };
    case USER_SETTING_FETCH_SUCCESS:
      return { ...state };
    case USER_SETTINGS_FETCH_FAIL:
      return { ...state };
    default:
      return state;
  }
};
