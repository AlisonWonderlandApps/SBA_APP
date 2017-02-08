/*
*
*/

import React, { Component } from 'react';
import {
  TouchableOpacity,
  TouchableHighlight,
  Text,
  View,
  Image,
  TextInput,
  Alert
} from 'react-native';
import { connect } from 'react-redux';
import {
  BackgroundView,
  CardView,
  CardSection,
  Banner
} from '../components';
import {
  NotSureStr,
  ReimburseStr,
  DeductStr
} from './strings';
import { HEADER } from '../global/margins';
import { PRIMARY_HIGHLIGHT_COLOUR } from '../global/colours';

let imgUri = '';

class SaveDoc extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
    console.log('propsphoto', this.props);
    console.log('uri', this.props.photoObj[0].uri);
    imgUri = this.props.photoObj[0].uri;
  }

  render() {
    return (
      <BackgroundView
        style={{ padding: 0, flex: 1, justifyContent: 'flex-start', paddingTop: HEADER.height }}
      >
        <Banner style={{ height: 40, width: null }}> This is a receipt </Banner>
        <View style={{ backgroundColor: 'white', padding: 5 }}>
          <TextInput
            style={{ alignItems: 'flex-start', padding: 5, height: 80 }}
            placeholder='+ tap to add note'
            onChangeText={(text) => this.setState({ text })}
            value={this.state.text}
            multiline
          />
          <View style={{ padding: 5, flexDirection: 'row', width: null }}>
            <CardSection style={{ borderWidth: 1, flex: 1 }}>
              <TouchableOpacity
                style={{ flex: 1 }}
                onPress={this.onReimburseClick.bind(this)}
              >
                <Text
                  style={{
                    color: PRIMARY_HIGHLIGHT_COLOUR,
                    alignSelf: 'center',
                    paddingTop: 5,
                    paddingBottom: 5 }}
                >
                  {ReimburseStr}
                </Text>
              </TouchableOpacity>
            </CardSection>
            <CardSection style={{ borderWidth: 1, flex: 1 }}>
              <TouchableOpacity
                style={{ flex: 1 }}
                onPress={this.onDeductClick.bind(this)}
              >
                <Text
                  style={{
                    color: PRIMARY_HIGHLIGHT_COLOUR,
                    alignSelf: 'center',
                    paddingTop: 5,
                    paddingBottom: 5 }}
                >
                  {DeductStr}
                </Text>
              </TouchableOpacity>
            </CardSection>
            <CardSection style={{ borderWidth: 1, flex: 1 }}>
              <TouchableOpacity
                style={{ flex: 1 }}
                onPress={this.onNotSureClick.bind(this)}
              >
                <Text
                  style={{
                    color: PRIMARY_HIGHLIGHT_COLOUR,
                    alignSelf: 'center',
                    paddingTop: 5,
                    paddingBottom: 5 }}
                >
                  {NotSureStr}
                </Text>
              </TouchableOpacity>
            </CardSection>
          </View>
        </View>
        <View style={{ flex: 1, padding: 20 }} >
          <Image
            style={{ flex: 1, resizeMode: 'cover' }}
            source={{ uri: imgUri }}
          />
        </View>
      </BackgroundView>
    );
  }

  onReimburseClick() {
    console.log('reimburseables');
  }

  onDeductClick() {
    console.log('DeductStr');
  }

  onNotSureClick() {
    console.log('NotSureStr');
  }

}

const mapStateToProps = ({ accounts, receipts }) => {
  const {
    dropBoxEmail
  } = accounts;
  const {
    photoObj
  } = receipts;
  return {
    dropBoxEmail,
    photoObj
  };
};

export default connect(mapStateToProps, {})(SaveDoc);


//saving a receipt
