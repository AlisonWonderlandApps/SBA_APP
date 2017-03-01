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

class TripsList extends Component {

  componentWillUpdate(nextProps) {
    console.log('update', this.props, nextProps);
    if (this.props !== nextProps) {
      return true;
    }
    return false;
  }

  onRowPress(rowID) {
    console.log(this.props);
    console.log(rowID);
  //  this.props.setCurAccount(TripsArray[rowID].id);
  //  this.getAccountInfo(TripsArray[rowID].id);
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
          visible={this.props.isFetchingTrips}
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
