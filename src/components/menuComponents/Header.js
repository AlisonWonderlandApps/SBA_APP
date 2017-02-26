

import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { HEADER } from '../../global/margins';
import { SHADOW_COLOUR } from '../../global/colours';


class Header extends Component {

    render() {
      const icon =
        require('../../assets/images/roundLogoPNG/SquirrelStreet_Roundel-Device_pos_RGB.png');

      return (
            <View style={[Styles.iconContainer, this.props.iconContainerStyle]}>
              <Image source={icon} style={[Styles.icon, this.props.iconStyle]} />
            </View>
      );
  }
}

export const Styles = {
  view: {
    flexDirection: 'row',
    height: HEADER.height,
    width: null,
    alignItems: 'center',
    padding: 15,
    paddingLeft: 0,
    paddingRight: 0,
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
    paddingLeft: 0,
    paddingRight: 0,
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

export default Header;
