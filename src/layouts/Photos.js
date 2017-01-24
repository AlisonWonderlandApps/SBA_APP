import React, { Component } from 'react';
import { View } from 'react-native';
import CameraRollPicker from 'react-native-camera-roll-picker';
//import Camera from 'react-native-camera';

class Photos extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
      <CameraRollPicker
        callback={this.getSelectedImages}
      />
      </View>
    );
  }
}

export default Photos;

/*
<CameraRollPicker
  callback={this.getSelectedImages}
/>
*/
