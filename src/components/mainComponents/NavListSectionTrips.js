
import React, { Component } from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CardSection, TitleText, ColourText } from '../../components';
import { mainStyles } from './styles';

let title = '';
let subtitle = '';
let data = '';

class NavListSectionTrips extends Component {
  constructor(props) {
    super(props);
    title = props.title;
    subtitle = props.subtitle;
    data = props.data;
  }

  render() {
    const myIcon = (<Icon name="angle-right" size={50} />);

    return (
      <CardSection style={mainStyles.cardSection}>
        <View style={{ justifyContent: 'space-around', paddingTop: 10, paddingLeft: 5 }}>
          <TitleText style={{ paddingBottom: 5 }}>{title}</TitleText>
          {this.renderSubtitle()}
          {this.renderData()}
        </View>
        <View style={{ alignSelf: 'flex-end', paddingRight: 10 }} >
          {myIcon}
        </View>

      </CardSection>
    );
}

  renderSubtitle() {
    if (subtitle === '') {
      return <ColourText />;
    }
    return <ColourText>{subtitle}</ColourText>;
  }

  renderData() {
    if (data === '') {
      return <ColourText />;
    }
    return <ColourText style={{ paddingLeft: 5 }}>{data}</ColourText>;
  }

}

export { NavListSectionTrips };
