
import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { HEADER } from '../../global/margins';

class GoToEdit extends Component {

  render() {
    return (
      <TouchableHighlight
        onPress={() => Actions.editReceipt()}
        style={style.highlight}
      >
        <View style={style.container} >
           <Text
            style={style.navStyle}
           >
              Edit
            </Text>
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

const mapStateToProps = ({ receipts }) => {
  const {
    receiptDetail
  } = receipts;
  return {
    receiptDetail
  };
};

export default connect(mapStateToProps, {

})(GoToEdit);
