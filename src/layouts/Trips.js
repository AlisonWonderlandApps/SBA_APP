import React, { Component } from 'react';
import {
  Alert,
  Text,
  View,
  ListView,
  AsyncStorage,
  TouchableHighlight,
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import MapView from 'react-native-maps';
import Spinner from 'react-native-loading-spinner-overlay';
import { BackgroundView, Button } from '../components';
import { HEADER } from '../global/margins';
import {
  CARD_BACKGROUND_COLOUR,
  BORDER_COLOUR,
  PRIMARY_HIGHLIGHT_COLOUR
} from '../global/colours';
import {
  loadAReceipt,
  isTripTracking,
  setCurTripLocation,
  startTrip,
  endTrip
 } from '../actions';

let self;

class Trips extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.myTrips);

    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    self = this;

    this.state = {
      isTripStarted: false,
      buttonText: ' Start Trip ',
      curLocation: {
        latitude: 25,
        longitude: 25,
        //latitudeDelta: 3,
        //longitudeDelta: 4
        }
      };
    }

  shouldComponentUpdate(nextProps) {
    if (this.props !== nextProps) {
      return true;
    }
    return false;
  }

  renderButtonText(text) {
    if (text === 'Start Trip') {
      return 'End Trip';
    }
    return 'Start Trip';
  }

  render() {
    if (this.props.myTrips.length < 1) {
      return (
        <BackgroundView
          style={{
            paddingTop: HEADER.height + 10,
            paddingBottom: 10,
            justifyContent: 'center'
           }}
        >
          {this.renderMapView(this.state.curLocation)}
          <View style={{ paddingTop: 20 }}>
            <Button
              onPress={() => this.renderButtonText(this.props.children)}
            >
              {this.renderButtonText()}
            </Button>
          </View>
          <Spinner
            visible={this.props.isFetchingTrips}
            textContent={'Loading...'}
            textStyle={{ color: 'white' }}
          />
        </BackgroundView>
      );
    }
    return (
      <BackgroundView
        style={{
          paddingTop: HEADER.height + 10,
          paddingBottom: 0,
          justifyContent: 'center'
         }}
      >
      <View style={{ flex: 1 }}>
        <View style={{ flexGrow: 1 }}>
          {this.renderMapView(this.state.curLocation)}
          <View style={{ paddingTop: 20 }}>
            <Button onPress={() => this.renderButtonText(this.props.children)}> {this.renderButtonText()} </Button>
          </View>
          <View style={styles.rowHeader}>
            <Text style={{ color: 'white' }}> Recent Trips </Text>
          </View>
        </View>
        <View style={{ flexGrow: 0.05 }}>
          <ListView
            dataSource={this.ds.cloneWithRows(this.props.myTrips)}
            renderRow={(data, secId, rowId) => this.renderRow(data, secId, rowId)}
          />
        </View>
      </View>
        <Spinner
          visible={this.props.isFetchingTrips}
          textContent={'Loading...'}
          textStyle={{ color: 'white' }}
        />
      </BackgroundView>
    );
  }

  renderMapView() {
    return (
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          region={{
            latitude: 4,
            longitude: 4,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        />
      </View>
    );
  }

  renderRow(data, secId, rowId) {
    return (
        <TouchableHighlight
          onPress={() => this.onRowPress(data, secId, rowId)}
          underlayColor={'#AAA'}
          style={styles.rowFront}
        >
          <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
              <Text> {`${data.vendor}`} </Text>
              <Text> {`${data.total}`} kms </Text>
            </View>
          </View>
        </TouchableHighlight>
    );
  }

  onRowPress(rowData, secId, rowId) {
    console.log('row', rowData, secId, rowId);
    this.props.loadAReceipt(rowData, rowId);
    Actions.receiptInfo();
  }
}

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 10
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
    elevation: -1
  },
  rowFront: {
    padding: 10,
    backgroundColor: CARD_BACKGROUND_COLOUR,
    borderBottomColor: BORDER_COLOUR,
    borderBottomWidth: 1,
    justifyContent: 'center',
  },
  rowHeader: {
    marginTop: 10,
    padding: 10,
    backgroundColor: PRIMARY_HIGHLIGHT_COLOUR,
    borderBottomColor: BORDER_COLOUR,
    borderBottomWidth: 1,
    justifyContent: 'center',
  }
});

const mapStateToProps = ({ trips }) => {
  const {
    myTrips,
    isFetchingTrips,
    latestTrip,
    isTripStarted,
    curLocation
  } = trips;
  return {
    isFetchingTrips,
    isTripStarted,
    myTrips,
    latestTrip,
    curLocation
  };
};


export default connect(mapStateToProps, {
  loadAReceipt, isTripTracking, setCurTripLocation, startTrip, endTrip
})(Trips);
