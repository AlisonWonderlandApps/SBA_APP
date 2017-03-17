//Holds the list of accounts

import {
  ACCOUNTS_LOAD,
  LOAD_ACCOUNTS_SUCCESS,
  LOAD_ACCOUNTS_FAIL,
  SET_CUR_ACCOUNT,
  SET_CUR_ACCOUNT_NAME,
  LABELS_LOAD,
  GO_TO_MAIN,
  GO_TO_ACCOUNTS,
  PLAN_SET,
  PLANTYPE_SET,
  DBEMAIL_SET
} from '../actions/types';

const INITIAL_STATE = {
   isLoading: false,
   goToMain: false,
   goToAccounts: false,
   errorMsg: '',
   accountsArray: [],
   labelsArray: [],
   numOfAccounts: 0,
   curAccountID: '',
   curAccountName: '',
   curAccountInfo: {},
   plan: [],
   planType: '',
   dropBoxEmail: ''
 };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACCOUNTS_LOAD:
      return {
        ...state,
        isLoading: true,
      };

    case LOAD_ACCOUNTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        done: true,
        accountsArray: action.payload,
        reset: true
      };

    case LOAD_ACCOUNTS_FAIL:
      return {
        ...state,
        isLoading: false,
        errorMsg: 'Could not load accounts'
      };

    case LABELS_LOAD:
      return {
        ...state,
        labelsArray: action.payload,
      };

    case SET_CUR_ACCOUNT:
      return {
        ...state,
        isLoading: true,
        curAccountID: action.payload
      };

    case SET_CUR_ACCOUNT_NAME:
      return {
        ...state,
        curAccountName: action.payload
      };

    case GO_TO_MAIN:
      return { ...state, isLoading: false, goToMain: true };

    case GO_TO_ACCOUNTS:
      return { ...state, goToAccounts: true };

    case PLAN_SET:
      return { ...state, plan: action.payload };

    case PLANTYPE_SET:
      return { ...state, planType: action.payload };

    case DBEMAIL_SET:
      return { ...state, dropBoxEmail: action.payload };

    default:
      return state;
  }
};
