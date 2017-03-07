/*
* All actions a user can take pertaining to receipts

//1. Fetch Receipts
    - fetch (sets loading screen)
    - success (ends loading, fills receipts array)
    - fail (ends loading, displays error msg)

//2. Add a receipt
    - add

//3. Delete a receipt
    - displays a check
    - deletes on OK

//4. Export a receipt
    - send receipt to??

//5. Display a receipt

*/

//import { AsyncStorage } from 'react-native';
import axios from 'axios';
import { ssApiQueryURL } from '../config/auth';

import {
  fetchTrips
} from '../actions/TripActions';

import {
  RECEIPTS_FETCH,
  RECEIPTS_FETCH_SUCCESS,
  RECEIPTS_FETCH_FAIL,
  SET_NUM_RECEIPTS,
  SET_LATEST_RECEIPT,
  PROCESSING_FETCH,
  PROCESSING_FETCH_SUCCESS,
  PROCESSING_FETCH_FAIL,
  SET_PROCESSING_NUM,
  REIMBURSABLES_FETCH_SUCCESS,
  REIMBURSABLES_FETCH_FAIL,
  SET_REIMBURSABLE_NUM,
  CATEGORIES_FETCH_SUCCESS,
  CATEGORIES_FETCH_FAIL,
  ADD_RECEIPT,
  SET_VENDOR,
  SET_DATE,
  SET_CATEGORY,
  SET_COST,
  SET_LIST
  //SET_TRIP_DISTANCE
} from './types';


export const addNewReceipt = (doc) => {
  return {
    type: ADD_RECEIPT,
    payload: doc
  };
};

//fetches order_by_desc to set latest receipt easily
export const fetchReceipts = (AuthStr, accountId) => {
  console.log('fetch receipts');
  return function (dispatch) {
    dispatch({
      type: RECEIPTS_FETCH
    });

    const receiptsURL = (ssApiQueryURL.accounts).concat(accountId).concat('/documents');
    console.log('fetchURL', receiptsURL, AuthStr);

    axios.get(receiptsURL,
      { params: { type: 'receipt', order_by_desc: 'uploaded', trashed: 'false' },
        headers: { Authorization: AuthStr }
      })
      .then(response => {
        dispatch(fetchReceiptsSuccess(response.data.documents));
        console.log(response.data.documents);
        const length = response.data.totalCountFiltered;
        console.log('length\n', length);
        dispatch({
          type: SET_NUM_RECEIPTS,
          payload: length
        });
        dispatch(fetchTrips(AuthStr, accountId)); //fetch trips
        dispatch(fetchProcessing(AuthStr, accountId)); //fetch processing
        dispatch(setReceiptsList(response.data.documents));
        //dispatch(fetchCategories(AuthStr, accountId)); //fetch categories (where receipts>0)
        //dispatch(fetchReimbursables(AuthStr, accountId)); //fetch reimburseablesß
        if (length > 0) {
          //How to check if first receipt is a trip :(:())
          let i = 0;
          console.log(response.data.documents[0].categories);
          while (response.data.documents[i].categories[0] === 'Trips') {
            console.log(response.data.documents[i].categories);
            i++;
          }
          if (i < length) {
          dispatch(fetchMostRecentReceipt(response.data.documents[i]));
          dispatch(setVendor(response.data.documents[i].vendor));
          dispatch(setDate(response.data.documents[i].uploaded));
          dispatch(setCategory(response.data.documents[i].categories));
          dispatch(setCost(response.data.documents[i].totalInPreferredCurrency));
          }
        } else {
          dispatch(fetchMostRecentReceipt(''));
        }
      })
      .catch((er) => {
        dispatch(fetchReceiptsFail(er));
        return er;
      });
  };
};

const fetchReceiptsSuccess = (receipts) => {
  return {
    type: RECEIPTS_FETCH_SUCCESS,
    payload: receipts
  };
};

const setReceiptsList = (list) => {
    //console.log('listlength', list.length);
    const receiptlist = [];
    let vendor = '';
    let total = '';
    let date = '';
    let category = '';
    for (let i = 0; i < list.length; i++) {
      vendor = list[i].vendor;
      if (list[i].total === undefined) {
        total = '$0.00';
      }	else {
        total = '$'.concat(list[i].total.toFixed(2));
      }
      const formattedDate = new Date(list[i].issued).toString();
      console.log('formatted', formattedDate);
      //	if (year !== Date) {
      //		console.log('invalidDate', year);
      //			date = 'unknown';
      //		} else {
      console.log('year', year);
      let year = formattedDate.substring(11, 15);
      year = ' '.concat(year);
      date = formattedDate.substring(4, 10).concat(year);
  //		}
      if (list[i].categories === undefined || list[i].categories.length < 1) {
        category = 'No categories';
      } else {
        console.log(list[i].categories[0]);
        let j = 0;
        category += list[i].categories[j];
        for (j = 1; j < list[i].categories.length; j++) {
          category += ', '.concat(list[i].categories[j]);
        }
        console.log('cat', category);
      }

      receiptlist[i] = {
        vendor,
        total,
        date,
        category
      };
      vendor = '';
      total = '';
      date = '';
      category = '';
      //console.log('receipt', i, receiptlist[i]);
    }
  return {
    type: SET_LIST,
    payload: receiptlist
  };
};

const setVendor = (data) => {
  return {
    type: SET_VENDOR,
    payload: data
  };
};

const setDate = (date) => {
  const formattedDate = new Date(date).toString();
  const dateStr = formattedDate.substring(4, 10);
  return {
    type: SET_DATE,
    payload: dateStr
  };
};

const setCategory = (data) => {
  let stringItem = '';
  if (data.length < 1) {
    stringItem = 'No categories';
  } else {
    for (let i = 0; i < data.length; i++) {
      stringItem += data[i];
    }
  }
  return {
    type: SET_CATEGORY,
    payload: stringItem
  };
};

const setCost = (cost) => {
  const currency = '$'.concat(cost.toFixed(2));
  console.log(currency);
  return {
    type: SET_COST,
    payload: currency
  };
};

const fetchReceiptsFail = (err) => {
  return {
    type: RECEIPTS_FETCH_FAIL,
    payload: err
  };
};

const fetchMostRecentReceipt = (aRec) => {
  return {
    type: SET_LATEST_RECEIPT,
    payload: aRec
  };
};

export const fetchProcessing = (AuthStr, accountId) => {
  console.log('fetch processing', AuthStr, accountId);
  return function (dispatch) {
  dispatch({
    type: PROCESSING_FETCH
  });
  const processingURL = 'https://api.sbaustralia.com:443/v2/accounts/'.concat(accountId).concat('/documents');
  axios.get(processingURL,
    { params: { processing_state: 'NEEDS_USER_PROCESSING', order_by_desc: 'uploaded' },
      headers: { Authorization: AuthStr }
    })
    .then(response => {
      axios.get(processingURL,
        { params: { processing_state: 'NEEDS_SYSTEM_PROCESSING', order_by_desc: 'uploaded' },
          headers: { Authorization: AuthStr }
        }).then(response2 => {
          const processingArray = response.data.documents + response2.data.documents;
          dispatch({
            type: PROCESSING_FETCH_SUCCESS,
            payload: processingArray
          });
          dispatch({
            type: SET_PROCESSING_NUM,
            payload: processingArray.length
          });
        });
    })
    .catch((er) => {
      console.log('no trips fetched', er);
      dispatch(fetchProcessingFail());
    });
  };
};

const fetchProcessingFail = () => {
  return {
    type: PROCESSING_FETCH_FAIL,
  };
};

export const fetchReimbursables = (AuthStr, AccountId) => {
  return function (dispatch) {
  const reimburseURL = (ssApiQueryURL.rootURL).concat(AccountId).concat('/documents');

  axios.get(reimburseURL,
    { params: { category: 'Reimbursables', order_by_desc: 'uploaded' },
      headers: { Authorization: AuthStr }
    })
    .then(response => {
      dispatch({
        type: REIMBURSABLES_FETCH_SUCCESS,
        payload: response.data.documents
      });
      dispatch({
        type: SET_REIMBURSABLE_NUM,
        payload: response.data.documents.length
      });
      }).catch((er) => {
      dispatch(fetchReimburseFail(er));
    });
  };
};

const fetchReimburseFail = (err) => {
  return {
    type: REIMBURSABLES_FETCH_FAIL,
    payload: err
  };
};

export const fetchCategories = (receipts) => {
  return function (dispatch) {
    const cat = [];
    for (let i = 0; i < receipts.length; i++) {
      if (receipts.categories.length === 1) {
        cat[i] = receipts.categories[0];
      } else if (receipts.categories.length > 1) {
        cat[i] = receipts.categories[0];
        let j = 1;
        while (j <= receipts.categories.length) {
          i++;
          cat[i] = receipts.categories[j];
          j++;
        }
      }
    }
    console.log('cat', cat);
    const uniqCat = (cat) => [...new Set(cat)];
    console.log('uniqcat', uniqCat);
    dispatch(loadCategories(uniqCat));
  };
};
/*  const reimburseURL = (ssApiQueryURL.rootURL).concat(AccountId).concat('/categories');

  axios.get(reimburseURL,
    { headers: { Authorization: AuthStr } })
    .then(response => {
      dispatch(loadCategories(response.data.categories));
      }).catch((er) => {
       dispatch(fetchCategoriesFail(er));
    }); */

const loadCategories = (catArr) => {
  console.log('load labels');
  let i;
  const labels = [];
  for (i = 0; i < catArr.length; i++) {
    if (catArr[i].receipts > 0) {
      labels.push(catArr[i]);
   }
  }
  return {
    type: CATEGORIES_FETCH_SUCCESS,
    payload: labels
  };
};

const fetchCategoriesFail = (err) => {
  return {
    type: CATEGORIES_FETCH_FAIL,
    payload: err
  };
};
