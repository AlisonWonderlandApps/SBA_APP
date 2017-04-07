/*
* this reducer will be responsible for all authentication logic
*/

import {
  USER_LOGGED_IN,
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
} from '../actions/types';

const INITIAL_STATE = {
  isLoading: true,
  goToLogin: false,
  authErrorMsg: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_LOGGED_IN:
      return { ...state, isLoading: true };
    case AUTH_USER:
      return { ...state, authErrorMsg: '', isLoading: false };
    case UNAUTH_USER:
      return { ...state, authErrorMsg: '', goToLogin: true, isLoading: false };
    case AUTH_ERROR:
      return { ...state, authErrorMsg: action.payload };
    default:
      return state;
  }
};
