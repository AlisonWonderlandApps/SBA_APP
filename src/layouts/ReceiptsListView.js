import React, {
	Component,
} from 'react';
import {
	ListView,
	StyleSheet,
	Text,
	TouchableOpacity,
	TouchableHighlight,
	View,
  Alert
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import {
  PRIMARY_HIGHLIGHT_COLOUR,
  CARD_BACKGROUND_COLOUR,
  BORDER_COLOUR,
	BRAND_COLOUR_RED,
	BRAND_COLOUR_GREEN
 } from '../global/colours';
import {
  MySearchBar,
  Button,
  FAB,
  BackgroundView
 } from '../components';
 import { HEADER } from '../global/margins';

const receiptlist = [];

class ReceiptsListView extends Component {

	constructor(props) {
		super(props);
		this.setReceiptsList(this.props.myReceipts);
		const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
		this.state = {
			dataSource: ds.cloneWithRows(receiptlist)
		};
		console.log('state', this.state);
	}


  shouldComponentUpdate(nextProps) {
    if (this.props !== nextProps) {
      return false;
    }
    return false;
  }

	deleteRow(secId, rowId, rowMap) {
		rowMap[`${secId}${rowId}`].closeRow();
    console.log('delete', secId, rowId, rowMap);

		const newData = [...this.state.listViewData];
		newData.splice(rowId, 1);
		this.setState({ listViewData: newData });
	}

	render() {
    //this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
		return (
			<BackgroundView style={styles.container}>
				<View style={styles.search}>
					<MySearchBar />
					<Button style={styles.button}> Export </Button>
				</View>
				<SwipeListView
						dataSource={this.state.dataSource}
						renderRow={this.renderRow.bind(this)}
				>
					<SwipeRow
						renderHiddenRow={this.renderHiddenRow.bind(this)}
						rightOpenValue={-150}
					/>
				</SwipeListView>
				<FAB
            onPress={this.onPressFAB}
				/>
			</BackgroundView>
		);
	}

	renderRow(data) {
		console.log('data', data);
		return (
			<TouchableHighlight
				//onPress={console.log('You touched me')}
				style={styles.rowFront}
				underlayColor={'#AAA'}
			>
				<View>
					<View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
						<Text> {data.vendor} </Text>
						<Text> {data.total} </Text>
					</View>
					<View>
						<Text> {data.date} </Text>
						<Text> {data.category} </Text>
					</View>
				</View>
			</TouchableHighlight>
		);
	}

	renderHiddenRow(data, secId, rowId, rowMap) {
		return (
			<View style={styles.rowBack}>
				<View style={[styles.backRightBtn, styles.backRightBtnLeft]}>
					<Text style={styles.backTextWhite}>Export</Text>
				</View>
				<TouchableOpacity
					style={[styles.backRightBtn, styles.backRightBtnRight]}
					onPress={_ => this.deleteRow(secId, rowId, rowMap)}
				>
					<Text style={styles.backTextWhite}>Delete</Text>
				</TouchableOpacity>
			</View>
		);
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

setReceiptsList(list) {
  //console.log('listlength', list.length);
  let vendor = '';
  let total = '';
  let date = '';
  let category = '';
  for (let i = 0; i < list.length; i++) {
    vendor = list[i].vendor;
		//console.log('for', list[i].total);
		if (list[i].total === undefined) {
			//console.log('if', list[i].total);
			total = '$0.00';
		}	else {
			total = '$'.concat(list[i].total.toFixed(2));
		}
		//console.log(total);
    const formattedDate = new Date(list[i].issued).toString();
		console.log('formatted', formattedDate);
	//	if (year !== Date) {
	//		console.log('invalidDate', year);
//			date = 'unknown';
//		} else {
			console.log('year', year);
			let year = formattedDate.substring(11, 15);
			year = ' '.concat(year);
			date = formattedDate.substring(4, 10).concat(year);
//		}
		if (list[i].categories === undefined || list[i].categories.length < 1) {
			category = 'No categories';
    } else {
			console.log(list[i].categories[0]);
			let j = 0;
				category += list[i].categories[j];
      for (j = 1; j < list[i].categories.length; j++) {
        category += ', '.concat(list[i].categories[j]);
      }
			console.log('cat', category);
    }

    receiptlist[i] = {
      vendor,
      total,
      date,
      category
    };
    vendor = '';
    total = '';
    date = '';
    category = '';
    //console.log('receipt', i, receiptlist[i]);
  }
 }
}

const styles = StyleSheet.create({
  search: {
    flexDirection: 'row',
    padding: 10,
    height: 60,
    backgroundColor: PRIMARY_HIGHLIGHT_COLOUR
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
	rowFront: {
		//alignItems: 'center',
    flex: 1,
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
	}
});

const mapStateToProps = ({ receipts, accounts }) => {
  const {
    myReceipts
  } = receipts;
  const {
    labelsArray
  } = accounts;
  return {
    myReceipts,
    labelsArray
  };
};

export default connect(mapStateToProps, {
})(ReceiptsListView);
