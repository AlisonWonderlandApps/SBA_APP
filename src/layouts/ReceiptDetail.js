
import React, {
	Component,
} from 'react';
import {
	Text,
	View,
  Alert,
	AsyncStorage,
  WebView
} from 'react-native';
import { connect } from 'react-redux';
//import { Actions } from 'react-native-router-flux';
import axios from 'axios';
//import PDFView from 'react-native-pdf-view';
import { HEADER } from '../global/margins';
import { ssApiQueryURL } from '../config/auth';


let self;

class ReceiptDetail extends Component {

	constructor(props) {
		super(props);

    self = this;
    // var uri = {
    //   html:"<html> <body><h1>To Open the <a href='http://www.adobe.com/content/dam/Adobe/en/devnet/acrobat/pdfs/pdf_open_parameters.pdf'>PDF</a></h1></body></html>"
    // };
    const uri = {
      html: "<html> <body><h1>To Open the <a href='http://www.adobe.com'>PDF</a></h1></body></html>"
    };

    this.state = {
      receiptDetail: {
        processingState: '',
        uploade: new Date(),
        note: '',
        url: uri
      }
    };
    this.getReceiptDetail();
	}

  getReceiptDetail() {
		//**************************Api call start *******************************
		AsyncStorage.multiGet(['AuthStr', 'curAccountId'], (err, res) => {
      if (err) {
        Alert('Sorry, something went wrong.Please try again.....');
      } else {
				const AuthStr = res[0][1];
				const accountId = res[1][1];

				const documnetId = '58c2a374e4b04cd8325ff80a';  //pass document id as per row selection
        const requestUrl = ssApiQueryURL.accounts + accountId + '/documents/' + documnetId + '/';

        console.log('----->requestUrl : ', requestUrl);

				axios.get(requestUrl, { headers: { Authorization: AuthStr }
				}).then(response => {
              Alert(JSON.stringify(response.data));
              // let receptData = response.data;
              // self.setState({receiptDetail : {
              //   processingState : receptData.processingState,
              //   uploaded : receptData.uploaded,
              //   note : receptData.note,
              //   url : ''
              // }})
							// if(response.status == 204){
							// 	alert('Receipt deleted successfully.');
							// }else{
							// 	alert('response ==> '+JSON.stringify(response));
						}).catch((error) => {
								console.log(error);
								Alert('Sorry something went wrong.Please try again latter.');
							});
						}
      });

		//*************************Api call end***********************************
  }

  onNavigationStateChange(navState) {
          const WbURL = navState.url;
          const lastPart = WbURL.substr(WbURL.lastIndexOf('.') + 1);
          Alert(JSON.stringify(navState));
          if (lastPart === 'pdf') {
            const DEFAULT_URL = { uri: 'http://docs.google.com/gview?embedded=true&url='.concat(WbURL) };
            self.setState({ url: DEFAULT_URL });
         }
    }

	render() {
    const { receiptDetail } = this.state;
		return (
			<View style={styles.container}>
        <View style={styles.innerContainer}>
            <View style={styles.receiptDetailTextView}>
              <Text style={styles.receiptDetailText}>{receiptDetail.processingState}</Text>
            </View>

            <View style={styles.receiptDetailTextView}>
              <Text style={styles.receiptDetailText}>
								Date Submitted: {receiptDetail.uploaded.toString()}
							</Text>
            </View>

            <View
							style={
								[styles.receiptDetailTextView,
									{ borderBottomColor: 'white', borderBottomWidth: 0 }
								]}
						>
              <Text style={styles.receiptDetailText}>Note : </Text>
              <Text style={styles.receiptDetailText}>{receiptDetail.note}</Text>
            </View>
        </View>

        <WebView
          // ref={WEBVIEW_REF}
          automaticallyAdjustContentInsets={false}
          source={{ uri: 'http://docs.google.com/gview?embedded=true&url=http://www.pdf995.com/samples/pdf.pdf' }}
          javaScriptEnabled
          domStorageEnabled
          decelerationRate="normal"
          startInLoadingState
          scalesPageToFit
				/>

      </View>
		);
	}
}

// <PDFView ref={(pdf)=>{this.pdfView = pdf;}}
//                  src={"http://www.pdf995.com/samples/pdf.pdf"}
//                  onLoadComplete = {(pageCount)=>{
//                     this.pdfView.setNativeProps({
//                         zoom: 1.5
//                     });
//                  }}
//                  style={styles.pdf}/>

// <Image
//   source={{ uri : 'https://s3-ap-southeast-2.amazonaws.com/sba-render/1481900574%7Cdocument_58c2a374e4b04cd8325ff80a.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20170311T093833Z&X-Amz-SignedHeaders=host&X-Amz-Expires=900&X-Amz-Credential=AKIAJD3UILPK5DBPFNHA%2F20170311%2Fap-southeast-2%2Fs3%2Faws4_request&X-Amz-Signature=14326c6a91664aad096cef195553dd5e66e8b6d1cfd3f85856382f851c30ba0b'}}
//   style={[styles.receiptImage]}
// />

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
  pdf: {
    height: 300,
    width: 300
  }
};

const mapStateToProps = ({}) => {
  return {};
};

export default connect(mapStateToProps, {

})(ReceiptDetail);
