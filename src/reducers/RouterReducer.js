/*
* this reducer will be responsible for all router logic
*/

import {
  NAVBAR_LEFT_RENDER,
  NAVBAR_RIGHT_RENDER
} from '../actions/types';

const INITIAL_STATE = {
  leftText: '',
  rightText: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NAVBAR_LEFT_RENDER:
      return { ...state, leftText: action.payload };

    case NAVBAR_RIGHT_RENDER:
      return { ...state, rightText: action.payload };

    default:
      return state;
    }
};
