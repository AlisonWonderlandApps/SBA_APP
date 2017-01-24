//Holds the list of accounts

import {
  LOAD_ACCOUNTS,
  SET_CUR_ACCOUNT,
  LOAD_ACCOUNTS_SUCCESS,
  LOAD_ACCOUNTS_FAIL,
  LABELS_LOAD,
  ACCOUNT_CREATE_NEW,
  ACCOUNT_CHANGE_PLAN,
  ACCOUNT_ADD_USER,
} from '../actions/types';

const INITIAL_STATE = {
   curAccount: '',
   isLoading: false,
   accountsArr: [],
   labelsArr: [],
   done: false,
   //////////
   status: '',
   error: '',
   plan: '',
   accountName: '',
   newUser: ''
 };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    //loads in accountsArr from a prop - sync action
    case LOAD_ACCOUNTS:
      return {
        ...state,
        isLoading: true,
      };

      case SET_CUR_ACCOUNT:
        return {
          ...state,
          curAccount: action.payload
        };

      case LOAD_ACCOUNTS_SUCCESS:
        return {
          ...state,
          isLoading: false,
          done: true,
          accountsArr: action.payload,
          reset: true
        };

      case LABELS_LOAD:
        return {
          ...state,
          labelsArr: action.payload,
          reset: true
        };

      case LOAD_ACCOUNTS_FAIL:
        return {
          ...state,
          isLoading: false
        };

    case ACCOUNT_ADD_USER:
      return { ...state };

    case ACCOUNT_CREATE_NEW:
       return { ...state };

    case ACCOUNT_CHANGE_PLAN:
        return { ...state };

    default:
      return state;
  }
};
