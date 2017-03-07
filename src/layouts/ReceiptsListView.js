import React, {
	Component,
} from 'react';
import {
	ListView,
	Text,
	TouchableOpacity,
	TouchableHighlight,
	View,
  Alert
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { SwipeListView } from 'react-native-swipe-list-view';
import {
  PRIMARY_HIGHLIGHT_COLOUR,
  CARD_BACKGROUND_COLOUR,
  BORDER_COLOUR
 } from '../global/colours';
import {
  MySearchBar,
  Button,
  FAB,
  BackgroundView,
 } from '../components';
 import { HEADER } from '../global/margins';

class ReceiptsListView extends Component {

	constructor(props) {
		super(props);
		console.log(this.props.receiptList);
		console.log(this.props.labelsArray);
		this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
		console.log('state', this.state);
	}


  shouldComponentUpdate(nextProps) {
    if (this.props !== nextProps) {
      return true;
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
		//const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
		//const dataSource = ds.cloneWithRows(receiptlist);
    //this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
		return (
			<BackgroundView style={styles.container}>
				<View style={styles.search}>
					<MySearchBar />
					<Button style={styles.button}> Export </Button>
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
			</BackgroundView>
		);
	}

renderRow(data) {
		console.log('data', data);
		return (
				<TouchableHighlight
					onPress={(rowDat) => console.log('You touched me', rowDat)}
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
				onPress={_ => (console.log(secId, rowId, rowMap))}
			>
				<Text style={styles.backTextWhite}>Export</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={[styles.backRightBtn, styles.backRightBtnRight]}
				onPress={_ => (console.log(secId, rowId, rowMap))}
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
}

const styles = {
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
};

const mapStateToProps = ({ receipts, accounts }) => {
  const {
    myReceipts,
		receiptList
  } = receipts;
  const {
    labelsArray
  } = accounts;
  return {
    myReceipts,
		receiptList,
    labelsArray
  };
};

export default connect(mapStateToProps, {
})(ReceiptsListView);
