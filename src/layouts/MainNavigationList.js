/*
* Main view
* TODO: put hardcoded strings into strings file
*/

import React, { Component } from 'react';
import { Alert, Text, View, TouchableHighlight, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import { receiptsFetch } from '../actions';
import { layoutStyles } from './styles';
import { PRIMARY_HIGHLIGHT_COLOUR } from '../global/colours';

import {
  BackgroundView,
  CardSection,
  NavListSectionTools,
  Tab,
  FAB,
  Banner,
  TitleText,
  ColourText,
  FormText
} from '../components';

import {
  ProcessingStr,
  ReimburseStr,
  ReceiptsStr,
  TripsStr,
  ToolsStr
} from './strings';

class MainNavigationList extends Component {

  shouldComponentUpdate(nextProps) {
    console.log('updateMain', nextProps);
    if (this.props !== nextProps) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <BackgroundView style={layoutStyles.mainListView}>
        <Banner> Advert Banner </Banner>
        <View style={{ flexDirection: 'row', width: null }}>
          <TouchableHighlight
            onPress={this.processingPressed.bind(this)}
            style={{ flex: 1, width: null, height: 50 }}
          >
            <View style={{ flexGrow: 1 }}>
              {this.renderProcessingTab()}
            </View>
          </TouchableHighlight>

          <TouchableHighlight
            onPress={this.reimburseablePressed.bind(this)}
            style={{ flex: 1, width: null, height: 50 }}
          >
            <View style={{ flexGrow: 1 }}>
              {this.renderReimbursableTab()}
            </View>
          </TouchableHighlight>
        </View>

        <TouchableHighlight
          onPress={this.receiptsPressed}
        >
          {this.renderReceiptsBar()}
        </TouchableHighlight>
        <TouchableHighlight
          onPress={this.tripsPressed.bind(this)}
        >
          {this.renderTripsBar()}
        </TouchableHighlight>
        <TouchableHighlight
          onPress={this.toolsPressed}
        >
          {this.renderToolsBar()}
        </TouchableHighlight>
        <FAB
          onPress={this.onPressFAB}
        />
      </BackgroundView>
    );
  }

  renderReceiptsBar() {
    return (
      <View>
        <CardSection style={mainStyles.cardSection}>
          <View style={{ justifyContent: 'space-around', paddingTop: 10, paddingLeft: 5 }}>
            <TitleText>{ReceiptsStr}</TitleText>
            <ColourText style={mainStyles.text}>{this.props.rCost}</ColourText>
            <ColourText style={mainStyles.text}>{this.props.rCategory}</ColourText>
          </View>
          <View style={{ alignSelf: 'flex-end', paddingRight: 10 }} >
            <Icon name='ios-arrow-forward' size={50} />
          </View>
        </CardSection>
      </View>
    );
  }

  renderTripsBar() {
    return (
      <View>
      <CardSection style={mainStyles.cardSection}>
        <View style={{ justifyContent: 'space-around', paddingTop: 10, paddingLeft: 5 }}>
          <TitleText>{TripsStr}</TitleText>
          <ColourText style={mainStyles.text}>{this.props.tDate}</ColourText>
          <ColourText style={mainStyles.text}>{this.props.tCost}</ColourText>
        </View>
        <View style={{ alignSelf: 'flex-end', paddingRight: 10 }} >
          <Icon name='ios-arrow-forward' size={50} />
        </View>
      </CardSection>
      </View>
    );
  }

  renderToolsBar() {
    return (
      <View>
        <NavListSectionTools title={ToolsStr} />
      </View>
    );
  }

  renderProcessingTab() {
    return (
      <CardSection style={tabStyles.cardContainer}>
        <FormText
          style={{ alignSelf: 'center', paddingRight: 10 }}
        >
          {this.props.processingCount}
        </FormText>
        <TouchableWithoutFeedback
          style={tabStyles.tabContainer}
        >
          <FormText> {ProcessingStr} </FormText>
        </TouchableWithoutFeedback>
      </CardSection>
    );
  }

  renderReimbursableTab() {
    return (
      <CardSection style={tabStyles.cardContainer}>
        <FormText
          style={{ alignSelf: 'center', paddingRight: 10 }}
        >
          {this.props.reimbursableCount}
        </FormText>
        <TouchableWithoutFeedback
          style={tabStyles.tabContainer}
        >
          <FormText> {ReimburseStr} </FormText>
        </TouchableWithoutFeedback>
      </CardSection>
    );
  }

  onPressFAB() {
    console.log('FAB pressed');
    Alert.alert(
      'Choose Photo Source',
      null,
      [
        { text: 'Camera', onPress: () => Actions.camera() },
        { text: 'Photo Library', onPress: () => Actions.photos() },
        { text: 'Cancel', onPress: () => console.log('cancel'), style: 'cancel' }
      ]
    );
  }

  processingPressed() {
    console.log('processingPressed');
    Actions.processing();
  }

  reimburseablePressed() {
    console.log('reimburseablePressed');
    Actions.reimbursables();
  }

  receiptsPressed() {
    //console.log('receiptsPressed', this.props.receipts);
    Actions.receipts();
  }

  tripsPressed() {
    console.log('trips', this.props);
    Actions.trips();
  }

  toolsPressed() {
    console.log('toolsPressed');
    Actions.tools();
  }

}//end class

const mainStyles = {
  cardSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  text: {
    alignSelf: 'flex-start',
    paddingLeft: 0
  }
};

const tabStyles = {
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderLeftWidth: 1
  },
  tabContainer: {
    borderWidth: 1,
    borderColor: PRIMARY_HIGHLIGHT_COLOUR,
    justifyContent: 'space-around',
    padding: 10
  },
};

const mapStateToProps = ({ user, accounts, receipts, trips }) => {
  const {
    userName
  } = user;
  const {
    accountsArray,
    curAccountID
  } = accounts;
  const {
    isFetching,
    myReceipts,
    processingReceipts,
    processingCount,
    reimbursableReceipts,
    reimbursableCount,
    latestReceipt,
    rVendor,
    rDate,
    rCategory,
    rCost
  } = receipts;
  const {
    myTrips,
    latestTrip,
    tVendor,
    tDate,
    tCost
  } = trips;
  return {
    userName,
    accountsArray,
    curAccountID,
    isFetching,
    myTrips,
    myReceipts,
    processingReceipts,
    processingCount,
    reimbursableReceipts,
    reimbursableCount,
    latestReceipt,
    latestTrip,
    rVendor,
    rDate,
    rCategory,
    rCost,
    tVendor,
    tDate,
    tCost
  };
};

export default connect(mapStateToProps, {
  receiptsFetch
})(MainNavigationList);

/*
//subtitle={this.getSubtitle().bind(this)}
//data={''}
<View style={{ paddingBottom: 50 }}>
  <LogoSection />
</View>
*/

/*
renderMostRecentReceiptCost() {
  if (this.props.numOfReceipts < 1) {
    return 'Waiting on';
  }
  console.log('total', this.props.latestReceipt.total);
  const cost = '$ '.concat(this.props.latestReceipt.total);
  console.log(cost);
  return (cost);
}

renderMostRecentReceiptData() {
  //renders the place / name of receipt
  if (this.props.numOfReceipts < 1) {
    return 'your receipts';
  }
  return ('Place');
}
*/
