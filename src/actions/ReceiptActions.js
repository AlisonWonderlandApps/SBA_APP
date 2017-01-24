/*
* All actions a user can take pertaining to receipts
* By default receipts are listed by processing or reimbursable??
*/

import { AsyncStorage, Alert } from 'react-native';
import axios from 'axios';
import Querystring from 'querystring';
import { Actions } from 'react-native-router-flux';
import { ssAuthConfig, ssApiQueryURL } from '../config/auth';

import {
  RECEIPTS_FETCH,
  RECEIPTS_FETCH_SUCCESS,
  RECEIPTS_FETCH_FAIL,
  RECEIPT_ADD,
  RECEIPT_UPDATE
} from './types';

let USER_TOKEN = '';
let ACCOUNTS = '';

//0. Fetch all receipts
export const receiptsFetch = () => {
  return (dispatch) => {
    //type: EMAIL_CHANGED,
    console.log('nfsdo');
  };
};

//1. Add a receipts

//2. Search receipts by...

//3. Add a receipt category

//4. Edit a receipt

//5. Delete a receipt

//6. Process a receipt?
