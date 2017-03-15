import React, { Component } from 'react';
import { View, ListView, AsyncStorage ,StyleSheet ,Image} from 'react-native';
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
import MapView from 'react-native-maps';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Moment from 'moment';

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
      },
      screenShot : 'http://facebook.github.io/react/img/logo_og.png'
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
  //  console.log('update', this.props, nextProps);
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

    //***************************************************
                      // takeSnapshot(this.refs["myMapViewRef"], {
                      //   format: "jpeg",
                      //   quality: 1
                      // })
                      // .then(
                      //   uri => { self.setState({ screenShot : uri}); alert("Image saved to : "+ uri)},
                      //   error => alert("Oops, snapshot failed : "+ error)
                      // );



                      const snapshot = self.refs.myMapViewRef.takeSnapshot({
                          width: 300,      // optional, when omitted the view-width is used
                          height: 300,     // optional, when omitted the view-height is used
                          //region: {..},    // iOS only, optional region to render
                          format: 'png',   // image formats: 'png', 'jpg' (default: 'png')
                          quality: 0.8,    // image quality: 0..1 (only relevant for jpg, default: 1)
                          result: 'file'   // result types: 'file', 'base64' (default: 'file')
                        });
                        snapshot.then((uri) => {

                          let base64Icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAQAAACSR7JhAAADtUlEQVR4Ac3YA2Bj6QLH0XPT1Fzbtm29tW3btm3bfLZtv7e2ObZnms7d8Uw098tuetPzrxv8wiISrtVudrG2JXQZ4VOv+qUfmqCGGl1mqLhoA52oZlb0mrjsnhKpgeUNEs91Z0pd1kvihA3ULGVHiQO2narKSHKkEMulm9VgUyE60s1aWoMQUbpZOWE+kaqs4eLEjdIlZTcFZB0ndc1+lhB1lZrIuk5P2aib1NBpZaL+JaOGIt0ls47SKzLC7CqrlGF6RZ09HGoNy1lYl2aRSWL5GuzqWU1KafRdoRp0iOQEiDzgZPnG6DbldcomadViflnl/cL93tOoVbsOLVM2jylvdWjXolWX1hmfZbGR/wjypDjFLSZIRov09BgYmtUqPQPlQrPapecLgTIy0jMgPKtTeob2zWtrGH3xvjUkPCtNg/tm1rjwrMa+mdUkPd3hWbH0jArPGiU9ufCsNNWFZ40wpwn+62/66R2RUtoso1OB34tnLOcy7YB1fUdc9e0q3yru8PGM773vXsuZ5YIZX+5xmHwHGVvlrGPN6ZSiP1smOsMMde40wKv2VmwPPVXNut4sVpUreZiLBHi0qln/VQeI/LTMYXpsJtFiclUN+5HVZazim+Ky+7sAvxWnvjXrJFneVtLWLyPJu9K3cXLWeOlbMTlrIelbMDlrLenrjEQOtIF+fuI9xRp9ZBFp6+b6WT8RrxEpdK64BuvHgDk+vUy+b5hYk6zfyfs051gRoNO1usU12WWRWL73/MMEy9pMi9qIrR4ZpV16Rrvduxazmy1FSvuFXRkqTnE7m2kdb5U8xGjLw/spRr1uTov4uOgQE+0N/DvFrG/Jt7i/FzwxbA9kDanhf2w+t4V97G8lrT7wc08aA2QNUkuTfW/KimT01wdlfK4yEw030VfT0RtZbzjeMprNq8m8tnSTASrTLti64oBNdpmMQm0eEwvfPwRbUBywG5TzjPCsdwk3IeAXjQblLCoXnDVeoAz6SfJNk5TTzytCNZk/POtTSV40NwOFWzw86wNJRpubpXsn60NJFlHeqlYRbslqZm2jnEZ3qcSKgm0kTli3zZVS7y/iivZTweYXJ26Y+RTbV1zh3hYkgyFGSTKPfRVbRqWWVReaxYeSLarYv1Qqsmh1s95S7G+eEWK0f3jYKTbV6bOwepjfhtafsvUsqrQvrGC8YhmnO9cSCk3yuY984F1vesdHYhWJ5FvASlacshUsajFt2mUM9pqzvKGcyNJW0arTKN1GGGzQlH0tXwLDgQTurS8eIQAAAABJRU5ErkJggg==';

                          let html = '<div><h1>PDF TEST</h1><img src="'+uri+'" alt="Smiley face" height="42" width="42"><h1>PDF TEST</h1></div>';
                          let fileName = 'test_'+Moment().format();

                          var options = {
                              html: html, // HTML String

                              // ****************** OPTIONS BELOW WILL NOT WORK ON ANDROID **************
                              fileName: fileName,          /* Optional: Custom Filename excluded extension
                                                            Default: Randomly generated
                                                          'test'*/


                              directory: 'docs',         /* Optional: 'docs' will save the file in the `Documents`
                                                            Default: Temp directory
                                                          */

                              base64: true   ,            /* Optional: get the base64 PDF value
                                                            Default: false
                                                         */

                              height: 800     ,           /* Optional: 800 sets the height of the DOCUMENT that will be produced

                                                            Default: 612
                                                          */
                              width: 1056,               /* Optional: 1056 sets the width of the DOCUMENT that will produced
                                                            Default: 792
                                                          */
                              padding: 24,                /* Optional: 24 is the # of pixels between the outer paper edge and
                                                                    corresponding content edge.  Example: width of 1056 - 2*padding
                                                                    => content width of 1008
                                                            Default: 10
                                                          */
                            };

                            RNHTMLtoPDF.convert(options).then((data) => {
                              console.log(data.filePath);
                              console.log(data.base64);
                            });

                          // htmlToPdf.convertHTMLString(html, fileName,
                          //     function (error, success) {
                          //         if (error) {
                          //             console.log('Oh noes! Errorz!');
                          //             console.log(error);
                          //         } else {
                          //             console.log('Woot! Success!');
                          //             console.log(success);
                          //         }
                          //     }
                          // );




                          this.setState({ screenShot: uri });
                        });

                      return false;

    //***************************************************

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
                  alert('Sorry, something went wrong. Please try again.');
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

      <View style={styles.container}>
        <MapView
          ref="myMapViewRef"
          style={styles.map}
          region={{
            latitude: this.state.curLocation.latitude,
            longitude: this.state.curLocation.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        >
              <MapView.Marker
                coordinate={this.state.curLocation}
                title={'title'}
                description={'description'}
               />
         </MapView>
      </View>

      <Image source={{uri : this.state.screenShot}} style={{height : 100,width : 100}}/>

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

const styles = StyleSheet.create({
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
