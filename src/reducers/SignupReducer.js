/*
* this reducer will be responsible for all login logic
*/

import {
  EMAIL_CHANGED_SU,
  EMAIL_VALID_SU,
  PASSWORD_CHANGED_SU,
  CONFIRM_PASSWORD_CHANGED,
  PASSWORD_VALID_SU,
  PASSWORD_MATCH,
  SIGNUP_USER,
  SIGNUP_FB_USER,
  SIGNUP_GOOGLE_USER,
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_FAIL,
  RESET_SU
} from '../actions/types';

// note: undefined cannot be returned from a reducer
//properties this reducer looks after:
const INITIAL_STATE = {
  email: '',
  emailValid: 0, //0=normal, 1=green(valid), 2=red(invalid)
  password: '',
  passwordValid: 0,
  confirmPassword: '',
  passwordMatch: 0,
  emailError: '',
  passwordError: '',
  loading: false,
  user: '' //???? is this a token??
 };

//WARNING: we need to make sure we actually change the state
//below line changes the state with email and puts it on top of the old one
//...state is the empty string, then it overwrites with email variable
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RESET_SU:
      return INITIAL_STATE;

    case EMAIL_CHANGED_SU:
      return { ...state, email: action.payload };

    case EMAIL_VALID_SU:
      return { ...state, emailValid: action.payload, reset: true };

    case PASSWORD_CHANGED_SU:
      return { ...state, password: action.payload };

    case PASSWORD_VALID_SU:
      return { ...state, passwordValid: action.payload, reset: true };

    case CONFIRM_PASSWORD_CHANGED:
      return { ...state, confirmPassword: action.payload, reset: true };

    case PASSWORD_MATCH:
      return { ...state, passwordMatch: action.payload, reset: true };

      //also use for signup?
    case SIGNUP_USER:
      return { ...state, loading: true, error: '' };

    case SIGNUP_USER_SUCCESS:
      return { ...state, user: action.payload, error: '', loading: false };

    case SIGNUP_USER_FAIL:
      return {
        ...state,
        password: '',
        loading: false
      }; //resets the password field

    case SIGNUP_FB_USER:
      return {
        ...state,
        loading: true,
        user: action.payload,
        error: ''
      };

    case SIGNUP_GOOGLE_USER:
      return {
        ...state,
        loading: true,
        user: action.payload,
        error: ''
      };

    default:
      return INITIAL_STATE;
  }
};
