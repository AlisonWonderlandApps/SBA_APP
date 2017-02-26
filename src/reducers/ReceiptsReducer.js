import {
  RECEIPTS_FETCH,
  RECEIPTS_FETCH_SUCCESS,
  RECEIPTS_FETCH_FAIL,
  SET_NUM_RECEIPTS,
  PROCESSING_FETCH_SUCCESS,
  PROCESSING_FETCH_FAIL,
  REIMBURSABLES_FETCH_SUCCESS,
  REIMBURSABLES_FETCH_FAIL,
  SET_REIMBURSABLE_NUM,
  SET_PROCESSING_NUM,
  CATEGORIES_FETCH_SUCCESS,
  CATEGORIES_FETCH_FAIL,
  ADD_RECEIPT,
  SET_LATEST_RECEIPT,
  SET_VENDOR,
  SET_DATE,
  SET_CATEGORY,
  SET_COST,
  SET_LIST
} from '../actions/types';

const INITIAL_STATE = {
  errorMsg: '',
  isFetching: false,
  myReceipts: [],
  receiptList: [],
  rVendor: '', //string
  rDate: '', //string version
  rCategory: '', //if multiple in a string
  rCost: '',
  numOfReceipts: 0,
  processingReceipts: [],
  processingCount: 0,
  reimbursableReceipts: [],
  reimbursableCount: 0,
  latestReceipt: {},
  categories: [],
  nextPage: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case RECEIPTS_FETCH:
      return {
          ...state,
          isFetching: true
      };

    case RECEIPTS_FETCH_SUCCESS:
      return {
          ...state,
          isFetching: false,
          myReceipts: action.payload
      };

    case SET_VENDOR:
      return { ...state, rVendor: action.payload };

    case SET_DATE:
      return { ...state, rDate: action.payload };

    case SET_CATEGORY:
      return { ...state, rCategory: action.payload };

    case SET_COST:
      return { ...state, rCost: action.payload };

    case RECEIPTS_FETCH_FAIL:
      return {
        ...state,
        isFetching: false,
        errMsg: 'Couldnt load receipts'
      };

    case SET_NUM_RECEIPTS:
      return {
        ...state,
        numOfReceipts: action.payload
      };

    case SET_LATEST_RECEIPT:
      return {
        ...state,
        latestReceipt: action.payload
      }

    case PROCESSING_FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        processingReceipts: action.payload
      };

    case PROCESSING_FETCH_FAIL:
      return {
        ...state,
        isFetching: false,
        errMsg: 'Couldnt load processing receipts'
      };

    case SET_PROCESSING_NUM:
      return {
        ...state,
        isFetching: false,
        nextPage: true,
        processingCount: action.payload
      };

    case REIMBURSABLES_FETCH_SUCCESS:
      return {
        ...state,
        reimbursableReceipts: action.payload
      };

    case REIMBURSABLES_FETCH_FAIL:
      return {
        ...state,
        errMsg: 'Could not fetch reimbursable receipts'.concat(action.payload)
      };

    case SET_REIMBURSABLE_NUM:
      return {
        ...state,
        isFetching: false,
        nextPage: true,
        reimbursableCount: action.payload
      };

    case CATEGORIES_FETCH_SUCCESS:
      return {
        ...state,
        categories: action.payload
      };

    case CATEGORIES_FETCH_FAIL:
      return {
        ...state,
        errMsg: 'Could not load categories'.concat(action.payload)
      };

    case ADD_RECEIPT:
    //console.log('add', this.myReceipts, this.myReceipts.push(action.payload));
      return {
        ...state,
        myReceipts: [...state.myReceipts, action.payload]
      };

    default:
      return state;
  }
};
