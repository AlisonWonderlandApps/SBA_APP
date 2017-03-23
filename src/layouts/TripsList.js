import React, { Component } from 'react';
import {
  Alert,
  Text,
  View,
  ListView,
  AsyncStorage,
  TouchableHighlight,
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Spinner from 'react-native-loading-spinner-overlay';
import { BackgroundView, Button, MyMapView } from '../components';
import { HEADER } from '../global/margins';
import {
  CARD_BACKGROUND_COLOUR,
  BORDER_COLOUR,
  PRIMARY_HIGHLIGHT_COLOUR
} from '../global/colours';
import { loadAReceipt } from '../actions';

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

    this.updateLocation();
    this.setTripBtnText();
  }

  shouldComponentUpdate(nextProps) {
    if (this.props !== nextProps) {
      return true;
    }
    return false;
  }

/*
  setTripBtnText() {
    let buttonText = '';
    AsyncStorage.getItem('tripData', (err, res) => {
        if (err) {
          Alert('Sorry, something went wrong. Please try again.');
        } else {
          let isFirstTime = false;
          let tripData;

          if (res == null) {  //for firest time
            buttonText = ' Start Trip ';
          } else {
            tripData = JSON.parse(res);

          if (this.props.isTripStarted) {
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
  */

  renderButtonText() {
    if (this.props.isTripStarted) {
      return 'End Trip';
    }
    return 'Start Trip';
  }

  updateLocation() {
      navigator.geolocation.getCurrentPosition((position) => {
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

  startOrEndTrip() {
    let isTripEnd = false;
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
            if (isTripEnd) {
              //******************************************Find Distance start**************************************//
              let url = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins='+
                        tripData.startLoaction.latitude + ',' +
                        tripData.startLoaction.longitude + '&destinations=' +
                        self.state.curLocation.latitude + ',' +
                        self.state.curLocation.longitude;// + '&key=AIzaSyCPCmrMejmgidQub4d81b9PSpf7aS2J4T0';
                        console.log('url', url);
              // let url = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins='+
              //           '21.2397122,72.7932964'+ '&destinations=' +
              //           '21.2377655,70.8784624';// + '&key=AIzaSyCPCmrMejmgidQub4d81b9PSpf7aS2J4T0';

              fetch(url)
                .then((response) => response.json())
                .then((responseJson) => {
                  console.log('responseJson', responseJson);
                  const distance = responseJson.rows[0].elements[0].distance.text;
                  Alert('Trip Distance : '+ distance);
                  // alert('res : '+JSON.stringify(responseJson));
                })
                .catch((error) => {
                  // alert('err : '+error);
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
          <MyMapView location={this.state.curLocation} />
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
          <MyMapView location={this.state.curLocation} />
          <View style={{ paddingTop: 20 }}>
            <Button onPress={() => this.startOrEndTrip()}>{this.state.buttonText}</Button>
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

const styles = {
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
};

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
  loadAReceipt
})(TripsList);
