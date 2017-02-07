
import {
  GET_AUTH_TOKEN,
  SET_AUTH_TOKEN,
  RECEIPTS_FETCH,
  RECEIPTS_FETCH_SUCCESS,
  RECEIPTS_FETCH_FAIL,
  TRIPS_FETCH,
  TRIPS_FETCH_SUCCESS,
  TRIPS_FETCH_FAIL,
  PROCESSED_FETCH,
  PROCESSED_FETCH_SUCCESS,
  PROCESSED_FETCH_FAIL,
  SET_REIMBURSEABLE_NUM,
  SET_PROCESSED_NUM,
  SET_LATEST_TRIP,
  SETTINGS_FETCH,
  SETTINGS_FETCH_SUCCESS,
  SETTINGS_FETCH_FAIL,
  PLAN_FETCH,
  PLAN_FETCH_SUCCESS,
  PLAN_FETCH_FAIL,
  PLANTYPE_SET
} from '../actions/types';

const INITIAL_STATE = {
  authToken: '',
  isFetching: false,
  error: false,
  errMsg: '',
  currentAccountId: '',
  receipts: [],
  trips: [],
  processing: [],
  processingCount: 0,
  reimbursables: [],
  reimburseableCount: 0,
  latestReceipt: {},
  latestTrip: {},
  nextPage: false,
  //plan: [],
//  planType: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case GET_AUTH_TOKEN:
      return { ...state, isFetching: true };

    case SET_AUTH_TOKEN:
      return {
        ...state,
        authToken: action.payload
      };

    case RECEIPTS_FETCH:
    console.log('RECEIPTS_FETCH');
      return {
          ...state,
          isFetching: true
      };

    case TRIPS_FETCH:
    console.log('TRIPS_FETCH');
      return {
          ...state,
          isFetching: true
      };

    case SETTINGS_FETCH:
      return {
          ...state,
          isFetching: true
        };

    case PROCESSED_FETCH:
      return {
        ...state,
        isFetching: true
      };

    case RECEIPTS_FETCH_SUCCESS:
      return {
          ...state,
          receipts: action.payload
      };

    case TRIPS_FETCH_SUCCESS:
    console.log('TRIPS_FETCH_SUCCESS');
      return {
          ...state,
          trips: action.payload
      };

    case SETTINGS_FETCH_SUCCESS:
      return {
          ...state,
          isFetching: false,
          settings: action.payload
      };

    case PROCESSED_FETCH_SUCCESS:
      return {
        ...state,

      };


    case PLAN_FETCH:
        return { ...state };

    case PLAN_FETCH_SUCCESS:
        return { ...state, plan: action.payload };

    case PLAN_FETCH_FAIL:
        return { ...state, error: action.payload };

    case SET_LATEST_TRIP:
      return {
        ...state,
        latestTrip: action.payload
      };

    case SET_PROCESSED_NUM:
      return {
        ...state,
        isFetching: false,
        nextPage: true,
        processingCount: action.payload
      };

    case SET_REIMBURSEABLE_NUM:
      return {
        ...state,
        isFetching: false,
        nextPage: true,
        reimburseableCount: action.payload
      };

    case RECEIPTS_FETCH_FAIL:
      return {
        ...state,
        isFetching: false,
        error: true,
        errMsg: 'Couldnt load receipts'
      };

    case TRIPS_FETCH_FAIL:
      return {
        ...state,
        isFetching: false,
        error: true,
        errMsg: 'Couldnt load trips'
      };

    case SETTINGS_FETCH_FAIL:
      return {
        ...state,
        isFetching: false,
        error: true,
        errMsg: 'Couldnt load settings'
      };

      case PROCESSED_FETCH_FAIL:
        return {
          ...state,
          isFetching: false
        };

    default:
      return state;
  }
};
