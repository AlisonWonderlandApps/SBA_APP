
import {
  AsyncStorage,
  Alert
} from 'react-native';
import {
  EDIT_DOC_DETAIL,
  VENDOR_CHANGED,
  DATE_CHANGED,
  CURRENCY_CHANGED,
  TOTAL_CHANGED,
  PREFERRED_CHANGED,
  TAX_CHANGED,
  PREFTAX_CHANGED,
  PAYTYPE_CHANGED,
  CATEGORIES_CHANGED,
  NOTES_CHANGED
} from './types';

export const getEditReceiptDetail = (doc) => {
  let date = '';

  //date info
  if (doc.issued === undefined) {
    date = doc.uploaded;
  } else {
    date = doc.issued;
  }
  //total info
  const currency = doc.currency;
  let total = doc.total;
  let tax = doc.tax;
  let preferred = doc.totalInPreferredCurrency;
  let prefTax = doc.taxInPreferredCurrency;

  return function (dispatch) {
    if (currency !== 'AUD') {
      //case 1: total undefined
      console.log(total, preferred);
      if (total === undefined || total === '') {
        total = '0.00';
      } else {
        total = doc.total.toFixed(2);
      }
      if (tax === undefined || tax === '') {
        tax = '0.00';
      } else {
        tax = doc.tax.toFixed(2);
      }
      if (preferred === undefined || preferred === '') {
        preferred = '0.00';
      } else {
        preferred = preferred.toFixed(2);
      }
      if (prefTax === undefined || prefTax === '') {
        prefTax = '0.00';
      } else {
        prefTax = prefTax.toFixed(2);
      }
      dispatch(preferredChanged(preferred));
      dispatch(prefTaxChanged(prefTax));
    } else {
        if (total === undefined || total === '') {
          total = '0.00';
        } else {
          total = doc.total.toFixed(2);
        }
        if (tax === undefined || tax === '') {
          tax = '0.00';
        } else {
          tax = doc.tax.toFixed(2);
        }
    }

    dispatch({
      type: EDIT_DOC_DETAIL,
      payload: doc
    });
    dispatch(vendorChanged(doc.vendor));
    dispatch(dateChanged(date));
    dispatch(currencyChanged(doc.currency));
    dispatch(totalChanged(total));
    dispatch(taxChanged(tax));
    dispatch(paytypeChanged(doc.paymentType.type));
    dispatch(categoriesChanged(doc.categories));
    dispatch(notesChanged(doc.notes));
  };
};

export const vendorChanged = (vendor) => {
  return function (dispatch) {
    dispatch({
      type: VENDOR_CHANGED,
      payload: vendor
    });
  };
};
export const dateChanged = (date) => {
  console.log(date);

  return function (dispatch) {
    dispatch({
      type: DATE_CHANGED,
      payload: date
    });
  };
};
export const currencyChanged = (curr) => {
  return function (dispatch) {
    dispatch({
      type: CURRENCY_CHANGED,
      payload: curr
    });
  };
};
export const totalChanged = (tot) => {
  return function (dispatch) {
    dispatch({
      type: TOTAL_CHANGED,
      payload: tot
    });
  };
};
export const preferredChanged = (tot) => {
  return function (dispatch) {
    dispatch({
      type: PREFERRED_CHANGED,
      payload: tot
    });
  };
};
export const taxChanged = (tax) => {
  return function (dispatch) {
    dispatch({
      type: TAX_CHANGED,
      payload: tax
    });
  };
};
export const prefTaxChanged = (tax) => {
  return function (dispatch) {
    dispatch({
      type: PREFTAX_CHANGED,
      payload: tax
    });
  };
};
export const paytypeChanged = (pay) => {
  console.log(pay);
  return function (dispatch) {
    dispatch({
      type: PAYTYPE_CHANGED,
      payload: pay
    });
  };
};
export const categoriesChanged = (cat) => {
  return function (dispatch) {
    dispatch({
      type: CATEGORIES_CHANGED,
      payload: cat
    });
  };
};
export const notesChanged = (note) => {
  return function (dispatch) {
    dispatch({
      type: NOTES_CHANGED,
      payload: note
    });
  };
};
