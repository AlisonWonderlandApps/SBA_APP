import React, { Component } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import Camera from 'react-native-camera';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Button } from '../components';
import { getPhoto } from '../actions';
import { HEADER } from '../global/margins';
import { BACKGROUND_COLOUR } from '../global/colours';

class CameraPic extends Component {
  shouldComponentUpdate(nextProps) {
    if (this.props !== nextProps) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <View
        style={{ flex: 1, paddingTop: HEADER.height }}
      >
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          flashmode={Camera.constants.FlashMode.auto}
          type={Camera.constants.Type.back}
          captureAudio={false}
          captureTarget={Camera.constants.CaptureTarget.disk}
          defaultOnFocusComponent
          onZoomChanged={() => console.log('zoom')}
          onFocusChanged={() => console.log('focus')}
        />
        <View
          style={{
            paddingLeft: 30,
            paddingRight: 30,
            justifyContent: 'space-around',
            flexDirection: 'row',
            backgroundColor: BACKGROUND_COLOUR,
            height: 80,
            padding: 20 }}
        >
          <Button
              style={{ width: 100 }}
              onPress={this.takePicture.bind(this)}
          >
              OK
          </Button>
          <Button
            style={{ width: 100 }}
            onPress={this.cancel}
          >
              Cancel
          </Button>
        </View>
      </View>
    );
  }

  takePicture() {
    this.camera.capture()
      .then((data) => this.savePicture(data))
      .catch(err => console.error(err));
  }

  savePicture(data) {
    const photo = [{
      uri: data.path,
      type: 'image/jpeg'
    }];
    console.log('photodata', data);
    this.props.getPhoto(photo);
    Actions.cameraPic();
  }

  cancel() {
    Actions.main();
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

export default connect(null, {
  getPhoto
})(CameraPic);

/*
<CameraRollPicker
  callback={this.getSelectedImages}
/>
*/
