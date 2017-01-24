
import React from 'react';
import { View, Text, TouchableOpacity, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { baseStyles } from './styles';

const MySearchBar = ({ onPress }) => {

return (
      <View style={{ height: 30, paddingTop: 5 }}>
        <TouchableHighlight
          onPress={console.log('hi')}
          style={baseStyles.searchStyle}
        >
        <Icon
          name="search"
          size={15}
          color="#ddd"
        >
        <Text> search </Text>
        </Icon>
        </TouchableHighlight>

      </View>
    );
};

export { MySearchBar };
