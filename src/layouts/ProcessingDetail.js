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

class ProcessingDetail extends Component {
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
              <Text> {this.renderDate()} </Text>
              <Text> {this.renderPaymentType()} </Text>
              <Text> {this.renderCategories()} </Text>
              <Text style={{ paddingTop: 20, paddingBottom: 20, paddingLeft: 5 }}>
                {this.props.receiptDetail.notes}
              </Text>
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


    renderDate() {
      const data = this.props.receiptDetail;
      let date = '';
      if (data.issued === undefined) {
        const formattedDate = new Date(data.uploaded).toString();
        const day = formattedDate.substring(8, 11);
        const month = formattedDate.substring(4, 7);
        let year = formattedDate.substring(11, 15);
        year = ', '.concat(year);
        date = day.concat(month).concat(year);
      } else {
        const formattedDate = new Date(data.issued).toString();
        const day = formattedDate.substring(8, 11);
        const month = formattedDate.substring(4, 7);
        let year = formattedDate.substring(11, 15);
        year = ', '.concat(year);
        date = day.concat(month).concat(year);
      }
      return date;
    }

    renderCategories() {
      const data = this.props.receiptDetail;
      let category = '';
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
        switch (data.paymentType.type) {
          case 'credit-card':
            return 'Credit Card';
          case 'cash':
            return 'Cash';
          case 'check':
            return 'Cheque';
          case 'paypal':
            return 'Paypal';
          default:
            return 'Other/Unknown';
        }
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
})(ProcessingDetail);


//saving a receipt
