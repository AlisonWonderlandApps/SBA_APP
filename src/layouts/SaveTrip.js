/*
*
*/

import React, { Component } from 'react';
import {
  TouchableOpacity,
  Alert,
  Text,
  View,
  Image,
  TextInput,
} from 'react-native';
import { connect } from 'react-redux';
//import { Actions } from 'react-native-router-flux';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  BackgroundView,
  CardSection,
  Button
} from '../components';
import { HEADER } from '../global/margins';
import { PRIMARY_COLOUR, PRIMARY_HIGHLIGHT_COLOUR } from '../global/colours';
import {
  setNewReceiptCategory,
  noteChanged,
  addReceiptFromImage,
  resetNewReceipt,
  setFetching,
  reprocessDocument
 } from '../actions';

let imgUri = '';

class SaveTrip extends Component {
  constructor(props) {
    super(props);
    //console.log('propsphoto', this.props);
    //console.log('uri', this.props.imageData);
    imgUri = this.props.tripData.uri;
    console.log(imgUri);
    this.state = {
      rateFocus: false,
      kmFocus: false
    };
  }

  shouldComponentUpdate(nextProps) {
    //console.log('should', this.props, nextProps);
    if (this.props !== nextProps) {
      //imgUri = this.props.imageData.source.uri;
      //console.log(imgUri);
      return true;
    }
    return false;
  }

  render() {
    return (
      <BackgroundView
        style={{ padding: 0, flex: 1, justifyContent: 'flex-start', paddingTop: HEADER.height }}
      >
        <View
        style={{
          backgroundColor: PRIMARY_HIGHLIGHT_COLOUR,
          height: 50,
          width: null,
          justifyContent: 'center',
          alignItems: 'center' }}
        >
          <Button
              style={{ borderColor: PRIMARY_COLOUR, height: 30, width: 100 }}
              onPress={this.onSavePress.bind(this)}
          >
            Save
          </Button>
        </View>
        <View style={{ backgroundColor: 'white', padding: 5 }}>
          <View style={styles.dataBox}>
            <Text style={{ flex: 1 }}> Trip Name: </Text>
            <TextInput
              style={styles.inputBox}
              underlineColorAndroid='transparent'
              returnKeyType='next'
              //TODO: fix not moving to next box
              onEndEditing={() => { this.setState({ kmFocus: true }); console.log(this.state); }}
              placeholder='Name'
            />
          </View>
          <View style={styles.dataBox}>
            <Text style={{ flex: 1 }}> Kilometer(s): </Text>
            <TextInput
              style={styles.inputBox}
              underlineColorAndroid='transparent'
              returnKeyType='next'
              placeholder='Kms'
              autoFocus={this.state.kmFocus}
            />
          </View>
          <View style={styles.dataBox}>
            <Text style={{ flex: 1 }}> Rate ($/km): </Text>
            <TextInput
              style={styles.inputBox}
              underlineColorAndroid='transparent'
              returnKeyType='done'
              placeholder='Rate'
              autoFocus={this.state.rateFocus}
            />
          </View>
          <View style={styles.dataBox}>
            <Text style={{ flex: 1 }}> Date(s): </Text>
            <TextInput
              style={styles.inputBox}
              placeholder='Date'
              editable={false}
            />
          </View>
          <View style={styles.dataBox}>
            <Text style={{ flex: 1 }}> Total(AUD $): </Text>
            <TextInput
              style={styles.inputBox}
              placeholder='Total'
              editable={false}
            />
          </View>
          <TextInput
            style={{ fontSize: 16, alignItems: 'flex-start', padding: 5, height: 80 }}
            placeholder='+ tap to add note'
            onChangeText={this.onNoteChanged.bind(this)}
            value={this.props.newReceiptNote}
            multiline
          />
        </View>
        <View style={{ flex: 1, paddingBottom: 15, padding: 20, justifyContent: 'space-between' }} >
          <Image
            style={{ borderWidth: 1, height: 100, flex: 1, resizeMode: 'cover', paddingBottom: 10 }}
            source={{ uri: imgUri }}
          />
        </View>
        <Spinner
          visible={this.props.isFetching}
          textContent={''}
          textStyle={{ color: 'white' }}
        />
      </BackgroundView>
    );
  }

  onSavePress() {
      const categories = [];
      const date = new Date();
      categories[0] = 'Trips';
      Alert.alert('wip');

    //  this.props.setFetching();
    /*  this.props.addReceiptFromImage(
        this.props.curAccountID,
        this.props.imageData,
        categories,
        date,
        this.props.newReceiptNote
      ); */
  }

  onNoteChanged(input) {
    //console.log(input);
    this.props.noteChanged(input);
  }

}

const styles = {
  dataBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    height: 50
  },
  inputBox: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 5,
    margin: 5
  }
};

const mapStateToProps = ({ accounts, trips }) => {
  const {
    curAccountID,
    email
  } = accounts;
  const {
    tripData
  } = trips;
  return {
    curAccountID,
    email,
    tripData
  };
};

export default connect(mapStateToProps, {
  setNewReceiptCategory,
  noteChanged,
  addReceiptFromImage,
  resetNewReceipt,
  setFetching,
  reprocessDocument
})(SaveTrip);
