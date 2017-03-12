/*
* Reducer for Search functions
*/

import {
  SEARCH_DATA,
  SEARCH_TEXT_CHANGED
} from '../actions/types';

const INITIAL_STATE = {
  searchQuery: '',
  data: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SEARCH_TEXT_CHANGED:
      return { ...state, searchQuery: action.payload };

    case SEARCH_DATA:
      return { ...state, date: action.payload };

    default:
      return state;
  }
};
