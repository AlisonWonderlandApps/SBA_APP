
import React from 'react';
import { View } from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import { PRIMARY_HIGHLIGHT_COLOUR } from '../../global/colours';

const FAB = (props) => {
  return (
    <View style={{ flex: 1 }}>
      <ActionButton
        buttonColor={PRIMARY_HIGHLIGHT_COLOUR}
        onPress={props.onPress}
      >
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

export { FAB };

/*        <ActionButton.Item buttonColor='#9b59b6' title="New Task" onPress={() => console.log("notes tapped!")}>
          <Icon name="md-create" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item buttonColor='#3498db' title="Notifications" onPress={() => {}}>
          <Icon name="md-notifications-off" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item buttonColor='#1abc9c' title="All Tasks" onPress={() => {}}>
          <Icon name="md-done-all" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        */
