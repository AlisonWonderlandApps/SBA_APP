/*
*
*/

import React, { Component } from 'react';
import {
  TouchableOpacity,
  Alert,
  Text,
  View,
  Image,
  TouchableHighlight
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  BackgroundView,
  Button
} from '../components';
import { HEADER } from '../global/margins';
import { APP_GREY } from '../global/colours';
import {
  deleteReceipt
 } from '../actions';

class ExportDoc extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
  }

  shouldComponentUpdate(nextProps) {
    console.log('should', this.props, nextProps);
    if (this.props !== nextProps) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <BackgroundView
        style={{ padding: 0, flex: 1, justifyContent: 'flex-start', paddingTop: HEADER.height }}
      >
        <View style={{ backgroundColor: 'white', padding: 5 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View>
              <Text> {this.props.receiptDetail.vendor} </Text>
              <Text> {this.renderDate()} </Text>
              <Text> {this.renderPaymentType()} </Text>
              <Text> {this.renderCategories()} </Text>
            </View>
            <View>
              <Text> AUD{this.renderCost()} </Text>
              <Text> {this.renderTax()} </Text>
            </View>
          </View>
          <View style={{ padding: 5, paddingTop: 15, flexDirection: 'row', width: null }}>
            <TouchableOpacity
              style={{ flex: 1, height: 40 }}
              onPress={this.onReProcessClick.bind(this)}
            >
              {this.renderReProcessButton()}
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flex: 1, paddingBottom: 15, padding: 20, justifyContent: 'space-between' }} >
          <Image
            style={{ borderWidth: 1, flex: 1, resizeMode: 'cover', paddingBottom: 10 }}
            //source={{ uri: imgUri }}
          />
        </View>
        <TouchableHighlight
          onPress={() => this.onDeletePress()}
        >
          <View
          style={{
            flexDirection: 'row',
            backgroundColor: 'red',
            height: 50,
            width: null,
            justifyContent: 'center',
            borderTopWidth: 1,
            borderTopColor: APP_GREY,
            alignItems: 'center' }}
          >
            <Icon name='ios-trash' size={30} color='#ffffff' />
            <Text style={{ paddingLeft: 5, color: 'white' }}> Delete Receipt </Text>
          </View>
        </TouchableHighlight>
      </BackgroundView>
    );
  }

  renderCost() {
    const data = this.props.receiptDetail;
    let total = '';
    if (data.total === undefined) {
      total = '$ --';
    }	else {
      total = '$'.concat(data.total.toFixed(2));
    }
      console.log('renderCost', total);
      return total;
    }

    renderDate() {
      const data = this.props.receiptDetail;
      let date = '';
      if (data.issued === undefined) {
        const formattedDate = new Date(data.uploaded).toString();
        let year = formattedDate.substring(11, 15);
        year = ' '.concat(year);
        date = formattedDate.substring(4, 10).concat(year);
      } else {
        const formattedDate = new Date(data.issued).toString();
        let year = formattedDate.substring(11, 15);
        year = ' '.concat(year);
        date = formattedDate.substring(4, 10).concat(year);
      }
      return date;
    }

    renderCategories() {
      const data = this.props.receiptDetail;
      let category = '';
      console.log(data);
      if (data.categories === undefined) {
        category = 'No categories';
      } else if (data.categories.length < 1) {
        category = 'No categories';
      } else {
        let j = 0;
        category = data.categories[j];
        for (j = 1; j < data.categories.length; j++) {
          category += ', '.concat(data.categories[j]);
        }
        return category;
      }
  }

  renderPaymentType() {
    const data = this.props.receiptDetail;
      if (data.paymentType === undefined) {
        return 'No payment type';
      } else if (data.type === undefined) {
        return 'No payment type';
      }
      return data.paymentType.type;
  }

  renderTax() {
      if (this.props.receiptDetail.tax === undefined) {
        return 'AUD$ --';
      }
      const tax = this.props.receiptDetail.tax;
      return 'AUD$'.concat(tax.toFixed(2));
  }

  onDeletePress() {
    console.log('delete', this.props);
      Alert.alert(
        'Confirmation Required!',
        'Are you sure you want to delete this receipt?',
        [
          { text: 'OK', onPress: () => this.deleteReceipt() },
          { text: 'Cancel', onPress: () => console.log('Cancel pressed') },
        ]
      );
  }

  deleteReceipt() {
    console.log('delete it');
    this.props.deleteReceipt(this.props.curAccountID, this.props.receiptDetail.id);
  }

  renderReProcessButton() {
    return (
          <Button
            style={{
              flex: 1,
              width: 250,
              alignSelf: 'center',
              paddingTop: 5,
              paddingBottom: 5 }}
          >
            re-process document
          </Button>
    );
  }

  onReProcessClick() {
    console.log('reprocess doc');
  }

}

const mapStateToProps = ({ accounts, receipts }) => {
  const {
    curAccountID,
    email
  } = accounts;
  const {
    exportDoc
  } = receipts;
  return {
    curAccountID,
    email,
    exportDoc
  };
};

export default connect(mapStateToProps, {
  deleteReceipt
})(ExportDoc);


//saving a receipt
