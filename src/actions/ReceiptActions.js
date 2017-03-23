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

import { AsyncStorage, Alert, Platform } from 'react-native';
import axios from 'axios';
import Querystring from 'querystring';
import RNFetchBlob from 'react-native-fetch-blob';
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
  RESET_RECEIPTS,
  RECEIPT_DELETE,
  RECEIPT_DELETE_SUCCESS,
  RECEIPT_DELETE_FAIL,
  RECEIPTS_BY_CATEGORY_ADD,
  LOAD_A_RECEIPT,
  SAVE_IMAGE_DATA,
  SET_NEW_RECEIPT_CATEGORY,
  SET_RECEIPT_NOTE,
  RESET_NEW_RECEIPT,
  RECEIPT_EXPORT
  //CATEGORY_SEARCH,
  //CATEGORY_SEARCH_SUCCESS,
  //CATEGORY_SEARCH_FAIL
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
        //dispatch(setReceiptsList(AuthStr, accountId, response.data.documents));
        dispatch(setCategoriesLists(AuthStr, accountId, response.data.documents));

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

const setCategoriesLists = (AuthStr, accountId, list) => {
  index = 0;
  const receiptList = [];
  let category = '';
  if (list.length === 0) {
    return receiptList;
  }
  for (let i = 0; i < list.length; i++) {
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
  let year = formattedDate.substring(11, 15);
  year = ', '.concat(year);
  const dateStr = formattedDate.substring(4, 10).concat(year);
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
  let currency = '';
  if (cost === undefined) {
    currency = '$ --';
  } else {
    currency = '$'.concat(cost.toFixed(2));
    console.log(currency);
  }
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
          console.log('list for', k, list);
          categoryDataObjArray[k] = list;
          console.log(categoryDataObjArray[k]);
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

export const setNewReceiptCategory = (cat) => {
  return {
    type: SET_NEW_RECEIPT_CATEGORY,
    payload: cat
  };
};

export const saveImageData = (response, image, source) => {
  const imageObj = {
    response,
    image,
    source
  };
  return {
    type: SAVE_IMAGE_DATA,
    payload: imageObj
  };
};

export const deleteReceipt = (accId, receiptID) => {
  return function (dispatch) {
    dispatch({
      type: RECEIPT_DELETE,
    });
    try {
      AsyncStorage.getItem('refreshToken').then((value) => {
        if (value !== null) {
          dispatch(newToken(accId, value, receiptID, {}, 1));
        }
      });
    } catch (err) {
      console.log('token', err);
    }
  };
};

export const exportReceipt = (accId, receiptID) => {
  //get token
  return function (dispatch) {
    try {
      AsyncStorage.getItem('refreshToken').then((value) => {
        if (value !== null) {
          dispatch(newToken(accId, value, receiptID, {}, 3));
        }
      });
    } catch (err) {
      console.log(err);
      //Alert('Something went wrong!');
    }
  };
};

const exportDoc = (AuthStr, accountId, receiptID) => {
  return function (dispatch) {
    const exportURL = ssApiQueryURL.accounts.concat(accountId).concat('/exports');
    const jsonForRequest = {
    emails: 'alihaire900@gmail.com',
    exportType: 'csv',
    documents: receiptID
    };

    RNFetchBlob.fetch('POST', exportURL, {
    Authorization: AuthStr,
    'Content-Type': 'application/json',
    }, JSON.stringify(jsonForRequest)).then((resp) => {
      console.log(resp);
      dispatch({
        type: RECEIPT_EXPORT,
        payload: resp
      });
      //Alert('Receipts exported successfully.');
    }).catch((err) => {
      console.log('export error', err);
      Alert.alert(
        'Sorry',
        'An error occurred :(',
        [
          { text: 'OK' }
        ]
      );
    });
  };
};


/*
  AsyncStorage.multiGet(['AuthStr','curAccountId'],function(err,res) {
    if(err){
    alert('Sorry, something went wrong.Please try again.....');
    }else{
    let AuthStr = res[0][1];
    console.log('------------AuthStr : '+AuthStr);
    //let accountId = res[1][1];

    let accountId = "1481900574";
    let documnetIdsList = ["52910d0de4b06f6f8ca3abeb"]; //pass document id as per row selection
    let requestUrl = ssApiQueryURL.accounts + accountId + "/exports";
    let jsonForRequest = {
    "emails":["mavani.nitesh@gmail.com"],
    "exportType":"csv",
    "documents": documnetIdsList
    };

    RNFetchBlob.fetch('POST', requestUrl, {
    Authorization : AuthStr,
    'Content-Type' : 'application/json',
    }, JSON.stringify(jsonForRequest)).then((resp) => {

    alert('Receipts exported successfully.');
    }).catch((err) => {
    console.log('export error',err);
    alert('Sorry something went wrong.Please try again latter.'+err);
    })
    }
    });
*/

/*New token index ->
1. Delete receipt (trash receipt)
2. Add receipt
3. Export receipt
*/
export const newToken = (accountID, token, receiptID, newReceipt, num) => {
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
         console.log('AuthStr', AuthStr, num);
        // addItem(AuthStr, accountID, newReceipt);
        if (num === 1) {
          console.log('trashItem');
          dispatch(trashItem(AuthStr, accountID, receiptID));
        } else if (num === 2) {
          console.log('Add Item', AuthStr);
          dispatch(addItem(AuthStr, accountID, newReceipt));
        } else if (num === 3) {
          console.log('Export receipt', AuthStr);
          dispatch(exportDoc(AuthStr, accountID, receiptID));
        }
       }
     }).catch((err) => {
       /*Alert.alert(
         'Sorry',
         'An error occurred :(',
         [
           { text: 'OK' }
         ]
       ); */
       console.log('no auth token', err);
     });
  };
};

export const loadAReceipt = (dataObj) => {
  console.log('loadAReceipt', dataObj);
  return function (dispatch) {
    dispatch({
      type: LOAD_A_RECEIPT,
      payload: dataObj
    });
  };
};

const trashItem = (AuthStr, accountId, receiptID) => {
  console.log('trashy', accountId, receiptID, AuthStr);
  const requestUrl = ssApiQueryURL.accounts
    .concat(accountId).concat('/documents/')
    .concat(receiptID).concat('/');
  return function (dispatch) {
    axios.get(requestUrl, { headers: { Authorization: AuthStr } })
      .then(response => {
        const responseData = JSON.parse(JSON.stringify(response));
        console.log('------->responseData', responseData);
        if (response.status === 200) {
          const jsonToUpate = responseData.data;
          jsonToUpate.trashed = true;
          console.log('------------>jsonToUpate', jsonToUpate);

          RNFetchBlob.fetch('PUT', requestUrl, {
              Authorization: AuthStr,
              'Content-Type': 'application/json',
               }, JSON.stringify(jsonToUpate)).then((resp) => {
                 console.log('success', resp);

                dispatch(deleteSuccess(AuthStr, accountId));
                dispatch(fetchReceipts(AuthStr, accountId));
               }).catch((err) => {
                 console.log('delete error', err);
                 dispatch(deleteFailed());
                 //Alert('Sorry something went wrong. Please try again.');
               });
        } else {
          //Alert('Sorry something went wrong.Please try again. (status code : '
          //.concat(response.status).concat(')'));
          dispatch(deleteFailed());
        }
      }).catch((error) => {
            console.log('error', error);
            //Alert('Sorry something went wrong. Please try again.');
            dispatch(deleteFailed());
        });
    };
};

export const addReceiptFromImage = (AccountId, imageData, categs, date, note) => {
  const receiptObj = {
    response: imageData.response,
    image: imageData.image,
    source: imageData.source,
    categories: categs,
    date,
    note
  };
  return function (dispatch) {
    dispatch({
      type: ADD_RECEIPT
    });
    try {
      AsyncStorage.getItem('refreshToken').then((value) => {
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
  return function (dispatch) {
  const requestUrl = ssApiQueryURL.accounts.concat(accountId).concat('/documents/');
  console.log('----->requestUrl : ', requestUrl, AuthStr, accountId);
  const id = (Platform.OS === 'ios') ? 'SSA_IOS_APP' : 'SSA_Android_APP';
  const source = {
    type: 'integration',
    id,
    name: 'Squirrel Street Australia App'
  };
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
            uploaded: receiptObj.date,
            categories: receiptObj.categories,
            notes: receiptObj.note,
            type: 'receipt',
            source
       }) },
     ]).then((resp) => {
       const respJSONData = JSON.parse(resp.data);
       const receiptId = respJSONData.id;
       console.log('--------->resp : ', JSON.stringify(resp), receiptId);
       dispatch(resetNewReceipt());
       dispatch(fetchReceipts(AuthStr, accountId));
     }).catch((err) => {
      // Alert('Sorry, something went wrong.');
       console.log('--------->err : ', JSON.stringify(err));
     });
   };
};

export const noteChanged = (note) => {
  return {
    type: SET_RECEIPT_NOTE,
    payload: note
  };
};

const deleteSuccess = () => {
  //Alert('Receipt Deleted');
  return {
    type: RECEIPT_DELETE_SUCCESS
  };
};

const deleteFailed = (er) => {
  console.log('deleteFailed', er);
  return {
    type: RECEIPT_DELETE_FAIL,
    payload: er
  };
};

export const resetNewReceipt = () => {
  return {
    type: RESET_NEW_RECEIPT
  };
};

export const resetReceipts = () => {
  return {
    type: RESET_RECEIPTS
  };
};


/*
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
*/
