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
	AsyncStorage
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { SwipeListView } from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import Spinner from 'react-native-loading-spinner-overlay';
import { ssApiQueryURL } from '../config/auth';
import axios from 'axios';
import RNFetchBlob from 'react-native-fetch-blob';
import {
  PRIMARY_HIGHLIGHT_COLOUR,
  CARD_BACKGROUND_COLOUR,
  BORDER_COLOUR,
	SHADOW_COLOUR
 } from '../global/colours';
import {
  Button,
  FAB,
  BackgroundView,
	TitleText
 } from '../components';
 import { HEADER } from '../global/margins';
 import { searchTextChanged } from '../actions';

let self;

class ReceiptsListView extends Component {

	constructor(props) {
		super(props);

		self = this;

		console.log(this.props.receiptList);
		this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
	}

  shouldComponentUpdate(nextProps) {
    if (this.props !== nextProps) {
      return true;
    } else if (this.props.searchQuery !== nextProps.searchQuery) {
			return true;
		}
    return false;
  }

	render() {
		if (this.props.receiptList.length < 1) {
			return (
				<BackgroundView style={styles.emptyContainer}>
					<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
						<TitleText> No Receipts </TitleText>
					</View>
					<FAB
						onPress={this.onPressFAB}
					/>
				</BackgroundView>
			);
		}
		return (
			<BackgroundView style={styles.container}>
				<View style={styles.search}>
						<View style={{ flexGrow: 1, height: 35, paddingTop: 5 }}>
							<View style={styles.searchStyle}>
								<View style={styles.searchbar}>
									<Icon
										name="search"
										size={15}
										color="#ddd"
									/>
									<TextInput
										style={{ flexGrow: 1, width: null, paddingLeft: 5 }}
										placeholder='search'
										placeholderTextColor='lightgray'
										onChangeText={this.onSearchChange.bind(this)}
										value={this.props.searchQuery}
										onFocus={() => console.log('hi')}
									/>
								</View>
							</View>
						</View>
						<Button
							style={styles.button}
							//onPress={this.searchText()}
						>
							Search
						</Button>
					</View>
				<SwipeListView
						dataSource={this.ds.cloneWithRows(this.props.receiptList)}
						renderRow={(data) => this.renderRow(data)}
						renderHiddenRow={(secId, rowId, rowMap) => this.renderHiddenRow(secId, rowId, rowMap)}
						rightOpenValue={-150}
						recalculateHiddenLayout
						previewFirstRow
				/>
				<FAB
            onPress={this.onPressFAB}
				/>
				<Spinner visible={this.props.loading} textContent={''} textStyle={{ color: 'white' }} />
			</BackgroundView>
		);
	}

	onSearchChange(text) {
		this.props.searchTextChanged(text);
	}

	renderRow(data) {
		//console.log('data', data);
		return (
				<TouchableHighlight
					onPress={() => Actions.receiptdetail()}
					underlayColor={'#AAA'}
					style={styles.rowFront}
				>
					<View>
						<View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
							<Text> {`${data.vendor}`} </Text>
							<Text> {`${data.total}`} </Text>
						</View>
						<View>
							<Text> {`${data.date}`} </Text>
							<Text> {`${data.category}`} </Text>
						</View>
					</View>
				</TouchableHighlight>
		);
	}

	renderHiddenRow(secId, rowId, rowMap) {
		return (
		<View style={styles.rowBack}>
			<TouchableOpacity
				style={[styles.backRightBtn, styles.backRightBtnLeft]}
				// onPress={() => (this.deleteItem(secId, rowId, rowMap))}
			>
				<Text style={styles.backTextWhite}>Export</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={[styles.backRightBtn, styles.backRightBtnRight]}
				onPress={() => (this.deleteItem(secId, rowId, rowMap))}
			>
				<Text style={styles.backTextWhite}>Delete</Text>
			</TouchableOpacity>
		</View>
		);
	}

	deleteItem(secId, rowId, rowMap) {
			// rowMap[`${secId}${rowId}`].closeRow();

			//**************************Api call start *******************************
			AsyncStorage.multiGet(['AuthStr','curAccountId'],function(err,res)  {
        if(err){
          alert('Sorry, something went wrong.Please try again.....');
        }else{
					let AuthStr = res[0][1];
					console.log('------------AuthStr : '+AuthStr);
     			//let accountId = res[1][1];

					let accountId = "1481900574";
					let documnetId = "52910d0de4b06f6f8ca3abeb";  //pass document id as per row selection
          let requestUrl = ssApiQueryURL.accounts + accountId + "/documents/" + documnetId + "/";

					axios.get(requestUrl, { headers: { Authorization: AuthStr } })
				      .then(response => {
								let responseData = JSON.parse(JSON.stringify(response));
								console.log('------->responseData',responseData);
								if(response.status == 200){
									let jsonToUpate = responseData.data;
									jsonToUpate.trashed = true;
											console.log('------------>jsonToUpate',jsonToUpate);

											RNFetchBlob.fetch('PUT', requestUrl, {
												 Authorization : AuthStr,
												 'Content-Type' : 'application/json',
											 }, JSON.stringify(jsonToUpate)).then((resp) => {

												 alert('Receipt deleted successfully.')
											 }).catch((err) => {
												 console.log('delete error',err);
												 alert('Sorry something went wrong.Please try again latter.');
											 })

								}else{
									alert('Sorry something went wrong.Please try again latter.(status code : '+response.status+")");
								}
				      }).catch((error) => {
								  console.log("error",error);
				          alert('Sorry something went wrong.Please try again latter.');
				      });
          }
        });

			//*************************Api call end***********************************
	}

	exportItem(secId, rowId, rowMap) {

	}

  onPressFAB() {
    console.log('FAB pressed');
    Alert.alert(
      'Choose Photo Source',
      null,
      [
        { text: 'Camera', onPress: () => Actions.camera() },
        { text: 'Photo Library', onPress: () => Actions.photos() },
        { text: 'Cancel', onPress: () => console.log('cancel'), style: 'cancel' }
      ]
    );
  }
}

const styles = {
  search: {
    flexDirection: 'row',
    padding: 10,
    height: 60,
    backgroundColor: PRIMARY_HIGHLIGHT_COLOUR
  },
	searchbar: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingLeft: 5
	},
  button: {
    marginTop: 0,
    height: 30,
    flexGrow: 0.3
  },
	container: {
    padding: 0,
    paddingTop: HEADER.height
	},
	emptyContainer: {
		flex: 1,
		padding: 0,
		paddingTop: HEADER.height,
		justifyContent: 'center'
	},
	rowFront: {
		//alignItems: 'center',
    padding: 10,
		backgroundColor: CARD_BACKGROUND_COLOUR,
		borderBottomColor: BORDER_COLOUR,
		borderBottomWidth: 1,
		justifyContent: 'center',
		//height: 100,
	},
	rowBack: {
		alignItems: 'center',
		backgroundColor: '#DDD',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingLeft: 15,
	},
	backRightBtn: {
		alignItems: 'center',
		bottom: 0,
		justifyContent: 'center',
		position: 'absolute',
		top: 0,
		width: 75
	},
	backRightBtnLeft: {
		backgroundColor: 'blue',
		right: 75
	},
	backRightBtnRight: {
		backgroundColor: 'red',
		right: 0
	},
	controls: {
		alignItems: 'center',
		marginBottom: 30
	},
	switchContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginBottom: 5
	},
	switch: {
		alignItems: 'center',
		borderWidth: 1,
		borderColor: 'black',
		paddingVertical: 10,
		width: 100,
	},
	searchStyle: {
		flex: 1,
		flexDirection: 'row',
		alignSelf: 'stretch',
		padding: 5,
		justifyContent: 'flex-start',
		alignItems: 'center',
		backgroundColor: CARD_BACKGROUND_COLOUR,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: 'grey',
		marginLeft: 5,
		marginRight: 5,
		shadowColor: SHADOW_COLOUR,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 2,
	},
};

const mapStateToProps = ({ receipts, searchIt }) => {
	const {
		searchQuery
	} = searchIt;
  const {
    myReceipts,
		receiptList
  } = receipts;
  return {
    myReceipts,
		receiptList,
		searchQuery
  };
};

export default connect(mapStateToProps, {
		searchTextChanged
})(ReceiptsListView);
