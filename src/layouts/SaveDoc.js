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
import { Actions } from 'react-native-router-flux';
import {
  BackgroundView,
  CardSection,
  Button
} from '../components';
import {
  NotSureStr,
  ReimburseStr,
  DeductStr
} from './strings';
import { HEADER } from '../global/margins';
import { PRIMARY_COLOUR, PRIMARY_HIGHLIGHT_COLOUR } from '../global/colours';
import {
  setReceiptCategory,
  noteChanged,
  saveReceipt
 } from '../actions';

let imgUri = '';

class SaveDoc extends Component {
  constructor(props) {
    super(props);
    console.log('propsphoto', this.props);
  //  console.log('uri', this.props.photoObj[0].uri);
    imgUri = this.props.photoObj[0].uri;
  }

  shouldComponentUpdate(nextProps) {
    console.log('should', this.props, nextProps);
    if (this.props !== nextProps) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <BackgroundView
        style={{ padding: 0, flex: 1, justifyContent: 'flex-start', paddingTop: HEADER.height }}
      >
        <View style={{ backgroundColor: PRIMARY_HIGHLIGHT_COLOUR, height: 50, width: null, justifyContent: 'center', alignItems: 'center' }} >
          <Button
              style={{ borderColor: PRIMARY_COLOUR, height: 30, width: 100 }}
              onPress={this.onSavePress.bind(this)}
          >
            Save
          </Button>
        </View>
        <View style={{ backgroundColor: 'white', padding: 5 }}>
          <TextInput
            style={{ fontSize: 16, alignItems: 'flex-start', padding: 5, height: 80 }}
            placeholder='+ tap to add note'
            onChangeText={this.onNoteChanged.bind(this)}
            value={this.props.note}
            multiline
          />
          <View style={{ padding: 5, flexDirection: 'row', width: null }}>
            <TouchableOpacity
              style={{ flex: 1, height: 40 }}
              onPress={this.onReimburseClick.bind(this)}
            >
              {this.renderReimbursables()}
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flex: 1, height: 40 }}
              onPress={this.onDeductClick.bind(this)}
            >
              {this.renderDeductibles()}
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flex: 1, height: 40 }}
              onPress={this.onNotSureClick.bind(this)}
            >
              {this.renderNotSure()}
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flex: 1, paddingBottom: 15, padding: 20, justifyContent: 'space-between' }} >
          <Image
            style={{ borderWidth: 1, flex: 1, resizeMode: 'cover', paddingBottom: 10 }}
            source={{ uri: imgUri }}
          />
        </View>
      </BackgroundView>
    );
  }

  onPress() {
    console.log('header save');
  }

  onSavePress() {
    console.log('save', this.props);
    if (this.props.category === '') {
      Alert.alert(
        'Oops!!',
        'Please choose a category for your receipt!',
        [
          { text: 'OK' }
        ]
      );
    } else {
      this.props.saveReceipt(this.props);
      Alert.alert(
        'Squirrel Street',
        'Receipt Saved!',
        [
          { text: 'OK', onPress: () => Actions.main() }
        ]
      );
      console.log(this.props.newReceipt);
    }
  }

  onNoteChanged(input) {
    console.log(input);
    this.props.noteChanged(input);
  }

  onReimburseClick() {
    this.props.setReceiptCategory('Reimbursable');
    console.log('reimburseables', this.props.category);
  }

  renderReimbursables() {
    if (this.props.category === 'Reimbursable') {
      return (
        <CardSection style={{ justifyContent: 'center', backgroundColor: PRIMARY_HIGHLIGHT_COLOUR, borderWidth: 1, flex: 1 }}>
            <Text
              style={{
                color: 'white',
                alignSelf: 'center',
                paddingTop: 5,
                paddingBottom: 5 }}
            >
              {ReimburseStr}
            </Text>
        </CardSection>
      );
    }
    return (
      <CardSection style={{ justifyContent: 'center', borderWidth: 1, flex: 1 }}>
          <Text
            style={{
              color: PRIMARY_HIGHLIGHT_COLOUR,
              alignSelf: 'center',
              paddingTop: 5,
              paddingBottom: 5 }}
          >
            {ReimburseStr}
          </Text>
      </CardSection>
    );
  }

  onDeductClick() {
    this.props.setReceiptCategory('Deductible');
    console.log('DeductStr', this.props.category);
  }

  renderDeductibles() {
    if (this.props.category === 'Deductible') {
      return (
        <CardSection style={{ justifyContent: 'center',backgroundColor: PRIMARY_HIGHLIGHT_COLOUR, borderWidth: 1, flex: 1 }}>
            <Text
              style={{
                color: 'white',
                alignSelf: 'center',
                paddingTop: 5,
                paddingBottom: 5 }}
            >
              {DeductStr}
            </Text>
        </CardSection>
      );
    }
    return (
      <CardSection style={{ justifyContent: 'center', borderWidth: 1, flex: 1 }}>
          <Text
            style={{
              color: PRIMARY_HIGHLIGHT_COLOUR,
              alignSelf: 'center',
              paddingTop: 5,
              paddingBottom: 5 }}
          >
            {DeductStr}
          </Text>
      </CardSection>
    );
  }

  onNotSureClick() {
    this.props.setReceiptCategory('Not Sure');
    console.log('NotSureStr', this.props.category);
  }

  renderNotSure() {
    if (this.props.category === 'Not Sure') {
      return (
        <CardSection style={{ justifyContent: 'center', backgroundColor: PRIMARY_HIGHLIGHT_COLOUR, borderWidth: 1, flex: 1 }}>
            <Text
              style={{
                color: 'white',
                alignSelf: 'center',
                paddingTop: 5,
                paddingBottom: 5 }}
            >
              {NotSureStr}
            </Text>
        </CardSection>
      );
    }
    return (
      <CardSection style={{ justifyContent: 'center', borderWidth: 1, flex: 1 }}>
          <Text
            style={{
              color: PRIMARY_HIGHLIGHT_COLOUR,
              alignSelf: 'center',
              paddingTop: 5,
              paddingBottom: 5 }}
          >
            {NotSureStr}
          </Text>
      </CardSection>
    );
  }

}

const mapStateToProps = ({ accounts, receipts }) => {
  const {
    curAccount,
    dropBoxEmail
  } = accounts;
  const {
    photoObj,
    category,
    note,
    newReceipt
  } = receipts;
  return {
    curAccount,
    dropBoxEmail,
    photoObj,
    category,
    note,
    newReceipt
  };
};

export default connect(mapStateToProps, {
  setReceiptCategory, noteChanged, saveReceipt
})(SaveDoc);


//saving a receipt
