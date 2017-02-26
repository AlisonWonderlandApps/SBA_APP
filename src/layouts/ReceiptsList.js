import React, { Component } from 'react';
import { Text, View, ListView } from 'react-native';
//import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { SwipeListView } from 'react-native-swipe-list-view';
//import Spinner from 'react-native-loading-spinner-overlay';
//import { HEADER } from '../global/margins';
import {
  //AccountListItem,
//  TitleText,
  BackgroundView
 } from '../components';

class ReceiptsList extends Component {

  shouldComponentUpdate(nextProps) {
    if (this.props !== nextProps) {
      return true;
    }
    return false;
  }

  deleteRow(secId, rowId, rowMap) {
    rowMap[`${secId}${rowId}`].closeRow();
    //const newData = [...this.props.myReceipts];
    //newData.splice(rowId, 1);
    //this.setState({ listViewData: newData });
  }

  render() {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    return (
      <BackgroundView>
        <SwipeListView
          dataSource={ds.cloneWithRows(this.props.myReceipts)}
          renderRow={data => (
            <View style={styles.rowFront}>
              <Text> I am {data} </Text>
            </View>
          )}
            renderHiddenRow={data => (
                <View style={styles.rowBack}>
                    <Text>Left</Text>
                    <Text>Right</Text>
                </View>
            )}
            leftOpenValue={75}
            rightOpenValue={-75}
        />
          )}
        >
      </BackgroundView>
    );
  }
}

const styles = {
  rowFront: {

  },
  rowBack: {

  }
};

const mapStateToProps = ({ receipts }) => {
  const {
    myReceipts
  } = receipts;
  return {
    myReceipts
  };
};

export default connect(mapStateToProps, {

})(ReceiptsList);
