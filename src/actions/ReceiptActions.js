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
  PHOTO_ADD
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
export const addReceipt = (AuthStr) => {
  console.log('addreceipt');
  return function (dispatch) {
  axios.post(ssApiQueryURL.userAccounts, { headers: { Authorization: AuthStr } })
      .then(response => {
        console.log(response.data);
        //console.log('length', response.data.accounts.length);
        //loadLabels(response.data.accounts);
        //loadPlan(response.data.plan);
        dispatch(loadAccountsSuccess(response.data.accounts));
      }).catch((error) => {
          console.log('error etf ', error);
          loadAccountsFail(error);
        });
  };
};

//2. Search receipts by...

//3. Add a receipt category

//4. Edit a receipt

//5. Delete a receipt

//6. Process a receipt?
