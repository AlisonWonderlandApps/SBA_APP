
/*
* menuComponents styles
*/

import { HEADER } from '../../global/margins';
import { PRIMARY_COLOUR, SHADOW_COLOUR } from '../../global/colours';

export const menuStyles = {
  view: {
    flexDirection: 'row',
    height: HEADER.height,
    width: null,
    backgroundColor: PRIMARY_COLOUR,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    paddingTop: HEADER.padding,
    shadowColor: SHADOW_COLOUR,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0
  },
  iconContainer: {
    height: HEADER.height,
    paddingTop: HEADER.padding,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0
  },
  icon: {
    width: HEADER.icon,
    height: HEADER.icon,
  }
};

export const navStyles = {
    view: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    }
};

/*
textView: {
  flexDirection: 'row',
  height: HEADER.height,
  width: null,
  backgroundColor: 'transparent',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: 10,
  paddingTop: HEADER.padding,
  position: 'absolute',
  elevation: 4,
  top: 0,
  left: 0,
  right: 0
},
*/
