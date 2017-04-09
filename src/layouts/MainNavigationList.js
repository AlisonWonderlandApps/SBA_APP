/*
* Main view
* TODO: put hardcoded strings into strings file
*/

import React, { Component } from 'react';
import {
  Alert,
  Platform,
  View,
  TouchableHighlight,
  TouchableWithoutFeedback,
 } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import Spinner from 'react-native-loading-spinner-overlay';
import ImagePicker from 'react-native-image-picker';

import {
  receiptsFetch,
  saveImageData,
  addReceiptFromImage,
  setFetching
 } from '../actions';
import { layoutStyles } from './styles';
import { PRIMARY_HIGHLIGHT_COLOUR } from '../global/colours';

import {
  BackgroundView,
  CardSection,
  NavListSectionTools,
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

let self;

class MainNavigationList extends Component {

  constructor(props) {
    super(props);
    self = this;
  }

  shouldComponentUpdate(nextProps) {
    //console.log('updateMain', nextProps);
    if (this.props !== nextProps) {
      if (this.props.userName !== nextProps.userName) {
        return false;
      }
      return true;
    }
    return false;
  }

  render() {
    return (
      <BackgroundView style={layoutStyles.mainListView}>
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
        <Spinner
          visible={this.props.isFetching}
          textContent={''}
          textStyle={{ color: 'white' }}
        />
      </BackgroundView>
    );
  }

  renderReceiptsBar() {
    if (this.props.numOfReceipts === this.props.myTrips.length) {
      return (
      <View>
        <CardSection style={mainStyles.cardSection}>
          <View style={{ justifyContent: 'space-around', paddingTop: 10, paddingLeft: 5 }}>
            <TitleText>{ReceiptsStr}</TitleText>
            <ColourText style={mainStyles.text}>{this.props.tDate}</ColourText>
            <ColourText style={mainStyles.text}>{this.props.tCost}</ColourText>
          </View>
          <View style={{ alignSelf: 'flex-end', paddingRight: 10 }} >
            <Icon name='ios-arrow-forward' size={50} />
          </View>
        </CardSection>
      </View>
      );
    } else if (this.props.numOfReceipts < 1) {
      return (
      <View>
        <CardSection style={mainStyles.cardSection}>
          <View style={{ justifyContent: 'space-around', paddingTop: 10, paddingLeft: 5 }}>
            <TitleText>{ReceiptsStr}</TitleText>
            <ColourText style={mainStyles.text}>No receipts</ColourText>
            <ColourText style={mainStyles.text}>Add a receipt!</ColourText>
          </View>
          <View style={{ alignSelf: 'flex-end', paddingRight: 10 }} >
            <Icon name='ios-arrow-forward' size={50} />
          </View>
        </CardSection>
      </View>
      );
    }
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
    if (this.props.myTrips.length < 1) {
      return (
        <View>
          <CardSection style={mainStyles.cardSection}>
            <View style={{ justifyContent: 'space-around', paddingTop: 10, paddingLeft: 5 }}>
              <TitleText>{TripsStr}</TitleText>
              <ColourText style={mainStyles.text}>No Trips found</ColourText>
              <ColourText style={mainStyles.text}>Add your first trip</ColourText>
            </View>
            <View style={{ alignSelf: 'flex-end', paddingRight: 10 }} >
              <Icon name='ios-arrow-forward' size={50} />
            </View>
          </CardSection>
        </View>
      );
    }
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
    const options = {
      title: 'Choose Photo Source',
      storageOptions: {
      skipBackup: true,
      path: 'images'
    }
  };

    ImagePicker.showImagePicker(options, (response) => {
      //console.log('this.props.curAccountID', self.props.curAccountID);
      //console.log('response', response);
      if (response.didCancel) {
        //console.log('User cancelled image picker');
      } else if (response.error) {
        Alert('Error in ImagePicker', response.error);
      } else if (response.customButton) {
        //console.log('User tapped custom button: ', response.customButton);
      } else {
        let image = '';
        if (Platform.OS === 'ios') {
          image = response.origURL;
        } else {
          image = response.path;
        }
        //console.log('image', image);
        const source = { uri: response.uri };
        //self.props.addReceiptFromImage(self.props.curAccountID, response, image, source);
        self.props.saveImageData(response, image, source);
        Actions.save();
      }
    });
  }

  processingPressed() {
    //console.log('processingPressed');
    Actions.processing();
  }

  reimburseablePressed() {
    //console.log('reimburseablePressed');
    Actions.reimbursables();
  }

  receiptsPressed() {
    //console.log('receiptsPressed', this.props.receipts);
    Actions.receipts();
  }

  tripsPressed() {
    //console.log('trips', this.props);
    Actions.trips2();
  }

  toolsPressed() {
    //console.log('toolsPressed');
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
    processingCount,
    reimbursableCount,
    latestReceipt,
    rCategory,
    rCost,
    numOfReceipts
  } = receipts;
  const {
    latestTrip,
    tVendor,
    tDate,
    tCost,
    myTrips
  } = trips;
  return {
    userName,
    accountsArray,
    curAccountID,
    isFetching,
    processingCount,
    reimbursableCount,
    latestReceipt,
    latestTrip,
    rCategory,
    rCost,
    tVendor,
    tDate,
    tCost,
    numOfReceipts,
    myTrips
  };
};

export default connect(mapStateToProps, {
  receiptsFetch, addReceiptFromImage, saveImageData, setFetching
})(MainNavigationList);
