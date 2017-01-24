/*
*
*/

import React, { Component } from 'react';
import { View } from 'react-native';

import { Banner, TabView, FullScreenView, HeaderWithIcon } from '../components';
import MainNavigationList from './MainNavigationList';

class MainScreen extends Component {
  render() {
    return (
      <FullScreenView style={{ padding: 0, justifyContent: 'flex-start' }}>
          <HeaderWithIcon />
          <Banner> Ad Banner </Banner>
      </FullScreenView>
    );
  }
}

export { MainScreen };

/*
<Banner> Ad Banner </Banner>
<TabView title1='processing' title2='reimbursable' />
<HeaderWithIcon />
<MainNavigationList />
*/
