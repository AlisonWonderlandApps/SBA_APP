
import React from 'react';
import { View } from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import { PRIMARY_HIGHLIGHT_COLOUR } from '../../global/colours';

const oneFAB = (props) => {
  return (
    <View style={{ flex: 1 }}>
      <ActionButton buttonColor={PRIMARY_HIGHLIGHT_COLOUR}>

      </ActionButton>
    </View>
  );
};

const styles = {
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  }
};

export { oneFAB };
