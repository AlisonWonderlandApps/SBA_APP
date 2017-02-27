import React, { Component } from 'react';
import { View, ListView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import { BackgroundView, TripsListItem, Button, MyMapView } from '../components';
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
    console.log('list', props.myTrips);

    let i;
    for (i = 0; i < props.myTrips.length; i++) {
      TripsArray[i] = props.myTrips[i];
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
    console.log(aid, 'accountinfo', this.props.curAccountID);
    this.props.getToken(aid);
    //this.props.getAccountInfo(this.props.currentAccountId);
  }

  getData(key, index, defaultVal = 'default') {
    return this.state.accounts[index][key] || defaultVal;
  }

  renderRow(rowData, sectionID, rowID) {
    return (
      <TripsListItem
        onPress={this.onRowPress.bind(this, rowID)}
        index={rowID}
        titleLabel={rowData}
        data={this.props}
      />
    );
  }

  render() {
    return (
      <BackgroundView
        style={{
          paddingTop: HEADER.height + 10,
          paddingBottom: 10,
          justifyContent: 'center'
         }}
      >
      <MyMapView />
      <View style={{ paddingTop: 20 }}>
        <Button> Start Trip </Button>
      </View>

        <Spinner
          visible={this.props.isFetching}
          textContent={'Loading...'}
          textStyle={{ color: 'white' }}
        />
      </BackgroundView>
    );
  }
}

const mapStateToProps = ({ accounts, receipts, trips }) => {
  const {
    accountsArray,
    curAccountID
  } = accounts;
  const {
    processing,
    processingCount,
    reimbursables,
    reimbursableCount,
    latestReceipt,
    nextPage
  } = receipts;
  const {
    myTrips,
    isFetchingTrips,
    latestTrip,
  } = trips;
  return {
    accountsArray,
    curAccountID,
    isFetchingTrips,
    myTrips,
    processing,
    processingCount,
    reimbursables,
    reimbursableCount,
    latestReceipt,
    latestTrip,
    nextPage
  };
};


export default connect(mapStateToProps, {
 setCurAccount, getAccountInfo, getToken
})(TripsList);
