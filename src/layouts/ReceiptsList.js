import React, {
	Component,
} from 'react';
import {
	ListView,
	Text,
	TouchableOpacity,
	TouchableHighlight,
	View,
} from 'react-native';
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

const ReceiptsList = (props) => {
		this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    console.log(props);
    //const dataSource = ds.cloneWithRows(receiptlist);
    //this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
		return (
    <View style={{ flex: 1, padding: 0 }}>
      <View style={styles.search}>
            <MySearchBar />
            <Button style={styles.button}> Export </Button>
          </View>
          <SwipeListView
              dataSource={this.ds.cloneWithRows(props.data)}
              renderRow={data => (
                <TouchableHighlight
                  onPress={console.log('You touched me', data)}
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
                )}
              renderHiddenRow={(data, secId, rowId, rowMap) => (
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
              )}
              rightOpenValue={-150}
              recalculateHiddenLayout
              previewFirstRow
          />
      </View>
		);
	};

  /*		<View style={styles.search}>
        <MySearchBar />
        <Button style={styles.button}> Export </Button>
      </View>
      <SwipeListView
          dataSource={this.ds.cloneWithRows(props.data)}
          renderRow={data => (
            <TouchableHighlight
              onPress={console.log('You touched me', data)}
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
            )}
          renderHiddenRow={(data, secId, rowId, rowMap) => (
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
          )}
          rightOpenValue={-150}
          recalculateHiddenLayout
          previewFirstRow
      /> */

const styles = ({
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

export { ReceiptsList };
