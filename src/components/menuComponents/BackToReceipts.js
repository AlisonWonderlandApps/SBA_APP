
import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { HEADER } from '../../global/margins';

class BackToReceipts extends Component {
  render() {
    if (this.props.receiptDetail.num === 2) {
      return (
        <TouchableHighlight
          onPress={() => Actions.trips()}
          style={style.highlight}
        >
          <View style={style.container} >
              <Icon name="ios-arrow-back" size={22} color="#ffffff" />
               <Text
                style={style.navStyle}
               >
                Trips
               </Text>
          </View>
        </TouchableHighlight>
      );
    }
    return (
      <TouchableHighlight
        onPress={() => Actions.receipts()}
        style={style.highlight}
      >
        <View style={style.container} >
            <Icon name="ios-arrow-back" size={22} color="#ffffff" />
             <Text
              style={style.navStyle}
             >
              Receipts
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

})(BackToReceipts);
