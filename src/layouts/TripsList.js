import React, { Component } from 'react';
import { View, ListView, AsyncStorage } from 'react-native';
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

let self;

class TripsList extends Component {
  constructor(props){
    super(props);

    self = this;

    this.state = {
      isTripStarted : false,
      buttonText : ' Start Trip ',
      curLocation : {
        latitude : 25,
        longitude : 25
      }
    };

    this.updateLocation();

    this.setTripBtnText();

  }

  setTripBtnText(){
    let buttonText = '';
    AsyncStorage.getItem('tripData',function(err,res){
        if(err){
          //alert('err : '+err);
          alert('Sorry, something went wrong. Please try again.')
        }else{
          let isFirstTime = false;
          let tripData;

          if(res == null){  //for firest time
            buttonText = ' Start Trip '
          }else{
            tripData = JSON.parse(res);

            if(tripData.isTripStarted){
              buttonText = ' End Trip ';
            }else{
              buttonText = ' Start Trip ';
            }
          }

          self.setState({
            buttonText : buttonText
          })
        }
    });
  }

  updateLocation(){
      navigator.geolocation.getCurrentPosition(function(position){
        self.setState({
          curLocation : {
            latitude : position.coords.latitude,
            longitude : position.coords.longitude
          }
        })
      },
      function(err){
        // alert('err : '+JSON.stringify(err))
        alert('Sorry, something went wrong. Please try again.')
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 10000});

      setTimeout(function(){
        self.updateLocation();
      },5000);
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

  startOrEndTrip(){
    let isTripEnd = false;
    AsyncStorage.getItem('tripData',function(err,res){
      if(err){
        // alert('err : '+err);
        alert('Sorry, something went wrong. Please try again.')
      }else{
        let isFirstTime = false;
        let tripData;

        if(res == null){  //for firest time
          tripData = {
            isTripStarted : true,
            startLocation : self.state.curLocation,
          };
        }else{
          tripData = JSON.parse(res);

          if(tripData.isTripStarted == true){
            tripData.isTripStarted = false;
            isTripEnd = true;
            //find distance
          }else{
            tripData.isTripStarted = true;
            tripData.startLoaction = self.state.curLocation;
          }
        }

        AsyncStorage.setItem('tripData', JSON.stringify(tripData), function(err,res){
          if(err){

          }else{
            if(isTripEnd){
              //******************************************Find Distance start**************************************//

              let url = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins='+
                        tripData.startLoaction.latitude + ',' +
                        tripData.startLoaction.longitude + '&destinations=' +
                        self.state.curLocation.latitude + ',' +
                        self.state.curLocation.longitude;// + '&key=AIzaSyCPCmrMejmgidQub4d81b9PSpf7aS2J4T0';

              // let url = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins='+
              //           '21.2397122,72.7932964'+ '&destinations=' +
              //           '21.2377655,70.8784624';// + '&key=AIzaSyCPCmrMejmgidQub4d81b9PSpf7aS2J4T0';

              fetch(url)
                .then((response) => response.json())
                .then((responseJson) => {
                  let distance = responseJson.rows[0].elements[0].distance.text;
                  alert('Trip Distance : '+distance);
                  // alert('res : '+JSON.stringify(responseJson));
                })
                .catch((error) => {
                  // alert('err : '+error);
                  alert('Sorry, something went wrong. Please try again.')
                });

              //******************************************Find Distance end**************************************//

              self.setState({
                buttonText : ' Start Trip '
              })
            }else{
              self.setState({
                buttonText : ' End Trip '
              })
            }
          }
        });
      }
    })
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
      <MyMapView location={this.state.curLocation}/>
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
