/*
*
*/

import {
  SEARCH_TEXT_CHANGED,
  SEARCH_DATA
} from './types';

export const searchTextChanged = (text) => {
  return {
    type: SEARCH_TEXT_CHANGED,
    payload: text
  };
};

export const searchData = (data) => {
  return {
    type: SEARCH_DATA,
    payload: data
  };
};
