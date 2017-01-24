
import { Platform } from 'react-native';
import {
  PRIMARY_COLOUR,
  PRIMARY_HIGHLIGHT_COLOUR,
  CARD_BACKGROUND_COLOUR,
  BRAND_COLOUR_GREEN,
  BRAND_COLOUR_RED
 } from '../global/colours';
 import { APP_FONT } from '../global/fonts';
 import { HEADER } from '../global/margins';

export const layoutStyles = {
  loginView: {
    flexGrow: 1,
    paddingTop: (Platform.OS === 'ios') ? 50 : 30,
    padding: 10
  },
  view: {
    flex: 1,
    backgroundColor: PRIMARY_COLOUR,
    padding: 10,
    paddingTop: 0,
    justifyContent: 'space-around',
  },
  mainListView: {
    paddingTop: HEADER.height,
    flex: 1
  },
  tab: {
    flexDirection: 'row',
    width: null,
    justifyContent: 'space-between'
  }
};

export const LoginStyles = {
  container: {
    flex: 1,
    width: null,
    backgroundColor: 'rgba(0,0,0,0)'
  },
  labelInput: {
    color: PRIMARY_HIGHLIGHT_COLOUR,
    fontWeight: 'bold',
    fontFamily: APP_FONT
  },
  labelInputGood: {
    color: BRAND_COLOUR_GREEN,
    fontWeight: 'bold',
    fontFamily: APP_FONT
  },
  labelInputBad: {
    color: BRAND_COLOUR_RED,
    fontWeight: 'bold',
    fontFamily: APP_FONT
  },
  formInput: {
    marginLeft: 5,
  },
  input: {
    borderWidth: 0,
  },
  socialButtonContainer: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-around'
  }
};

export const SplashScreenStyles = {
  splashTextStyle: {
    padding: 10,
    paddingBottom: 40,
    alignSelf: 'center',
    color: PRIMARY_HIGHLIGHT_COLOUR,
    fontWeight: 'normal'
  }
};

export const MainScreenStyles = {

}
