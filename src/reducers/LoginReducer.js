/*
* this reducer will be responsible for all login logic
* TODO: add timeouts to asynch actions
*/

import {
  EMAIL_CHANGED,
  EMAIL_VALID,
  PASSWORD_CHANGED,
  PASSWORD_VALID,
  LOGIN_USER,
  LOGIN_FB_USER,
  LOGIN_GOOGLE_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  NEXT_PAGE,
  RESET_PW,
  RESET
} from '../actions/types';

// note: undefined cannot be returned from a reducer
//properties this reducer looks after:
const INITIAL_STATE = {
  email: '',
  emailValid: 0,
  password: '',
  passwordValid: 0,
  emailError: '',
  passwordError: '',
  loading: false,
  myerror: false,
  errorMsg: '',
  nextPage: false
 };

//WARNING: we need to make sure we actually change the state
//below line changes the state with email and puts it on top of the old one
//...state is the empty string, then it overwrites with email variable
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };

    case EMAIL_VALID:
      return { ...state, emailValid: action.payload, reset: true };

    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };

    case PASSWORD_VALID:
      return { ...state, passwordValid: action.payload, reset: true };

      //also use for signup?
    case LOGIN_USER:
      return { ...state, loading: true };

    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        reset: true
      };

    case NEXT_PAGE:
      return {
        ...state,
        loading: false,
        nextPage: true
      };

    case LOGIN_USER_FAIL:
      console.log('fail reducer');
      return {
        ...state,
        emailValid: 0,
        passwordValid: 0,
        loading: false,
        reset: true
      };

    case LOGIN_FB_USER:
      return {
        ...state,
        loading: true,
        user: action.payload
      };

    case LOGIN_GOOGLE_USER:
      return {
        ...state,
        loading: true,
        user: action.payload
      };

    case RESET_PW:
      return {
        ...state,
        email: state.email,
        password: '',
        myerror: false,
        loading: false
       };

    case RESET:
      return INITIAL_STATE;

    default:
      return state;
  }
};
