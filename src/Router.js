/*
Purpose is to hold all the screens/routes a user can visit
*/
import React, { Component } from 'react';
import { Actions, Scene, Router, ActionConst } from 'react-native-router-flux';

import {
        LeftAccountsTitle,
        BackTitle,
        BackToCats,
        BackToProcessing,
        BackToReimbursables
      } from './components';

import { HEADER } from './global/margins';
import { PRIMARY_COLOUR, SHADOW_COLOUR } from './global/colours';

import RightNameTitle from './components/menuComponents/RightNameTitle';
import MainRight from './components/menuComponents/MainRight';
import FilterTitle from './components/menuComponents/FilterTitle';
import BackToReceipts from './components/menuComponents/BackToReceipts';
import BackToTrips from './components/menuComponents/BackToTrips';

import ErrorScreen from './layouts/ErrorScreen';
import SplashScreen from './layouts/SplashScreen'; //loadingScreen;
import Login from './layouts/Login';
import SignUp from './layouts/SignUp';
import Header from './components/menuComponents/Header';
import AccountsList from './layouts/AccountsList';
import MainNavigationList from './layouts/MainNavigationList';
import Settings from './layouts/Settings';
import Tools from './layouts/Tools';
import SaveDoc from './layouts/SaveDoc';
import Processing from './layouts/Processing';
import Reimbursables from './layouts/Reimbursables';
import ReceiptsListView from './layouts/ReceiptsListView';
import CategoryList from './layouts/CategoryList';
import CategoryReceiptList from './layouts/CategoryReceiptList';
import ReceiptInfo from './layouts/ReceiptInfo';
import ProcessingDetail from './layouts/ProcessingDetail';
import ReimbursableDetail from './layouts/ReimbursableDetail';
import ExportDoc from './layouts/ExportDoc';
import Trips from './layouts/Trips';
import ExportReceipt from './layouts/ExportReceipt';
import ReceiptDetail from './layouts/ReceiptDetail';
import TripInfo from './layouts/TripInfo';

class RouterComponent extends Component {

  renderLeftName() {
    return (
          <LeftAccountsTitle>
            Accounts
          </LeftAccountsTitle>
        );
  }

  renderBackToProcessingButton() {
    return (
      <BackToProcessing>
        Back
      </BackToProcessing>
    );
  }

  renderMainButton() {
    return (
      <BackTitle>
        Main
      </BackTitle>
    );
  }

  renderBackToCategoriesButton() {
    return (
      <BackToCats>
        Categories
      </BackToCats>
    );
  }

  render() {
  return (
    <Router>

    <Scene
      key="splashscreen"
      hideNavBar="true"
      component={SplashScreen}
      animation="fade"
      initial
    />

    <Scene
      key="settings"
      component={Settings}
      hideNavBar={false}
      navigationBarStyle={styles.headerStyle}
      renderTitle={() => <Header />}
      renderBackButton={() => this.renderMainButton()}
      type={ActionConst.REPLACE}
      onBack={() => Actions.main()}
      //initial
    />

    <Scene
      key="login"
      hideNavBar="true"
      component={Login}
      onBack={() => console.log('no back')}
      type={ActionConst.REPLACE}
      //initial
    />

    <Scene
      key="signup"
      component={SignUp}
      hideNavBar="true"
      onBack={() => console.log('no back')}
      type={ActionConst.REPLACE}
      onBack={() => Actions.login()}
      //initial
    />

    <Scene
      key="errorscreen"
      component={ErrorScreen}
      hideNavBar="true"
      animation="fade"
      type={ActionConst.REPLACE}
      //duration="20000 "
    />

    <Scene
      key="accountslist"
      component={AccountsList}
      hideNavBar={false}
      renderTitle={() => <Header />}
      navigationBarStyle={styles.headerStyle}
      hideBackImage
      onBack={() => console.log('no back')}
      renderRightButton={() => <MainRight />}
      type={ActionConst.REPLACE}
    //  onRightTitle={() => console.log('right clicked')}
    />

    <Scene
      key="main"
      component={MainNavigationList}
      hideNavBar={false}
      navigationBarStyle={styles.headerStyle1}
      //hideBackImage
      renderTitle={() => <Header />}
      renderRightButton={() => <RightNameTitle />}
      //renderBackButton={() => console.log('hi')}
      renderBackButton={() => this.renderLeftName()}
      type={ActionConst.REPLACE}
      onBack={() => Actions.main()}
    />

    <Scene
      key="trips"
      component={Trips}
      hideNavBar={false}
      navigationBarStyle={styles.headerStyle}
      renderTitle={() => <Header />}
      renderBackButton={() => this.renderMainButton()}
      type={ActionConst.REPLACE}
      onBack={() => Actions.main()}
    />

    <Scene
      key="receipts"
      hideNavBar={false}
      navigationBarStyle={styles.headerStyle}
      renderTitle={() => <Header />}
      component={ReceiptsListView}
      renderRightButton={() => <FilterTitle num={1} />}
      renderBackButton={() => this.renderMainButton()}
      type={ActionConst.REPLACE}
      onBack={() => Actions.main()}
      //hideBackImage
    />

    <Scene
      key="receiptInfo"
      hideNavBar={false}
      navigationBarStyle={styles.headerStyle}
      renderTitle={() => <Header />}
      component={ReceiptInfo}
      renderBackButton={() => <BackToReceipts />}
      type={ActionConst.REPLACE}
      onBack={() => Actions.receipts()}
      //initial
    />

    <Scene
      key="tripInfo"
      hideNavBar={false}
      navigationBarStyle={styles.headerStyle}
      renderTitle={() => <Header />}
      component={TripInfo}
      renderBackButton={() => this.renderMainButton()}
      type={ActionConst.REPLACE}
      onBack={() => Actions.receipts()}
      //initial
    />

    <Scene
      key="receiptDetail"
      hideNavBar={false}
      navigationBarStyle={styles.headerStyle}
      renderTitle={() => <Header />}
      component={ReceiptDetail}
      renderBackButton={() => <BackToReceipts />}
      type={ActionConst.REPLACE}
      //initial
    />

    <Scene
      key="processingDetail"
      hideNavBar={false}
      navigationBarStyle={styles.headerStyle}
      renderTitle={() => <Header />}
      component={ProcessingDetail}
      renderBackButton={() => this.renderBackToProcessingButton()}
      type={ActionConst.REPLACE}
      onBack={() => Actions.processing()}
      //initial
    />

    <Scene
      key="reimbursableDetail"
      hideNavBar={false}
      navigationBarStyle={styles.headerStyle}
      renderTitle={() => <Header />}
      component={ReimbursableDetail}
      renderBackButton={() => <BackToReimbursables />}
      type={ActionConst.REPLACE}
      onBack={() => Actions.reimbursables()}
      //initial
    />

    <Scene
      key="tools"
      component={Tools}
      hideNavBar={false}
      navigationBarStyle={styles.headerStyle}
      renderTitle={() => <Header />}
      renderBackButton={() => this.renderMainButton()}
      type={ActionConst.REPLACE}
      onBack={() => Actions.main()}
      //initial
    />

    <Scene
      key="export"
      component={ExportDoc}
      hideNavBar={false}
      navigationBarStyle={styles.headerStyle}
      renderTitle={() => <Header />}
      renderBackButton={() => this.renderMainButton()}
      type={ActionConst.REPLACE}
      onBack={() => Actions.main()}
      //initial
    />

    <Scene
      key="exportReceipt"
      component={ExportReceipt}
      hideNavBar={false}
      navigationBarStyle={styles.headerStyle}
      renderTitle={() => <Header />}
      renderBackButton={() => this.renderMainButton()}
      type={ActionConst.REPLACE}
      onBack={() => Actions.receipts()}
      //initial
    />

    <Scene
      key="save"
      component={SaveDoc}
      hideNavBar={false}
      navigationBarStyle={styles.headerStyle}
      renderTitle={() => <Header />}
      type={ActionConst.REPLACE}
      onBack={() => Actions.main()}
      //onRight={() => SaveDoc.onPress.bind(SaveDoc)}
      //rightTitle='Save'
      //initial
    />

    <Scene
      key="processing"
      component={Processing}
      hideNavBar={false}
      navigationBarStyle={styles.headerStyle}
      renderTitle={() => <Header />}
      //renderRightButton={() => this.renderFilterButton(2)}
      renderBackButton={() => this.renderMainButton()}
      type={ActionConst.REPLACE}
      onBack={() => Actions.main()}
    />

    <Scene
      key="reimbursables"
      component={Reimbursables}
      hideNavBar={false}
      navigationBarStyle={styles.headerStyle}
      renderTitle={() => <Header />}
      //renderRightButton={() => this.renderFilterButton(3)}
      renderBackButton={() => this.renderMainButton()}
      type={ActionConst.REPLACE}
      onBack={() => Actions.main()}
    />

    <Scene
      key="categories"
      component={CategoryList}
      hideNavBar={false}
      navigationBarStyle={styles.headerStyle}
      renderTitle={() => <Header />}
      renderBackButton={() => <BackToReceipts />}
      type={ActionConst.REPLACE}
      onBack={() => Actions.receipts()}
    />

    <Scene
      key="catReceipts"
      component={CategoryReceiptList}
      hideNavBar={false}
      navigationBarStyle={styles.headerStyle}
      renderTitle={() => <Header />}
      renderBackButton={() => this.renderBackToCategoriesButton()}
      type={ActionConst.REPLACE}
      onBack={() => Actions.receipts()}
    />

    </Router>
    );
  }
}

const styles = {
  headerStyle: {
    backgroundColor: PRIMARY_COLOUR,
    height: HEADER.height,
    padding: 15,
    shadowColor: SHADOW_COLOUR,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2
  },
  headerStyle1: {
    backgroundColor: PRIMARY_COLOUR,
    height: HEADER.height,
    padding: 2,
    shadowColor: SHADOW_COLOUR,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2
  }
};

export default RouterComponent;
