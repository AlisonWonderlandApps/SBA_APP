/*
* Main view
* TODO: put hardcoded strings into strings file
*/

import React, { Component } from 'react';
import { Alert, View, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { receiptsFetch } from '../actions';
import { layoutStyles } from './styles';

import {
  NavListSection,
  NavListSectionTrips,
  NavListSectionTools,
  Tab,
  FAB,
  Banner
} from '../components';

import {
  ProcessingStr,
  ReimburseStr,
  ReceiptsStr,
  TripsStr,
  ToolsStr
} from './strings';

class MainNavigationList extends Component {

  componentWillMount() {
    console.log('props', this.props);
  }

  componentWillReceiveProps(nextProps) {
    console.log('props0', this.props);
    console.log('nprops0', nextProps);
  }

  componentWillUpdate(nextProps) {
    console.log('props1', this.props);
    console.log('nprops1', nextProps);
  }

  componentDidUpdate(nextProps) {
    console.log('props2', this.props);
    console.log('nprops2', nextProps);
  }

  render() {
    return (
      <View style={layoutStyles.mainListView}>
        <Banner> Advert Banner </Banner>
        <View style={{ flexDirection: 'row', width: null }}>
          <TouchableHighlight
            onPress={this.processingPressed.bind(this)}
            style={{ flex: 1, width: null, height: 50 }}
          >
            <View style={{ flexGrow: 1 }}>
              <Tab
                title={ProcessingStr}
                count={this.props.processingCount}
              />
            </View>
          </TouchableHighlight>

          <TouchableHighlight
            onPress={this.reimburseablePressed.bind(this)}
            style={{ flex: 1, width: null, height: 50 }}
          >
            <View style={{ flexGrow: 1 }}>
              <Tab
                title={ReimburseStr}
                count={this.props.reimburseableCount}
              />
            </View>
          </TouchableHighlight>
        </View>

        <TouchableHighlight
          onPress={this.receiptsPressed}
        >
          <View>
            <NavListSection
              title={ReceiptsStr}
              subtitle={this.renderMostRecentReceiptCost()}
              data={this.renderMostRecentReceiptData()}
            />
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={this.tripsPressed.bind(this)}
        >
        <View>
          <NavListSectionTrips
            title={TripsStr}
            subtitle={this.renderMostRecentTripDate()}
            data={this.renderMostRecentTripData()}
          />
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={this.toolsPressed}
        >
          <View>
            <NavListSectionTools title={ToolsStr} />
          </View>
        </TouchableHighlight>
        <FAB
          onPress={this.onPressFAB}
        />
      </View>
    );
  }

  renderMostRecentTripDate() {
    if (this.props.trips.length < 1) {
      //no trips
      return 'Waiting on ';
    } else {
      const date = this.props.latestTrip.issued;
      //const date = '2017-01-12T00:24:35Z';
      const formattedDate = new Date(date).toString();
      const dateStr = formattedDate.substring(4, 10);
      return dateStr;
    }
  }

  renderMostRecentTripData() {
    if (this.props.trips.length < 1) {
      return 'your trips';
    }
    return (this.props.latestTrip.total + ' kms');
  }

  renderMostRecentReceiptCost() {
  //  if (this.props.receipts.length < 1) {
      return 'Waiting on ';
  //  } else {
    //  const date = this.props.latestReceipt.issued;
      //const date = '2017-01-12T00:24:35Z';
  //    const formattedDate = new Date(date).toString();
  //    const dateStr = formattedDate.substring(4, 10);
    //  return dateStr;
  //    return 'hi';
  //  }
  }

  renderMostRecentReceiptData() {
    //renders the place / name of receipt
  //  if (this.props.receipts.length < 1) {
      return 'your receipts';
  //  }
  //  return ('Place');
  }

  onPressFAB() {
    console.log('FAB pressed');
    Alert.alert(
      'Choose Photo Source',
      null,
      [
        { text: 'Camera', onPress: () => Actions.camera() },
        { text: 'Photo Library', onPress: () => Actions.photos() },
        { text: 'Cancel', onPress: () => console.log('cancel'), style: 'cancel' }
      ]
    );
  }
s
  onCameraPressed() {
    console.log('camera');
  }

  onPhotoPressed() {
    console.log('photo');
  }

  processingPressed() {
    console.log('processingPressed');
  }

  reimburseablePressed() {
    console.log('reimburseablePressed');
  }

  receiptsPressed() {
    console.log('receiptsPressed', this.props.receipts);
    Actions.receipts();
  }

  tripsPressed() {
    //console.log('tripsPressed', this.props.trips);
    console.log('trips', this.props);
    Actions.trips();//({
    //  tripsList: this.props.trips,
    //});
  }

  toolsPressed() {
    console.log('toolsPressed');
  }

}//end class

const mapStateToProps = ({ accounts, main }) => {
  const {
    accountsArr,
    curAccount
  } = accounts;
  const {
    isFetching,
    trips,
    receipts,
    processing,
    processingCount,
    reimburseables,
    reimburseableCount,
    latestReceipt,
    latestTrip
  } = main;
  return {
    accountsArr,
    curAccount,
    isFetching,
    trips,
    receipts,
    processing,
    processingCount,
    reimburseables,
    reimburseableCount,
    latestReceipt,
    latestTrip
  };
};

export default connect(mapStateToProps, {
  receiptsFetch
})(MainNavigationList);

/*
//subtitle={this.getSubtitle().bind(this)}
//data={''}
<View style={{ paddingBottom: 50 }}>
  <LogoSection />
</View>
*/
