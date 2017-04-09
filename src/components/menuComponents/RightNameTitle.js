
import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { HEADER } from '../../global/margins';

class RightNameTitle extends Component {
  render() {
    return (
    <TouchableHighlight
      onPress={() => Actions.settings()}
      style={style.highlight}
    >
      <View style={style.container} >
         <Text
          style={style.navStyle}
         >
            {this.props.userName}
          </Text>
          <Icon name="ios-arrow-forward" size={22} color="#ffffff" />
        </View>
      </TouchableHighlight>
    );
  }
}

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

const mapStateToProps = ({ user }) => {
  const {
    userName
  } = user;
  return {
    userName
  };
};

export default connect(mapStateToProps, {

})(RightNameTitle);
