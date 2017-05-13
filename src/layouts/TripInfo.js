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
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import PDFView from 'react-native-pdf-view';
import RNFS from 'react-native-fs';
import {
  BackgroundView,
  Button
} from '../components';
import { HEADER } from '../global/margins';
import { APP_GREY } from '../global/colours';
import {
  deleteReceipt,
  reprocessDocument,
  loadReceiptImage
 } from '../actions';

class TripInfo extends Component {

  constructor(props) {
    super(props);
    console.log(this.props);
    this.props.loadReceiptImage(this.props.curAccountID, this.props.receiptDetail.id);
  }

  shouldComponentUpdate(nextProps) {
    console.log('should', this.props, nextProps);
    if (this.props !== nextProps) {
      return true;
    }
    return false;
  }

  render() {
    console.log('rendering');
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

  renderCost() {
    const data = this.props.receiptDetail;
    let currency = data.currency;
		let returnString = '';

		//case 1: currency & total are defined
		if (currency !== undefined && data.total !== undefined) {
			//case 1.1 currency is AUD
			if (currency === 'AUD') {
				returnString = ('$').concat(data.total.toFixed(2));
				return <Text> {returnString} </Text>;
			}
			//case 1.2 currency NOT au$
			currency = 'AUD$';
				returnString = currency.concat(data.totalInPreferredCurrency.toFixed(2));
			return (
							<Text style={{ fontStyle: 'italic' }}>
								{returnString}
							</Text>
						);
		} else if (currency === undefined) {
			//currency = 'AUD$';
			if ((data.total === undefined) || (data.total === '')) {
				returnString = ('$-.--');
				return <Text> {returnString} </Text>;
			}
			returnString = ('$').concat(data.total);
			return <Text> {returnString} </Text>;
		}
		returnString = ('$-.--');
		return <Text> {returnString} </Text>;
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
    const data = this.props.receiptDetail;
    let currency = data.currency;
    let returnString = '';

    //case 1: currency & total are defined
    if (currency !== undefined && data.tax !== undefined) {
    //case 1.1 currency is AUD
    if (currency === 'AUD') {
      returnString = ('$').concat(data.tax.toFixed(2));
      return <Text> {returnString} </Text>;
    }
    //case 1.2 currency NOT au$
    currency = 'AUD$';
      returnString = currency.concat(data.taxInPreferredCurrency.toFixed(2));
    return (
            <Text style={{ fontStyle: 'italic' }}>
              {returnString}
            </Text>
          );
    } else if (currency === undefined) {
    //currency = 'AUD$';
    if ((data.tax === undefined) || (data.tax === '')) {
      returnString = ('$--.--');
      return <Text> {returnString} </Text>;
    }
    returnString = ('$').concat(data.tax);
    return <Text> {returnString} </Text>;
    }
    returnString = ('$--.--');
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
    receiptImageURL
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
    receiptImageURL
  };
};

export default connect(mapStateToProps, {
  deleteReceipt, reprocessDocument, loadReceiptImage
})(TripInfo);
