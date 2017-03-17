
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TouchableWithoutFeedback } from 'react-native';
import { FormText, CardSection } from '../../components';
import { baseStyles, tabStyles } from './styles';

class ProcessingTab extends Component {

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
            {this.props.processingCount}
          </FormText>
          <TouchableWithoutFeedback
            style={baseStyles.tabContainer}
          >
            <FormText> Processing </FormText>
          </TouchableWithoutFeedback>
        </CardSection>
    );
  }
}

const mapStateToProps = ({ receipts }) => {
  const {
    processingCount
  } = receipts;
  return {
    processingCount
  };
};

export default connect(mapStateToProps, {
})(ProcessingTab);
