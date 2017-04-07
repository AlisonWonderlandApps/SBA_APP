/*
Purpose is to hold all the screens/routes a user can visit
*/
import { Text } from 'react-native';
import React, { Component } from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import {
        LeftNavTitle,
        RightNavTitle,
        RightNameTitle,
        LeftAccountsTitle,
        BackTitle,
        FilterTitle,
        BackToReceipts,
        BackToCats,
        BackToProcessing,
        BackToTrips
      } from './components';

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

  renderRightName(name) {
    return (
            <RightNameTitle>
              {name}
            </RightNameTitle>
          );
  }

  renderLeftName() {
    return (
          <LeftAccountsTitle>
            Accounts
          </LeftAccountsTitle>
        );
  }

  renderFilterButton(num) {
    let render = false;
    switch (num) {
      case 1:
        if (this.props.categories.length > 0) {
          render = true;
        }
        break;
      case 2:
        if (this.props.processingCount > 0) {
          render = true;
        }
        break;
      case 3:
        if (this.props.reimbursableCount > 0) {
          render = true;
        }
        break;
      default:
        render = false;
    }
    if (render) {
      return (
        <FilterTitle>
          Filter
        </FilterTitle>
      );
    }
    return <Text />;
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

  renderBackToReceiptsButton() {
    console.log('routerReeiptsbut', this.props.receiptDetail.num);
    if (this.props.receiptDetail.num === 2) {
      console.log('trips render');
      return (
        <BackToTrips>
          Trips
        </BackToTrips>
      );
    }
      return (
        <BackToReceipts>
          Receipts
        </BackToReceipts>
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
  console.log('name', this.props.userInfo.name);

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
      //initial
    />

    <Scene
      key="login"
      hideNavBar="true"
      component={Login}
      onBack={() => console.log('no back')}
      //initial
    />

    <Scene
      key="signup"
      component={SignUp}
      hideNavBar="true"
      onBack={() => console.log('no back')}
      //initial
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
      navigationBarStyle={styles.headerStyle}
      hideBackImage
      onBack={() => console.log('no back')}
    //  onRightTitle={() => console.log('right clicked')}
    />

    <Scene
      key="main"
      component={MainNavigationList}
      hideNavBar={false}
      navigationBarStyle={styles.headerStyle1}
      //hideBackImage
      renderTitle={() => <Header />}
      renderRightButton={() => this.renderRightName(this.props.userName)}
      //renderBackButton={() => console.log('hi')}
      renderBackButton={() => this.renderLeftName()}
    />

    <Scene
      key="trips"
      component={TripsList}
      hideNavBar={false}
      navigationBarStyle={styles.headerStyle}
      renderTitle={() => <Header />}
      renderBackButton={() => this.renderMainButton()}
    />

    <Scene
      key="trips2"
      component={Trips}
      hideNavBar={false}
      navigationBarStyle={styles.headerStyle}
      renderTitle={() => <Header />}
      renderBackButton={() => this.renderMainButton()}
    />

    <Scene
      key="receipts"
      hideNavBar={false}
      navigationBarStyle={styles.headerStyle}
      renderTitle={() => <Header />}
      component={ReceiptsListView}
      renderRightButton={() => this.renderFilterButton(1)}
      renderBackButton={() => this.renderMainButton()}
      //hideBackImage
    />

    <Scene
      key="receiptInfo"
      hideNavBar={false}
      navigationBarStyle={styles.headerStyle}
      renderTitle={() => <Header />}
      component={ReceiptInfo}
      renderBackButton={() => this.renderBackToReceiptsButton()}
      //initial
    />

    <Scene
      key="processingDetail"
      hideNavBar={false}
      navigationBarStyle={styles.headerStyle}
      renderTitle={() => <Header />}
      component={ProcessingDetail}
      renderBackButton={() => this.renderBackToProcessingButton()}
      //initial
    />

    <Scene
      key="reimbursableDetail"
      hideNavBar={false}
      navigationBarStyle={styles.headerStyle}
      renderTitle={() => <Header />}
      component={ReimbursableDetail}
      renderBackButton={() => this.renderBackToReceiptsButton()}
      //initial
    />

    <Scene
      key="tools"
      component={Tools}
      hideNavBar={false}
      navigationBarStyle={styles.headerStyle}
      renderTitle={() => <Header />}
      renderBackButton={() => this.renderMainButton()}
      //initial
    />

    <Scene
      key="export"
      component={ExportDoc}
      hideNavBar={false}
      navigationBarStyle={styles.headerStyle}
      renderTitle={() => <Header />}
      renderBackButton={() => this.renderMainButton()}
      //initial
    />

    <Scene
      key="save"
      component={SaveDoc}
      hideNavBar={false}
      navigationBarStyle={styles.headerStyle}
      renderTitle={() => <Header />}
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
    />

    <Scene
      key="reimbursables"
      component={Reimbursables}
      hideNavBar={false}
      navigationBarStyle={styles.headerStyle}
      renderTitle={() => <Header />}
      //renderRightButton={() => this.renderFilterButton(3)}
      renderBackButton={() => this.renderMainButton()}
    />

    <Scene
      key="categories"
      component={CategoryList}
      hideNavBar={false}
      navigationBarStyle={styles.headerStyle}
      renderTitle={() => <Header />}
      renderBackButton={() => this.renderBackToReceiptsButton()}
    />

    <Scene
      key="catReceipts"
      component={CategoryReceiptList}
      hideNavBar={false}
      navigationBarStyle={styles.headerStyle}
      renderTitle={() => <Header />}
      renderBackButton={() => this.renderBackToCategoriesButton()}
    />

    <Scene
      key="api"
      component={APITest}
      hideNavBar={false}
      navigationBarStyle={styles.headerStyle}
      renderTitle={() => <Header />}
      backTitle='< Back'
      renderBackButton={this.renderLeftButton.bind(this.props)}
      rightTitle='Next'
      renderRightButton={this.renderRightButton.bind(this.props)}
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

const mapStateToProps = ({ user, receipts }) => {
  const {
    userName,
    userInfo
  } = user;
  const {
    processingCount,
    reimbursableCount,
    numOfReceipts,
    categories,
    receiptDetail
  } = receipts;
  return {
    userName,
    userInfo,
    processingCount,
    reimbursableCount,
    numOfReceipts,
    categories,
    receiptDetail
  };
};

export default connect(mapStateToProps, {
})(RouterComponent);

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
