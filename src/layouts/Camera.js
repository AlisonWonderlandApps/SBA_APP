import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
//import CameraRollPicker from 'react-native-camera-roll-picker';
import Camera from 'react-native-camera';

class CameraPic extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
        >
          <Text style={styles.capture} onPress={this.takePicture.bind(this)}>OK</Text>
        </Camera>
      </View>
    );
  }

  takePicture() {
    this.camera.capture()
      .then((data) => console.log(data))
      .catch(err => console.error(err));
  }

  savePicture() {
    //go to save screen with data.
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: 'purple',
    padding: 10,
    margin: 40
  }
});

export default CameraPic;

/*
<CameraRollPicker
  callback={this.getSelectedImages}
/>
*/
