import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import {
  CARD_BACKGROUND_COLOUR,
  BORDER_COLOUR
} from '../../global/colours';

const ReceiptRow = (props) => (
  <TouchableHighlight
    onPress={console.log('You touched me')}
    style={styles.rowFront}
    underlayColor={'#AAA'}
  >
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
        <Text> {`${props.vendor}`} </Text>
        <Text> {`${props.total}`} </Text>
      </View>
      <View>
        <Text> {`${props.date}`} </Text>
        <Text> {`${props.category}`} </Text>
      </View>
    </View>
  </TouchableHighlight>
);

const styles = {
  rowFront: {
		//alignItems: 'center',
    flex: 1,
    padding: 10,
		backgroundColor: CARD_BACKGROUND_COLOUR,
		borderBottomColor: BORDER_COLOUR,
		borderBottomWidth: 1,
		justifyContent: 'center',
		//height: 100,
	},
};

export { ReceiptRow };
