import React, {
	Component,
} from 'react';
import {
	Text,
	View,
	ScrollView,
  TextInput
} from 'react-native';
import { connect } from 'react-redux';
import PDFView from 'react-native-pdf-view';
import RNFS from 'react-native-fs';
//import Mailer from 'react-native-mail';

import { HEADER } from '../global/margins';
import { loadReceiptImage, updateExportObj } from '../actions';
import { PRIMARY_HIGHLIGHT_COLOUR } from '../global/colours';
import { APP_FONT } from '../global/fonts';
import { Button } from '../components';

//import Mailer from 'react-native-mail';
const Mailer = require('NativeModules').RNMail;

class ExportDoc extends Component {
	constructor(props) {
		super(props);
    console.log(this.props);
    this.props.loadReceiptImage(this.props.curAccountID, this.props.receiptDetail.id);

    const sub = 'Squirrel Street Export Receipt: '.concat(this.props.receiptDetail.vendor);
    this.props.updateExportObj(this.props.email, '', sub, this.props.receiptDetail.notes);
	}

  shouldComponentUpdate(nextProps) {
    console.log('should', this.props, nextProps);
    if (this.props !== nextProps) {
      return true;
    }
    return false;
  }

  render() {
    //const { receiptDetail } = this.state;
		return (
			<ScrollView style={styles.container}>
        {this.renderButton()}
        <View>
          {this.renderForm()}
        </View>

        <View style={{ flexGrow: 1 }}>
          <View style={{ flex: 1, height: 300, paddingTop: 5, paddingBottom: 20 }} >
            {this.showReceiptPdf()}
          </View>
        </View>
      </ScrollView>
		);
	}

  renderButton() {
    return (
      <View
        style={{
          flex: 1,
          paddingTop: HEADER.height + 10,
          width: null,
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
          <Button
            style={{ alignSelf: 'center', width: 150 }}
            onPress={this.exportReceipt()}
          >
            Export
          </Button>
        </View>
    );
  }

  renderForm() {
    return (
    <View style={styles.innerContainer}>
      <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
        <Text style={{ alignSelf: 'center' }}> To </Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(emailId) => { this.props.updateExportObj(emailId, this.props.exportObj.ccBcc, this.props.exportObj.subject, this.props.exportObj.body); }}
          value={this.props.exportObj.email}
          placeholder='Your email'
          returnKeyType='next'
        />
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
        <Text style={{ alignSelf: 'center' }}> cc / Bcc </Text>
          <TextInput
            style={styles.textInput}
            onChangeText={(ccBcc) => { this.props.updateExportObj(this.props.exportObj.email, ccBcc, this.props.exportObj.subject, this.props.exportObj.body); }}
            value={this.props.exportObj.ccBcc}
            placeholder='Other recipients email'
            returnKeyType='next'
          />
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
        <Text style={{ alignSelf: 'center' }}> Subject </Text>
          <TextInput
            style={styles.textInput}
            onChangeText={(subject) => { this.props.updateExportObj(this.props.email, this.props.ccBcc, subject, this.props.exportObj.body); }}
            value={this.props.exportObj.subject}
            placeholder='Subject'
            returnKeyType='next'
          />
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
        <Text style={{ alignSelf: 'center' }}> Message </Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(body) => { this.props.updateExportObj(this.props.email, this.props.ccBcc, this.props.exportObj.subject, body); }}
          value={this.props.exportObj.body}
          placeholder='Body'
          returnKeyType='done'
          multiline
        />
      </View>
    </View>
    );
  }

  showReceiptPdf() {
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

	exportReceipt() {
    console.log(this.props);
    if (!this.props.receiptImageIsLoading) {
			const subject = this.props.exportObj.subject;
			const to = [this.props.exportObj.email];
			const ccBcc = this.props.exportObj.ccBcc;
      const body = this.props.exportObj.body;

			const pdfPath = RNFS.DocumentDirectoryPath.concat('/test.pdf');

			let ccRecipients = [];
			if (ccBcc && ccBcc.length > 0) {
				ccRecipients = ccBcc.split(',');
			}
			const bccRecipients = [];
			const attachmentName = this.props.receiptDetail.vendor;

			Mailer.mail({
				subject,
				recipients: to,
				ccRecipients,
				bccRecipients,
				body,
				attachment: {
					name: attachmentName,
					path: pdfPath,
					type: 'pdf'
				}
      /*  attachment{
          //multiple attachments
      }*/
				//  isHTML: true, // iOS only, exclude if false
				//  attachment: {
				//    path: pdfPath,  // The absolute path of the file from which to read data.
				//    type: 'pdf',   // Mime Type: jpg, png, doc, ppt, html, pdf
				//    name: attachmentName,   // Optional: Custom filename for attachment
				//  }
					// attachmentList: attachmentList
				}, (error, event) => {
						//alert('error : '+JSON.stringify(error));
            console.log(error, event);
				});
      } else {
        console.log('image not loaded');
      }
	}
}

const styles = {
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: '#eeeeee',
    flexDirection: 'column'
	},
  innerContainer: {
    margin: 15,
    borderRadius: 10,
    backgroundColor: 'white',
    flexDirection: 'column'
  },
  receiptDetailTextView: {
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 10,
    paddingBottom: 10,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    // height : 50,
    justifyContent: 'center'
  },
  receiptDetailText: {
    color: 'black'
  },
  receiptImage: {
    height: 100,
    wifth: 100
  },
	pdfViewPatent: {
		width: window.width,
		height: 500,
		justifyContent: 'center',
		// backgroundColor : 'pink'
	},
  pdf: {
    // height : ,
    // width : window.width,
		flex: 1,
  },
	sendEmailButton: {
		height: 45,
		backgroundColor: 'black',
		justifyContent: 'center',
		alignItems: 'center',
		margin: 5
	},
	textInput: {
		height: 35,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    // flex: 1,
    fontSize: 13,
    padding: 4,
		margin: 5,
		borderRadius: 3,
    flex: 1
	}
};

const LoginStyles = {
  container: {
    flex: 1,
    width: null,
    backgroundColor: 'rgba(0,0,0,0)'
  },
  labelInput: {
    color: PRIMARY_HIGHLIGHT_COLOUR,
    fontWeight: 'bold',
    fontFamily: APP_FONT
  },
  formInput: {
    marginLeft: 5,
  },
  input: {
    borderWidth: 0,
  },
  socialButtonContainer: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-around'
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
    exportObj
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
    exportObj
  };
};

export default connect(mapStateToProps, {
  loadReceiptImage, updateExportObj
})(ExportDoc);
