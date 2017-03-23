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
import { BackgroundView, Button, MyMapView } from '../components';
import { HEADER } from '../global/margins';
import {
  CARD_BACKGROUND_COLOUR,
  BORDER_COLOUR,
  PRIMARY_HIGHLIGHT_COLOUR
} from '../global/colours';
import { loadAReceipt, isTripTracking, setCurTripLocation } from '../actions';

let self;

class TripsList extends Component {
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
        longitude: 25
      }
    };

    console.log('tracking functions');
    this.props.isTripTracking();
    console.log('tripstrack done');
    this.updateLocation();
  }

  shouldComponentUpdate(nextProps) {
    if (this.props !== nextProps) {
      return true;
    }
    return false;
  }

  renderButtonText() {
    if (this.props.isTripStarted) {
      return 'End Trip';
    }
    return 'Start Trip';
  }

  updateLocation() {
      navigator.geolocation.getCurrentPosition((position) => {
        const curLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };
        this.props.setCurTripLocation(curLocation);
      },
      (err) => {
        console.log(err);
        Alert('Sorry, something went wrong. Please try again.');
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 10000
      });

/*
      setTimeout(() => {
        self.updateLocation();
      }, 5000); */
  }

  startTrip() {

  }

  endTrip() {

  }

  startOrEndTrip() {
    //let isTripEnd = false;

    if (this.props.isTripStarted) {
      //put code for updating or whatever here
    } else {
      //put code for starting trip here
    }


    AsyncStorage.getItem('tripData', (err, res) => {
      if (err) {
        Alert('Sorry, something went wrong. Please try again.');
      } else {
        const isFirstTime = false;
        let tripData;

      if (res == null) {  //for firest time
          tripData = {
            isTripStarted: true,
            startLocation: self.state.curLocation,
          };
      } else {
          tripData = JSON.parse(res);

      if (tripData.isTripStarted === true) {
            tripData.isTripStarted = false;
            isTripEnd = true;
            //find distance
      } else {
            tripData.isTripStarted = true;
            tripData.startLoaction = self.state.curLocation;
          }
      }


        AsyncStorage.setItem('tripData', JSON.stringify(tripData), (err1, res1) => {
          if (err1) {
            console.log(err1, res1);
          } else {
            console.log('hi');
            if (!this.props.isTripStarted) {
              //******************************************Find Distance start**************************************//
              const url = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins='
                        .concat(tripData.startLoaction.latitude).concat(',')
                        .concat(tripData.startLoaction.longitude).concat('&destinations=')
                        .concat(self.state.curLocation.latitude)
                        .concat(',')
                        .concat(self.state.curLocation.longitude);
              console.log('url', url);

              fetch(url)
                .then((response) => response.json())
                .then((responseJson) => {
                  console.log('responseJson', responseJson);
                  const distance = responseJson.rows[0].elements[0].distance.text;
                  Alert('Trip Distance : ', distance);
                })
                .catch((error) => {
                  console.log(error);
                  Alert('Sorry, something went wrong. Please try again.');
                });

              //******************************************Find Distance end**************************************//

              self.setState({
                buttonText: ' Start Trip '
              });
            } else {
              self.setState({
                buttonText: ' End Trip '
              });
            }
          }
        });
      }
    });
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
              onPress={() => this.startOrEndTrip()}
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
            <Button onPress={() => this.startOrEndTrip()}>{this.renderButtonText()}</Button>
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

  renderMapView(location) {
    return (
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        >
          <MapView.Marker
            coordinate={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
              }}
            title={'title'}
            description={'description'}
          />
        </MapView>
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
  } = trips;
  return {
    isFetchingTrips,
    isTripStarted,
    myTrips,
    latestTrip,
  };
};


export default connect(mapStateToProps, {
  loadAReceipt, isTripTracking, setCurTripLocation
})(TripsList);
