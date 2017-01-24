/*
Purpose is to hold all the screens/routes a user can visit
*/

import React, { Component } from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LeftNavTitle, RightNavTitle } from './components';

import {
  Receipts,
} from './layouts';

import { HEADER } from './global/margins';
import { PRIMARY_COLOUR, PRIMARY_HIGHLIGHT_COLOUR, SHADOW_COLOUR } from './global/colours';

import ErrorScreen from './layouts/ErrorScreen';
import SplashScreen from './layouts/SplashScreen'; //loadingScreen;
import Login from './layouts/Login';
import SignUp from './layouts/SignUp';
import Header from './components/menuComponents/Header';
import AccountsList from './layouts/AccountsList';
import APITest from './layouts/APITest';
import MainNavigationList from './layouts/MainNavigationList';
import TripsList from './layouts/TripsList';
import ReceiptsList from './layouts/ReceiptsList';
import Photos from './layouts/Photos';
import CameraPic from './layouts/Camera';

const moreIcon = (<Icon name="ellipsis-v" size={25} color="#ffffff" />);

class RouterComponent extends Component {
  renderLeftButton(props) {
    console.log(props.backTitle);
      return (
        <LeftNavTitle onPress={Actions.splashscreen} leftTitle={props.backTitle} />
      );
  }

  renderRightButton(props) {
    console.log(props.rightTitle);
      return (
        <RightNavTitle onPress={Actions.login} rightTitle={props.rightTitle} />
      );
  }

  render() {
  return (
    <Router>

    <Scene
      hideNavBar="true"
      key="splashscreen"
      component={SplashScreen}
      animation="fade"
      initial
      //duration="20000 "
    />

    <Scene
      hideNavBar="true"
      key="login"
      component={Login}
    />

    <Scene
      hideNavBar="true"
      key="photos"
      component={Photos}
    />

    <Scene
      hideNavBar={false}
      navigationBarStyle={{
          backgroundColor: PRIMARY_COLOUR,
          height: HEADER.height,
          padding: 15,
          shadowColor: SHADOW_COLOUR,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2, }}
      renderTitle={() => <Header />}
      key="camera"
      component={CameraPic}
    />

    <Scene
      key="main"
      hideNavBar={false}
      navigationBarStyle={{
          backgroundColor: PRIMARY_COLOUR,
          height: HEADER.height,
          padding: 15,
          shadowColor: SHADOW_COLOUR,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2, }}
      renderTitle={() => <Header />}
      component={MainNavigationList}
      renderRightButton={() => <Icon name="ellipsis-v" size={25} color="#ffffff" />}
      //hideBackImage
    />

    <Scene
      key="trips"
      hideNavBar={false}
      navigationBarStyle={{
          backgroundColor: PRIMARY_COLOUR,
          height: HEADER.height,
          padding: 15,
          shadowColor: SHADOW_COLOUR,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2, }}
      renderTitle={() => <Header />}
      component={TripsList}
      renderRightButton={() => <Icon name="ellipsis-v" size={25} color="#ffffff" />}
      //hideBackImage
    />

    <Scene
      key="receipts"
      hideNavBar={false}
      navigationBarStyle={{
          backgroundColor: PRIMARY_COLOUR,
          height: HEADER.height,
          padding: 15,
          shadowColor: SHADOW_COLOUR,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2, }}
      renderTitle={() => <Header />}
      component={ReceiptsList}
      renderRightButton={() => <Icon name="ellipsis-v" size={25} color="#ffffff" />}
      //hideBackImage
    />

    <Scene
      hideNavBar={false}
      renderTitle={() => <Header />}
      navigationBarStyle={{
          backgroundColor: PRIMARY_COLOUR,
          height: HEADER.height,
          padding: 15,
          shadowColor: SHADOW_COLOUR,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
        }}
      hideBackImage
        //backTitle='Accounts'
    //  onBack={Actions.api}
    //  backStyle={{ color: PRIMARY_HIGHLIGHT_COLOUR }}
      key="accountslist"
      component={AccountsList}
    />

    <Scene
      key="api"
      hideNavBar={false}
      navigationBarStyle={{
          backgroundColor: PRIMARY_COLOUR,
          height: HEADER.height,
          padding: 15,
          shadowColor: SHADOW_COLOUR,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2, }}
      renderTitle={() => <Header />}
      component={APITest}
      backTitle='< Back'
      //onBack={Actions.list}
      renderBackButton={this.renderLeftButton.bind(this.props)}
      rightTitle='Next'
      renderRightButton={this.renderRightButton.bind(this.props)}
    />

      <Scene
        hideNavBar="true"
        key="errorscreen"
        component={ErrorScreen}
        animation="fade"
        //duration="20000 "
      />

        <Scene
          hideNavBar="true"
          key="signup"
          component={SignUp}
        />

      <Scene key="receipts">
        <Scene
          key="receiptsList"
          component={Receipts}
        />
      </Scene>

    </Router>
    );
  }
}
export default RouterComponent;

/*

    <Scene
      key="main"
      component={MainNavigationList}
      hideNavBar={false}
      hideNavBar={false}
      navigationBarStyle={{
          backgroundColor: PRIMARY_COLOUR,
          height: HEADER.height,
          padding: 15,
          shadowColor: SHADOW_COLOUR,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2, }}
      renderTitle={() => <Header />}
      //rightTitle=
      //onRight={() Action.addAccount()}
    />
    */
