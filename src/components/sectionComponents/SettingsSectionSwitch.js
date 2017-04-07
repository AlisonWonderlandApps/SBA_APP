
import React, { Component } from 'react';
import { View } from 'react-native';
import { Switch } from 'react-native-switch';
import { CardSection, SettingsText } from '../../components';
//import { mainStyles } from './styles';

let label = '';

class SettingsSectionSwitch extends Component {
  constructor(props) {
    //console.log('SettingsSectionLabel');
    super(props);
    label = props.label;
  }

  render() {
    return (
      <CardSection>
        <View style={styles.view}>
          <SettingsText> {label} </SettingsText>
        </View>
        <View style={styles.switch}>
          <Switch
                value={false}
                onValueChange={(val) => console.log(val)}
                disabled={false}
                activeText={'On'}
                inActiveText={'Off'}
                backgroundActive={'green'}
                backgroundInactive={'gray'}
                circleActiveColor={'white'}
                circleInActiveColor={'white'}
          />
        </View>
      </CardSection>
    );
}

}

const styles = {
  view: {
    paddingTop: 5,
    paddingBottom: 5,
    padding: 5,
    paddingRight: 10
  },
  switch: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 2,
    paddingRight: 5
  }
};

export { SettingsSectionSwitch };
