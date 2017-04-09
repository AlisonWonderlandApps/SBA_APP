
import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { HEADER } from '../../global/margins';

class MainRight extends Component {

  render() {
    if (this.props.curAccountIndex === -1) {
      return <Text />;
    }
    return (
    <TouchableHighlight
      onPress={() => Actions.main()}
      style={style.highlight}
    >
      <View style={style.container} >
         <Text
          style={style.navStyle}
         >
            Main
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

  const mapStateToProps = ({ accounts }) => {
    const {
      curAccountIndex
    } = accounts;
    return {
      curAccountIndex
    };
};

export default connect(mapStateToProps, {
})(MainRight);
