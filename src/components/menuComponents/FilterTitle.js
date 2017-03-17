
import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import { HEADER } from '../../global/margins';

const FilterTitle = (props) => {
  return (
  <TouchableHighlight onPress={() => Actions.categories()} >
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

export { FilterTitle };
