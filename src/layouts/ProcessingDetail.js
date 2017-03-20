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

class ProcessingDetail extends Component {
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
              <Text> {this.props.receiptDetail.data.vendor} </Text>
              <Text> {this.props.receiptDetail.data.date} </Text>
              <Text> payment type </Text>
              <Text> {this.props.receiptDetail.data.category} </Text>
            </View>
            <View>
              <Text> {this.props.receiptDetail.data.total} </Text>
              <Text> tax </Text>
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
    this.props.deleteReceipt(this.props.curAccountID, this.props.receiptDetail.data.id);
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
    newReceiptCategory,
    newReceiptNote,
    newReceipt,
    imageData,
    receiptDetail
  } = receipts;
  return {
    curAccountID,
    email,
    newReceiptCategory,
    newReceiptNote,
    newReceipt,
    imageData,
    receiptDetail
  };
};

export default connect(mapStateToProps, {
  deleteReceipt
})(ProcessingDetail);


//saving a receipt
