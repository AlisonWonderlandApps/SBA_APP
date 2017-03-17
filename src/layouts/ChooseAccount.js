
import _ from 'lodash';
import React, { Component } from 'react';
import { View, Modal, ListView } from 'react-native';
import { connect } from 'react-redux';
import { accountsFetch } from '../actions';
import { AccountListItem } from '../components';

import { LogoSection, FullScreenView, CardView, CardSection, FormText } from '../components';
import { MAIN_LOGO } from '../global/images';
import { HEADER } from '../global/margins';

class ChooseAccount extends Component {
  constructor() {
    super();
    this.state = {
      open: true
    };
  }

  componentWillMount() {
    this.setState({ open: true });
    this.props.accountsFetch();
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

createDataSource({ accounts }) {
  const ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2
  });

  this.dataSource = ds.cloneWithRows(accounts);
}

renderRow(account) {
  return <AccountListItem account={account} />;
}

  render() {
    return (
      <FullScreenView style={{ zIndex: 1, padding: 50, paddingTop: 20, paddingBottom: 60 }}>
      <LogoSection
        imagePath={MAIN_LOGO}
      />
      <Modal
        visible={this.state.open}
        transparent
        animationType="fade"
        onRequestClose={() => {}} //android requires that this prop is here!
      //  onShow={props.onShow}
      >
      <View style={styles.containerStyle}>
        <ListView
        enableEmptySections
        dataSource={this.dataSource}
        renderRow={this.renderRow}
        style={{ paddingTop: 20 }}
      />
      </View>
      </Modal>
      </FullScreenView>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'center',
    position: 'absolute',
    top: -150,
    left: 0,
    right: 0,
    bottom: 0,
    margin: 10,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 5
  }
};

const mapStateToProps = state => {
  const accounts = _.map(state.accounts, (val) => {
    return { ...val };
  });

  return { accounts };
};

export default connect(mapStateToProps, { accountsFetch })(ChooseAccount);


/*
import React, { Component } from 'react';
import { View, Modal } from 'react-native';
import SimpleModal from 'react-native-simple-modal';

import { LogoSection, FullScreenView, CardView, CardSection, FormText } from '../components';
import { MAIN_LOGO } from '../global/images';
import { HEADER } from '../global/margins';

class ChooseAccount extends Component {
  constructor() {
    super();
    this.state = {
      open: true
    };
  }

  componentWillMount() {
    this.setState({ open: true });
  }

  pressed() {
    console.log('yep');
  }

  render() {
    return (
      <FullScreenView style={{ zIndex: 1, padding: 50, paddingTop: 20, paddingBottom: 60 }}>
      <LogoSection
        imagePath={MAIN_LOGO}
      />
      <Modal
        visible={this.state.open}
        transparent
        animationType="fade"
        onRequestClose={() => {}} //android requires that this prop is here!
      //  onShow={props.onShow}
      >
      <View style={styles.containerStyle}>
        <CardView>
          <CardSection>
          <FormText> Choose Account </FormText>
          </CardSection>
          <CardSection onPress={this.pressed}>
            <FormText> hi </FormText>
          </CardSection>
          <CardSection>
            <FormText> hi </FormText>
          </CardSection>
          <CardSection>
            <FormText> hi </FormText>
          </CardSection>
          <CardSection>
            <FormText> hi </FormText>
          </CardSection>
          <CardSection>
            <FormText> hi </FormText>
          </CardSection>
          <CardSection>
            <FormText> hi </FormText>
          </CardSection>
        </CardView>
      </View>
      </Modal>
      </FullScreenView>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'center',
    position: 'absolute',
    top: -150,
    left: 0,
    right: 0,
    bottom: 0,
    margin: 10,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 5
  }
};

export default ChooseAccount;
*/
