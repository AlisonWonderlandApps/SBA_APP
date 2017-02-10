
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { CardSection, SettingsText } from '../../components';
import { PRIMARY_HIGHLIGHT_COLOUR } from '../../global/colours';

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
          <SettingsText> Plan Type </SettingsText>
        </View>
        <View style={styles.switch}>
          <SettingsText
            style={{
              fontWeight: 'bold',
              color: PRIMARY_HIGHLIGHT_COLOUR }}
          >
            {planType}
           </SettingsText>
        </View>
      </CardSection>
    );
}

}

const styles = {
  view: {
    paddingTop: 5,
    paddingBottom: 5,
    padding: 5
  },
  switch: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 5
  }
};

export { SettingsSectionPlan };
