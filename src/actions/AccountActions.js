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
import { Actions } from 'react-native-router-flux';
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
  DBEMAIL_SET,
  SET_USER_EMAIL,
//  SET_PAYMENT_TYPE,
  SET_CUR_ACCOUNT_INDEX
//  ACCOUNT_CREATE_NEW,
//  ACCOUNT_CHANGE_PLAN,
//  ACCOUNT_ADD_USER,
} from './types';

//load accounts should get all user accounts (not their info)
export const loadAccounts = (AuthStr) => {
  return function (dispatch) {
  //console.log('load', AuthStr);

  //AsyncStorage.setItem('AuthStr', AuthStr);

  axios.get(ssApiQueryURL.user, { headers: { Authorization: AuthStr } })
      .then(response => {
        const accArr = response.data.accounts;
        const length = response.data.accounts.length;
        const sortedAccArr = sortAccounts(accArr);
        dispatch(loadUserInfo(response.data));
        dispatch(loadLabels(sortedAccArr));
        dispatch(loadAccountsSuccess(sortedAccArr));
        if (length < 1) {
          //console.log('theres no accounts!!!!!');
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
          //console.log('error etf ', error);
          dispatch(loadAccountsFail(error));
        });
   };
};

//calls function to get receipts too.
export const setCurAccount = (accObj, id, index) => {
  //console.log('curAccount', accObj);
  return function (dispatch) {
    dispatch({
      type: SET_CUR_ACCOUNT,
      payload: id
    });
    dispatch(getReceipts(id));
    dispatch(setCurAccountName(accObj.label));
    dispatch(setCurAccountIndex(index));
    dispatch(setPlan(accObj.plan));
    dispatch(setPlanType(accObj.plan.planType));
    dispatch(setDBEmail(accObj.dropboxEmail));
    dispatch({
      type: GO_TO_MAIN
    });
  };
};

const sortAccounts = (accArray) => {
  accArray.sort((a, b) => {
    const accA = a.label.toLowerCase();
    const accB = b.label.toLowerCase();
    if (accA < accB) {
      return -1;
    }
    if (accA > accB) {
      return 1;
    }
      return 0;
  });
  return accArray;
};

export const loadLabels = (accArr) => {
  //console.log('load labels');
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

export const loadAccountsSuccess = (accs) => {
  //console.log('loadaccsucc');
      return {
        type: LOAD_ACCOUNTS_SUCCESS,
        payload: accs
      };
};

export const loadAccountsFail = (err) => {
//calls function to get receipts too.
//export const setCurAccountID = (accObj, id) => {
  //AsyncStorage.setItem('curAccountId', id);

//  console.log('curAccount', id);
  return function (dispatch) {
    //console.log('fail');
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

export const getReceipts = (accId) => {
  return function (dispatch) {
  try {
    AsyncStorage.getItem('refreshToken').then((value) => {
      if (value !== null) {
        dispatch(updateToken(accId, value));
      }
    });
  } catch (err) {
    Alert.alert(
      'Sorry',
      'Could not find account :(',
      [
        { text: 'OK' }
      ]
    );
    Actions.accounts();
    //console.log('no refresh token gotten');
  }
};
};

export const updateToken = (accountID, token) => {
  //console.log('updaterefreshtoken', accountID);
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
      Alert.alert(
        'Sorry',
        'An error occurred :(',
        [
          { text: 'OK' }
        ]
      );
      Actions.accounts();
      //console.log('no auth token', err);
    });
  };
};

export const setCurAccountName = (name) => {
  //console.log('curAccountName', name);
  return {
    type: SET_CUR_ACCOUNT_NAME,
    payload: name
  };
};

export const setCurAccountIndex = (index) => {
  return {
    type: SET_CUR_ACCOUNT_INDEX,
    payload: index
  };
};

export const setPlan = (plan) => {
  //console.log('curPlan', plan);
  return {
    type: PLAN_SET,
    payload: plan
  };
};

export const setPlanType = (ptype) => {
  //console.log('curPlanName', ptype);
  return {
    type: PLANTYPE_SET,
    payload: ptype
  };
};

export const setDBEmail = (email) => {
  //console.log('curPlanName', email);
  return {
    type: DBEMAIL_SET,
    payload: email
  };
};

export const setUserEmail = (email) => {
  //console.log('email', email);
  return {
    type: SET_USER_EMAIL,
    payload: email
  };
};
