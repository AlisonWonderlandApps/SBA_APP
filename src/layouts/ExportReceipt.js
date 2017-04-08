import React, {
	Component,
} from 'react';
import {
	Text,
	TouchableHighlight,
	View,
	TextInput,
	AsyncStorage,
	ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';
import PDFView from 'react-native-pdf-view';
import RNFetchBlob from 'react-native-fetch-blob';
import Querystring from 'querystring';
import Moment from 'moment';
import { ssApiQueryURL, ssAuthConfig } from '../config/auth';
import { HEADER } from '../global/margins';

var Mailer = require('NativeModules').RNMail;
let dirs = RNFetchBlob.fs.dirs;

let self;

class ExportReceipt extends Component {
	constructor(props) {
		super(props);

    self = this;

    this.state = {
      receiptDetail: {
        processingState: '',
        uploaded: new Date(),
        note: '',
        url: '/storage/emulated/0/receipt.pdf',
				subject: '',
				emailId: '',
				ccBcc: ''
      },
			isDownloadComplete: false
    };

    this.getExportReceipt();
	}

  getExportReceipt(){
		//**************************Api call start *******************************
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
					const AuthStr = 'Bearer '.concat(response.data.access_token);

					const accountId = '1481900574';
					const documnetId = '58c2a374e4b04cd8325ff80a';  //pass document id as per row selection
					const requestUrl = ssApiQueryURL.accounts + accountId + '/documents/' + documnetId + '/';

							axios.get(requestUrl, { headers: { Authorization: AuthStr } })
							.then(response => {
								//console.log(JSON.stringify(response))
								const receiptData = response.data;
								let processingState = '';
								let uploaded = '';
								let note = '';
								let pdfUrl = '';
										if (receiptData.processingState) {
											processingState = receiptData.processingState;
										}
										if (receiptData.uploaded) {
											uploaded = Moment(receiptData.uploaded).format('Do MMMM YYYY');
										}
										if (receiptData.note) {
											note = receiptData.note;
										}
										if (receiptData.attachment && receiptData.attachment.url) {
											pdfUrl = receiptData.attachment.url;
										}

										self.setState({receiptDetail : {
											processingState,
											uploaded,
											note,
											url: pdfUrl
										}
									});

										const curFormatedDate = Moment().format();

										// let filePath = "/storage/emulated/0/receipt_" + curFormatedDate + ".pdf"

										// let filePath = dirs.DocumentDir + '/receipt_'+Moment().format()+'.pdf';
										const filePath = dirs.DocumentDir + '/receipt_'+Moment().format()+'.pdf';

										//console.log("--->filePath",filePath);
										RNFetchBlob
										.config({
											// add this option that makes response data to be stored as a file,
											// this is much more performant.
											fileCache: true,
											path: filePath
										})
										.fetch('GET', pdfUrl, {
											//some headers ..
										})
										.then((res) => {
											// the temp file path
											////alert('The file saved to '+ res.path());

											//debugger;
											pdfUrl = res.path();

												self.setState({ receiptDetail: {
													processingState,
													uploaded,
													note,
													url: pdfUrl
												},
												isDownloadComplete: true
												});
											}).then((err) => {
												//console.log('-->err : ',err);
												////alert('Sorry, something went wrong.Please try again.')
											});

										}).catch((error) => {
										//console.log('-->error : '+JSON.stringify(error));
										////alert('Sorry, something went wrong.Please try again.')
									});
						}
				});
			}
		});


		AsyncStorage.multiGet(['AuthStr', 'curAccountId'], (err, res) => {
      if (err) {
        ////alert('Sorry, something went wrong.Please try again.....');
      } else {
				const AuthStr = res[0][1];
				// 	let accountId = res[1][1];
        }
      });

		//*************************Api call end***********************************
  }

onNavigationStateChange(navState) {
	const wbUrl = navState.url;
	const lastPart = wbUrl.substr(wbUrl.lastIndexOf('.') + 1);
	////alert(JSON.stringify(navState))
	if (lastPart === 'pdf') {
		const DEFAULT_URL = { uri: 'http://docs.google.com/gview?embedded=true&url=' + wbUrl };
		self.setState({ url: DEFAULT_URL });
		}
	}

renderPdfViewer() {
	if (this.state.isDownloadComplete) {
			return (
				<PDFView
				ref={(pdf) => { this.pdfView = pdf; }}
           src={this.state.receiptDetail.url}
           onLoadComplete={(pageCount) => {
						 ////alert('pdf loaded.')
              this.pdfView.setNativeProps({
                  zoom: 1
              });
           }}
           style={styles.pdf}
				/>
			);
		}
			return (
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
					<Text>Loading....</Text>
				</View>
			);
	}

	exportReceipt() {
		if (this.state.isDownloadComplete) {
			const subject = this.state.subject;
			const to = this.state.emailId;
			const ccBcc = this.state.ccBcc;

			const pdfPath = this.state.receiptDetail.url;
			// let pdfPath = '/storage/emulated/0/DCIM/Camera/IMG_20170323_225817_HDR.jpg';

			// let recipients = [to];
			const recipients =['kathiriyabm9111210@gmail.com'];

			let ccRecipients = [];
			if (ccBcc && ccBcc.length > 0) {
				ccRecipients = ccBcc.split(',');
			}
			const bccRecipients = [];
			const attachmentName = 'receipt';
			const attachmentList = [{
				path: pdfPath
			}];

			//Alert('attachmentList : '+JSON.stringify(attachmentList))

			Mailer.mail({
				subject,
				recipients,
				ccRecipients,
				bccRecipients,
				body: 'this is body part.....',
				attachment: {
					name: 'IMG_20170323_225817_HDR',
					path: pdfPath,
					type: 'jpg'
				}
				//  isHTML: true, // iOS only, exclude if false
				//  attachment: {
				//    path: pdfPath,  // The absolute path of the file from which to read data.
				//    type: 'pdf',   // Mime Type: jpg, png, doc, ppt, html, pdf
				//    name: attachmentName,   // Optional: Custom filename for attachment
				//  }
					// attachmentList: attachmentList
				}, (error, event) => {
					if (error) {
						//alert('error : '+JSON.stringify(error));
					} else {
						//alert('Receipt exported successfully.');
					}
				});
			} else {
			//alert("Please wait for sometime.");
		}
	}

	renderSendButton() {
		return (
			<TouchableHighlight
				style={styles.sendEmailButton} underlayColor=''
				onPress={() => this.exportReceipt()}
			>
				<Text style={{ color: 'white' }}> Send </Text>
			</TouchableHighlight>
		);
	}

	renderReceiptDetail(){
		// let {receiptDetail} = this.state;
		// return (
		// 	<View style={styles.innerContainer}>
		// 			<View style={styles.receiptDetailTextView}>
		// 				<Text style={styles.receiptDetailText}>{receiptDetail.processingState}</Text>
		// 			</View>
		//
		// 			<View style={styles.receiptDetailTextView}>
		// 				<Text style={styles.receiptDetailText}>Date Submitted :  {receiptDetail.uploaded.toString()}</Text>
		// 			</View>
		//
		// 			<View style={[styles.receiptDetailTextView,{borderBottomColor : 'white',borderBottomWidth : 0}]}>
		// 				<Text style={styles.receiptDetailText}>Note : </Text>
		// 				<Text style={styles.receiptDetailText}>{receiptDetail.note}</Text>
		// 			</View>
		// 	</View>
		// );

		return null;
	}

	render() {
    const { receiptDetail } = this.state;
		return (
			<ScrollView style={styles.container}>

				<View style={styles.innerContainer}>
					{
						this.renderSendButton()
					}
					<TextInput
						style={styles.textInpt}
						onChangeText={(emailId) => this.setState({ emailId })}
						value={this.state.emailId}
						placeholder='To'
					/>

					<TextInput
						style={styles.textInpt}
						onChangeText={(ccBcc) => this.setState({ ccBcc })}
						value={this.state.ccBcc}
						placeholder='Cc/Bcc'
					/>

					<TextInput
						style={styles.textInpt}
						onChangeText={(subject) => this.setState({ subject })}
						value={this.state.subject}
						placeholder='Subject'
					/>

				</View>

        {
					this.renderReceiptDetail()
				}

				<View style={styles.pdfViewPatent}>
				{
					this.renderPdfViewer()
				}
				</View>

      </ScrollView>
		);
	}
}

const styles = {
  container: {
    flex: 1,
    padding: 0,
    paddingTop: HEADER.height,
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
	textInpt: {
		height: 35,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    // flex: 1,
    fontSize: 13,
    padding: 4,
		margin: 5,
		borderRadius: 3
	}
};

const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps, {

})(ExportReceipt);
