/*
* this reducer will be responsible for all authentication logic
*/

import {

} from '../actions/types';

const INITIAL_STATE = {
  loading: true
  authenticated: false,
  accountsLoaded: false,
  receiptsLoaded:false,


  error: '',
  message: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_LOGGED_IN:
      return { ...state, authenticated: true };
    case AUTH_USER:
      return { ...state, error: '', authenticated: true };
    case UNAUTH_USER:
      return { ...state, authenticated: false };
    case AUTH_ERROR:
      return { ...state, error: action.payload };
    case FETCH_MESSAGE:
      return { ...state, message: action.payload };
    default:
      return state;
  }
};
