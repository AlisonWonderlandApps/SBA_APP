
import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { HEADER } from '../../global/margins';

let num;
let render = false;

class FilterTitle extends Component {
  constructor(props) {
    super(props);
    num = props.num;
    console.log(num);
  }
  render() {
    switch (num) {
      case 1:
        if (this.props.categories.length > 0) {
          render = true;
        }
        break;
      case 2:
        if (this.props.processingCount > 0) {
          render = true;
        }
        break;
      case 3:
        if (this.props.reimbursableCount > 0) {
          render = true;
        }
        break;
      default:
        render = false;
    }
    if (render) {
      return (
        <TouchableHighlight
          onPress={() => Actions.categories()}
          style={style.highlight}
        >
          <View style={style.container} >
             <Text
              style={style.navStyle}
             >
                Filter
              </Text>
              <Icon name="ios-arrow-forward" size={22} color="#ffffff" />
            </View>
          </TouchableHighlight>
      );
    }
    return <Text />;
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

const mapStateToProps = ({ receipts }) => {
  const {
    processingCount,
    reimbursableCount,
    categories,
  } = receipts;
  return {
    processingCount,
    reimbursableCount,
    categories,
  };
};

export default connect(mapStateToProps, {
})(FilterTitle);
