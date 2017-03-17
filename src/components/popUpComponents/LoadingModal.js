import React from 'react';
import { View, Modal } from 'react-native';
import LoadingSpinner from 'react-native-spinkit';

import { TitleText } from '../../components';
import { APP_WHITE } from '../../global/colours';
import { HEADER } from '../../global/margins';

const LoadingModal = (props) => {
  return (
    <Modal
      visible={props.visible}
      transparent
      animationType="slide"
      onRequestClose={() => {}} //android requires that this prop is here!
      onShow={props.onShow}
    >
      <View style={[styles.containerStyle, props.style]}>
        <LoadingSpinner
          style={{ alignSelf: 'center', paddingBottom: 60 }}
          isVisible
          size={250}
          type={'Pulse'}
          color={APP_WHITE}
        />
        <TitleText style={[styles.textStyle, props.textStyle]} >
          {props.text}
        </TitleText>
      </View>
    </Modal>
  );
};

const styles = {
  containerStyle: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'center',
    padding: 10,
    paddingTop: HEADER.height, //30,
    paddingBottom: 50,
    margin: 10,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 5
  },
  textStyle: {
    alignSelf: 'center',
    color: APP_WHITE,
    paddingTop: 30
  }
};

export { LoadingModal };
