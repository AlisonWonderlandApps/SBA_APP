
import React, { Component } from 'react';
import { View } from 'react-native';

import { Banner, MySearchBar } from '../components';
import { MainNavigationList } from '../layouts/MainNavigationList';

class Receipts extends Component {
  render() {
    return (
      <View>
        <Banner> Features Banner </Banner>
        <MySearchBar />
        <MainNavigationList />

      </View>
    );
  }
}

export { Receipts };
