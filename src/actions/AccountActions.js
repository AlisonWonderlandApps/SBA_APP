/*
* All actions a user can take pertaining to accounts

//1. ?

//2. Change account type

//3. Add a an account user?

//4. Delete an account?

//5. Search accounts

//6. Edit/Update account information
*/

import { Alert, AsyncStorage } from 'react-native';
import axios from 'axios';
import Querystring from 'querystring';
import { ssApiQueryURL, ssAuthConfig } from '../config/auth';
import {
  loadUserInfo,
  fetchReceipts
} from '../actions';

import {
  GO_TO_MAIN,
  GO_TO_ACCOUNTS,
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

//load accounts should get all user accounts (not their info)
export const loadAccounts = (AuthStr) => {
  return function (dispatch) {
  console.log('load', AuthStr);

  AsyncStorage.setItem('AuthStr',AuthStr);

  axios.get(ssApiQueryURL.user, { headers: { Authorization: AuthStr } })
      .then(response => {
        console.log('load2', response.data);
        const accArr = response.data.accounts;
        const length = response.data.accounts.length;
        console.log(accArr, length);
        dispatch(loadUserInfo(response.data));
        dispatch(loadLabels(accArr));
        dispatch(loadAccountsSuccess(accArr));
        if (length < 1) {
          console.log('theres no accounts!!!!!');
        }
        if (length === 1) {
          dispatch({
            type: GO_TO_MAIN
          });
          dispatch(setCurAccount(accArr[0], accArr[0].id));
        } else {
          dispatch({
            type: GO_TO_ACCOUNTS
          });
        }
      }).catch((error) => {
          console.log('error etf ', error);
          dispatch(loadAccountsFail(error));
        });
   };
};

export const loadAccountsSuccess = (accs) => {
  console.log('loadaccsucc');
      return {
        type: LOAD_ACCOUNTS_SUCCESS,
        payload: accs
      };
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

export const loadLabels = (accArr) => {
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

//calls function to get receipts too.
export const setCurAccount = (accObj, id) => {
  AsyncStorage.setItem('curAccountId',id);

  console.log('curAccount', accObj);
  return function (dispatch) {
    dispatch({
      type: SET_CUR_ACCOUNT,
      payload: id
    });
    dispatch(getReceipts(id));
    dispatch(setCurAccountName(accObj.label));
    dispatch(setPlan(accObj.plan));
    dispatch(setPlanType(accObj.plan.planType));
    dispatch(setDBEmail(accObj.dropboxEmail));
    dispatch({
      type: GO_TO_MAIN
    });
  };
};

export const getReceipts = (accId) => {
  return function (dispatch) {
  try {
    AsyncStorage.getItem('refreshToken').then((value) => {
      if (value !== null) {
        dispatch(updateToken(accId, value));
      }
    });
  } catch (err) {
    console.log('no refresh token gotten');
  }
};
};

export const updateToken = (accountID, token) => {
  console.log('updaterefreshtoken', accountID);
  return function (dispatch) {
  const data = {
    grant_type: ssAuthConfig.refreshTokenGrantType,
    client_id: ssAuthConfig.clientId,
    client_secret: ssAuthConfig.clientSecret,
    refresh_token: token
  };
  axios.post(ssAuthConfig.tokenURL, Querystring.stringify(data))
    .then(response => {
      if (response !== null) {
        const AuthStr = 'Bearer '.concat(response.data.access_token);
        dispatch(fetchReceipts(AuthStr, accountID));
      }
    })
    .catch((err) => {
      console.log('no auth token', err);
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
