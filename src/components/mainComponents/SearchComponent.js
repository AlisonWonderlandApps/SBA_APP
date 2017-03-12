
import React, { Component } from 'react';
import { View, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  PRIMARY_HIGHLIGHT_COLOUR,
  CARD_BACKGROUND_COLOUR,
  SHADOW_COLOUR
} from '../../global/colours';
import { Button } from '../../components';


class SearchComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  render() {
    return (
      <View style={styles.search}>
          <View style={{ flexGrow: 1, height: 35, paddingTop: 5 }}>
            <View style={styles.searchStyle}>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Icon
                  name="search"
                  size={15}
                  color="#ddd"
                />
                <TextInput
                  style={{ flexGrow: 1, width: null, paddingLeft: 5 }}
                  placeholder='search'
                  placeholderTextColor='lightgray'
                  onChangeText={(text) => this.setState({ text })}
                  value={this.state.text}
                  onFocus={() => console.log('hi')}
                />
              </View>
            </View>
          </View>
          <Button
            style={styles.button}
            onPress={this.searchText()}
          >
            {this.renderText()}
          </Button>
        </View>
        );
  }

  renderText() {
    if (this.state.text === '') {
      return 'Export';
    }
    return 'Search';
  }

  searchText() {

  }

}

const styles = {
  search: {
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
};

export { SearchComponent };
