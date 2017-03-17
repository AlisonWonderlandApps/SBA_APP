
import {
  PHOTO_ADD,
  SET_RECEIPT_CATEGORY,
  SET_RECEIPT_NOTE,
  ADD_RECEIPT_SUCCESS,
  SAVE_RECEIPT_LOCAL,
  USE_PICTURE
} from '../actions/types';

const INITIAL_STATE = {
  isFetching: false, //current trip in progress?
  receiptsArr: [],
  photoObj: [],
  category: '',
  note: '',
  newReceipt: {},
  usePic: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case PHOTO_ADD:
      return { ...state, photoObj: action.payload };

    case SET_RECEIPT_CATEGORY:
        return { ...state, category: action.payload };

    case SET_RECEIPT_NOTE:
        return { ...state, note: action.payload };

    case ADD_RECEIPT_SUCCESS:
        return { ...state, newReceipt: action.payload };

    case USE_PICTURE:
        return { ...state, usePic: action.payload };

    case SAVE_RECEIPT_LOCAL:
        return {
          ...state,
          newReceipt: action.payload,
          note: '',
          category: '',
          photoObj: []
         };

    default:
      return state;
  }
};
