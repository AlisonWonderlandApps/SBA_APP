/*
* All actions a user can take pertaining to trips
*/

import axios from 'axios';
import { ssApiQueryURL } from '../config/auth';

import {
  TRIPS_FETCH,
  TRIPS_FETCH_SUCCESS,
  TRIPS_FETCH_FAIL,
  SET_LATEST_TRIP,
  SET_TRIP_DATE,
  SET_TRIP_COST,
  SET_TRIP_VENDOR
} from './types';

export const startNewTrip = () => {
  //console.log(this.props.authToken);
};


//0. Fetch all trips
//done in mainnav
export const fetchTrips = (AuthStr, AccountId) => {
  console.log('fetchTrips', AuthStr);
  return function (dispatch) {
    dispatch({
      type: TRIPS_FETCH
    });

    const tripsURL = (ssApiQueryURL.accounts).concat(AccountId).concat('/documents');

    axios.get(tripsURL,
      { params: { category: 'Trips', order_by_desc: 'uploaded' },
        headers: { Authorization: AuthStr }
      })
      .then(response => {
        dispatch(fetchTripsSuccess(response.data.documents));
        console.log(response.data.documents.length);
        if (response.data.documents.length > 0) {
          dispatch(fetchMostRecentTrips(response.data.documents[0]));
          dispatch(setDate(response.data.documents[0].uploaded));
          dispatch(setCost(response.data.documents[0].totalInPreferredCurrency));
          dispatch(setVendor(response.data.documents[0].vendor));
        } else {
          dispatch(fetchMostRecentTrips('')); //'Start a Trip!'
        }
      })
      .catch((er) => {
        console.log('no trips fetched', er);
        dispatch(fetchTripsFail(er));
      });
  };
};

const fetchTripsSuccess = (trips) => {
  return {
    type: TRIPS_FETCH_SUCCESS,
    payload: trips
  };
};

const setDate = (date) => {
  const formattedDate = new Date(date).toString();
  const dateStr = formattedDate.substring(4, 10);
  return {
    type: SET_TRIP_DATE,
    payload: dateStr
  };
};

const setCost = (cost) => {
  const currency = '$' + cost.toFixed(2);
  return {
    type: SET_TRIP_COST,
    payload: currency
  };
};

const setVendor = (name) => {
  return {
    type: SET_TRIP_VENDOR,
    payload: data
  };
};

const fetchMostRecentTrips = (aTrip) => {
  return {
    type: SET_LATEST_TRIP,
    payload: aTrip
  };
};

const fetchTripsFail = () => {
  return {
    type: TRIPS_FETCH_FAIL,
  };
};

//1. Start a trip

//2. Calculate trip cost / end trip

//3. Add a trip manually??

//4. Edit a trip
