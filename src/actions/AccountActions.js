/*
* All actions a user can take pertaining to accounts
*/
import { Alert } from 'react-native';
//import axios from 'axios';
//import Querystring from 'querystring';
//import { ssAuthConfig, ssApiQueryURL } from '../config/auth';
import axios from 'axios';
//import Querystring from 'querystring';
import { ssApiQueryURL } from '../config/auth';

import {
  ACCOUNTS_LOAD,
  SET_CUR_ACCOUNT,
  SET_CUR_ACCOUNT_NAME,
  LOAD_ACCOUNTS_SUCCESS,
  LOAD_ACCOUNTS_FAIL,
  RESET_PW,
  LABELS_LOAD,
  PLAN_SET,
  PLANTYPE_SET,
  DBEMAIL_SET
//  ACCOUNT_CREATE_NEW,
//  ACCOUNT_CHANGE_PLAN,
//  ACCOUNT_ADD_USER,
} from './types';

export const setCurAccount = (accObj, id) => {
  console.log('curAccount', accObj);
  return function (dispatch) {
    dispatch(setCurAccountName(accObj.label));
    dispatch(setPlan(accObj.plan));
    dispatch(setPlanType(accObj.plan.planType));
    dispatch(setDBEmail(accObj.dropboxEmail));
    dispatch({
      type: SET_CUR_ACCOUNT,
      payload: id
    });
  };
};

export const setCurAccountName = (name) => {
  console.log('curAccountName', name);
  return {
    type: SET_CUR_ACCOUNT_NAME,
    payload: name
  };
};

export const setPlan = (plan) => {
  console.log('curPlan', plan);
  return {
    type: PLAN_SET,
    payload: plan
  };
};

export const setPlanType = (ptype) => {
  console.log('curPlanName', ptype);
  return {
    type: PLANTYPE_SET,
    payload: ptype
  };
};

export const setDBEmail = (email) => {
  console.log('curPlanName', email);
  return {
    type: DBEMAIL_SET,
    payload: email
  };
};

export const loadAccounts = (AuthStr) => {
  return function (dispatch) {
   dispatch({
     type: ACCOUNTS_LOAD
   });

  console.log('load');
  axios.get(ssApiQueryURL.userAccounts, { headers: { Authorization: AuthStr } })
      .then(response => {
        console.log(response.data);
        //console.log('length', response.data.accounts.length);
        loadLabels(response.data.accounts);
        //loadPlan(response.data.plan);
        dispatch(loadAccountsSuccess(response.data.accounts));
      }).catch((error) => {
          console.log('error etf ', error);
          loadAccountsFail(error);
        });
   };
};

const loadAccountsSuccess = (accs) => {
  console.log('loadaccsucc');
  //  return function (dispatch) {
      //loadLabels(accs);
      return {
        type: LOAD_ACCOUNTS_SUCCESS,
        payload: accs
      };
  //  };
};

export const loadAccountsFail = (err) => {
  return function (dispatch) {
    console.log('fail');
    dispatch({
      type: RESET_PW
    });
    dispatch({
      type: LOAD_ACCOUNTS_FAIL,
      payload: err
    });
    Alert.alert(
      'OOPS!!',
      'Could not load accounts',
      [
        { text: 'OK' }
      ]
    );
  };
};

const loadLabels = (accArr) => {
  console.log('load labels');
  let i;
  const labels = [];
  for (i = 0; i < accArr.length; i++) {
    labels[i] = accArr[i].label;
  }
  return {
    type: LABELS_LOAD,
    payload: labels
  };
};


//1. ?

//2. Change account type

//3. Add a an account user?

//4. Delete an account?

//5. Search accounts

//6. Edit/Update account information
