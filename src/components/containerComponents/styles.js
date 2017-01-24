import { HEADER } from '../../global/margins';

import {
  PRIMARY_COLOUR,
  PRIMARY_HIGHLIGHT_COLOUR,
  BORDER_COLOUR,
  SHADOW_COLOUR,
  CARD_BACKGROUND_COLOUR
 } from '../../global/colours';

export const containerStyles = {
  view: {
    flex: 1,
    backgroundColor: PRIMARY_COLOUR,
    padding: 10,
    paddingBottom: 0,
    justifyContent: 'space-around'
    //paddingBottom: (Platform.OS === 'ios') ? 0 : 0
  },
  header: {
    flex: 1,
    elevation: 4
  },
  card: {
    borderWidth: 1,
    borderRadius: 4, //give a nice rounded corner
    borderColor: BORDER_COLOUR,
    borderBottomWidth: 0,
    shadowColor: SHADOW_COLOUR,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2, //to match border radius!
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10 //to give space between list items
  },
  cardSection: {
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: CARD_BACKGROUND_COLOUR,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: BORDER_COLOUR,
    position: 'relative',
    paddingTop: 5,

  },
  tab: {
    width: null,
    backgroundColor: CARD_BACKGROUND_COLOUR,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1
  },
  centerText: {
    alignItems: 'center',
    paddingBottom: 20
  }
};
