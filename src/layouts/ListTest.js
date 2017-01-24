
import React, { Component } from 'react';
import { ListView } from 'react-native';
import { AccountListItem, TitleText, FullScreenView } from '../components';
import { HEADER } from '../global/margins';

const AccountArray = [];
const labels = [];
let chosenAccount = '';

class ListTest extends Component {
  constructor(props) {
    super(props);
    console.log('list', props.accounts);
    let i;
    for (i = 0; i < props.accounts.length; i++) {
      AccountArray[i] = props.accounts[i];
    }
    for (i = 0; i < AccountArray.length; i++) {
      labels[i] = AccountArray[i].label;
      console.log('labelfor', labels[i]);
    }

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.state = {
      dataSource: ds.cloneWithRows(labels)
    };
  }

  onRowPress() {
    const idx = this.props.index;
    chosenAccount = AccountArray[idx].id;
    console.log(chosenAccount);
  }

  getData(key, index, defaultVal = 'default') {
    return this.state.accounts[index][key] || defaultVal;
  }

  renderRow(rowData, sectionID, rowID) {
    return (
      <AccountListItem onPress={this.onRowPress} index={rowID} titleLabel={rowData} />
    );
  }

  render() {
    return (
      <FullScreenView style={{ paddingTop: HEADER.height, flex: 1 }}>
        <TitleText> Choose Account </TitleText>
        <ListView
          style={{ flex: 1, marginTop: 20 }}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
        />
      </FullScreenView>
    );
  }
}

export default ListTest;
