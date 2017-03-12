import React, { Component } from 'react';
import {
  Alert,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  ListView
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
  BackgroundView,
  MySearchBar,
  FAB,
  Button,
  Banner,
  TitleText
} from '../components';
import { HEADER } from '../global/margins';
import {
  PRIMARY_HIGHLIGHT_COLOUR,
  CARD_BACKGROUND_COLOUR,
  SHADOW_COLOUR,
  BORDER_COLOUR
 } from '../global/colours';
import { searchTextChanged } from '../actions';

class Reimbursables extends Component {

  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
  }

  shouldComponentUpdate(nextProps) {
    if (this.props !== nextProps) {
      return true;
    } else if (this.props.searchQuery !== nextProps.searchQuery) {
			return true;
		}
    return false;
  }

  render() {
    if (this.props.reimbursableCount < 1) {
      return (
        <BackgroundView style={styles.emptyContainer}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <TitleText> No Receipts </TitleText>
          </View>
          <FAB
            onPress={this.onPressFAB}
          />
        </BackgroundView>
      );
    }
    return (
      <BackgroundView style={styles.background}>
      <View style={styles.search}>
          <View style={{ flexGrow: 1, height: 35, paddingTop: 5 }}>
            <View style={styles.searchStyle}>
              <View style={styles.searchbar}>
                <Icon
                  name="search"
                  size={15}
                  color="#ddd"
                />
                <TextInput
                  style={{ flexGrow: 1, width: null, paddingLeft: 5 }}
                  placeholder='search'
                  placeholderTextColor='lightgray'
                  onChangeText={this.onSearchChange.bind(this)}
                  value={this.props.searchQuery}
                  onFocus={() => console.log('hi')}
                />
              </View>
            </View>
          </View>
          <Button
            style={styles.button}
            //onPress={this.searchText()}
          >
            Search
          </Button>
        </View>
        <ListView
          dataSource={this.ds.cloneWithRows(this.props.reimbursableReceipts)}
          renderRow={(data) => this.renderRow(data)}
        />
        <FAB
          onPress={this.onPressFAB}
        />
      </BackgroundView>
    );
  }

  renderRow(data) {
    //console.log('data', data);
    return (
        <TouchableHighlight
          onPress={() => console.log('You touched me', data)}
          underlayColor={'#AAA'}
          style={styles.rowFront}
        >
          <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
              <Text> {`${data.vendor}`} </Text>
              <Text> {`${data.total}`} </Text>
            </View>
          </View>
        </TouchableHighlight>
    );
  }

  onSearchChange(text) {
    this.props.searchTextChanged(text);
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
}

const styles = {
  background: {
    padding: 0,
    justifyContent: 'center',
    paddingTop: HEADER.height,
    flex: 1
  },
  view: {
    flexDirection: 'row',
    padding: 10,
    height: 60,
    backgroundColor: PRIMARY_HIGHLIGHT_COLOUR
  },
  button: {
    marginTop: 0,
    height: 30,
    flexGrow: 0.3
  },
  banner: {
    height: 40,
    backgroundColor: 'green',
    margin: 0,
  },
  emptyContainer: {
    flex: 1,
    padding: 0,
    paddingTop: HEADER.height,
    justifyContent: 'center'
  },
  searchStyle: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'stretch',
    padding: 5,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: CARD_BACKGROUND_COLOUR,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'grey',
    marginLeft: 5,
    marginRight: 5,
    shadowColor: SHADOW_COLOUR,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  search: {
    flexDirection: 'row',
    padding: 10,
    height: 60,
    backgroundColor: PRIMARY_HIGHLIGHT_COLOUR
  },
  searchbar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 5
  },
  container: {
    padding: 0,
    paddingTop: HEADER.height
  },
  rowFront: {
    //alignItems: 'center',
    padding: 10,
    backgroundColor: CARD_BACKGROUND_COLOUR,
    borderBottomColor: BORDER_COLOUR,
    borderBottomWidth: 1,
    justifyContent: 'center',
    //height: 100,
  }
};

const mapStateToProps = ({ receipts, searchIt }) => {
  const {
    searchQuery
  } = searchIt;
  const {
    reimbursableCount,
    reimbursableReceipts,
    receiptList
  } = receipts;
  return {
    searchQuery,
    reimbursableCount,
    reimbursableReceipts,
    receiptList
  };
};


export default connect(mapStateToProps, {
 searchTextChanged
})(Reimbursables);
