import React, { Component } from 'react';
import { View, ListView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import { AccountListItem, Button, MyMapView } from '../components';
import { HEADER } from '../global/margins';

import {
  setCurAccount,
  getAccountInfo,
  getToken
} from '../actions';

const TripsArray = [];
const labels = [];

class TripsList extends Component {

  constructor(props) {
    super(props);
    console.log('list', props.trips);

    let i;
    for (i = 0; i < props.trips.length; i++) {
      TripsArray[i] = props.trips[i];
    }
    for (i = 0; i < TripsArray.length; i++) {
      labels[i] = TripsArray[i].vendor;
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
  //  console.log('update', this.props.nextPage, nextProps.nextPage);
  //  if (nextProps.currentAccountId !== this.props.currentAccountId) {
      //  this.props = nextProps;
      //  this.getAccountInfo1();
  //    console.log(nextProps.currentAccountId);
  //   }
  //  return true;
  }

  componentDidUpdate() {

  }

  onRowPress(rowID) {
    console.log(this.props);
    console.log(rowID);
  //  this.props.setCurAccount(TripsArray[rowID].id);
  //  this.getAccountInfo(TripsArray[rowID].id);
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
      <View
        style={{
          paddingTop: HEADER.height + 10,
          padding: 10,
          justifyContent: 'center',
          flex: 1 }}
      >
      <MyMapView />
      <View style={{ paddingTop: 20 }}>
        <Button> Start Trip </Button>
      </View>
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
 setCurAccount, getAccountInfo, getToken
})(TripsList);
