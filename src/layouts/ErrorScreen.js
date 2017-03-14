
import React, { Component } from 'react';
import { LogoSection, FullScreenView, ErrorText } from '../components';
import { MAIN_LOGO } from '../global/images';

class ErrorScreen extends Component {

  render() {
    return (
      <FullScreenView style={{ padding: 50, paddingTop: 20, paddingBottom: 60 }}>
        <LogoSection
          imagePath={MAIN_LOGO}
        />
        <ErrorText>
          Oops!!
        </ErrorText>
        <ErrorText>
          something went wrong :(
        </ErrorText>
      </FullScreenView>
    );
  }
}

export default ErrorScreen;
