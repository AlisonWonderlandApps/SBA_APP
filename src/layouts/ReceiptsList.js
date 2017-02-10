import React, { Component } from 'react';
import { View, ListView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import { HEADER } from '../global/margins';
import {
  AccountListItem,
  TitleText,
  BackgroundView
 } from '../components';

class ReceiptsList extends Component {
  render() {
    return (
      <BackgroundView>
        <TitleText> Hi </TitleText>
      </BackgroundView>
    );
  }
}

export default ReceiptsList;
