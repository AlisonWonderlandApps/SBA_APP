
import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { CardSection } from '../../components';
import { PRIMARY_HIGHLIGHT_COLOUR } from '../../global/colours';

class CategoryListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.props.onPress.bind(this)} index={this.props.index}>
        <View style={{ paddingLeft: 5, paddingRight: 5 }}>
          <CardSection style={styles.card}>
            <View
              style={{
                paddingTop: 3,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around'
              }}
            >
              <Text style={styles.numberStyle}>
                {this.props.numOfReceipts}
              </Text>
              <Text style={styles.titleStyle}>
                {this.props.titleLabel}
              </Text>
            </View>
          </CardSection>
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
  },
  numberStyle: {
    fontSize: 18,
    color: PRIMARY_HIGHLIGHT_COLOUR
  }
};

export { CategoryListItem };
