/*
*
*/

import React, { Component } from 'react';
import {
  TouchableOpacity,
  Alert,
  Text,
  View,
  TouchableHighlight
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import PDFView from 'react-native-pdf-view';
import RNFS from 'react-native-fs';
import {
  BackgroundView,
  Button,
  TitleText
} from '../components';
import { HEADER } from '../global/margins';
import { APP_GREY } from '../global/colours';
import {
  deleteReceipt,
  loadReceiptImage
 } from '../actions';

class ReimbursableDetail extends Component {
  constructor(props) {
    super(props);
    //console.log(this.props);
    this.props.loadReceiptImage(this.props.curAccountID, this.props.receiptDetail.id);
  }

  shouldComponentUpdate(nextProps) {
    //console.log('should', this.props, nextProps);
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
            <View>
              <TitleText style={{ padding: 5, color: 'green' }}>
                {this.props.receiptDetail.vendor}
              </TitleText>
              <Text> {this.props.receiptDetail.date} </Text>
              <Text> {this.props.receiptDetail.paymentType} </Text>
              <Text> {this.props.receiptDetail.categories} </Text>
              <Text style={{ paddingTop: 20, paddingBottom: 20, paddingLeft: 5 }}>
                {this.props.receiptDetail.notes}
              </Text>
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
        <View style={{ flex: 1, paddingTop: 5, paddingBottom: 5 }} >
          {this.showReceiptPdf()}
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

  showReceiptPdf() {
  //  console.log(this.props.receiptImageURL);
  //  console.log(this.props.pdfImage);
    const path = RNFS.DocumentDirectoryPath.concat('/test.pdf');

    if (this.props.receiptImageIsLoading) {
      return (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'grey',
            padding: 15
          }}
        >
          <Text style={{ fontSize: 18 }}> Loading... </Text>
        </View>
      );
    }

    return (
        <PDFView
          ref={(pdf) => { this.pdfView = pdf; }}
          key='sop'
          path={path}
          onLoadComplete={(pageCount) => {
                              this.pdfView.setNativeProps({
                              zoom: 1.0
                          });
                console.log('load done', pageCount);
                       }}
          style={{ flex: 1, paddingTop: 5, backgroundColor: 'grey' }}
        />
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
    //console.log('delete it');
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
  deleteReceipt, loadReceiptImage
})(ReimbursableDetail);
