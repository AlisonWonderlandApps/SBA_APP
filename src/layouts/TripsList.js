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
import MapView from 'react-native-maps';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import { BackgroundView, TripsListItem, Button, MyMapView } from '../components';
import { HEADER } from '../global/margins';
import {
  CARD_BACKGROUND_COLOUR,
  BORDER_COLOUR
 } from '../global/colours';
 import { Actions } from 'react-native-router-flux';


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
        latitude: 50,
        longitude: 50
      }
    };

    this.updateLocation();
    this.setTripBtnText();
  }

  setTripBtnText() {
    let buttonText = '';
    AsyncStorage.getItem('tripData', (err, res) => {
        if (err) {
          //alert('err : '+err);
          Alert('Sorry, something went wrong. Please try again.');
        } else {
          let isFirstTime = false;
          let tripData;

          if (res == null) {  //for firest time
            buttonText = ' Start Trip ';
          } else {
            tripData = JSON.parse(res);

          if (tripData.isTripStarted) {
              buttonText = ' End Trip ';
          } else {
              buttonText = ' Start Trip ';
            }
          }

          self.setState({
            buttonText
          });
        }
    });
  }

  updateLocation() {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log('position',position);
        self.setState({
          curLocation: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
        });
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

      setTimeout(() => {
        self.updateLocation();
      }, 5000);
  }

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

  renderRow1(rowData, sectionID, rowID) {
    return (
      <TripsListItem
        onPress={this.onRowPress.bind(this, rowID)}
        index={rowID}
        titleLabel={rowData}
        data={this.props}
      />
    );
  }

  startOrEndTrip() {
    let isTripEnd = false;
    AsyncStorage.getItem('tripData', (err, res) => {
      if (err) {
        // alert('err : '+err);
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
            if (isTripEnd) {
              //******************************************Find Distance start**************************************//
              let url = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins='+
                        tripData.startLoaction.latitude + ',' +
                        tripData.startLoaction.longitude + '&destinations=' +
                        self.state.curLocation.latitude + ',' +
                        self.state.curLocation.longitude;// + '&key=AIzaSyCPCmrMejmgidQub4d81b9PSpf7aS2J4T0';
                        console.log("url",url);
              // let url = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins='+
              //           '21.2397122,72.7932964'+ '&destinations=' +
              //           '21.2377655,70.8784624';// + '&key=AIzaSyCPCmrMejmgidQub4d81b9PSpf7aS2J4T0';

              fetch(url)
                .then((response) => response.json())
                .then((responseJson) => {
                  console.log("responseJson",responseJson);
                  const distance = responseJson.rows[0].elements[0].distance.text;
                  alert('Trip Distance : '+ distance);

                  const snapshot = self.refs.map.takeSnapshot({
                    // width: 300,      // optional, when omitted the view-width is used
                    // height: 300,     // optional, when omitted the view-height is used
                    // region: {..},    // iOS only, optional region to render
                    format: 'png',   // image formats: 'png', 'jpg' (default: 'png')
                    quality: 0.8,    // image quality: 0..1 (only relevant for jpg, default: 1)
                    result: 'file'   // result types: 'file', 'base64' (default: 'file')
                  });
                  snapshot.then((uri) => {
                    AsyncStorage.setItem('mapSnapshotUri', uri, function(err,res){
                        Actions.trippreview();
                    });
                  });
                })
                .catch((error) => {
                  // alert('err : '+error);
                  console.log(error);
                  alert('Sorry, something went wrong. Please try again.'+error);
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
    let curLocation = this.state.curLocation;
    let locationJSON = {
      latitude: curLocation.latitude,
      longitude: curLocation.longitude,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121,
    };

    if (this.props.myTrips.length < 1) {
      return (
        <BackgroundView
          style={{
            paddingTop: HEADER.height + 10,
            paddingBottom: 10,
            justifyContent: 'center'
           }}
        >
          <View style={styles.container}>
            <MapView
              style={styles.map}
              region={locationJSON}
              ref="map"
            >
            <MapView.Marker
                   coordinate={locationJSON}
                   title={'title'}
                   description={'description'}
                  />
                </MapView>
          </View>
          <View style={{ paddingTop: 20 }}>
            <Button onPress={() => this.startOrEndTrip()}>{this.state.buttonText}</Button>
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
          <View style={styles.container}>
            <MapView
              style={styles.map}
              region={locationJSON}
              ref="map"
            >
            <MapView.Marker
                   coordinate={locationJSON}
                   title={'title'}
                   description={'description'}
                  />
                </MapView>
          </View>
          <View style={{ paddingTop: 20 }}>
            <Button onPress={() => this.startOrEndTrip()}>{this.state.buttonText}</Button>
          </View>
          <Text> Recent Trips </Text>
        </View>
        <View style={{ flexGrow: 0.05, borderWidth: 1, borderBottomWidth: 0, marginTop: 5 }}>
          <ListView
            dataSource={this.ds.cloneWithRows(this.props.myTrips)}
            renderRow={(data) => this.renderRow(data)}
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

  renderRow(data) {
    //console.log('data', data);
    return (
        <TouchableHighlight
          onPress={() => console.log('You touched me', data)}
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
}

const styles = StyleSheet.create({
  rowFront: {
    //alignItems: 'center',
    padding: 10,
    backgroundColor: CARD_BACKGROUND_COLOUR,
    borderBottomColor: BORDER_COLOUR,
    borderBottomWidth: 1,
    justifyContent: 'center',
    //height: 100,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 10
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
    elevation: -1
  },
});

const mapStateToProps = ({ receipts, trips }) => {
  const {
    receiptList,
  } = receipts;
  const {
    myTrips,
    isFetchingTrips,
    latestTrip,
  } = trips;
  return {
    isFetchingTrips,
    myTrips,
    receiptList,
    latestTrip,
  };
};


export default connect(mapStateToProps, {
})(TripsList);
