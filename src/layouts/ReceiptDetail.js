
import React, {
	Component,
} from 'react';
import {
	Text,
	View,
	AsyncStorage,
	window
} from 'react-native';
import axios from 'axios';
import PDFView from 'react-native-pdf-view';
import RNFetchBlob from 'react-native-fetch-blob';
import Moment from 'moment';
import { connect } from 'react-redux';
import { HEADER } from '../global/margins';
import { ssApiQueryURL } from '../config/auth';


let self;

class ReceiptDetail extends Component {

	constructor(props) {
		super(props);

    self = this;

    this.state = {
      receiptDetail: {
        processingState: '',
        uploaded: new Date(),
        note: '',
        url: '/storage/emulated/0/receipt.pdf',
      },
			isDownloadComplete: false
    };

    this.getReceiptDetail();
	}

  getReceiptDetail() {
		//**************************Api call start *******************************
		AsyncStorage.multiGet(['AuthStr', 'curAccountId'], (err, res) => {
      if (err) {
        ////alert('Sorry, something went wrong.Please try again.....');
      } else {
				const AuthStr = res[0][1];

				const accountId = '1481900574';
				const documnetId = '58c2a374e4b04cd8325ff80a';  //pass document id as per row selection
        const requestUrl = ssApiQueryURL.accounts
					.concat(accountId).concat('/documents/')
					.concat(documnetId).concat('/');

        console.log('----->requestUrl : ', requestUrl);

				axios.get(requestUrl, { headers: { Authorization: AuthStr } })
					.then(response => {
            console.log(JSON.stringify(response));
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

              self.setState({ receiptDetail: {
                processingState,
                uploaded,
                note,
                url: pdfUrl
              } });

							const curFormatedDate = Moment().format();

							const filePath = '/storage/emulated/0/receipt_'.concat(curFormatedDate).concat('.pdf');

							RNFetchBlob
								.config({
									// add this option that makes response data to be stored as a file,
									// this is much more performant.
									fileCache: true,
								//	path : filePath
							})
							.fetch('GET', pdfUrl, {
								//some headers ..
							})
							.then((resp) => {
								// the temp file path
								////alert('The file saved to '+ res.path());

									pdfUrl = resp.path();

									self.setState({ receiptDetail: {
										processingState,
										uploaded,
										note,
										url: pdfUrl
									},
										isDownloadComplete: true
									});
								}).then((error) => {
									console.log('-->err : ', JSON.stringify(error));
									////alert('Sorry, something went wrong.Please try again.')
								});
							}).catch((error) => {
							console.log('-->error : ', JSON.stringify(error));
							////alert('Sorry, something went wrong.Please try again.')
						});
        }
      });

		//*************************Api call end***********************************
  }

onNavigationStateChange(navState) {
    const WbURL = navState.url;
    const lastPart = WbURL.substr(WbURL.lastIndexOf('.') + 1);
    ////alert(JSON.stringify(navState))
    if (lastPart === 'pdf') {
        const DEFAULT_URL = { uri: 'http://docs.google.com/gview?embedded=true&url='.concat(WbURL) };
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

	render() {
    const { receiptDetail } = this.state;
		return (
			<View style={styles.container}>
        <View style={styles.innerContainer}>
            <View style={styles.receiptDetailTextView}>
              <Text style={styles.receiptDetailText}>{receiptDetail.processingState}</Text>
            </View>

            <View style={styles.receiptDetailTextView}>
              <Text
								style={styles.receiptDetailText}
							>
								Date Submitted: {receiptDetail.uploaded.toString()}
							</Text>
            </View>

            <View style={[styles.receiptDetailTextView, { borderBottomColor: 'white', borderBottomWidth: 0 }]}>
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
  }
};

const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps, {

})(ReceiptDetail);
