

import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { HEADER } from '../../global/margins';
import { updateReceipt } from '../../actions';

class SaveEdits extends Component {
  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => this.saveEdits()}
        style={style.highlight}
      >
        <View style={style.container} >
           <Text
            style={style.navStyle}
           >
              Save
            </Text>
          </View>
        </TouchableWithoutFeedback>
    );
  }

  saveEdits() {
    console.log('save edits');
    const newData = {
      vendor: this.props.vendor,
      date: this.props.date,
      currency: this.props.currency,
      total: this.props.total,
      tax: this.props.tax,
      paytype: this.props.paytype,
      categories: this.props.categories,
      notes: this.props.notes
    };
    console.log(newData);
    const doc = this.props.receiptDetail;
    this.props.updateReceipt(doc.accountId, doc.id, newData);
    //Actions.receipts();
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

const mapStateToProps = ({ receipts, edit }) => {
  const {
    receiptDetail
  } = receipts;
  const {
    docDetail,
    vendor,
    date,
    currency,
    total,
    tax,
    paytype,
    categories,
    notes
  } = edit;
  return {
    receiptDetail,
    docDetail,
    vendor,
    date,
    currency,
    total,
    tax,
    paytype,
    categories,
    notes
  };
};

export default connect(mapStateToProps, {
  updateReceipt
})(SaveEdits);
