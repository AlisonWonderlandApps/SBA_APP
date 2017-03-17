
import React from 'react';
import { View } from 'react-native';
import { Tab } from '../baseComponents';
import { containerStyles } from './styles';

const TabView = (props) => {
  const { title1, title2 } = props;

  return (
    <View style={containerStyles.tab}>
      <Tab title={title1} />
      <Tab title={title2} />
    </View>
  );
};

export { TabView };
