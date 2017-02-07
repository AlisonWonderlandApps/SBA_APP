
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
       />
     </View>
   );
 }
}

export { MyMapView };
