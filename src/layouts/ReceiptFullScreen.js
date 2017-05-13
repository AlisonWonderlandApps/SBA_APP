import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import PDFView from 'react-native-pdf-view';
import RNFS from 'react-native-fs';
import {
  BackgroundView
} from '../components';
import { HEADER } from '../global/margins';

class ReceiptFullScreen extends Component {
  render() {
      return (
        <BackgroundView
          style={{
            paddingTop: HEADER.height + 10,
            paddingBottom: 10,
            justifyContent: 'center'
           }}
        >
        <View style={{ flex: 1, paddingTop: 5, paddingBottom: 5 }} >
          {this.showReceiptPdfFull()}
        </View>
        </BackgroundView>
      );
  }

  showReceiptPdfFull() {
    console.log('pdf');
    const path = RNFS.DocumentDirectoryPath.concat('/test.pdf');
    //let pdfView = new pdfView(this);

    return (
        <PDFView
          ref={(pdff) => { this.pdfV = pdff; }}
          key='full'
          path={path}
          onLoadComplete={(pageCount) => {
                              this.pdfV.setNativeProps({
                              zoom: 1.0
                          });
                console.log('load done', pageCount);
                       }}
          style={{ flex: 1, paddingTop: 5, backgroundColor: 'grey' }}
        />
    );
  }
}

const mapStateToProps = ({ receipts }) => {
  const {
    receiptImageIsLoading,
    receiptImageURL
  } = receipts;
  return {
    receiptImageIsLoading,
    receiptImageURL
  };
};

export default connect(mapStateToProps, {
})(ReceiptFullScreen);
