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
  loadReceiptImage,
  deleteReceiptImage
 } from '../actions';

class ReceiptInfo extends Component {

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

  componentWillUmount() {
    //delete the current picture
    deleteReceiptImage();
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
              <Text> {this.renderCost()} </Text>
              <Text> {this.renderTax()} </Text>
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
    let total = '';
    let currency = '';
    if (data.currency === undefined) {
      currency = '';
    } else {
      console.log(data.currency);
      currency = data.currency;
    }

    if (data.total === undefined) {
      total = ' --';
    }	else {
      total = data.total.toFixed(2);
    }
      return currency.concat(total);
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

  renderTax() {
      if (this.props.receiptDetail.tax === undefined) {
        return 'AUD$ --';
      }
      const tax = this.props.receiptDetail.tax;
      return 'AUD$'.concat(tax.toFixed(2));
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
})(ReceiptInfo);


//saving a receipt
//style={{ borderWidth: 1, backgroundColor: 'green', flex: 1, resizeMode: 'cover', paddingBottom: 10 }}
//path={{ 'https://s3-ap-southeast-2.amazonaws.com/sba-render/1206780197%7Cdocument_58de1d9ce4b0f9e41ef4d4fa.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20170409T105046Z&X-Amz-SignedHeaders=host&X-Amz-Expires=900&X-Amz-Credential=AKIAJD3UILPK5DBPFNHA%2F20170409%2Fap-southeast-2%2Fs3%2Faws4_request&X-Amz-Signature=85cbcba32ab8ee62bbfe2281aa22dea1cbf6995a474ca2d27e044b30403bef09' }}

/*
<PDFView
  ref={(pdf) => { this.pdfView = pdf; }}
  path={this.props.receiptsURL}
  onLoadComplete={(pageCount) => {
                      this.pdfView.setNativeProps({
                      zoom: 1.0
                  });
        console.log('load done', pageCount);
               }}
  style={{ borderWidth: 1, backgroundColor: 'green', flex: 1, paddingBottom: 10 }}
/>
<Image
  style={{ borderWidth: 1, backgroundColor: 'green', flex: 1, paddingBottom: 10 }}
  source={{ uri: this.props.receiptsURL }}
/>
*/
/*
<PDFView
  ref={(pdf) => { this.pdfView = pdf; }}
  src={this.props.receiptsURL}
  onLoadComplete={(pageCount) => {
                      this.pdfView.setNativeProps({
                      zoom: 1.0
                  });
        console.log('load done', pageCount);
               }}
  style={{ flex: 1 }}
/>
*/
/*
<WebView
  //source={{ uri: this.props.receiptDetail.attachment.url }}
  source={{ uri: 'https://s3-ap-southeast-2.amazonaws.com/sba-render/1481900574%7Cdocument_58c2a374e4b04cd8325ff80a.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20170416T025306Z&X-Amz-SignedHeaders=host&X-Amz-Expires=900&X-Amz-Credential=AKIAJD3UILPK5DBPFNHA%2F20170416%2Fap-southeast-2%2Fs3%2Faws4_request&X-Amz-Signature=e3e5b76cad67ca5af9be4d88aa9929ff1ce9ec2d68e8d424261ae6b795e2847a.pdf' }}
  style={{ flex: 1, marginTop: 20 }}
/>
<WebView
  automaticallyAdjustContentInsets={false}
  javaScriptEnabled
  domStorageEnabled
  decelerationRate="normal"
  onNavigationStateChange={this.onNavigationStateChange}
  startInLoadingState
  startInLoadingState
  style={{ flex: 1 }}
  source={{ uri: 'http://docs.google.com/gview?embedded=true&url='+myuri }}
/>

/*
<WebView
  automaticallyAdjustContentInsets={false}
  javaScriptEnabled
  domStorageEnabled
  decelerationRate="normal"
  onNavigationStateChange={this.onNavigationStateChange}
  startInLoadingState
  startInLoadingState
  style={{ flex: 1 }}
  source={{ uri: 'http://docs.google.com/gview?embedded=true&url='+myuri }}
/> */
/*

  showReceiptPdf() {
    let AuthStr = '';
    try {
      AsyncStorage.getItem('refreshToken').then((value) => {
        if (value !== null) {
          const data = {
            grant_type: ssAuthConfig.refreshTokenGrantType,
            client_id: ssAuthConfig.clientId,
            client_secret: ssAuthConfig.clientSecret,
            refresh_token: value
          };
        axios.post(ssAuthConfig.tokenURL, Querystring.stringify(data))
          .then(response => {
            if (response !== null) {
              AuthStr = 'Bearer '.concat(response.data.access_token);
              const requestURL = ssApiQueryURL.accounts.concat(this.props.curAccountID)
                .concat('/documents/').concat(this.props.receiptDetail.id);
              axios.get(requestURL, { headers: { Authorization: AuthStr } })
                .then(resp => {
                  console.log(resp);
                  imageURL = resp.data.attachment.url;//.concat('.pdf');
                  console.log(imageURL);
                  this.showPdf();
                }).catch((err) => {
                  console.log(err);
                });
            }
          }).catch((err) => {
            console.log(err);
          });
        }
      });
    } catch (err) {
      //console.log('token', err);
    }
  }
*/
