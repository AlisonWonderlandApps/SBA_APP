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
import {
  NotSureStr,
  ReimburseStr,
  DeductStr
} from './strings';
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

class SaveDoc extends Component {
  constructor(props) {
    super(props);
    //console.log('propsphoto', this.props);
    //console.log('uri', this.props.imageData);
    imgUri = this.props.imageData.source.uri;
    console.log(imgUri);
  }

  shouldComponentUpdate(nextProps) {
    //console.log('should', this.props, nextProps);
    if (this.props !== nextProps) {
      imgUri = this.props.imageData.source.uri;
      console.log(imgUri);
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
          <TextInput
            style={{ fontSize: 16, alignItems: 'flex-start', padding: 5, height: 80 }}
            placeholder='+ tap to add note'
            onChangeText={this.onNoteChanged.bind(this)}
            value={this.props.newReceiptNote}
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
      if (this.props.newReceiptCategory === '') {
        const submittedBy = 'Submitted by '.concat(this.props.email);
        categories[0] = submittedBy;
      } else {
        categories[0] = this.props.newReceiptCategory;
        const submittedBy = 'Submitted by '.concat(this.props.email);
        categories[1] = submittedBy;
      }
      this.props.setFetching();
      this.props.addReceiptFromImage(
        this.props.curAccountID,
        this.props.imageData,
        categories,
        date,
        this.props.newReceiptNote
      );
  }

  onNoteChanged(input) {
    //console.log(input);
    this.props.noteChanged(input);
  }

  onReimburseClick() {
    this.props.setNewReceiptCategory('Reimbursable');
    //console.log('reimburseables', this.props.newReceiptCategory);
  }

  renderReimbursables() {
    if (this.props.newReceiptCategory === 'Reimbursable') {
      return (
        <CardSection
          style={{
            justifyContent: 'center',
            backgroundColor: PRIMARY_HIGHLIGHT_COLOUR,
            borderWidth: 1,
            flex: 1 }}
        >
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
    this.props.setNewReceiptCategory('Deductible');
    //console.log('DeductStr', this.props.newReceiptCategory);
  }

  renderDeductibles() {
    if (this.props.newReceiptCategory === 'Deductible') {
      return (
        <CardSection
          style={{
            justifyContent: 'center',
            backgroundColor: PRIMARY_HIGHLIGHT_COLOUR,
            borderWidth: 1,
            flex: 1 }}
        >
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
    this.props.setNewReceiptCategory('Unknown');
    //console.log('NotSureStr', this.props.newReceiptCategory);
  }

  renderNotSure() {
    if (this.props.newReceiptCategory === 'Unknown') {
      return (
        <CardSection
          style={{
            justifyContent: 'center',
            backgroundColor: PRIMARY_HIGHLIGHT_COLOUR,
            borderWidth: 1,
            flex: 1 }}
        >
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
    curAccountID,
    email
  } = accounts;
  const {
    newReceiptCategory,
    newReceiptNote,
    newReceipt,
    imageData,
    isFetching
  } = receipts;
  return {
    curAccountID,
    email,
    newReceiptCategory,
    newReceiptNote,
    newReceipt,
    imageData,
    isFetching
  };
};

export default connect(mapStateToProps, {
  setNewReceiptCategory,
  noteChanged,
  addReceiptFromImage,
  resetNewReceipt,
  setFetching,
  reprocessDocument
})(SaveDoc);


//saving a receipt
