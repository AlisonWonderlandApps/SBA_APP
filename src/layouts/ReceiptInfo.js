/*
*
*/

import React, { Component } from 'react';
import {
  TouchableOpacity,
  Alert,
  Text,
  View,
  TouchableHighlight,
  Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import Pdf from 'react-native-pdf';
import PDFView from 'react-native-pdf-view';
import RNFS from 'react-native-fs';
import { Actions } from 'react-native-router-flux';
import {
  BackgroundView,
  Button
} from '../components';
import { HEADER } from '../global/margins';
import { APP_GREY, CARD_BACKGROUND_COLOUR, PRIMARY_COLOUR } from '../global/colours';
import {
  deleteReceipt,
  reprocessDocument,
  loadReceiptImage,
  deleteReceiptImage
 } from '../actions';

class ReceiptInfo extends Component {

  constructor(props) {
    super(props);
    console.log(this.props);
    this.pdfView = null;
    this.pdfPath = RNFS.DocumentDirectoryPath.concat('/test.pdf');
    this.props.loadReceiptImage(this.props.curAccountID, this.props.receiptDetail.id);
  }

  shouldComponentUpdate(nextProps) {
    console.log('should', this.props, nextProps);
    if (this.props !== nextProps) {
      return true;
    }
    return false;
  }

  componentWillUmount() {
    //delete the current picture
    //deleteReceiptImage();
    this.pdfView = null;
  }

  render() {
    console.log('rendering');
    const wwidth = Dimensions.get('window').width;
    return (
      <BackgroundView
        style={{ padding: 0, flex: 1, justifyContent: 'flex-start', paddingTop: HEADER.height }}
      >
        <View
          style={{
            width: wwidth,
            backgroundColor: 'white',
            paddingLeft: 20,
            paddingRight: 20 }}
        >
          <View
            style={{
              padding: 5,
              paddingLeft: 25,
              paddingRight: 25,
              flexDirection: 'row',
              justifyContent: 'space-around' }}
          >
            <View>
              <Text
                style={{ fontSize: 18, color: PRIMARY_COLOUR, textAlign: 'left' }}
                numberOfLines={1}
                ellipsizeMode='tail'
              > {this.props.receiptDetail.vendor} </Text>
              <Text
                style={{ paddingTop: 2, textAlign: 'left' }}
                numberOfLines={1}
                ellipsizeMode='tail'
              > {this.renderDate()} </Text>
              <Text
                style={{ paddingTop: 2 }}
                numberOfLines={1}
                ellipsizeMode='tail'
              > {this.renderPaymentType()} </Text>
              <Text
                style={{
                  width: wwidth - 20,
                  fontSize: 16,
                  fontWeight: 'bold',
                  paddingTop: 2
                }}
                numberOfLines={2}
                ellipsizeMode='tail'
              > {this.renderCategories()} </Text>
              <Text
                style={{ paddingTop: 15 }}
                numberOfLines={3}
                ellipsizeMode='tail'
              > {this.renderNotes()} </Text>
            </View>
            <View>
              {this.renderCost()}
              {this.renderTax()}
            </View>
          </View>
          <View style={{ padding: 5, paddingTop: 15, flexDirection: 'row', width: null }}>
            <TouchableOpacity
              style={{ flex: 1, height: 40 }}
              onPress={() => this.onReProcessClick()}
            >
            <Button
              style={{
                flex: 1,
                width: 280,
                alignSelf: 'center',
                paddingTop: 5,
                paddingBottom: 5 }}
              onPress={() => this.onReProcessClick()}
            >
              Re-Process Document
            </Button>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          style={{ flex: 1, paddingTop: 5, paddingBottom: 5 }}
          onPress={() => this.showFullScreen()}
        >
          <View style={{ flex: 1 }} >
            {this.showReceiptPdf()}
          </View>
        </TouchableOpacity>
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

  showFullScreen() {
    Actions.fullReceipt();
  }

  showReceiptPdf() {
    //const path = RNFS.DocumentDirectoryPath.concat('/test.pdf');
    //console.log(path);

    if (this.props.receiptImageIsLoading) {
      return (
        <View
          style={{
            flex: 1,
            padding: 20,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: CARD_BACKGROUND_COLOUR,
          }}
        >
          <Text> Loading... </Text>
        </View>
      );
    }

    return (
        <PDFView
          ref={(pdf) => { this.pdfView = pdf; }}
          key='sop'
          path={this.pdfPath}
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

  renderCost() {
    const data = this.props.receiptDetail;
		const currency = data.currency;
		let returnString = '';

    if (currency === 'AUD') {
      //case 1: total undefined
      if (data.total === '' || data.total === undefined) {
        returnString = currency.concat('0.00');
      } else {       //case 2: total known
        returnString = currency.concat(data.total.toFixed(2));
      }
      return <Text style={style.costText}> {returnString} </Text>;
    } else if (currency === undefined || currency === '') {
    //Currency is undefined
      if (data.total === '' || data.total === undefined) {
        returnString = 'AUD'.concat('0.00');
      } else {       //case 2: total known
        returnString = 'AUD'.concat(data.total.toFixed(2));
      }
      return <Text style={style.costText}> {returnString} </Text>;
    }

    if (data.total === '' || data.total === undefined) {
      returnString = currency.concat('0.00');
    } else {       //case 2: total known
      returnString = currency.concat(data.total.toFixed(2));
    }
    return <Text style={style.costText}> {returnString} </Text>;
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

  renderNotes() {
    return this.props.receiptDetail.notes;
  }

  renderPaymentType() {
    const data = this.props.receiptDetail.paymentType;
    let digits = '';
    console.log(data);
    if (data.type === undefined) {
      return 'Paid with Other/Unknown';
    }
      switch (data.type) {
        case 'credit-card':
          digits = data.lastFourDigits;
          if (digits === undefined || digits === '') {
            return 'Paid with Card';
          }
          return 'Paid with Card xxxx-xxxx-xxxx-'.concat(digits);
        case 'cash':
          return 'Paid with Cash';
        case 'check':
          return 'Paid with Cheque';
        case 'paypal':
          return 'Paid with Paypal';
        default:
          return 'Paid with Other/Unknown';
      }
  }

  renderTax() {
    const data = this.props.receiptDetail;
    const currency = data.currency;
    let returnString = '';

    if (currency === 'AUD') {
      //case 1: tax undefined
      if (data.tax === '' || data.tax === undefined) {
          returnString = currency.concat('0.00tax');
        } else {       //case 2: total known
        returnString = currency.concat(data.tax.toFixed(2).concat('tax'));
      }
      return <Text style={{ paddingTop: 2 }}> {returnString} </Text>;
    } else if (currency === undefined || currency === '') {
      //Currency is undefined
        if (data.tax === '' || data.tax === undefined) {
          returnString = 'AUD'.concat('0.00tax');
        } else {       //case 2: total known
          returnString = 'AUD'.concat(data.tax.toFixed(2).concat('tax'));
        }
        return <Text style={{ paddingTop: 2 }}> {returnString} </Text>;
      }

    if (data.tax === '' || data.tax === undefined) {
      returnString = currency.concat('0.00tax');
    } else {       //case 2: total known
      returnString = currency.concat(data.tax.toFixed(2).concat('tax'));
    }
    return <Text style={{ paddingTop: 2 }}> {returnString} </Text>;
  }

  onDeletePress() {
    //console.log('delete', this.props);
      Alert.alert(
        'Confirmation Required!',
        'Are you sure you want to delete this receipt?',
        [
          { text: 'OK',
          onPress: () =>
            this.props.deleteReceipt(this.props.curAccountID, this.props.receiptDetail.id),
          },
          { text: 'Cancel' },
        ]
      );
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
    console.log('reprocess doc', this.props.receiptDetail);
    this.props.reprocessDocument(this.props.receiptDetail.accountId, this.props.receiptDetail.id);
  }

}

const style = {
  costText: {
    fontSize: 18,
    color: PRIMARY_COLOUR,
    width: null,
    textAlign: 'right'
  }
};

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
    receiptDetail,
    receiptImageIsLoading,
    receiptImageURL,
    pdfImage
  } = receipts;
  return {
    curAccountID,
    email,
    newReceiptCategory,
    newReceiptNote,
    newReceipt,
    imageData,
    receiptDetail,
    receiptImageIsLoading,
    receiptImageURL,
    pdfImage
  };
};

export default connect(mapStateToProps, {
  deleteReceipt, reprocessDocument, loadReceiptImage
})(ReceiptInfo);
