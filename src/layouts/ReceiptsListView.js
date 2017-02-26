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
  BackgroundView
 } from '../components';
 import { HEADER } from '../global/margins';

class ReceiptsListView extends Component {

	constructor(props) {
		super(props);
	//	this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
		this.state = {
			//basic: true,
			//listViewData: Array(20).fill('').map((_, i) => `item #${i}`)
		};
    console.log('constructor', this.props);
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
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
		return (
			<BackgroundView style={styles.container}>
      <View style={styles.search}>
        <MySearchBar />
        <Button style={styles.button}> Export </Button>
      </View>
					<SwipeListView
						dataSource={this.ds.cloneWithRows(this.props.myReceipts)}
						renderRow={data => (
							<TouchableHighlight
								onPress={console.log('You touched me')}
								style={styles.rowFront}
								underlayColor={'#AAA'}
							>
								<View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                    <Text> {data.vendor} </Text>
                    <Text> ${data.total} </Text>
                  </View>
                  <View>
                    <Text> {data.uploaded} </Text>
                    <Text> {data.categories} </Text>
                  </View>
                </View>
							</TouchableHighlight>
						)}
						renderHiddenRow={(data, secId, rowId, rowMap) => (
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
						)}
						rightOpenValue={-150}
					/>
          <FAB
            onPress={this.onPressFAB}
          />
			</BackgroundView>
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
