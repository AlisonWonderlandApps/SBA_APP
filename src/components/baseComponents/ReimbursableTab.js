
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TouchableWithoutFeedback } from 'react-native';
import { FormText, CardSection } from '../../components';
import { baseStyles, tabStyles } from './styles';

class ReimbursableTab extends Component {

  shouldComponentUpdate(nextProps) {
    console.log('update', this.props, nextProps);
    if (this.props !== nextProps) {
      return true;
    }
    return false;
  }

  render() {
  return (
        <CardSection
          style={tabStyles.cardContainer}
        >
          <FormText
            style={{ alignSelf: 'center', paddingRight: 10 }}
          >
            {this.props.reimbursableCount}
          </FormText>
          <TouchableWithoutFeedback
            style={baseStyles.tabContainer}
          >
            <FormText> Reimbursables </FormText>
          </TouchableWithoutFeedback>
        </CardSection>
    );
  }
}

const mapStateToProps = ({ receipts }) => {
  const {
    reimbursableCount
  } = receipts;
  return {
    reimbursableCount
  };
};

export default connect(mapStateToProps, {
})(ReimbursableTab);
