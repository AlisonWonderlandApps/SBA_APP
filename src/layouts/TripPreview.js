
import React, { Component } from 'react';
import { View, StyleSheet,Image ,Text,AsyncStorage,Platform} from 'react-native';
import {
  BackgroundView,Button
 } from '../components';
 import { connect } from 'react-redux';
import { takeSnapshot } from "react-native-view-shot";
import Moment from "moment";
import RNFetchBlob from 'react-native-fetch-blob';
import { ssApiQueryURL, ssAuthConfig } from '../config/auth';
import { Actions } from 'react-native-router-flux';

let self ;

class TripPreview extends Component {
  constructor(props){
    super(props);

    self = this;

    this.state = {
      mapSnapShotUri : "http://www.freeiconspng.com/uploads/pictures-icon-22.gif",
    }
  }

  submitTrip(){
    let viewRef = self.refs.tripView;
    let tripSnapshotPath;

    takeSnapshot(viewRef, {
      format: "jpeg",
      quality: 0.8
    })
      .then(
        uri => {
          let tripDetailSnapshot = uri;
          let temp = tripDetailSnapshot.split("/")
          let fileName = temp[temp.length - 1];

          AsyncStorage.getItem('AuthStr').then((AuthStr) => {
            if (AuthStr !== null) {
              let accountId = "1481900574";
              const requestUrl = ssApiQueryURL.accounts.concat(accountId).concat('/documents/');

              RNFetchBlob.fetch('POST', requestUrl, {
                   Authorization: AuthStr,
                   'Content-Type': 'multipart/form-data',
                 }, [
                    {
                      name: 'attachment',
                      filename: fileName,
                      type: "image/jpeg",
                      data: RNFetchBlob.wrap(tripDetailSnapshot)
                    },
                   { name: 'account', data: accountId },
                   { name: 'document',
                      data: JSON.stringify({
                          processingState: 'PROCESSED',//'NEEDS_SYSTEM_PROCESSING',
                          categories : ['Trips'],
                          vendor : "Business Trip"
                        })
                 }
                 ]).then((resp) => {
                   const respJSONData = JSON.parse(resp.data);
                   const tripId = respJSONData.id;
                   console.log('--------->resp : ', JSON.stringify(resp));
                   alert('Trip saved successfully.(Trip Id : ' + tripId + ')');
                   Actions.trips();

                 }).catch((err) => {
                   alert('Sorry , something went wrong while receipt upload.');
                   console.log('--------->err : ', JSON.stringify(err));
                 });
            }
          });
        },
        error => console.log(error)
      );

  }

  render() {
    AsyncStorage.getItem('mapSnapshotUri', function(err,res){
      self.setState({
        mapSnapShotUri : res
      })
    });

    let date = Moment().format('DD/MM/YYYY');
    let distance = "5 miles";
    let rate = "0.54 /mile";
    let total = "$0.00";

    return (
      <View style={styles.container}>

      <View style={styles.tripDetailContainer} ref="tripView" collapsable={false}>
        <View style={styles.tripDetailTextContainer}>
          <Text style={styles.tripDetailText}>Business Trip</Text>
          <Text style={styles.tripDetailText}>{date}</Text>
          <Text style={styles.tripDetailText}>{distance}</Text>
          <Text style={styles.tripDetailText}>{rate}</Text>
          <Text style={styles.tripDetailText}>Total : {total}</Text>
        </View>

        <View style={styles.tripMapImageView}>
          <Image source={{uri : this.state.mapSnapShotUri}} style={{height : 300,width : 300}}/>
        </View>
      </View>

      <View style={{ paddingTop: 20 }}>
        <Button style={{paddingLeft : 20,paddingRight : 20}} onPress={() => this.submitTrip()}>Add Trip</Button>
      </View>


    </View>
    );
  }
}


const styles = StyleSheet.create({
 container: {
   flex: 1,
  //  alignItems: 'center',
   backgroundColor : '#eeeeee',
   padding : 10,
   paddingTop: 80,
   flexDirection : 'column'
 },
 tripDetailContainer : {
   paddingLeft : 20,
   paddingRight : 20,
   paddingTop : 10,
   paddingBottom : 10,
   width : window.width,
   height : window.height -200,
   flexDirection : 'column',
   backgroundColor : 'white',
 },
 tripDetailTextContainer : {
   flexDirection : 'column',
   marginBottom : 10
 },
 tripMapImageView : {
   alignItems : 'center'
 },
 tripDetailText : {
  fontSize : 12,
  color : 'black',
  marginBottom : 3
},

});

const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps, {

})(TripPreview);
