import React, { Component } from 'react';
import { Alert, ListView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import { BackgroundView, AccountListItem, TitleText, FAB } from '../components';
import { HEADER } from '../global/margins';

import {
  setCurAccount,
  resetTrips,
  resetReceipts
} from '../actions';

class AccountsList extends Component {

  constructor(props) {
    super(props);

    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
  }

  shouldComponentUpdate(nextProps) {
    if (this.props !== nextProps) {
      return true;
    }
    return false;
  }

  componentDidUpdate() {
    console.log('did', this.props);
    if (this.props.goToMain && (this.props.isFetching === false)) {
      console.log('gotonext');
      Actions.main();
    }
  }

  onRowPress(rowID) {
    console.log(this.props);
    console.log(rowID);
    this.props.resetReceipts();
    this.props.resetTrips();
    this.props.setCurAccount(this.props.accountsArray[rowID], this.props.accountsArray[rowID].id);
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
          dataSource={this.ds.cloneWithRows(this.props.labelsArray)}
          renderRow={this.renderRow.bind(this)}
        />
        <Spinner
          visible={this.props.isFetching}
          textContent={'Loading...'}
          textStyle={{ color: 'white' }}
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

const mapStateToProps = ({ accounts, receipts }) => {
  const {
    accountsArray,
    labelsArray,
    curAccountID,
    goToMain
  } = accounts;
  const {
    isFetching
  } = receipts;
  return {
    isFetching,
    accountsArray,
    labelsArray,
    curAccountID,
    goToMain
  };
};


export default connect(mapStateToProps, {
 setCurAccount, resetTrips, resetReceipts
})(AccountsList);
