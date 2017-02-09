/*
Purpose is to hold all the screens/routes a user can visit
*/
import { Text } from 'react-native';
import React, { Component } from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';

import { LeftNavTitle, RightNavTitle } from './components';

import { HEADER } from './global/margins';
import { PRIMARY_COLOUR, SHADOW_COLOUR } from './global/colours';

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
import CameraStill from './layouts/CameraStill';
import Settings from './layouts/Settings';
import Tools from './layouts/Tools';
import SaveDoc from './layouts/SaveDoc';
import Processing from './layouts/Processing';
import Reimbursables from './layouts/Reimbursables';

class RouterComponent extends Component {
/*  shouldComponentUpdate(nextProps) {
    console.log('update', this.props.userName, nextProps.userName);
    if (this.props.userName !== nextProps.userName) {
      return true;
    }
    return false;
  }*/

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

  renderRightTitle1(props) {
    console.log('title', props.userName, typeof (this.props.userName));
    return props.userName;
  }

  render() {
  console.log('name', this.props.userInfo.name);

  return (
    <Router>

    <Scene
      key="splashscreen"
      hideNavBar="true"
      component={SplashScreen}
      animation="fade"
      //initial
      //duration="20000 "
    />

    <Scene
      key="settings"
      component={Settings}
      hideNavBar={false}
      navigationBarStyle={{
          backgroundColor: PRIMARY_COLOUR,
          height: HEADER.height,
          padding: 15,
          shadowColor: SHADOW_COLOUR,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2, }}
      renderTitle={() => <Header />}
      //onBack={() => console.log('back pressed')}
      //initial
    />

    <Scene
      key="login"
      hideNavBar="true"
      component={Login}
    />

    <Scene
      key="signup"
      component={SignUp}
      hideNavBar="true"
    />

    <Scene
      key="errorscreen"
      component={ErrorScreen}
      hideNavBar="true"
      animation="fade"
      //duration="20000 "
    />

    <Scene
      key="accountslist"
      component={AccountsList}
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
      onRightTitle={() => console.log('right clicked')}
    //  rightTitle={this.props.userName}
      //backTitle='Accounts'
    //  onBack={Actions.api}
    //  backStyle={{ color: PRIMARY_HIGHLIGHT_COLOUR }}
    />

    <Scene
      key="photos"
      component={Photos}
      hideNavBar={false}
      navigationBarStyle={{
          backgroundColor: PRIMARY_COLOUR,
          height: HEADER.height,
          padding: 15,
          shadowColor: SHADOW_COLOUR,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2, }}
      renderTitle={() => <Header />}
      rightTitle='Add'
      onRight={() => Actions.save()}
    />

    <Scene
      key="camera"
      component={CameraPic}
      hideNavBar={false}
      navigationBarStyle={{
          backgroundColor: PRIMARY_COLOUR,
          height: HEADER.height,
          padding: 15,
          shadowColor: SHADOW_COLOUR,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2, }}
      renderTitle={() => <Header />}
      //initial
    />

    <Scene
      key="cameraPic"
      component={CameraStill}
      hideNavBar={false}
      navigationBarStyle={{
          backgroundColor: PRIMARY_COLOUR,
          height: HEADER.height,
          padding: 15,
          shadowColor: SHADOW_COLOUR,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2, }}
      renderTitle={() => <Header />}
      //initial
    />

    <Scene
      key="main"
      component={MainNavigationList}
      hideNavBar={false}
      navigationBarStyle={{
          backgroundColor: PRIMARY_COLOUR,
          height: HEADER.height,
          padding: 15,
          shadowColor: SHADOW_COLOUR,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2, }}
      renderTitle={() => <Header />}
      onRight={() => Actions.settings()}
      //onRight={() => console.log('right clicked', this.props.userInfo.name)}
    //  renderRightTitle={this.renderRightTitle1.bind(this.props)}
      rightTitle={this.props.userName}
    />

    <Scene
      key="trips"
      component={TripsList}
      hideNavBar={false}
      navigationBarStyle={{
          backgroundColor: PRIMARY_COLOUR,
          height: HEADER.height,
          padding: 15,
          shadowColor: SHADOW_COLOUR,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2, }}
      renderTitle={() => <Header />}
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
      key="tools"
      component={Tools}
      hideNavBar={false}
      navigationBarStyle={{
          backgroundColor: PRIMARY_COLOUR,
          height: HEADER.height,
          padding: 15,
          shadowColor: SHADOW_COLOUR,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2, }}
      renderTitle={() => <Header />}
      //initial
    />

    <Scene
      key="save"
      component={SaveDoc}
      hideNavBar={false}
      navigationBarStyle={{
          backgroundColor: PRIMARY_COLOUR,
          height: HEADER.height,
          padding: 15,
          shadowColor: SHADOW_COLOUR,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2, }}
      renderTitle={() => <Header />}
      //onRight={() => SaveDoc.onPress.bind(SaveDoc)}
      //rightTitle='Save'
      //initial
    />

    <Scene
      key="processing"
      component={Processing}
      hideNavBar={false}
      navigationBarStyle={{
          backgroundColor: PRIMARY_COLOUR,
          height: HEADER.height,
          padding: 15,
          shadowColor: SHADOW_COLOUR,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2, }}
      renderTitle={() => <Header />}
      onRight={() => console.log('filter it')}
      rightTitle='Filters'
      //initial
    />

    <Scene
      key="reimbursables"
      component={Reimbursables}
      hideNavBar={false}
      navigationBarStyle={{
          backgroundColor: PRIMARY_COLOUR,
          height: HEADER.height,
          padding: 15,
          shadowColor: SHADOW_COLOUR,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2, }}
      renderTitle={() => <Header />}
      onRight={() => console.log('filter it')}
      rightTitle='Filters'
      //initial
    />

    <Scene
      key="api"
      component={APITest}
      hideNavBar={false}
      navigationBarStyle={{
          backgroundColor: PRIMARY_COLOUR,
          height: HEADER.height,
          padding: 15,
          shadowColor: SHADOW_COLOUR,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2, }}
      renderTitle={() => <Header />}
      backTitle='< Back'
      //onBack={Actions.list}
      renderBackButton={this.renderLeftButton.bind(this.props)}
      rightTitle='Next'
      renderRightButton={this.renderRightButton.bind(this.props)}
    />

    </Router>
    );
  }
}


const mapStateToProps = ({ user }) => {
  const {
    userName,
    userInfo
  } = user;
  return {
    userName,
    userInfo
  };
};

export default connect(mapStateToProps, {})(RouterComponent);

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

    <Scene key="receipts1">
      <Scene
        key="receiptsList"
        component={Receipts}
      />
    </Scene>

    <Scene
      hideNavBar="true"
      key="receiptList"
      component={ReceiptsListView}
      animation="fade"
      initial
      //duration="20000 "
    />
    //rightTitle={this.renderRightTitle.bind(this)}
    //renderRightTitle={this.renderRightTitle.bind(this)}
    //renderRightButton={this.renderName.bind(this.props)}
    //hideBackImage
    */
