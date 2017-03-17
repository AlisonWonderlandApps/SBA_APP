/*
* Props include image location & container & image style.
* Where style has image size, background colour etc
* A default style and image is applied when no props are passed
*/

import React from 'react';
import { Image } from 'react-native';
import { baseStyles } from './styles';
import MAIN_LOGO from '../../global/images';

const LogoSection = (props) => {
  //const imgSrc = require(MAIN_LOGO);
  const imgSrc = require('../../assets/SquirrelStreet_logo_col_rev_stacked_RGB.png');

  return (
      <Image
        source={imgSrc}
        style={[baseStyles.logoStyle, props.imageStyle]}
      />
  );
};

export { LogoSection };
