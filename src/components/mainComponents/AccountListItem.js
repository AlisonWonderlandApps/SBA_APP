
import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { connect } from 'react-redux';
import { CardSection } from '../../components';
import { PRIMARY_HIGHLIGHT_COLOUR } from '../../global/colours';

let title = '';
class AccountListItem extends Component {
  constructor(props) {
    super(props);
    title = props.titleLabel;
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.props.onPress.bind(this)} index={this.props.index}>
        <View style={{ paddingLeft: 20, paddingRight: 20 }}>
          <CardSection style={styles.card}>
          <Text style={styles.titleStyle}>
            {title}
          </Text>
          </CardSection>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  renderText() {
    if (this.props.curAccountIndex === -1) {
      return (
        <Text style={styles.titleStyle}>
          {this.props.titleLabel}
        </Text>
      );
    }
      return (
        <Text style={styles.colorStyle}>
          {this.props.titleLabel}
        </Text>
      );
  }
}

const mapStateToProps = ({ accounts }) => {
  const {
    curAccountIndex
  } = accounts;
  return {
    curAccountIndex
  };
};

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15
  },
  card: {
    borderWidth: 1,
    padding: 10
  },
  colorStyle: {
    fontSize: 18,
    paddingLeft: 15,
    color: PRIMARY_HIGHLIGHT_COLOUR
  }
};

export default connect(mapStateToProps, {
})(AccountListItem);
