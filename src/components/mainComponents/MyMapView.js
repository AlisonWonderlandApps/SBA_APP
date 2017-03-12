
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

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

class MyMapView extends Component {
 render() {
   const { region ,location } = this.props;
   console.log('region', region);

   return (
     <View style={styles.container}>
       <MapView
         style={styles.map}
         region={{
           latitude: location.latitude,
           longitude: location.longitude,
           latitudeDelta: 0.015,
           longitudeDelta: 0.0121,
         }}
       >
             <MapView.Marker
               coordinate={location}
               title={'title'}
               description={'description'}
              />
        </MapView>
     </View>
   );
 }
}

export { MyMapView };
