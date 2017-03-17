import React, { Component } from 'react';
import { View, Image, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Button } from '../components';
import { HEADER } from '../global/margins';
import { BACKGROUND_COLOUR } from '../global/colours';

let imgUri = '';

class CameraStill extends Component {

  render() {
    console.log('img', this.props.photoObj.uri);
    imgUri = this.props.photoObj[0].uri;
    return (
      <View style={{ flex: 1, paddingTop: HEADER.height }}>
        <Image
          style={{
            flex: 1,
            alignItems: 'center',
            height: Dimensions.get('window').height,
            width: Dimensions.get('window').width
          }}
          source={{ uri: imgUri }}
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
            onPress={this.goToCamera}
        >
              Retake
          </Button>
          <Button
            style={{ width: 100 }}
            onPress={this.goToSave}
          >
              Use
          </Button>
        </View>
      </View>
    );
  }

  goToCamera() {
    Actions.camera();
  }

  goToSave() {
    Actions.save();
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

export default connect(mapStateToProps, {

})(CameraStill);
