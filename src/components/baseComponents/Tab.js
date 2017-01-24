
import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { FormText, CardSection } from '../../components';
import { baseStyles, tabStyles } from './styles';

const Tab = ({ title, count, styles }) => {
  return (
      <CardSection style={tabStyles.cardContainer}>
        <FormText
          style={{ alignSelf: 'center', paddingRight: 10 }}
        >
          {count}
        </FormText>
        <TouchableWithoutFeedback
          style={[baseStyles.tabContainer, styles]}
        >
          <FormText> {title} </FormText>
        </TouchableWithoutFeedback>
      </CardSection>
  );
};

export { Tab };
