
import {
  PRIMARY_COLOUR,
  PRIMARY_HIGHLIGHT_COLOUR,
  CARD_BACKGROUND_COLOUR,
  BORDER_COLOUR
 } from '../global/colours';

export const TabStyle = {
  containerStyle: {
    borderWidth: 1,
    borderColor: PRIMARY_HIGHLIGHT_COLOUR,
    justifyContent: 'space-around'
  },
  imageStyle: {
    resizeMode: 'contain'
  },
  textStyle: {
    fontSize: 22,
    fontFamily: 'Calibri',
    color: PRIMARY_HIGHLIGHT_COLOUR
  }
};

export const NavListSectionsStyles = {
  layoutViewStyle: {
    flex: 1
  },
  containerStyle: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: CARD_BACKGROUND_COLOUR,
    justifyContent: 'flex-start',
    borderColor: BORDER_COLOUR,
    position: 'relative'
  },
  textViewStyle: {
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },

};

export const PopUpStyle = {

};
