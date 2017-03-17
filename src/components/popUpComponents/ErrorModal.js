import React from 'react';
import { View, Modal } from 'react-native';

import { CardView, CardSection, Button, FormText, ErrorText } from '../../components';
import { APP_WHITE } from '../../global/colours';
import { HEADER } from '../../global/margins';

const ErrorModal = (props) => {
  return (
    <Modal
      visible={props.visible}
      transparent
      animationType="slide"
      onRequestClose={() => {}} //android requires that this prop is here!
    >
      <View style={[styles.containerStyle, props.style]}>
        <CardView>
          <CardSection style={{ alignItems:'center' }}>
          <View style={{padding: 20, alignSelf: 'center'}}>
            <ErrorText style={{ alignSelf: 'center' }}>
               {props.title}
               {props.text}
            </ErrorText>
          </View>
          </CardSection>

          <CardSection>
            <Button onPress={props.onPress}>
              {props.buttonText}
            </Button>
          </CardSection>
        </CardView>
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
    paddingBottom: 100,
    margin: 10,
    marginTop: 30,
    marginBottom: 20,
    borderRadius: 5
  }
};

export { ErrorModal };
