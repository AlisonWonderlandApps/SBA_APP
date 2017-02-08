
import {
  PHOTO_ADD
} from '../actions/types';

const INITIAL_STATE = {
  isFetching: false, //current trip in progress?
  receiptsArr: [],
  photoObj: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case PHOTO_ADD:
      return { ...state, photoObj: action.payload };

    default:
      return state;
  }
};
