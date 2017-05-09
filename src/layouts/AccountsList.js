import React, { Component } from 'react';
import { Alert, ListView, TouchableOpacity, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import { BackgroundView, TitleText, CardSection } from '../components';
import { HEADER } from '../global/margins';
import { PRIMARY_HIGHLIGHT_COLOUR } from '../global/colours';

import {
  setCurAccount,
  resetTrips,
  resetReceipts,
  setCurLocation
} from '../actions';

let self = '';

class AccountsList extends Component {

  constructor(props) {
    super(props);

    self = this;
    //console.log('accin', self.props.curAccountIndex);

    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
  }

  shouldComponentUpdate(nextProps) {
    if (this.props !== nextProps) {
      return true;
    }
    return false;
  }

  componentDidUpdate() {
    if (this.props.isFetching === false && this.props.goToMain) {
      Actions.main();
    }
  }

  onRowPress(rowData) {
    //console.log(rowData);
    if (self.props.curAccountIndex === rowData) {
      Actions.main();
    } else {
    self.props.resetReceipts();
    self.props.resetTrips();
    self.props.setCurAccount(
      self.props.accountsArray[rowData],
      self.props.accountsArray[rowData].id,
      rowData);
    }
  }

  renderRow(rowData, sectionID, index) {
    //console.log(rowData, sectionID, index);
    if (this.props.curAccountIndex === index) {
      return (
        <TouchableOpacity
          onPress={this.onRowPress.bind(rowData, index)}
        >
        <View style={{ paddingLeft: 20, paddingRight: 20 }}>
          <CardSection style={styles.cardColor}>
          <Text style={styles.colorText}>
            {rowData}
          </Text>
          </CardSection>
        </View>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity
        onPress={this.onRowPress.bind(rowData, index)}
      >
      <View style={{ paddingLeft: 20, paddingRight: 20 }}>
        <CardSection style={styles.card}>
        <Text style={styles.titleStyle}>
          {rowData}
        </Text>
        </CardSection>
      </View>
      </TouchableOpacity>
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
    Alert.alert(
      'Sorry',
      'This feature not functional yet :(',
      [
        { text: 'OK' }
      ]
    );
  }

  getCurrentPosition() {
    navigator.geolocation.getCurrentPosition((position) => {
      const curPosition = {
        latitude: parseFloat(position.coords.latitude),
        longitude: parseFloat(position.coords.longitude),
        latitudeDelta: 0.003,
        longitudeDelta: 0.003,
      //  current: true
      };
      this.props.setCurLocation(curPosition);
    },
    (error) => {
      console.log(JSON.stringify(error));
      const defaultPosition = {
        latitude: -33.8243,
        longitude: 151.2001,
        latitudeDelta: 0.003,
        longitudeDelta: 0.003,
      //  current: false //check for previous coords before overwriting
      };
      this.props.setCurLocation(defaultPosition);
    },
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
    navigator.geolocation.watchPosition((position) => {
      const newPosition = {
        latitude: parseFloat(position.coords.latitude),
        longitude: parseFloat(position.coords.longitude),
        latitudeDelta: 0.003,
        longitudeDelta: 0.003,
      //  current: true
      };
      this.props.setCurLocation(newPosition);
    },
    (error) => {
      console.log(error);
    },
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }
}

const mapStateToProps = ({ accounts, receipts }) => {
  const {
    accountsArray,
    labelsArray,
    curAccountID,
    curAccountIndex,
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
    curAccountIndex,
    goToMain
  };
};

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15
  },
  card: {
    borderWidth: 1,
    padding: 10
  },
  cardColor: {
    borderWidth: 1,
    padding: 10,
    backgroundColor: PRIMARY_HIGHLIGHT_COLOUR
  },
  colorText: {
    fontSize: 18,
    paddingLeft: 15,
    color: 'white'
  }
};

export default connect(mapStateToProps, {
 setCurAccount, resetTrips, resetReceipts, setCurLocation
})(AccountsList);
