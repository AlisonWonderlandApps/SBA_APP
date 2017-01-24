
import React, { Component } from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CardSection, TitleText } from '../../components';
import { mainStyles } from './styles';

let title = '';

class NavListSectionTools extends Component {
  constructor(props) {
    super(props);
    title = props.title;
  }

  render() {
    const myIcon = (<Icon name="angle-right" size={50} />);

    return (
      <CardSection style={mainStyles.cardSection}>
        <View style={{ justifyContent: 'space-around', paddingTop: 25, paddingBottom: 10, paddingLeft: 5 }}>
          <TitleText style={{ paddingBottom: 5 }}>{title}</TitleText>
        </View>
        <View style={{ alignSelf: 'flex-end', paddingRight: 10 }} >
          {myIcon}
        </View>
      </CardSection>
    );
  }
}

export { NavListSectionTools };
