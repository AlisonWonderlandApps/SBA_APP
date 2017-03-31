
import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import { HEADER } from '../../global/margins';

const BackToCats = (props) => {
  return (
    <TouchableHighlight
      onPress={() => Actions.categories()}
      style={style.highlight}
    >
      <View style={style.container} >
          <Icon name="ios-arrow-back" size={22} color="#ffffff" />
           <Text
            style={[style.navStyle, props.style]}
           >
            {props.children}
           </Text>
      </View>
    </TouchableHighlight>
  );
};

const style = {
  highlight:
  {
    alignItems: 'center',
    justifyContent: 'center',
    height: HEADER.height,
    paddingTop: 5
  },
  container: {
    paddingTop: 5,
    flexDirection: 'row',
    height: HEADER.height
  },
  navStyle: {
    paddingLeft: 5,
    color: 'white',
    fontSize: 17
  }
};

export { BackToCats };
