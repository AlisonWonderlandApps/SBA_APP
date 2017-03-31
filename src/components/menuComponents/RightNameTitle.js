
import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import { HEADER } from '../../global/margins';

const RightNameTitle = (props) => {
  return (
  <TouchableHighlight
    onPress={() => Actions.settings()}
    style={style.highlight}
  >
    <View style={style.container} >
       <Text
        style={[style.navStyle, props.style]}
       >
          {props.children}
        </Text>
        <Icon name="ios-arrow-forward" size={22} color="#ffffff" />
      </View>
    </TouchableHighlight>
  );
};

const style = {
  highlight:
  {
    alignItems: 'center',
    justifyContent: 'center',
    height: HEADER.height
  },
  container: {
    paddingTop: 5,
    flexDirection: 'row',
    height: HEADER.height
  },
  navStyle: {
    paddingBottom: 0,
    paddingRight: 5,
    color: 'white',
    fontSize: 17
  }
};

export { RightNameTitle };

/*
 <Icon
    name='arrow-forward'
    size={25}
    color="#ffffff"
 />
 */
