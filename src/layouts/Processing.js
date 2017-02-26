import React, { Component } from 'react';
import { Alert, View, TouchableOpacity, ListView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import {
  BackgroundView,
  MySearchBar,
  FAB,
  Button,
  Banner
} from '../components';
import { HEADER } from '../global/margins';
import { PRIMARY_HIGHLIGHT_COLOUR } from '../global/colours';

class Processing extends Component {

  constructor(props) {
    super(props);
  }


  componentWillUpdate(nextProps) {

  }

  componentDidUpdate() {

  }

  render() {
    return (
      <BackgroundView style={styles.background}>
        <View style={styles.view}>
          <MySearchBar />
          <Button style={styles.button}> Export </Button>
        </View>
        <Banner style={styles.banner}>
          Processing receipts are being verified for correctness
        </Banner>
        <FAB
          onPress={this.onPressFAB}
        />
      </BackgroundView>
    );
  }

  onPressFAB() {
    console.log('FAB pressed');
    Alert.alert(
      'Choose Photo Source',
      null,
      [
        { text: 'Camera', onPress: () => Actions.camera() },
        { text: 'Photo Library', onPress: () => Actions.photos() },
        { text: 'Cancel', onPress: () => console.log('cancel'), style: 'cancel' }
      ]
    );
  }
}

const styles = {
  background: {
    padding: 0,
    justifyContent: 'center',
    paddingTop: HEADER.height,
    flex: 1
  },
  view: {
    flexDirection: 'row',
    padding: 10,
    height: 60,
    backgroundColor: PRIMARY_HIGHLIGHT_COLOUR
  },
  button: {
    marginTop: 0,
    height: 30,
    flexGrow: 0.3
  },
  banner: {
    height: 40,
    backgroundColor: 'green'
  }
};

const mapStateToProps = ({ accounts }) => {
  const {
    accountsArr,
    curAccount
  } = accounts;
  return {
    accountsArr,
    curAccount
  };
};


export default connect(mapStateToProps, {

})(Processing);
