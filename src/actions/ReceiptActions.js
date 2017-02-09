/*
* All actions a user can take pertaining to receipts
* By default receipts are listed by processing or reimbursable??
*/

import axios from 'axios';
import { ssApiQueryURL } from '../config/auth';

import {
  //RECEIPTS_FETCH,
//  RECEIPTS_FETCH_SUCCESS,
//  RECEIPTS_FETCH_FAIL,
//  RECEIPT_ADD,
//RECEIPT_UPDATE,
  PHOTO_ADD,
  SET_RECEIPT_CATEGORY,
  SET_RECEIPT_NOTE,
  SAVE_RECEIPT_LOCAL,
  ADD_RECEIPT_SUCCESS,
  USE_PICTURE
} from './types';

//0. Fetch all receipts
export const getPhoto = (photo) => {
  console.log('get photo', photo);
  return {
    type: PHOTO_ADD,
    payload: photo
  };
};

//1. Add a receipts
export const setReceiptCategory = (cat) => {
  return {
    type: SET_RECEIPT_CATEGORY,
    payload: cat
  };
};

export const noteChanged = (note) => {
  return {
    type: SET_RECEIPT_NOTE,
    payload: note
  };
};

export const usePicture = (bool) => {
  return {
    type: USE_PICTURE,
    payload: bool
  };
};

export const saveReceipt = (theProps) => {
  const receipt = {
    account: theProps.curAccount,
    email: theProps.dropBoxEmail,
    note: theProps.note,
    category: theProps.category,
    attachment: theProps.photoObj
  };
  console.log('receipt', receipt);
  return {
    type: SAVE_RECEIPT_LOCAL,
    payload: receipt
  };
};

export const addReceipt = (AuthStr) => {
  console.log('addreceipt');
  return function (dispatch) {
  axios.post(ssApiQueryURL.userAccounts, { headers: { Authorization: AuthStr } })
      .then(response => {
        console.log(response.data);
        dispatch(addReceiptSuccess(response.data));
      }).catch((error) => {
          console.log('error etf ', error);
          //loadAccountsFail(error);
        });
  };
};

const addReceiptSuccess = (receipt) => {
  return {
    type: ADD_RECEIPT_SUCCESS,
    payload: receipt
  };
};

//2. Search receipts by...

//3. Add a receipt category

//4. Edit a receipt

//5. Delete a receipt

//6. Process a receipt?
