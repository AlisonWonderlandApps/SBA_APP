
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
  WebView
} from 'react-native';
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
 import { ssApiQueryURL } from '../config/auth';
 import axios from 'axios';
 import PDFView from 'react-native-pdf-view';
 import RNFetchBlob from 'react-native-fetch-blob';
 import Moment from 'moment';

let self;

class ReceiptDetail extends Component {

	constructor(props) {
		super(props);

    self = this;

    this.state = {
      receiptDetail : {
        processingState : '',
        uploaded : new Date(),
        note : '',
        url:'/storage/emulated/0/receipt.pdf',
      },
			isDownloadComplete : false
    }

    this.getReceiptDetail();
	}

  getReceiptDetail(){
		//**************************Api call start *******************************
		AsyncStorage.multiGet(['AuthStr','curAccountId'],function(err,res)  {
      if(err){
        ////alert('Sorry, something went wrong.Please try again.....');
      }else{
				let AuthStr = res[0][1];
   		// 	let accountId = res[1][1];

				let accountId = '1481900574';
				let documnetId = "58cb869be4b0a70b542071ca";  //pass document id as per row selection
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

							let filePath = "/storage/emulated/0/receipt_" + curFormatedDate + ".pdf"

							RNFetchBlob
							  .config({
							    // add this option that makes response data to be stored as a file,
							    // this is much more performant.
							    fileCache : true,

								//	path : filePath
							  })
							  .fetch('GET', pdfUrl , {
							    //some headers ..
							  })
							  .then((res) => {
							    // the temp file path
							    ////alert('The file saved to '+ res.path());

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
									console.log('-->err : '+JSON.stringify(err));
							    ////alert('Sorry, something went wrong.Please try again.')
							  });

			      }).catch((error) => {
							console.log('-->error : '+JSON.stringify(error));
							////alert('Sorry, something went wrong.Please try again.')
			      });
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

	render() {
    let {receiptDetail} = this.state;
		return (
			<View style={styles.container}>
        <View style={styles.innerContainer}>
            <View style={styles.receiptDetailTextView}>
              <Text style={styles.receiptDetailText}>{receiptDetail.processingState}</Text>
            </View>

            <View style={styles.receiptDetailTextView}>
              <Text style={styles.receiptDetailText}>Date Submitted :  {receiptDetail.uploaded.toString()}</Text>
            </View>

            <View style={[styles.receiptDetailTextView,{borderBottomColor : 'white',borderBottomWidth : 0}]}>
              <Text style={styles.receiptDetailText}>Note : </Text>
              <Text style={styles.receiptDetailText}>{receiptDetail.note}</Text>
            </View>
        </View>

				<View style={styles.pdfViewPatent}>
				{
					this.renderPdfViewer()
				}
				</View>

      </View>
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
  }
};

const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps, {

})(ReceiptDetail);
