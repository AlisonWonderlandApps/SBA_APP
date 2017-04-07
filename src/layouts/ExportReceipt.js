import React, {
	Component,
} from 'react';
import {
	ListView,
	Text,
	TouchableOpacity,
	TouchableHighlight,
	View,
  Alert,
	TextInput,
	AsyncStorage,
  Image,
  WebView,ScrollView
} from 'react-native';
import { ssApiQueryURL, ssAuthConfig } from '../config/auth';
import {
  PRIMARY_HIGHLIGHT_COLOUR,
  CARD_BACKGROUND_COLOUR,
  BORDER_COLOUR,
	SHADOW_COLOUR
 } from '../global/colours';
  import { HEADER } from '../global/margins';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {
  Button,
  FAB,
  BackgroundView,
	TitleText
 } from '../components';
 import axios from 'axios';
 import PDFView from 'react-native-pdf-view';
 import RNFetchBlob from 'react-native-fetch-blob';
 import Moment from 'moment';
 import Querystring from 'querystring';
 let dirs = RNFetchBlob.fs.dirs;

var Mailer = require('NativeModules').RNMail;


let self;

class ExportReceipt extends Component {
	constructor(props) {
		super(props);

    self = this;

    this.state = {
      receiptDetail : {
        processingState : '',
        uploaded : new Date(),
        note : '',
        url:'/storage/emulated/0/receipt.pdf',
				subject : '',
				emailId : '',
				ccBcc : ''
      },
			isDownloadComplete : false
    }

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

							let accountId = '1481900574';
							let documnetId = "58c2a374e4b04cd8325ff80a";  //pass document id as per row selection
			        let requestUrl = ssApiQueryURL.accounts + accountId + "/documents/" + documnetId + "/";

			        console.log('----->requestUrl : '+requestUrl);

							axios.get(requestUrl, { headers: { Authorization: AuthStr } })
						      .then(response => {
			            console.log(JSON.stringify(response))
			              let receiptData = response.data;
										let processingState = "",uploaded = "",note = "",pdfUrl = "";
										if(receiptData.processingState){
											processingState = receiptData.processingState;
										}
										if(receiptData.uploaded){
											uploaded = Moment(receiptData.uploaded).format("Do MMMM YYYY");
										}
										if(receiptData.note){
											note = receiptData.note;
										}
										if(receiptData.attachment && receiptData.attachment.url){
											pdfUrl = receiptData.attachment.url;
										}

			              self.setState({receiptDetail : {
			                processingState : processingState,
			                uploaded : uploaded,
			                note : note,
			                url : pdfUrl
			              }});

										let curFormatedDate = Moment().format();

										// let filePath = "/storage/emulated/0/receipt_" + curFormatedDate + ".pdf"

										// let filePath = dirs.DocumentDir + '/receipt_'+Moment().format()+'.pdf';
										let filePath = dirs.DocumentDir + '/receipt_'+Moment().format()+'.pdf';

										console.log("--->filePath",filePath);
										RNFetchBlob
										  .config({
										    // add this option that makes response data to be stored as a file,
										    // this is much more performant.
										    fileCache : true,
												path : filePath
										  })
										  .fetch('GET', pdfUrl , {
										    //some headers ..
										  })
										  .then((res) => {
										    // the temp file path
										    ////alert('The file saved to '+ res.path());

												debugger;
												let pdfUrl = res.path();

												self.setState({receiptDetail : {
						                processingState : processingState,
						                uploaded : uploaded,
						                note : note,
						                url : pdfUrl
						              },
													isDownloadComplete : true
												});

										  }).
											then((err) => {
												console.log('-->err : ',err);
										    ////alert('Sorry, something went wrong.Please try again.')
										  });

						      }).catch((error) => {
										console.log('-->error : '+JSON.stringify(error));
										////alert('Sorry, something went wrong.Please try again.')
						      });
						}
				});
			}
		});


		AsyncStorage.multiGet(['AuthStr','curAccountId'],function(err,res)  {
      if(err){
        ////alert('Sorry, something went wrong.Please try again.....');
      }else{
				let AuthStr = res[0][1];
   		// 	let accountId = res[1][1];


        }
      });

		//*************************Api call end***********************************
  }

  onNavigationStateChange (navState) {
          var wb_url=navState.url;
          var lastPart = wb_url.substr(wb_url.lastIndexOf('.') + 1);
          ////alert(JSON.stringify(navState))
          if (lastPart === "pdf") {
            var DEFAULT_URL = {uri:'http://docs.google.com/gview?embedded=true&url='+wb_url};
            self.setState({url:DEFAULT_URL})
         }
    }

	renderPdfViewer(){
		if(this.state.isDownloadComplete){
			return (
				<PDFView
					 ref={(pdf)=>{this.pdfView = pdf;}}
           src={this.state.receiptDetail.url}
           onLoadComplete = {(pageCount)=>{
						  ////alert('pdf loaded.')
              this.pdfView.setNativeProps({
                  zoom: 1
              });
           }}
           style={styles.pdf}/>
			);
		}else{
			return (
				<View style={{flex : 1,justifyContent : 'center',alignItems : 'center'}}>
					<Text>Loading....</Text>
				</View>
			)
		}
	}

	exportReceipt(){
		if(this.state.isDownloadComplete){
			let subject =  this.state.subject;
			let to = this.state.emailId;
			let ccBcc = this.state.ccBcc;

			let pdfPath = this.state.receiptDetail.url;
			// let pdfPath = '/storage/emulated/0/DCIM/Camera/IMG_20170323_225817_HDR.jpg';

			// let recipients = [to];
			let recipients =['kathiriyabm9111210@gmail.com'];

			let ccRecipients =  [];
			if(ccBcc && ccBcc.length > 0){
				ccRecipients = ccBcc.split(',');
			}
			let bccRecipients = [];
			let attachmentName = 'receipt';
			let attachmentList = [{
				path: pdfPath
			}];

			alert('attachmentList : '+JSON.stringify(attachmentList))

			Mailer.mail({
		       subject: subject,
		       recipients: recipients,
		       ccRecipients: ccRecipients,
		       bccRecipients: bccRecipients,
		       body: 'this is body part.....',
					 attachment : {
            name : 'IMG_20170323_225817_HDR',
            path : pdfPath,
            type : 'jpg'
        	 }
		      //  isHTML: true, // iOS only, exclude if false
		      //  attachment: {
		      //    path: pdfPath,  // The absolute path of the file from which to read data.
		      //    type: 'pdf',   // Mime Type: jpg, png, doc, ppt, html, pdf
		      //    name: attachmentName,   // Optional: Custom filename for attachment
		      //  }
					// attachmentList: attachmentList
		     }, (error, event) => {
		         if(error) {
		           alert('error : '+JSON.stringify(error));
		         }else{
							 alert('Receipt exported successfully.');
						 }
		     });
		}else{
			alert("Please wait for sometime.");
		}
	}

	renderSendButton(){
		return (
			<TouchableHighlight style={styles.sendEmailButton} underlayColor = '' onPress={() => this.exportReceipt()}>
				<Text style={{color : 'white'}}>Send</Text>
			</TouchableHighlight>
		)
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
    let {receiptDetail} = this.state;
		return (
			<ScrollView style={styles.container}>

				<View style={styles.innerContainer}>
					{
						this.renderSendButton()
					}
					<TextInput
						style={styles.textInpt}
						onChangeText={(emailId) => this.setState({emailId})}
						value={this.state.emailId}
						placeholder='To'
					/>

					<TextInput
						style={styles.textInpt}
						onChangeText={(ccBcc) => this.setState({ccBcc})}
						value={this.state.ccBcc}
						placeholder='Cc/Bcc'
					/>

					<TextInput
						style={styles.textInpt}
						onChangeText={(subject) => this.setState({subject})}
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
    flex : 1,
    padding: 0,
    paddingTop: HEADER.height,
    backgroundColor : '#eeeeee',
    flexDirection : 'column'
	},
  innerContainer : {
    margin : 15,
    borderRadius : 10,
    backgroundColor : 'white',
    flexDirection : 'column'
  },
  receiptDetailTextView : {
    paddingLeft : 10,
    paddingRight : 10,
    marginTop : 10,
    paddingBottom : 10,
    borderBottomColor : 'grey',
    borderBottomWidth : 1,
    // height : 50,
    justifyContent : 'center'
  },
  receiptDetailText : {
    color : 'black'
  },
  receiptImage : {
    height : 100,
    wifth : 100
  },
	pdfViewPatent : {
		width : window.width,
		height : 500,
		justifyContent : 'center',
		// backgroundColor : 'pink'
	},
  pdf : {
    // height : ,
    // width : window.width,
		flex : 1,
  },
	sendEmailButton : {
		height : 45,
		backgroundColor : 'black',
		justifyContent : 'center',
		alignItems : 'center',
		margin : 5
	},
	textInpt : {
		height: 35,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    // flex: 1,
    fontSize: 13,
    padding: 4,
		margin : 5,
		borderRadius : 3
	}
};

const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps, {

})(ExportReceipt);
