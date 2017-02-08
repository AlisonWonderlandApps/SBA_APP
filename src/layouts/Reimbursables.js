import React, { Component } from 'react';
import { Alert, View, ListView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import {
  BackgroundView,
  MySearchBar,
  FAB,
  Button
} from '../components';
import { HEADER } from '../global/margins';
import { PRIMARY_HIGHLIGHT_COLOUR } from '../global/colours';

class Reimbursables extends Component {

  constructor(props) {
    super(props);
  }


  componentWillUpdate(nextProps) {

  }

  componentDidUpdate() {

  }

  render() {
    return (
      <BackgroundView style={{ padding: 0, justifyContent: 'center', paddingTop: HEADER.height, flex: 1 }}>
        <View
          style={{ flexDirection: 'row', padding: 10, height: 60, backgroundColor: PRIMARY_HIGHLIGHT_COLOUR }}>
          <MySearchBar />
          <Button style={{ marginTop: 5, height: 30, flexGrow: 0.3 }}> Export </Button>
        </View>
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

})(Reimbursables);
