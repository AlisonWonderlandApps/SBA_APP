import React, { Component } from 'react';
import {
  //Alert,
  Text,
  View,
  ListView,
  //AsyncStorage,
  TouchableHighlight,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import MapView from 'react-native-maps';
import Spinner from 'react-native-loading-spinner-overlay';
import { BackgroundView } from '../components';
import { HEADER } from '../global/margins';
import { APP_FONT, FONT_SIZE_MEDIUM } from '../global/fonts';
import {
  CARD_BACKGROUND_COLOUR,
  BORDER_COLOUR,
  PRIMARY_HIGHLIGHT_COLOUR,
  SHADOW_COLOUR
} from '../global/colours';
import {
  loadAReceipt,
  isTripTracking,
  setCurLocation,
  startTrip,
  endTrip
 } from '../actions';

 let self;

class Trips extends Component {
  constructor(props) {
    super(props);
    self = this;

    //Set current location
    console.log('cur', this.props.curLocation, this.props.isTripStarted);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
  }

  componentDidMount() {
    this.getCurrentPosition();
    console.log(this.props.curLocation);
  }

  shouldComponentUpdate(nextProps) {
    console.log('update', this.props, nextProps);
    if (this.props !== nextProps) {
      return true;
    }
    return false;
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
          {this.renderMapView()}
          <View style={{ paddingTop: 20 }}>
            {this.renderButton()}
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
          {this.renderMapView()}
          <View style={{ paddingTop: 20 }}>
            {this.renderButton()}
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

  renderButton() {
    return (
      <TouchableOpacity
       onPress={() => this.startEndTrip()}
       style={styles.buttonStyle}
      >
         <Text style={styles.buttonText}>
           {this.renderButtonText()}
         </Text>
       </TouchableOpacity>
    );
  }

  renderButtonText() {
    console.log(this.props.isTripStarted);
    if (this.props.isTripStarted) {
      return 'End Trip';
    }
    return 'Start Trip';
  }

  startEndTrip() {
    if (self.props.isTripStarted) {
      console.log('pressed', self.props.isTripStarted);
      this.endMyTrip(self.props.curLocation);
    }
    else if (!self.props.isTripStarted) {
      this.startMyTrip(self.props.curLocation);
      console.log('pressed', self.props.isTripStarted);
      console.log(self.props.curLocation);
    }
    console.log('what');
  }

  endMyTrip() {
    //TODO: check for network & geolocation settings!!
    //get trip end point & send to action
    console.log(this.props.curLocation);
    this.props.endTrip(self.props.curLocation);
    console.log('end', self.props.tripEndLocation);
    //take snapshot of map!!
  }

  startMyTrip() {
    //TODO: check for network & geolocation settings!!
    //get trip start point & send to action
    console.log('start', this.props.curLocation);
    self.props.startTrip(self.props.curLocation);
    console.log('start', this.props.tripStartLocation);
    //startTrip
  }

  renderMapView() {
    console.log(this.props.curLocation);
    const obj = this.props.curLocation;
    console.log(obj);
    if (Object.getOwnPropertyNames(obj).length === 0) {
      return (
        <View style={styles.mapContainer}>
          <Text> Loading... </Text>
        </View>
      );
    }

    return (
      <View style={styles.mapContainer}>
        <MapView
          ref='map'
          style={styles.map}
          mapType='standard'
          showsUserLocation
          followsUserLocation
          zoomEnabled
          region={{
            latitude: self.props.curLocation.latitude,
            longitude: self.props.curLocation.longitude,
            latitudeDelta: 0.002,
            longitudeDelta: 0.002,
          }}
          //onRegionChangeComplete={(region) => this.onRegionChange(region)}
        >
          <MapView.Marker
            coordinate={{
              latitude: self.props.curLocation.latitude,
              longitude: self.props.curLocation.longitude,
            }}
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
    //console.log('row', rowData, secId, rowId);
    this.props.loadAReceipt(rowData, rowId);
    Actions.tripInfo();
  }

  getCurrentPosition() {
    navigator.geolocation.getCurrentPosition((position) => {
      const curPosition = {
        latitude: parseFloat(position.coords.latitude),
        longitude: parseFloat(position.coords.longitude),
        latitudeDelta: 0.003,
        longitudeDelta: 0.003,
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
      };
      this.props.setCurLocation(newPosition);
    },
    (error) => {
      console.log(error);
    },
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  //import the setInitialPosition

  //setFinalPosition

  //Calculate distance

  //save the trip docket

}

const styles = {
  mapContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 10
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
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
  },
  buttonStyle: {
  //  flexGrow: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: CARD_BACKGROUND_COLOUR,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: PRIMARY_HIGHLIGHT_COLOUR,
    marginLeft: 5,
    marginRight: 5,
    shadowColor: SHADOW_COLOUR,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    height: 40,
    padding: 10
  //  width: null
},
  buttonText: {
    color: PRIMARY_HIGHLIGHT_COLOUR,
    fontFamily: APP_FONT,
    alignSelf: 'center',
    fontSize: FONT_SIZE_MEDIUM,
    fontWeight: '800',
  }
};

const mapStateToProps = ({ trips }) => {
  const {
    myTrips,
    isFetchingTrips,
    latestTrip,
    isTripStarted,
    curLocation,
    tripStartLocation,
    tripEndLocation
  } = trips;
  return {
    isFetchingTrips,
    isTripStarted,
    myTrips,
    latestTrip,
    curLocation,
    tripStartLocation,
    tripEndLocation
  };
};

export default connect(mapStateToProps, {
  loadAReceipt, isTripTracking, setCurLocation, startTrip, endTrip
})(Trips);
