
import React, { Component } from 'react';
import { View, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { baseStyles } from './styles';

class MySearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  render() {
    return (
          <View style={{ flexGrow: 1, height: 35, paddingTop: 5 }}>
            <View style={baseStyles.searchStyle}>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Icon
                  name="search"
                  size={15}
                  color="#ddd"
                />
                <TextInput
                  style={{ flexGrow: 1, width: null, paddingLeft: 10 }}
                  placeholder='search'
                  placeholderTextColor='lightgray'
                  onChangeText={(text) => this.setState({ text })}
                  value={this.state.text}
                  onFocus={() => console.log('hi')}
                />
              </View>
            </View>
          </View>
        );
    }
}

export { MySearchBar };
