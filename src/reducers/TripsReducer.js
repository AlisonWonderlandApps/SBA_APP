/*
*  Responsible for trips
*/

import {
  TRIPS_FETCH,
  TRIPS_FETCH_SUCCESS,
  TRIPS_FETCH_FAIL,
  SET_LATEST_TRIP,
  SET_TRIP_DATE,
  SET_TRIP_COST,
  SET_TRIP_VENDOR,
//  SET_TRIP_DISTANCE
} from '../actions/types';

const INITIAL_STATE = {
  isTracking: false, //current trip in progress?
  isFetchingTrips: false,
  tripsErrorMsg: '',
  myTrips: [],
  latestTrip: {},
  tVendor: '', //string
  tDate: '', //string version
  tCategory: '', //if multiple in a string
  tCost: '',
  tDistance: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case TRIPS_FETCH:
      return { ...state, isFetchingTrips: true };

    case TRIPS_FETCH_SUCCESS:
      return { ...state, isFetchingTrips: false, myTrips: action.payload };

    case TRIPS_FETCH_FAIL:
      return { ...state, isFetchingTrips: false, tripsErrorMsg: action.payload };

    case SET_LATEST_TRIP:
      return { ...state, latestTrip: action.payload };

    case SET_TRIP_DATE:
      return { ...state, tDate: action.payload };

    case SET_TRIP_COST:
      return { ...state, tCost: action.payload };

    case SET_TRIP_VENDOR:
      return { ...state, tVendor: action.payload };

  //  case SET_TRIP_DISTANCE:
    //  return { ...state, tDistance: action.payload };

    default:
      return state;
  }
};
