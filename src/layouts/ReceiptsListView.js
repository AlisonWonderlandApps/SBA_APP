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
	Platform
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { SwipeListView } from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import Spinner from 'react-native-loading-spinner-overlay';
import ImagePicker from 'react-native-image-picker';
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
 import {
	searchTextChanged,
	deleteReceipt,
	loadAReceipt,
	exportReceipt,
	setFetching
	} from '../actions';

let self;

class ReceiptsListView extends Component {

	constructor(props) {
		super(props);

		self = this;

		//console.log(self.props.myReceipts);
		//console.log(this.props.receiptList);
		//console.log(this.props.categories);
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
		if (this.props.numOfReceipts < 1) {
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
						dataSource={this.ds.cloneWithRows(this.props.myReceipts)}
						renderRow={(data, rowId) => this.renderRow(data, rowId)}
						renderHiddenRow={(secId, rowId, rowMap) => this.renderHiddenRow(secId, rowId, rowMap)}
						rightOpenValue={-150}
						recalculateHiddenLayout
						//previewFirstRow
				/>
				<FAB
          onPress={this.onPressFAB}
				/>
				<Spinner
					visible={this.props.isFetching}
					textContent={''}
					textStyle={{ color: 'white' }}
				/>
			</BackgroundView>
		);
	}

	onPressFAB() {
		const options = {
			title: 'Choose Photo Source',
			storageOptions: {
				skipBackup: true,
				path: 'images'
			}
		};

	ImagePicker.showImagePicker(options, (response) => {
		//console.log('this.props.curAccountID', self.props.curAccountID);
		//console.log('response', response);
		//self.props.setFetching();
			if (response.didCancel) {
				//console.log('User cancelled image picker');
			} else if (response.error) {
				Alert('Error in ImagePicker', response.error);
			} else if (response.customButton) {
				//console.log('User tapped custom button: ', response.customButton);
			} else {
				let image = '';
				if (Platform.OS === 'ios') {
					image = response.origURL;
				} else {
					image = response.path;
				}
				//console.log('image', image);
				const source = { uri: response.uri };
				self.props.addReceiptFromImage(self.props.curAccountID, response, image, source);
		}
	});
}

	onSearchChange(text) {
		this.props.searchTextChanged(text);
	}

	renderRow(data, rowId) {
		//console.log('data', data, rowId);
		return (
				<TouchableHighlight
					onPress={() => this.load(data, rowId)}
					underlayColor={'#AAA'}
					style={styles.rowFront}
				>
					<View>
						<View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
							<Text> {this.renderName(data)} </Text>
							<Text> {this.renderCost(data)} </Text>
						</View>
						<View>
							<Text> {this.renderDate(data)} </Text>
							<Text> {this.renderCategories(data)} </Text>
						</View>
					</View>
				</TouchableHighlight>
		);
	}

	renderName(data) {
		if (data.vendor === undefined) {
			return 'Unknown';
		}
		return data.vendor;
	}

	renderCost(data) {
		let total = '';
		if (data.total === undefined) {
			total = '$ --';
		}	else {
			total = '$'.concat(data.total.toFixed(2));
		}
		return total;
	}

	renderDate(data) {
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

	renderCategories(data) {
		let category = '';
		if (data.categories === undefined || data.categories.length < 1) {
			category = 'No categories';
		} else {
			let j = 0;
			category = data.categories[j];
			for (j = 1; j < data.categories.length; j++) {
				category += ', '.concat(data.categories[j]);
			}
		}
		//console.log(category);
		return category;
}

	load(data, rowId) {
		//console.log('load', data, rowId);
		this.props.loadAReceipt(data, rowId);
		Actions.receiptInfo();
	}

	renderHiddenRow(secId, rowId, rowMap) {
		return (
		<View style={styles.rowBack}>
			<TouchableOpacity
				style={[styles.backRightBtn, styles.backRightBtnLeft]}
				onPress={() => (this.exportItem(secId, rowId, rowMap))}
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
		//console.log('secId', secId, 'rowId', rowId, 'rowMap', rowMap);
		//console.log('obj', secId.id, 'acc', this.props.curAccountID);
		Alert.alert(
			'Confirmation Required!',
			'Are you sure you want to delete this receipt?',
      [
        { text: 'Delete',
					onPress: () => this.props.deleteReceipt(this.props.curAccountID, secId.id) },
        { text: 'Cancel', onPress: () => console.log('cancel'), style: 'cancel' }
      ]
    );
	}

	exportItem(rowMap, secId, rowId) {
		//console.log('secId', secId, 'rowId', rowId, 'rowMap', rowMap);
		// this.props.exportReceipt(this.props.curAccountID, rowMap.id);
		//Actions.export();

		Actions.exportReceipt();
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
    padding: 10,
		backgroundColor: CARD_BACKGROUND_COLOUR,
		borderBottomColor: BORDER_COLOUR,
		borderBottomWidth: 1,
		justifyContent: 'center'
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

const mapStateToProps = ({ accounts, receipts, searchIt }) => {
	const {
		curAccountID
	} = accounts;
	const {
		searchQuery
	} = searchIt;
  const {
		isFetching,
    myReceipts,
		categories,
		numOfReceipts
  } = receipts;
  return {
		curAccountID,
		isFetching,
    myReceipts,
		searchQuery,
		categories,
		numOfReceipts
  };
};

export default connect(mapStateToProps, {
		searchTextChanged, deleteReceipt, loadAReceipt, exportReceipt, setFetching
})(ReceiptsListView);
