

import React, {Component} from 'react';
import { View, Image, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { menuStyles } from './styles';
import { FormText } from '../../components';

class HeaderWithIcon extends Component {

  constructor(props) {
    super(props);
  }

    render() {
      const icon =
        require('../../assets/images/roundLogoPNG/SquirrelStreet_Roundel-Device_pos_RGB.png');

    return (
        <View style={[menuStyles.view, this.props.style]}>
          <View>
            <FormText onPress={this.props.onPressLeft}> {this.props.backTitle} </FormText>
          </View>

          <View style={menuStyles.iconContainer}>
            <Image source={icon} style={[menuStyles.icon, this.props.iconStyle]} />
          </View>

          <View>
            <FormText onPress={this.props.onPressRight}> {this.props.rightTitle} </FormText>
          </View>
        </View>
    );
  }
};

export default HeaderWithIcon;

/*
<View style={menuStyles.textView}>
  <Text> &lt; Back </Text>
  //<Text> {this.props.children} </Text>
</View>
*/
