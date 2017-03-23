
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

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
});

class MyMapView extends Component {
 render() {
   const { region } = this.props;
   console.log('region', region);

   return (
     <View style={styles.container}>
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
}

export { MyMapView };
