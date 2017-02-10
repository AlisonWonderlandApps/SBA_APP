import React, { Component } from 'react';
import { Alert, ListView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import { BackgroundView, AccountListItem, TitleText, FAB } from '../components';
import { HEADER } from '../global/margins';

import {
  setCurAccount,
  setCurAccountName,
  getAccountInfo,
  getToken,
  setPlan,
  setPlanType
} from '../actions';

const AccountArray = [];
const labels = [];

class AccountsList extends Component {

  constructor(props) {
    super(props);
    console.log('list', props.accList);

    let i;
    for (i = 0; i < props.accList.length; i++) {
      AccountArray[i] = props.accList[i];
    }
    for (i = 0; i < AccountArray.length; i++) {
      labels[i] = AccountArray[i].label;
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
    this.props.setCurAccount(AccountArray[rowID], AccountArray[rowID].id);
    this.getAccountInfo(AccountArray[rowID].id);
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
      <BackgroundView style={{ justifyContent: 'center', paddingTop: HEADER.height, flex: 1 }}>
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
        <FAB
          onPress={this.addAccount}
        />
      </BackgroundView>
    );
  }

  addAccount() {
    console.log('add account FAB pressed');
    Alert.alert(
      'Sorry',
      'This feature not functional yet :(',
      [
        { text: 'OK' }
      ]
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
    trips,
    processing,
    processingCount,
    reimburseables,
    reimburseableCount,
    latestReceipt,
    latestTrip,
    nextPage
  } = main;
  return {
    accountsArr,
    curAccount,
    isFetching,
    currentAccountId,
    trips,
    processing,
    processingCount,
    reimburseables,
    reimburseableCount,
    latestReceipt,
    latestTrip,
    nextPage
  };
};


export default connect(mapStateToProps, {
 setCurAccount, setCurAccountName, getAccountInfo, getToken, setPlan, setPlanType
})(AccountsList);
