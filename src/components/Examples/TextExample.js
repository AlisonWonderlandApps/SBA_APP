import React from 'react';
import { View } from 'react-native';

import { PRIMARY_COLOUR } from '../../global/colours';

import {
  SubtitleText,
  HeaderText,
  ErrorText,
  FormText,
  LinkText,
  SmallText,
  TitleText
} from '../textComponents';

const TextExample = () => {
    return (
      <View
        style={{
            backgroundColor: PRIMARY_COLOUR,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
           }}
      >
        <HeaderText style={{ color: 'white' }}> Header </HeaderText>
        <TitleText> Title </TitleText>
        <ErrorText> Error </ErrorText>
        <FormText> Form </FormText>
        <SubtitleText> Subtitle </SubtitleText>
        <SmallText> Small </SmallText>
        <LinkText> Link </LinkText>
      </View>
    );
};

export { TextExample };
