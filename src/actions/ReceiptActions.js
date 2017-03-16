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

import { AsyncStorage, Alert } from 'react-native';
import axios from 'axios';
import Querystring from 'querystring';
import { Actions } from 'react-native-router-flux';
import RNFetchBlob from 'react-native-fetch-blob';
import ImagePicker from 'react-native-image-picker';
import { ssApiQueryURL, ssAuthConfig } from '../config/auth';

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
  ADD_RECEIPT,
  SET_VENDOR,
  SET_DATE,
  SET_CATEGORY,
  SET_COST,
  SET_LIST,
  RESET_RECEIPTS,
  RECEIPT_DELETE,
  RECEIPT_DELETE_SUCCESS,
  RECEIPT_DELETE_FAIL,
  RECEIPTS_BY_CATEGORY_ADD,
  CATEGORY_SEARCH,
  CATEGORY_SEARCH_SUCCESS,
  CATEGORY_SEARCH_FAIL
  //SET_TRIP_DISTANCE
} from './types';

const cats = [];
let index = 0;

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
      { params: {
        type: 'receipt',
        order_by_desc: 'uploaded',
        trashed: 'false',
        processing_state: 'PROCESSED'
       },
        headers: { Authorization: AuthStr }
      })
      .then(response => {
        console.log('RECEIPTSSSSS', response.data.documents);
        const length = response.data.totalCountFiltered;

        dispatch({
          type: SET_NUM_RECEIPTS,
          payload: length
        });

        dispatch(fetchTrips(AuthStr, accountId)); //fetch trips
        dispatch(fetchProcessing(AuthStr, accountId)); //fetch processing
        dispatch(fetchReimbursables(AuthStr, accountId)); //fetch reimburseablesß
        dispatch(setReceiptsList(AuthStr, accountId, response.data.documents));

        if (length > 0) {
          let i = 0;
          console.log(response.data.documents);

          if (response.data.documents[i].categories === undefined) {
            console.log('no categories for receipt', response.data.documents[i]);
          } else {
            for (let j = 0; j < response.data.documents[i].categories.length; j++) {
              if (response.data.documents[i].categories[j] === 'Trips') {
                i++;
                break;
              }
            }
          }
          if (i <= length) {
          dispatch(fetchMostRecentReceipt(response.data.documents[i]));
          dispatch(setVendor(response.data.documents[i].vendor));
          dispatch(setDate(response.data.documents[i].uploaded));
          dispatch(setCategory(response.data.documents[i].categories));
          dispatch(setCost(response.data.documents[i].totalInPreferredCurrency));
          }
        } else {
          dispatch(fetchMostRecentReceipt(''));
        }
        dispatch(fetchReceiptsSuccess(response.data.documents));
      })
      .catch((er) => {
        dispatch(fetchReceiptsFail(er));
      });
  };
};

const fetchReceiptsSuccess = (receipts) => {
  return {
    type: RECEIPTS_FETCH_SUCCESS,
    payload: receipts
  };
};

const fetchReceiptsFail = (err) => {
  console.log('RECEIPTS ERROR', err);
  return {
    type: RECEIPTS_FETCH_FAIL,
    payload: err
  };
};

export const fetchProcessing = (AuthStr, accountId) => {
  console.log('fetch processing', AuthStr, accountId);
  return function (dispatch) {
  dispatch({
    type: PROCESSING_FETCH
  });
  const processingURL = (ssApiQueryURL.accounts).concat(accountId).concat('/documents');
  axios.get(processingURL,
    { params: { processing_state: 'NEEDS_USER_PROCESSING', order_by_desc: 'uploaded' },
      headers: { Authorization: AuthStr }
    })
    .then(response => {
      console.log('processing1: ', response);
      axios.get(processingURL,
        { params: { processing_state: 'NEEDS_SYSTEM_PROCESSING', order_by_desc: 'uploaded' },
          headers: { Authorization: AuthStr }
        }).then(response2 => {
          console.log('processing2: ', response2);
          const processingArray = (response.data.documents).concat(response2.data.documents);
          console.log('processingArray: ', processingArray);
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
  console.log('fetch Reimbursables');
  return function (dispatch) {
  const reimburseURL = (ssApiQueryURL.accounts).concat(AccountId).concat('/documents');

  axios.get(reimburseURL,
    { params: { q: 'Reimbursable', order_by_desc: 'uploaded' },
      headers: { Authorization: AuthStr }
    })
    .then(response => {
      dispatch({
        type: REIMBURSABLES_FETCH_SUCCESS,
        payload: response.data.documents
      });
      dispatch({
        type: SET_REIMBURSABLE_NUM,
        payload: response.data.totalCountFiltered
      });
      }).catch((er) => {
      console.log('reimburse', er);
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

const fetchMostRecentReceipt = (aRec) => {
  return {
    type: SET_LATEST_RECEIPT,
    payload: aRec
  };
};

const addToCategoryList = (item) => {
  cats[index] = item;
  index++;
};

const setReceiptsList = (AuthStr, accountId, list) => {
    index = 0;
    const receiptlist = [];
    let id = '';
    let vendor = '';
    let total = '';
    let date = '';
    let category = '';
    if (list.length === 0) {
      return receiptlist;
    }
    for (let i = 0; i < list.length; i++) {
      id = list[i].id;
      vendor = list[i].vendor;
      if (list[i].total === undefined) {
        total = '$ ??';
      }	else {
        total = '$'.concat(list[i].total.toFixed(2));
      }
      if (list[i].issued === undefined) {
        const formattedDate = new Date(list[i].uploaded).toString();
        let year = formattedDate.substring(11, 15);
        year = ' '.concat(year);
        date = formattedDate.substring(4, 10).concat(year);
      } else {
        const formattedDate = new Date(list[i].issued).toString();
        let year = formattedDate.substring(11, 15);
        year = ' '.concat(year);
        date = formattedDate.substring(4, 10).concat(year);
      }
      if (list[i].categories === undefined) {
        category = 'No categories';
      } else if (list[i].categories.length < 1) {
        category = 'No categories';
      } else {
        let j = 0;
        category += list[i].categories[j];

        addToCategoryList(list[i].categories[j]);
        for (j = 1; j < list[i].categories.length; j++) {
          category += ', '.concat(list[i].categories[j]);
          addToCategoryList(list[i].categories[j]);
        }
      }

      receiptlist[i] = {
        id,
        vendor,
        total,
        date,
        category
      };
      id = '';
      vendor = '';
      total = '';
      date = '';
      category = '';
    }
    const uniqueCats = cats.filter((item, i, ar) => {
      return ar.indexOf(item) === i;
    });
    uniqueCats.sort();
    console.log('uniqueCats', uniqueCats);
    return function (dispatch) {
      for (let k = 0; k < uniqueCats.length; k++) {
        sortReceiptsByCategory(AuthStr, accountId, uniqueCats, k);
      }
      dispatch(addCategoryReceipt(categoryDataObjArray));
      dispatch({
        type: CATEGORIES_FETCH_SUCCESS,
        payload: uniqueCats
      });
      dispatch({
        type: SET_LIST,
        payload: receiptlist
      });
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
  if (data === undefined) {
    stringItem = 'No categories';
  } else if (data.length < 1) {
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

const categoryDataObjArray = [];
const sortReceiptsByCategory = (AuthStr, accountId, categoryArray, k) => {
  const receiptsURL = (ssApiQueryURL.accounts).concat(accountId).concat('/documents');
      console.log('catarray', categoryArray, categoryArray.length);
      axios.get(receiptsURL,
        { params: {
          type: 'receipt',
          order_by_desc: 'uploaded',
          trashed: 'false',
          processing_state: 'PROCESSED',
          category: categoryArray[k]
         },
          headers: { Authorization: AuthStr }
        }).then(response => {
          console.log('Category receipts', response.data.documents);
          const list = response.data.documents;
          const receiptlist = [];
          for (let l = 0; l < response.data.totalCountFiltered; l++) {
                index = 0;
                let id = '';
                let vendor = '';
                let total = '';
                let date = '';
                for (let i = 0; i < list.length; i++) {
                  id = list[i].id;
                  vendor = list[i].vendor;
                  if (list[i].total === undefined) {
                    total = '$ ??';
                  }	else {
                    total = '$'.concat(list[i].total.toFixed(2));
                  }
                  if (list[i].issued === undefined) {
                    const formattedDate = new Date(list[i].uploaded).toString();
                    let year = formattedDate.substring(11, 15);
                    year = ' '.concat(year);
                    date = formattedDate.substring(4, 10).concat(year);
                  } else {
                    const formattedDate = new Date(list[i].issued).toString();
                    let year = formattedDate.substring(11, 15);
                    year = ' '.concat(year);
                    date = formattedDate.substring(4, 10).concat(year);
                  }

                  receiptlist[i] = {
                    id,
                    vendor,
                    total,
                    date,
                    category: categoryArray[k]
                  };
                  id = '';
                  vendor = '';
                  total = '';
                  date = '';
                }
          }
          const dataObj = {
            length: response.data.totalCountFiltered,
            category: categoryArray[k],
            receipts: receiptlist
          };
          console.log(dataObj);
          categoryDataObjArray[k] = dataObj;
          console.log(categoryDataObjArray);
        }).catch((er) => {
          console.log('category fail', er);
        });
};

const addCategoryReceipt = (dataObj) => {
  console.log('addCategoryReceipt');
  return {
    type: RECEIPTS_BY_CATEGORY_ADD,
    payload: dataObj
  };
};

export const deleteReceipt = (accId, receiptID) => {
  return function (dispatch) {
    dispatch({
      type: RECEIPT_DELETE
    });
    try {
      AsyncStorage.getItem('refreshToken').then((value) => {
        if (value !== null) {
          dispatch(newToken(accId, value, receiptID, 1));
        }
      });
    } catch (err) {
      console.log('token', err);
    }
  };
};

/*New token index ->
1. Delete receipt (trash receipt)
2. Add receipt
3. Other?
*/
export const newToken = (accountID, AuthStr, receiptID = '', newReceipt = {}, num) => {
  console.log('updaterefreshtoken', accountID);
  return function (dispatch) {
  // const data = {
  //   grant_type: ssAuthConfig.refreshTokenGrantType,
  //   client_id: ssAuthConfig.clientId,
  //   client_secret: ssAuthConfig.clientSecret,
  //   refresh_token: token
  // };
  // axios.post(ssAuthConfig.tokenURL, Querystring.stringify(data))
  //   .then(response => {
  //     if (response !== null) {
  //       const AuthStr = 'Bearer '.concat(response.data.access_token);
  //       switch (num) {
  //         case 1:
  //           dispatch(trashItem(AuthStr, accountID, receiptID));
  //           break;
  //         case 2:
  //           dispatch(addItem(AuthStr, accountID, newReceipt));
  //           break;
  //         default:
  //           break;
  //       }
  //     }
  //   })
  //   .catch((err) => {
  //     Alert.alert(
  //       'Sorry',
  //       'An error occurred :(',
  //       [
  //         { text: 'OK' }
  //       ]
  //     );
  //     console.log('no auth token', err);
  //   });

  switch (num) {
    case 1:
      dispatch(trashItem(AuthStr, accountID, receiptID));
      break;
    case 2:
      dispatch(addItem(AuthStr, accountID, newReceipt));
      break;
    default:
      break;
  }
    switch (num) {
      case 1:
          return {
            type: RECEIPT_DELETE_FAIL
          };
      case 2:
        //dispatch(addItem());
        break;
      default:
        break;
    }
  };
};

const trashItem = (AuthStr, accId, receiptId, receiptIndex) => {
  //axios post here
  console.log('trashy', accId, receiptId, AuthStr);

  const deleteURL = (ssApiQueryURL.accounts).concat(accId).concat('/documents/').concat(receiptId);
    console.log('deleteURL', deleteURL, AuthStr);

    const data = {
        trashed: 'true'
    };

    return function (dispatch) {
    axios.put(deleteURL, Querystring.stringify(data),
      { //params: { trashed: 'true' },
        headers: { Authorization: AuthStr }
      })
      .then(response => {
        console.log('DELETE', response.data.documents);
        //dispatch(deleteFromLists(receiptIndex));
        return {
          type: RECEIPT_DELETE_SUCCESS,
          payload: receiptIndex
        };
      })
      .catch((er) => {
        console.log('err', er);
        dispatch(deleteFailed(er));
      });
    };
};

export const addReceiptFromImage = (AccountId, response, image, source) => {
  const receiptObj = {
    response,
    image,
    source
  };
  return function (dispatch) {
    //show loading status?
    dispatch({
      type: ADD_RECEIPT
    });
    //1. get Auth token
    try {
      AsyncStorage.getItem('AuthStr').then((value) => {
        if (value !== null) {
          dispatch(newToken(AccountId, value, '', receiptObj, 2));
        }
      });
    } catch (err) {
      console.log('token', err);
    }
  };
};

const addItem = (AuthStr, accountId, receiptObj) => {
  const requestUrl = ssApiQueryURL.accounts.concat(accountId).concat('/documents/');
  console.log('----->requestUrl : ', requestUrl);

  RNFetchBlob.fetch('POST', requestUrl, {
       Authorization: AuthStr,
       'Content-Type': 'multipart/form-data',
     }, [
        {
          name: 'attachment',
          filename: receiptObj.response.fileName,
          type: receiptObj.response.type,
          data: RNFetchBlob.wrap(receiptObj.image)
        },
       { name: 'account', data: accountId },
       { name: 'document',
            data: JSON.stringify({
            processingState: 'NEEDS_SYSTEM_PROCESSING',
       }) },
     ]).then((resp) => {
       const respJSONData = JSON.parse(resp.data);
       const receiptId = respJSONData.id;
       console.log('--------->resp : ', JSON.stringify(resp));
       alert('Receipt uploaded successfully.(Receipt Id : ' + receiptId + ')');

     }).catch((err) => {
       Alert('Sorry , something went wrong while receipt upload.');
       console.log('--------->err : ', JSON.stringify(err));
     });
};
  //2.
  /*      AsyncStorage.getItem('newAccessToken', (err, res) => {
            if (err) {
              Alert('Sorry, something went wrong.Please try again.');
            } else {
              const accessToken = res;
              const AuthStr = accessToken;
              const requestUrl = ssApiQueryURL.accountsSquirrel + this.props.curAccountId + '/documents/';

              console.log('----->requestUrl : '+requestUrl);

              RNFetchBlob.fetch('POST', requestUrl, {
                   Authorization: AuthStr,
                   'Content-Type': 'multipart/form-data',
                 }, [
                    {
                      name: 'attachment',
                      filename: response.fileName,
                      type: response.type,
                      //data: RNFetchBlob.wrap(image)
                    },
                   { name: 'account', data: this.props.curAccountId },
                   { name: 'document',
                        data: JSON.stringify({
                        processingState: 'NEEDS_SYSTEM_PROCESSING',
                   }) },
                 ]).then((resp) => {
                   const respJSONData = JSON.parse(resp.data);
                   const receiptId = respJSONData.id;

                   Alert('Receipt uploaded successfully.(Receipt Id : ' + receiptId + ')');
                   console.log('--------->resp : ', JSON.stringify(resp));
                 }).catch((err) => {
                   Alert('Sorry , something went wrong while receipt upload.');
                   console.log('--------->err : ', JSON.stringify(err));
                 });
              }
            });
        }
}; */

const deleteFailed = (er) => {
  return {
    type: RECEIPT_DELETE_FAIL,
    payload: er
  };
};

export const resetReceipts = () => {
  return {
    type: RESET_RECEIPTS
  };
};
