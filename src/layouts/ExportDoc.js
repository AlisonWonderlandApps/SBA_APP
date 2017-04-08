/*
*
*/

import React, { Component } from 'react';
import {
  TextInput,
  Text,
  View
} from 'react-native';
import { connect } from 'react-redux';
import {
  BackgroundView,
} from '../components';
import { HEADER } from '../global/margins';
import { APP_GREY } from '../global/colours';
import {
  deleteReceipt
 } from '../actions';

class ExportDoc extends Component {

  shouldComponentUpdate(nextProps) {
    //console.log('should', this.props, nextProps);
    if (this.props !== nextProps) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <BackgroundView
        style={{ padding: 0, flex: 1, paddingTop: HEADER.height }}
      >
        <View style={{ flex: 1, padding: 5 }}>
          <View style={styles.textinput}>
            <TextInput
              style={styles.textinput}
              placeholder='To:'
              onChangeText={(text) => console.log(text)}
            />
          </View>
          <View style={styles.textinput}>
            <TextInput
              style={styles.textinput}
              placeholder='Cc/Bcc:'
              onChangeText={(text) => console.log(text)}
            />
          </View>
          <View style={styles.textinput}>
            <TextInput
              style={styles.textinput}
              placeholder='Subject: '
              defaultValue='Squirrel Street Australia Export'
              onChangeText={(text) => console.log(text)}
            />
          </View>
        </View>
        <View style={{ flex: 1, padding: 5, justifyContent: 'flex-start' }}>
          <View>
            <Text> PDF should be rendered here </Text>
          </View>
          <View>
            <Text> Total: $??? </Text>
          </View>
          <View>
            <Text> Receipt attachment here </Text>
          </View>
        </View>
      </BackgroundView>
    );
  }
}

const styles = {
  textinput: {
    borderBottomWidth: 1,
    borderBottomColor: APP_GREY,
    height: 40,
    width: null,
    alignItems: 'center',
  }
};

const mapStateToProps = ({ accounts, receipts }) => {
  const {
    curAccountID,
    email
  } = accounts;
  const {
    exportDoc
  } = receipts;
  return {
    curAccountID,
    email,
    exportDoc
  };
};

export default connect(mapStateToProps, {
  deleteReceipt
})(ExportDoc);


//saving a receipt
