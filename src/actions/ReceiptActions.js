/*
* All actions a user can take pertaining to receipts
*/

import { AsyncStorage, Alert, Platform } from 'react-native';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import Querystring from 'querystring';
import RNFetchBlob from 'react-native-fetch-blob';
import RNFS from 'react-native-fs';

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
  RECEIPT_EXPORT,
  SEARCH_TEXT_CHANGED,
  SEARCH_RECEIPTS,
  SEARCH_PROCESSING,
  SEARCH_CATEGORY,
  SET_FETCHING,
  REPROCESS_SUCCESS,
  REPROCESS_FAIL,
  LOAD_RECEIPT_IMAGE,
  LOAD_IMAGE_SUCCESS,
  LOAD_IMAGE_FAIL,
  DELETE_RECEIPT_IMAGE,
  FETCH_PDF_FAIL,
  FETCH_PDF_SUCCESS,
  UPDATE_EXPORT_OBJ,
  RECEIPT_UPDATE_SUCCESS,
  RECEIPT_UPDATE_FAIL,
  //CATEGORY_SEARCH,
  //CATEGORY_SEARCH_SUCCESS,
  //CATEGORY_SEARCH_FAIL
  //SET_TRIP_DISTANCE
} from './types';

const cats = [];
let index = 0;

export const updateExportObj = (email, cc, subject, body) => {
  const obj = {
    email,
    ccBcc: cc,
    subject,
    body
  };
  return {
    type: UPDATE_EXPORT_OBJ,
    payload: obj
  };
};

export const setFetching = () => {
  return {
    type: SET_FETCHING
  };
};

export const addNewReceipt = (doc) => {
  return {
    type: ADD_RECEIPT,
    payload: doc
  };
};

//fetches order_by_desc to set latest receipt easily
export const fetchReceipts = (AuthStr, accountId) => {
  return function (dispatch) {
    dispatch({
      type: RECEIPTS_FETCH
    });

    const receiptsURL = (ssApiQueryURL.accounts).concat(accountId).concat('/documents');

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
        const length = response.data.totalCountFiltered;

        dispatch({
          type: SET_NUM_RECEIPTS,
          payload: length
        });

        dispatch(fetchTrips(AuthStr, accountId)); //fetch trips
        dispatch(fetchProcessing(AuthStr, accountId)); //fetch processing
        dispatch(fetchReimbursables(AuthStr, accountId)); //fetch reimburseablesß
        dispatch(setCategoriesLists(AuthStr, accountId, response.data.documents));

        if (length > 0) {
          let i = 0;

          if (response.data.documents[i].categories === undefined) {
            //console.log('no categories for receipt', response.data.documents[i]);
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
          dispatch(setCost(response.data.documents[i]));
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
  return {
    type: RECEIPTS_FETCH_FAIL,
    payload: err
  };
};

export const fetchProcessing = (AuthStr, accountId) => {
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
      //console.log('processing1: ', response);
      axios.get(processingURL,
        { params: { processing_state: 'NEEDS_SYSTEM_PROCESSING', order_by_desc: 'uploaded' },
          headers: { Authorization: AuthStr }
        }).then(response2 => {
          const processingArray = (response.data.documents).concat(response2.data.documents);
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
    .catch(() => {
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
  const reimburseURL = (ssApiQueryURL.accounts).concat(AccountId).concat('/documents');
  axios.get(reimburseURL,
    { params: { q: 'Reimbursable', order_by_desc: 'uploaded', processing_state: 'PROCESSED' },
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
      //console.log('reimburse', er);
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
  //console.log('uniqueCats', uniqueCats);
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
  const day = formattedDate.substring(8, 11);
  const month = formattedDate.substring(4, 7);
  let year = formattedDate.substring(11, 15);
  year = ', '.concat(year);
  const dateStr = day.concat(month).concat(year);
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

const setCost = (data) => {
    let currency = data.currency;
		let returnString = '';

		//case 1: currency & total are defined
		if (currency !== undefined && data.total !== undefined) {
			//case 1.1 currency is AUD
			if (currency === 'AUD') {
				returnString = ('$').concat(data.total.toFixed(2));
			}
			//case 1.2 currency NOT au$
			currency = 'AUD$';
			returnString = currency.concat(data.totalInPreferredCurrency.toFixed(2));
		} else if (currency === undefined) {
			//currency = 'AUD$';
			if ((data.total === undefined) || (data.total === '')) {
				returnString = ('$-.--');
			}
			returnString = ('$').concat(data.total);
		} else {
      returnString = ('$-.--');
    }
  return {
    type: SET_COST,
    payload: returnString
  };
};

const categoryDataObjArray = [];
const sortReceiptsByCategory = (AuthStr, accountId, categoryArray, k) => {
  const receiptsURL = (ssApiQueryURL.accounts).concat(accountId).concat('/documents');
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
          const list = response.data.documents;
          categoryDataObjArray[k] = list;
        }).catch(() => {
          //????
        });
};

const addCategoryReceipt = (dataObj) => {
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
    Actions.receipts();
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
      //??
      console.log(err);
    }
  };
};

export const updateReceipt = (accId, receiptID, newData) => {
  console.log('update receipt', newData);
  return function (dispatch) {
    try {
      AsyncStorage.getItem('refreshToken').then((value) => {
        if (value !== null) {
          dispatch(newToken(accId, value, receiptID, newData, 6));
        }
      });
    } catch (err) {
      //??
      console.log(err);
    }
  };
};

export const exportReceipt = (accId, receiptID, email) => {
  return function (dispatch) {
    try {
      AsyncStorage.getItem('refreshToken').then((value) => {
        if (value !== null) {
          dispatch(newToken(accId, value, receiptID, email, 3));
        }
      });
    } catch (err) {
      //???
      console.log(err);
    }
  };
};

const exportDoc = (AuthStr, accountId, receiptID, email) => {
  return function (dispatch) {
    const exportURL = ssApiQueryURL.accounts.concat(accountId).concat('/exports');
    const jsonForRequest = {
      emails: [{ email }],
      exportType: 'pdf',
      documents: [receiptID]
    };

    RNFetchBlob.fetch('POST', exportURL, {
    Authorization: AuthStr,
    'Content-Type': 'application/json',
    }, JSON.stringify(jsonForRequest)).then((resp) => {
      dispatch({
        type: RECEIPT_EXPORT,
        payload: resp
      });
    }).catch(() => {
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

/*New token index ->
1. Delete receipt (trash receipt)
2. Add receipt
3. Export receipt
4. Reprocess document
5. Fetch Document pdf image
6. Update Document
*/
export const newToken = (accountID, token, receiptID, newReceipt, num) => {
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
        if (num === 1) {
          dispatch(trashItem(AuthStr, accountID, receiptID));
        } else if (num === 2) {
          dispatch(addItem(AuthStr, accountID, newReceipt));
        } else if (num === 3) {
          //newReceipt is email in this case
          dispatch(exportDoc(AuthStr, accountID, receiptID, newReceipt));
        } else if (num === 4) {
          dispatch(reprocessDoc(AuthStr, accountID, receiptID));
        } else if (num === 5) {
          dispatch(loadImage(AuthStr, accountID, receiptID));
        } else if (num === 6) {
          dispatch(updateThisDocument(AuthStr, accountID, receiptID, newReceipt));
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
  return function (dispatch) {
    dispatch({
      type: LOAD_A_RECEIPT,
      payload: dataObj
    });
  };
};

const trashItem = (AuthStr, accountId, receiptID) => {
  const requestUrl = ssApiQueryURL.accounts
    .concat(accountId).concat('/documents/')
    .concat(receiptID).concat('/');
  return function (dispatch) {
    axios.get(requestUrl, { headers: { Authorization: AuthStr } })
      .then(response => {
        const responseData = JSON.parse(JSON.stringify(response));

        if (response.status === 200) {
          const jsonToUpate = responseData.data;
          jsonToUpate.trashed = true;

          RNFetchBlob.fetch('PUT', requestUrl, {
              Authorization: AuthStr,
              'Content-Type': 'application/json',
               }, JSON.stringify(jsonToUpate)).then((resp) => {
                dispatch(deleteSuccess(AuthStr, accountId));
                dispatch(fetchReceipts(AuthStr, accountId));
                //TODO: THIS NEEDS TO CHANGE!!!!
               }).catch((err) => {
                 dispatch(deleteFailed(err));
               });
        } else {
          dispatch(deleteFailed('No response status'));
        }
      }).catch((error) => {
            dispatch(deleteFailed(error));
        });
    };
};

export const updateThisDocument = (AuthStr, accountId, receiptID, newData) => {
  console.log('updateThisDocument', newData);
  const modDate = new Date().toISOString();
  const newDate = newData.date.toString();
  const dateStr = newDate.concat('T00:00:00Z');
  const paytype = {
    type: newData.paytype,
    lastFourDigits: ''
  };
  console.log(newData.total, paytype);
  const requestUrl = ssApiQueryURL.accounts
    .concat(accountId).concat('/documents/')
    .concat(receiptID).concat('/');
  return function (dispatch) {
    axios.get(requestUrl, { headers: { Authorization: AuthStr } })
      .then(response => {
        const responseData = JSON.parse(JSON.stringify(response));

        if (response.status === 200) {
          const jsonToUpdate = responseData.data;
          console.log(jsonToUpdate);
          jsonToUpdate.modified = modDate;
          jsonToUpdate.vendor = newData.vendor;
          jsonToUpdate.issued = dateStr;
          jsonToUpdate.currency = newData.currency;
          jsonToUpdate.total = newData.total;
          jsonToUpdate.tax = newData.tax;
          jsonToUpdate.paymentType = paytype;
          //jsonToUpdate.categories = newData.categories;
          jsonToUpdate.notes = newData.notes;

          RNFetchBlob.fetch('PUT', requestUrl, {
              Authorization: AuthStr,
              'Content-Type': 'application/json',
            }, JSON.stringify(jsonToUpdate)).then((resp) => {
                dispatch(updateSuccess(AuthStr, accountId));
                dispatch(fetchReceipts(AuthStr, accountId));
                //TODO: THIS NEEDS TO CHANGE!!!!
               }).catch((err) => {
                 dispatch(updateFailed(err));
               });
        } else {
          dispatch(updateFailed('No response status'));
        }
      }).catch((error) => {
            dispatch(updateFailed(error));
        });
    };
};

const updateSuccess = () => {
  Alert.alert('Receipt Edits Saved');
  return function (dispatch) {
    dispatch({
      type: RECEIPT_UPDATE_SUCCESS
    });
  };
};

const updateFailed = (er) => {
  Alert.alert(
    'Error',
    'Receipt could not be updated',
    [
      { text: 'Try again', onPress: () => console.log('reprocess') }
    ]
  );
  return {
    type: RECEIPT_UPDATE_FAIL,
    payload: er
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
    try {
      AsyncStorage.getItem('refreshToken').then((value) => {
        if (value !== null) {
          dispatch(newToken(AccountId, value, '', receiptObj, 2));
        }
      });
    } catch (err) {
      Alert('Error in addReceiptFromImage', err);
    }
  };
};

const addItem = (AuthStr, accountId, receiptObj) => {
  return function (dispatch) {
  const requestUrl = ssApiQueryURL.accounts.concat(accountId).concat('/documents/');
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
       Alert.alert(
         'Successfully added receipt!',
          null,
         [
           { text: 'OK',
             onPress: () => dispatch(reloadReceipts(AuthStr, accountId)) }
         ]
       );
     }).catch((err) => {
       Alert('Sorry, Could not add new receipt.', err);
     });
   };
};

export const deleteReceiptImage = () => {
  return function (dispatch) {
    dispatch(
      {
        type: DELETE_RECEIPT_IMAGE
      }
    );
  };
};

const reloadReceipts = (AuthStr, accountId) => {
  return function (dispatch) {
    dispatch(resetNewReceipt());
    dispatch(fetchReceipts(AuthStr, accountId));
    Actions.main();
  };
};

export const noteChanged = (note) => {
  return {
    type: SET_RECEIPT_NOTE,
    payload: note
  };
};

const deleteSuccess = () => {
  return {
    type: RECEIPT_DELETE_SUCCESS
  };
};

const deleteFailed = (er) => {
  Alert.alert(
    'Error',
    'Receipt could not be deleted',
    [
      { text: 'Try again', onPress: () => console.log('reprocess') }
    ]
  );
  return {
    type: RECEIPT_DELETE_FAIL,
    payload: er
  };
};

export const loadReceiptImage = (curAcctID, docID) => {
  return function (dispatch) {
    dispatch({
      type: LOAD_RECEIPT_IMAGE
    });
    try {
      AsyncStorage.getItem('refreshToken').then((value) => {
        if (value !== null) {
          dispatch(newToken(curAcctID, value, docID, {}, 5));
        }
      });
    } catch (err) {
      console.log('token', err);
    }
  };
};

const loadImage = (AuthStr, accID, docID) => {
  const requestURL = ssApiQueryURL.accounts.concat(accID).concat('/documents/').concat(docID);
  return function (dispatch) {
  axios.get(requestURL, { headers: { Authorization: AuthStr } })
    .then(response => {
      console.log(response);
      dispatch(downloadPDF(AuthStr, response.data.attachment.url));
      const url = response.data.attachment.url;//.concat('.pdf');

      dispatch({
        type: LOAD_IMAGE_SUCCESS,
        payload: url
      });
    }).catch((err) => {
      console.log('loadImage', err);
      dispatch({
        type: LOAD_IMAGE_FAIL
      });
    });
  };
};

const downloadPDF = (AuthStr, imageURL) => {
  //const DocumentDir = RNFetchBlob.fs.dirs.DocumentDir;
  return function (dispatch) {
    const pdfPath = RNFS.DocumentDirectoryPath.concat('/test.pdf');
    const options = {
      fromUrl: imageURL,
      toFile: pdfPath
    };
    RNFS.downloadFile(options).promise.then(res => {
      console.log('pdf', res);
      dispatch({
        type: FETCH_PDF_SUCCESS,
        payload: res
      });
    }).catch(err => {
      console.log(err);
      dispatch({
        type: FETCH_PDF_FAIL
      });
    });
 };
};

export const reprocessDocument = (curAcctID, documentID) => {
  return function (dispatch) {
  console.log(curAcctID, documentID);
    try {
      AsyncStorage.getItem('refreshToken').then((value) => {
        if (value !== null) {
          dispatch(newToken(curAcctID, value, documentID, {}, 4));
        }
      });
    } catch (err) {
      //console.log('token', err);
    }
  };
};

const reprocessDoc = (AuthStr, accountID, docID) => {
  const updateURL = ssApiQueryURL.accounts.concat(accountID).concat('/documents/').concat(docID);
  return function (dispatch) {
  axios.get(updateURL, { headers: { Authorization: AuthStr } })
    .then(response => {
      const responseData = JSON.parse(JSON.stringify(response));
      if (response.status === 200) {
        const jsonToUpate = responseData.data;
        jsonToUpate.processingState = 'NEEDS_SYSTEM_PROCESSING';

        RNFetchBlob.fetch('PUT', updateURL, {
            Authorization: AuthStr,
            'Content-Type': 'application/json',
             }, JSON.stringify(jsonToUpate)).then(() => {
               dispatch(reprocessSuccess());
             }).catch((err) => {
               dispatch(reprocessFail(err));
             });
      } else {
          dispatch(reprocessFail('No response'));
      }
    }).catch((error) => {
        dispatch(reprocessFail(error));
      });
  };
};

const reprocessSuccess = () => {
  return function (dispatch) {
    dispatch({
      type: REPROCESS_SUCCESS,
    });
    Alert.alert(
      'Done',
      'Receipt has been sent for reprocessing',
      [
        { text: 'OK', onPress: () => Actions.receipts() }
      ]
    );
  };
};

const reprocessFail = (error) => {
  return {
    type: REPROCESS_FAIL,
    payload: error
  };
};

export const saveReceiptEdits = (docDetail) => {
  console.log(docDetail);
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

export const searchTextChanged = (text) => {
  return {
    type: SEARCH_TEXT_CHANGED,
    payload: text
  };
};

export const searchReceipts = (text) => {
  return {
    type: SEARCH_RECEIPTS,
    payload: text
  };
};

export const searchProcessing = (text) => {
  return {
    type: SEARCH_PROCESSING,
    payload: text
  };
};

export const searchCategory = (text) => {
  return {
    type: SEARCH_CATEGORY,
    payload: text
  };
};
