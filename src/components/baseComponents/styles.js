/*
* baseStyles
*/

import { HEADER } from '../../global/margins';
import {
  CARD_BACKGROUND_COLOUR,
  PRIMARY_HIGHLIGHT_COLOUR,
  SHADOW_COLOUR,
  BRAND_COLOUR_RED,
  APP_WHITE
} from '../../global/colours';

export const baseStyles = {
  bannerView: {
    height: 60,
    backgroundColor: PRIMARY_HIGHLIGHT_COLOUR,
    width: null,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    borderBottomWidth: 1,
    borderColor: 'black',
    paddingTop: 5
  },
  buttonStyle: {
    flexGrow: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: CARD_BACKGROUND_COLOUR,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: PRIMARY_HIGHLIGHT_COLOUR,
    marginLeft: 5,
    marginRight: 5,
    shadowColor: SHADOW_COLOUR,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  errorStyle: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'space-around',
    backgroundColor: CARD_BACKGROUND_COLOUR,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: BRAND_COLOUR_RED,
    marginLeft: 5,
    marginRight: 5,
    shadowColor: SHADOW_COLOUR,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  searchStyle: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'stretch',
    padding: 5,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: CARD_BACKGROUND_COLOUR,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'grey',
    marginLeft: 5,
    marginRight: 5,
    shadowColor: SHADOW_COLOUR,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  fbButtonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: CARD_BACKGROUND_COLOUR,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: PRIMARY_HIGHLIGHT_COLOUR,
    marginLeft: 5,
    marginRight: 5,
    shadowColor: SHADOW_COLOUR,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  googleButtonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: CARD_BACKGROUND_COLOUR,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: PRIMARY_HIGHLIGHT_COLOUR,
    marginLeft: 5,
    marginRight: 5,
    shadowColor: SHADOW_COLOUR,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  spinnerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoStyle: {
    resizeMode: 'contain',
    transform: [{ scale: 1.1 }],
    flexGrow: 1,
    width: null,
    height: null,
    minWidth: 100,
    minHeight: 90,
    maxWidth: 700,
    maxHeight: 800
  },
  tabContainer: {
    borderWidth: 1,
    borderColor: PRIMARY_HIGHLIGHT_COLOUR,
    justifyContent: 'space-around',
    padding: 10
  },
  tabImage: {
    resizeMode: 'contain'
  }
};

export const tabStyles = {
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderLeftWidth: 1
  },
  number: {
    paddingTop: 10,
    width: 20,
    height: 20,
    borderRadius: 100 / 2,
    backgroundColor: PRIMARY_HIGHLIGHT_COLOUR
  },
  text: {
    alignSelf: 'center',
    color: APP_WHITE
  }
};
