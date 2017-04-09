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
  RECEIPT_DELETE,
  RECEIPT_DELETE_SUCCESS,
  RECEIPT_DELETE_FAIL,
  SET_LATEST_RECEIPT,
  SET_VENDOR,
  SET_DATE,
  SET_CATEGORY,
  SET_COST,
  SET_LIST,
  RESET_RECEIPTS,
  RECEIPTS_BY_CATEGORY_ADD,
  LOAD_A_RECEIPT,
  LOAD_A_RECEIPT_SUCCESS,
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
  REPROCESS_FAIL
  //CATEGORY_SEARCH,
  //CATEGORY_SEARCH_SUCCESS,
  //CATEGORY_SEARCH_FAIL
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
  categoryReceipts: [],
  nextPage: false,
  imageData: {},
  newReceiptCategory: '',
  newReceiptNote: '',
  receiptDetail: {},
  exportDoc: {},
  searchQuery: '',
  searchResults: {},
  reprocessSuccess: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case RECEIPTS_FETCH:
      return {
          ...state,
          myReceipts: [],
          isFetching: true
      };

    case RECEIPTS_FETCH_SUCCESS:
      return {
          ...state,
          isFetching: false,
          myReceipts: action.payload
      };

    case SET_LIST:
      return { ...state, receiptList: action.payload };

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
      };

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

    case SET_FETCHING:
      return {
        ...state,
        isFetching: true
      };

    case ADD_RECEIPT:
    //console.log('add', this.myReceipts, this.myReceipts.push(action.payload));
      return {
        ...state,
        isFetching: true,
        myReceipts: [...state.myReceipts, action.payload]
      };

    case RECEIPT_DELETE:
      return {
        ...state,
        isFetching: true
      };

    case RECEIPT_DELETE_SUCCESS:
      return {
        ...state,
        isFetching: false
      };

    case RECEIPT_DELETE_FAIL:
      return {
        ...state,
        isFetching: false
      };

    case RECEIPTS_BY_CATEGORY_ADD:
      return {
        ...state,
        categoryReceipts: action.payload
        //categoryReceipts: state.categoryReceipts.concat(action.payload)
        //categoryReceipts: [...state.categoryReceipts, action.payload]
      };

    case LOAD_A_RECEIPT:
      return {
        ...state,
        receiptDetail: action.payload
      };

    case LOAD_A_RECEIPT_SUCCESS:
      return {
        ...state,
        isFetching: false
      };

    case SAVE_IMAGE_DATA:
      return {
        ...state,
      //  isFetching: true,
        imageData: action.payload
      };

    case SET_NEW_RECEIPT_CATEGORY:
      return {
        ...state,
        newReceiptCategory: action.payload
      };

    case SET_RECEIPT_NOTE:
      return {
        ...state,
        newReceiptNote: action.payload
      };

    case RESET_NEW_RECEIPT:
      return {
        ...state,
        newReceiptCategory: '',
        newReceiptNote: ''
      };

    case RECEIPT_EXPORT:
      return {
        ...state,
        exportDoc: action.payload
      };

    case REPROCESS_SUCCESS:
      return {
        ...state,
        reprocessSuccess: true
      };

    case REPROCESS_FAIL:
      return {
        ...state,
        reprocessSuccess: false
      };

    case SEARCH_TEXT_CHANGED:
      return {
        ...state,
        searchQuery: action.payload
      };

    case SEARCH_RECEIPTS:
      return {
        ...state,
        searchResults: action.payload
      };

    case SEARCH_PROCESSING:
      return {
        ...state,
        searchResults: action.payload
      };

    case SEARCH_CATEGORY:
      return {
        ...state,
        searchResults: action.payload
      };

    case RESET_RECEIPTS:
      return {
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
        imageData: {},
        newReceiptCategory: '',
        receiptDetail: {},
        exportDoc: {}
      };

    default:
      return state;
  }
};
