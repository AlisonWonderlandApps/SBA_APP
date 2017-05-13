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
} from '../actions/types';

const INITIAL_STATE = {
  docDetail: {},
  vendor: '',
  date: '',
  currency: '',
  total: '',
  preferred: '',
  tax: '',
  prefTax: '',
  paytype: '',
  categories: [],
  notes: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EDIT_DOC_DETAIL:
      return { ...state, docDetail: action.payload };
    case VENDOR_CHANGED:
      return { ...state, vendor: action.payload };
    case DATE_CHANGED:
      return { ...state, date: action.payload };
    case CURRENCY_CHANGED:
      return { ...state, currency: action.payload };
    case TOTAL_CHANGED:
      return { ...state, total: action.payload };
    case PREFERRED_CHANGED:
      return { ...state, preferred: action.payload };
    case TAX_CHANGED:
      return { ...state, tax: action.payload };
    case PREFTAX_CHANGED:
      return { ...state, prefTax: action.payload };
    case PAYTYPE_CHANGED:
      return { ...state, paytype: action.payload };
    case CATEGORIES_CHANGED:
      return { ...state, categories: action.payload };
    case NOTES_CHANGED:
      return { ...state, notes: action.payload };
    default:
      return state;
  }
};
