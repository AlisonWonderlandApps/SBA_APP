/*
* All actions a user can take pertaining to trips
*/

import { AsyncStorage, Alert } from 'react-native';
import axios from 'axios';
import { ssApiQueryURL } from '../config/auth';

import {
  TRIPS_FETCH,
  TRIPS_FETCH_SUCCESS,
  TRIPS_FETCH_FAIL,
  SET_LATEST_TRIP,
  SET_TRIP_DATE,
  SET_TRIP_COST,
  SET_TRIP_VENDOR,
  RESET_TRIPS,
  SET_CURRENT_LOCATION,
  TRIPS_START,
  TRIPS_END,
  SET_TRIP_DATA
} from './types';

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
        console.log('tripsActions', response.data.documents);
        if (response.data.documents.length > 0) {
          console.log('trips', response.data.documents);
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
  let year = formattedDate.substring(11, 15);
  year = ', '.concat(year);
  const dateStr = formattedDate.substring(4, 10).concat(year);
  return {
    type: SET_TRIP_DATE,
    payload: dateStr
  };
};

const setCost = (cost) => {
  const currency = '$'.concat(cost.toFixed(2));
  return {
    type: SET_TRIP_COST,
    payload: currency
  };
};

const setVendor = (name) => {
  return {
    type: SET_TRIP_VENDOR,
    payload: name
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

export const resetTrips = () => {
  return {
    type: RESET_TRIPS
  };
};


/**********RELATED TO TRIPS LIST****************/
export const setCurTripLocation = (tripData) => {
  return {
    type: SET_CURRENT_LOCATION,
    payload: tripData
  };
};

export const startTrip = () => {
  return {
    type: TRIPS_START
  };
};

export const endTrip = () => {
  return {
    type: TRIPS_END
  };
};

export const setTripData = (tripData) => {
  return function (dispatch) {
    try {
      AsyncStorage.setItem('tripData', JSON.stringify(tripData)).then((value) => {
        console.log(value);
        dispatch({
          type: SET_TRIP_DATA,
          payload: tripData
        });
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const isTripTracking = () => {
  return function (dispatch) {
    try {
      AsyncStorage.getItem('tripData').then((value) => {
        if (value !== null) {
          let tripData = JSON.parse(value);
          if(tripData.isTripStarted){
            dispatch({
              type: TRIPS_START
            });
          }else{
            dispatch({
              type: TRIPS_END
            });
          }
        }else{
          dispatch({
            type: TRIPS_END
          });
        }
      });
    } catch (err) {
        console.log(err);
        Alert('Sorry, something went wrong. Please try again.');
      }
  };
};

//1. Start a trip

//2. Calculate trip cost / end trip

//3. Add a trip manually??

//4. Edit a trip
