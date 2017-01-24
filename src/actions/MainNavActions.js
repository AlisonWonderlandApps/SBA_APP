/*
* All actions a user can take pertaining to main screen
*/
import { AsyncStorage } from 'react-native';
//import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import Querystring from 'querystring';
import { ssAuthConfig } from '../config/auth';

import {
//  ACCOUNTS_LOAD,
  //GET_AUTH_TOKEN,
//  SET_CUR_ACCOUNT,
  RECEIPTS_FETCH,
  RECEIPTS_FETCH_SUCCESS,
  RECEIPTS_FETCH_FAIL,
  TRIPS_FETCH,
  TRIPS_FETCH_SUCCESS,
  TRIPS_FETCH_FAIL,
  SET_LATEST_TRIP,
  SET_LATEST_RECEIPT,
  PROCESSED_FETCH,
  PROCESSED_FETCH_SUCCESS,
  PROCESSED_FETCH_FAIL,
  SET_REIMBURSEABLE_NUM,
  SET_PROCESSED_NUM,
  SETTINGS_FETCH,
  SETTINGS_FETCH_SUCCESS,
  SETTINGS_FETCH_FAIL
} from './types';

export const getAccountInfo = () => {
  Promise.resolve(getToken());
  //console.log(this.props.authToken);
};

const displayErrorAlert = (error) => {
  console.log(error);
};

export const getToken = (accountId) => {
  console.log('gettoken', accountId);
  return function (dispatch) {
    dispatch({
      type: TRIPS_FETCH,
    });
  try {
    AsyncStorage.getItem('refreshToken').then((value) => {
      if (value !== null) {
        console.log('rToken', value);
        dispatch(updateToken(accountId, value));
      }
    });
  } catch (err) {
    console.log('no refresh token gotten');
    return err;
  }
  };
};

const updateToken = (accountID, token) => {
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
        console.log(response.data.access_token);
        const AuthStr = 'Bearer '.concat(response.data.access_token);
        console.log(AuthStr);
        console.log(accountID, 'this');
        dispatch(fetchTrips(AuthStr, accountID));
        dispatch(fetchReceipts(AuthStr, accountID));
        dispatch(fetchProcessed(AuthStr, accountID));
      }
    })
    .catch((err) => {
      console.log('no auth token', err);
      return err;
    });
  };
};

const fetchTrips = (AuthStr, accountId) => {
    console.log('fetch trips', AuthStr, accountId);
    return function (dispatch) {
    const tripsURL = 'https://api.sbaustralia.com:443/v2/accounts/'.concat(accountId).concat('/documents');

    axios.get(tripsURL,
      { params: { category: 'Trips', order_by_desc: 'uploaded' },
        headers: { Authorization: AuthStr }
      })
      .then(response => {
        console.log('trips', response.data.documents[0]);
        dispatch(fetchTripsSuccess(response.data.documents));
        console.log(response.data.documents.length);
        if (response.data.documents.length > 0) {
          dispatch(fetchMostRecentTrips(response.data.documents[0]));
        } else {
          dispatch(fetchMostRecentTrips(''));
        }
      })
      .catch((er) => {
        console.log('no trips fetched', er);
        dispatch({
          type: TRIPS_FETCH_FAIL
        });
        return er;
      });
    };
  };

const fetchTripsSuccess = (trips) => {
  return {
    type: TRIPS_FETCH_SUCCESS,
    payload: trips
  };
};

const fetchMostRecentTrips = (aTrip) => {
  return {
    type: SET_LATEST_TRIP,
    payload: aTrip
  };
};

//fetches order_by_desc to set latest receipt easily
export const fetchReceipts = (AuthStr, accountId) => {
  console.log('fetch receipts');
  return function (dispatch) {
    const tripsURL = 'https://api.sbaustralia.com:443/v2/accounts/'.concat(accountId).concat('/documents');

    axios.get(tripsURL,
      { params: { order_by_desc: 'uploaded' },
        headers: { Authorization: AuthStr }
      })
      .then(response => {
        console.log('trips', response.data.documents[0]);
        dispatch(fetchReceiptsSuccess(response.data.documents));
        console.log(response.data.documents.length);
        if (response.data.documents.length > 0) {
          dispatch(fetchMostRecentReceipt(response.data.documents[0]));
        } else {
          dispatch(fetchMostRecentReceipt(''));
        }
      })
      .catch((er) => {
        console.log('no trips fetched', er);
        dispatch({
          type: RECEIPTS_FETCH_FAIL
        });
        return er;
      });
  };
};

const fetchReceiptsSuccess = (processed) => {
  return {
    type: RECEIPTS_FETCH_SUCCESS,
    payload: processed
  };
};

const fetchReceiptsFail = () => {
  return {
    type: RECEIPTS_FETCH_FAIL,
  };
};

const fetchMostRecentReceipt = (aRec) => {
  return {
    type: SET_LATEST_RECEIPT,
    payload: aRec
  };
};

export const fetchProcessed = (AuthStr, accountId) => {
  console.log('fetch processing', AuthStr, accountId);
  return function (dispatch) {
  dispatch({
    type: PROCESSED_FETCH
  });
  const processedURL = 'https://api.sbaustralia.com:443/v2/accounts/'.concat(accountId).concat('/documents');

  axios.get(processedURL,
    { params: { processing_state: 'PROCESSED', order_by_desc: 'uploaded' },
      headers: { Authorization: AuthStr }
    })
    .then(response => {
      console.log('processed', response.data.documents);
      //dispatch(fetchProcessedSuccess(response.data.documents));
      dispatch({
        type: PROCESSED_FETCH_SUCCESS,
        payload: response.data.documents
      });
      console.log(response.data.documents.length);
      //dispatch(reimbursedNumber(response.data.documents.length));
      dispatch({
        type: SET_REIMBURSEABLE_NUM,
        payload: response.data.documents.length
      });
    })
    .catch((er) => {
      console.log('no trips fetched', er);
      dispatch(fetchProcessedFail());
    });
  };
};

const fetchProcessedSuccess = (processed) => {
  return {
    type: PROCESSED_FETCH_SUCCESS,
    payload: processed
  };
};

const fetchProcessedFail = () => {
  return {
    type: PROCESSED_FETCH_FAIL,
  };
};

const reimbursedNumber = (num) => {
  return {
    type: SET_REIMBURSEABLE_NUM,
    payload: num
  };
};

//Fetch otherReceipts

//Fetch Settings

//1. Add a receipt ?

//2. Add an account

//3. Go to receipts

//4. Go to trips

//5. Go to tools
