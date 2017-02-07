
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { CardSection } from '../../components';

let planType = '';

class SettingsSectionPlan extends Component {
  constructor(props) {
    console.log('SettingsSectionLabel');
    super(props);
    console.log('plan', props.plan);
    planType = props.plan;
  }

  render() {
    return (
      <CardSection>
        <View style={styles.view}>
          <Text> Plan Type </Text>
        </View>
        <View style={styles.switch}>
          <Text> {planType} </Text>
        </View>
      </CardSection>
    );
}

}

const styles = {
  view: {
    paddingTop: 5,
    paddingBottom: 5
  },
  switch: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 5,
    paddingBottom: 5
  }
};

export { SettingsSectionPlan };
