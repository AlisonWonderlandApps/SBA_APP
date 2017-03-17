import React, { Component } from 'react';
import { View, Modal, Alert } from 'react-native';

const ErrorAlert = (props) => {
    return (
      <Modal
        visible={props.visible}
        transparent
        animationType="slide"
        onRequestClose={() => {}} //android requires that this prop is here!
      >
      </Modal>
    );
};

const styles = {
  containerStyle: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'center',
    padding: 10,
    paddingTop: 30, //HEADER.height, //30,
    paddingBottom: 100,
    margin: 10,
    marginTop: 30,
    marginBottom: 20,
    borderRadius: 5
  }
};

export { ErrorAlert };
