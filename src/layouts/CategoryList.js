import React, { Component } from 'react';
import { ListView } from 'react-native';
import { connect } from 'react-redux';
import { BackgroundView, AccountListItem, TitleText } from '../components';
import { HEADER } from '../global/margins';

class CategoryList extends Component {

  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    console.log(this.props.categories);
  }

  shouldComponentUpdate(nextProps) {
    if (this.props !== nextProps) {
      return true;
    }
    return false;
  }

  onRowPress(rowID) {
    console.log(this.props);
    console.log(rowID);
  }

  renderRow(rowData, sectionID, rowID) {
    return (
      <AccountListItem
        onPress={this.onRowPress.bind(this, rowID)}
        index={rowID}
        titleLabel={rowData}
        data={this.props}
      />
    );
  }

  render() {
    return (
      <BackgroundView style={{ justifyContent: 'center', paddingTop: HEADER.height, flex: 1 }}>
      <TitleText style={{ alignSelf: 'center', paddingTop: 30 }}> Choose Category </TitleText>
        <ListView
          style={{ flex: 1, marginTop: 20 }}
          dataSource={this.ds.cloneWithRows(this.props.categories)}
          renderRow={this.renderRow.bind(this)}
        />
      </BackgroundView>
    );
  }

}

const mapStateToProps = ({ receipts }) => {
  const {
    categories
  } = receipts;
  return {
    categories
  };
};


export default connect(mapStateToProps, {

})(CategoryList);
