//Holds the list of accounts

import {
  LOAD_ACCOUNTS,
  SET_CUR_ACCOUNT,
  SET_CUR_ACCOUNT_NAME,
  LOAD_ACCOUNTS_SUCCESS,
  LOAD_ACCOUNTS_FAIL,
  LABELS_LOAD,
  ACCOUNT_CREATE_NEW,
  ACCOUNT_CHANGE_PLAN,
  ACCOUNT_ADD_USER,
  PLAN_SET,
  PLANTYPE_SET,
  DBEMAIL_SET
} from '../actions/types';

const INITIAL_STATE = {
   curAccount: '',
   curAccName: '',
   isLoading: false,
   accountsArr: [],
   labelsArr: [],
   done: false,
   plan: [],
   planType: '',
   dropBoxEmail: '',
   //////////
   status: '',
   error: '',
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

        case SET_CUR_ACCOUNT_NAME:
          return {
            ...state,
            curAccName: action.payload
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

      case PLAN_SET:
        return { ...state, plan: action.payload };

      case PLANTYPE_SET:
        return { ...state, planType: action.payload };

      case DBEMAIL_SET:
        return { ...state, dropBoxEmail: action.payload };

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
