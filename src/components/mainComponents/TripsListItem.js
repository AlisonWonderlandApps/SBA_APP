
import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { CardSection } from '../../components';

class TripsListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.props.onPress.bind(this)} index={this.props.index}>
        <View style={{ paddingLeft: 20, paddingRight: 20 }}>
            <Text style={styles.titleStyle}>
              {this.props.titleLabel}
            </Text>
            <Text> date here </Text>
            <Text> $$$$$ here </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15
  },
  card: {
    borderWidth: 1,
    padding: 10
  }
};

export { TripsListItem };
