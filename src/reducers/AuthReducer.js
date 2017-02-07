/*
* this reducer will be responsible for all authentication logic
*/

import {
  USER_LOGGED_IN,
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_MESSAGE
} from '../actions/types';

const INITIAL_STATE = {
  authenticated: false,
  isLoading: true,
  goToLogin: false,
  error: '',
  message: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_LOGGED_IN:
      return { ...state, authenticated: action.payload };
    case AUTH_USER:
      return { ...state, error: '', authenticated: action.payload };
    case UNAUTH_USER:
      return { ...state, goToLogin: true, isLoading: false, authenticated: false };
    case AUTH_ERROR:
      return { ...state, error: action.payload };
    case FETCH_MESSAGE:
      return { ...state, message: action.payload };
    default:
      return state;
  }
};
