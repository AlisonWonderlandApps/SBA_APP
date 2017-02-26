//All photo actions

import {
  PHOTO_ADD,
  PHOTO_NAME_ADD,
  PHOTO_URI_ADD,
} from '../actions/types';

//attachment includes name and URI

const INITIAL_STATE = {
  photoName: '',
  photoURI: '',
  attachment: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PHOTO_NAME_ADD:
      return {
        ...state,
        
      };
    case PHOTO_URI_ADD:
      return {

      };
    case PHOTO_ADD:
      return {
        ...state,
        attachment: action.payload
      };

    default:
      return state;
  }
};
