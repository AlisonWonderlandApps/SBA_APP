import React, { Component } from 'react';
import { Alert, ListView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import { BackgroundView, AccountListItem, TitleText, FAB } from '../components';
import { HEADER } from '../global/margins';

import {
  setCurAccount,
} from '../actions';

const AccountArray = [];
const labels = [];

class AccountsList extends Component {

  constructor(props) {
    super(props);

    let i;
    for (i = 0; i < this.props.accountsArray.length; i++) {
      AccountArray[i] = this.props.accountsArray[i];
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

  shouldComponentUpdate(nextProps) {
    if (this.props !== nextProps) {
      return true;
    }
    return false;
  }

  componentDidUpdate() {
    console.log('did', this.props.curAccountID, this.props.goToMain);
    if (this.props.goToMain) {
      console.log('gotonext');
      Actions.main();
    }
  }

  onRowPress(rowID) {
    console.log(this.props);
    console.log(rowID);
    this.props.setCurAccount(AccountArray[rowID], AccountArray[rowID].id);
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
          visible={this.props.isLoading}
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

const mapStateToProps = ({ accounts }) => {
  const {
    isLoading,
    accountsArray,
    curAccountID,
    goToMain
  } = accounts;
  return {
    isLoading,
    accountsArray,
    curAccountID,
    goToMain
  };
};


export default connect(mapStateToProps, {
 setCurAccount
})(AccountsList);
