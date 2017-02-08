import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import CameraRollPicker from 'react-native-camera-roll-picker';
//import Camera from 'react-native-camera';
import { HEADER } from '../global/margins';
import { BACKGROUND_COLOUR } from '../global/colours';
import { getPhoto } from '../actions';

class Photos extends Component {
  render() {
    return (
      <View style={{ flex: 1, paddingTop: HEADER.height }}>
        <CameraRollPicker
          maximum={1}
          callback={this.getSelectedImages.bind(this)}
          backgroundColor={BACKGROUND_COLOUR}
          groupTypes='All'
        />
      </View>
    );
  }

  getSelectedImages(img) {
    console.log('img', img);
    this.props.getPhoto(img);
  }
}


const mapStateToProps = ({ receipts }) => {
  const {
    photoObj
  } = receipts;
  return {
    photoObj
  };
};

export default connect(null, {
  getPhoto
})(Photos);

/*
<CameraRollPicker
  callback={this.getSelectedImages}
/>
*/
