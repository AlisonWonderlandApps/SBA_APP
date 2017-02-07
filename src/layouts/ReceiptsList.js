import React, { Component } from 'react';
import { View, ListView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import { AccountListItem, TitleText } from '../components';
import { HEADER } from '../global/margins';

import {
  setCurAccount,
  getAccountInfo,
  getToken
} from '../actions';

const ReceiptsArray = [];
const labels = [];

class ReceiptsList extends Component {

  constructor(props) {
    super(props);
    console.log('list', props.receipts);

    let i;
    for (i = 0; i < props.receipts.length; i++) {
      ReceiptsArray[i] = props.receipts[i];
    }
    for (i = 0; i < ReceiptsArray.length; i++) {
      labels[i] = ReceiptsArray[i].vendor;
      console.log('labelfor', labels[i]);
    }

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.state = {
      dataSource: ds.cloneWithRows(labels),
      loading: false
    };
  }

  componentWillUpdate(nextProps) {
    console.log('update', this.props.nextPage, nextProps.nextPage);
    if (nextProps.currentAccountId !== this.props.currentAccountId) {
      //  this.props = nextProps;
      //  this.getAccountInfo1();
      console.log(nextProps.currentAccountId);
     }
    return true;
  }

  componentDidUpdate() {
    console.log('did', this.props.curAccount, this.props.nextPage);
    if (this.props.nextPage) {
      console.log('gotonext');
      Actions.main();
    }
  }

  onRowPress(rowID) {
    console.log(this.props);
    console.log(rowID);
    this.props.setCurAccount(ReceiptsArray[rowID].id);
    this.getAccountInfo(ReceiptsArray[rowID].id);
  }

  getAccountInfo(aid) {
    console.log(aid, 'accountinfo', this.props.curAccount);
    this.props.getToken(aid);
    //this.props.getAccountInfo(this.props.currentAccountId);
  }

  getData(key, index, defaultVal = 'default') {
    return this.state.accounts[index][key] || defaultVal;
  }

  renderRow(rowData, sectionID, rowID) {
    return (
      <AccountListItem
        onPress={this.onRowPress.bind(this, rowID)}
        index={rowID}
        titleLabel={rowData}
        data={this.props}
      />
    );
  }

  render() {
    return (
      <View style={{ justifyContent: 'center', paddingTop: HEADER.height, flex: 1 }}>
      <TitleText style={{ alignSelf: 'center', paddingTop: 30 }}> Choose Account </TitleText>
        <ListView
          style={{ flex: 1, marginTop: 20 }}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
        />
        <Spinner
          visible={this.props.isFetching}
          textContent={'Loading...'}
          textStyle={{ color: 'white' }}
        />
      </View>
    );
  }
}

const mapStateToProps = ({ accounts, main }) => {
  const {
    accountsArr,
    curAccount
  } = accounts;
  const {
    isFetching,
    currentAccountId,
    receipts,
    processing,
    processingCount,
    reimburseables,
    reimburseableCount,
    latestReceipt,
    nextPage
  } = main;
  return {
    accountsArr,
    curAccount,
    isFetching,
    currentAccountId,
    receipts,
    processing,
    processingCount,
    reimburseables,
    reimburseableCount,
    latestReceipt,
    nextPage
  };
};


export default connect(mapStateToProps, {
 setCurAccount, getAccountInfo, getToken
})(ReceiptsList);