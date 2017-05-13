import React, { Component } from 'react';
import {
  //TouchableOpacity,
  //Alert,
  Text,
  View,
  ScrollView,
  TextInput
} from 'react-native';
import { connect } from 'react-redux';
import PDFView from 'react-native-pdf-view';
import RNFS from 'react-native-fs';
import DatePicker from 'react-native-datepicker';
import { Select, Option } from 'react-native-chooser';

import {
  BackgroundView
} from '../components';
import { HEADER } from '../global/margins';
import {
  CARD_BACKGROUND_COLOUR,
  PRIMARY_COLOUR,
} from '../global/colours';
import {
  loadReceiptImage,
  vendorChanged,
  dateChanged,
  currencyChanged,
  totalChanged,
  taxChanged,
  paytypeChanged,
  categoriesChanged,
  notesChanged,
  getEditReceiptDetail
 } from '../actions';

class EditReceipt extends Component {

  constructor(props) {
    super(props);
    this.pdfView = null;
    this.pdfPath = RNFS.DocumentDirectoryPath.concat('/test.pdf');
    console.log(this.props.receiptDetail);
    this.props.getEditReceiptDetail(this.props.receiptDetail);
  }

  shouldComponentUpdate(nextProps) {
    if (this.props !== nextProps) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <ScrollView>
      <BackgroundView
        style={{ padding: 0, flex: 1, justifyContent: 'flex-start', paddingTop: HEADER.height }}
      >
        <View style={{ flex: 1, backgroundColor: 'white', padding: 5 }}>
            <View>
              {this.renderVendor()}
              {this.renderDate()}
              {this.renderCurrency()}
              {this.renderTotal()}
              {this.renderTax()}
              {this.renderPaymentType()}
              {this.renderCategories()}
              {this.renderNotes()}
            </View>
        </View>
          <View style={{ flex: 1 }} >
            <Text> this.renderPdf() </Text>
          </View>
      </BackgroundView>
      </ScrollView>
    );
  }

  renderVendor() {
    return (
        <View style={styles.name}>
          <TextInput
            style={{ fontSize: 18, color: PRIMARY_COLOUR }}
            onChangeText={(text) => this.props.vendorChanged(text)}
            value={this.props.vendor}
            underlineColorAndroid={'transparent'}
          />
        </View>
    );
  }

  renderDate() {
    return (
      <View style={styles.name}>
        <View
          style={styles.row}
        >
          <Text style={styles.titleText}> Date </Text>
          {this.renderDocDate()}
        </View>
      </View>
    );
  }

  renderDocDate() {
    const data = this.props.docDetail;
    let date = '';
    if (data.issued === undefined) {
      date = data.uploaded;
    } else {
      date = data.issued;
    }
  /*  if (date !== undefined) {
      console.log(date);
      date = new Date(date);
      console.log(date);
      date = date.toISOString();
      console.log(date);
    } */
    console.log(date);

    return (
      <DatePicker
        style={{ width: 80 }}
        date={this.props.date}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        androidMode='spinner'
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        showIcon={false}
        customStyles={{
          dateInput: {
            borderWidth: 0,
            padding: 0,
            alignSelf: 'flex-end',
            justifyContent: 'center'
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(datec) => this.props.dateChanged(datec)}
      />
    );
  }

  renderCurrency() {
    return (
      <View style={styles.name}>
        <View
          style={styles.row}
        >
          <Text style={styles.titleText}> Currency </Text>
          <Text> {this.props.currency} </Text>
        </View>
      </View>
    );
  }

  renderDocCurrency() {
    //not needed?
  }

  renderTotal() {
    return (
      <View style={styles.name}>
        <View
          style={styles.row}
        >
          <Text style={styles.titleText}> Total ($) </Text>
          {this.renderDocTotal()}
        </View>
      </View>
    );
  }

  renderDocTotal() {
    //Need to render both if its not AUD!!!
    if (this.props.docDetail.currency !== 'AUD') {
      return (
        <View>
          <TextInput
            style={styles.textIn}
            keyboardType='numeric'
            onChangeText={(text) => this.props.totalChanged(text)}
            value={this.props.total}
            underlineColorAndroid={'transparent'}
          />
          <Text
            style={{ fontStyle: 'italic', textAlign: 'right' }}
          > {this.props.preferred} </Text>
        </View>
      );
    }

      return (
        <TextInput
          style={styles.textIn}
          keyboardType='numeric'
          onChangeText={(text) => this.props.totalChanged(text)}
          value={this.props.total}
          underlineColorAndroid={'transparent'}
        />
      );
  }

  renderTax() {
    return (
      <View style={styles.name}>
        <View
          style={styles.row}
        >
          <Text style={styles.titleText}> Tax ($) </Text>
          {this.renderDocTax()}
        </View>
      </View>
    );
  }

  renderDocTax() {
    if (this.props.docDetail.currency !== 'AUD') {
      return (
        <View>
          <TextInput
            style={styles.textIn}
            keyboardType='numeric'
            onChangeText={(text) => this.props.taxChanged(text)}
            value={this.props.tax}
            underlineColorAndroid={'transparent'}
          />
          <Text
            style={{ fontStyle: 'italic', textAlign: 'right' }}
          > {this.props.prefTax} </Text>
        </View>
      );
    }
      return (
        <TextInput
          style={styles.textIn}
          keyboardType='numeric'
          onChangeText={(text) => this.props.taxChanged(text)}
          value={this.props.tax}
          underlineColorAndroid={'transparent'}
        />
      );
  }

  renderPaymentType() {
    console.log(this.props.paytype);
    let type = this.props.paytype;
    if (type === undefined || type === '') {
      type = 'other';
    }
    return (
      <View style={styles.name}>
        <View
          style={styles.row}
        >
          <Text style={styles.titleText}> Payment Type </Text>
          <Select
            onSelect={(data) => this.props.paytypeChanged(data)}
            defaultText={type}
            selected={type}
            selectedStyle={{ backgroundColor: PRIMARY_COLOUR }}
            style={{ borderWidth: 0, width: null, alignSelf: 'flex-end', padding: 0 }}
            textStyle={{}}
            transparent
            optionListStyle={{ backgroundColor: CARD_BACKGROUND_COLOUR }}
          >
            <Option value='cash'> Cash </Option>
            <Option value='credit-card'> Credit/Debit Card </Option>
            <Option value='check'> Cheque </Option>
            <Option value='paypal'> Paypal </Option>
            <Option value='other'> Other/Unknown </Option>
          </Select>
        </View>
      </View>
    );
  }

  renderCategories() {
    return (
      <View style={styles.name}>
        <View style={styles.col}>
          <Text style={styles.catText}> Categories </Text>
          <Text> {this.renderDocCategories()} </Text>
        </View>
      </View>
    );
  }

  renderDocCategories() {
    const data = this.props.docDetail;
    let category = '';
    if (data.categories === undefined) {
      category = 'No categories';
    } else if (data.categories.length < 1) {
      category = 'No categories';
    } else {
      let j = 0;
      category = data.categories[j];
      for (j = 1; j < data.categories.length; j++) {
        category += ', '.concat(data.categories[j]);
      }
      return category;
    }
  }

  renderNotes() {
    return (
      <View style={styles.name}>
        <TextInput
          onChangeText={(text) => this.props.notesChanged(text)}
          placeholder='Add a note'
          value={this.props.notes}
          underlineColorAndroid={'transparent'}
        />
      </View>
    );
  }

  renderPdf() {
    //const path = RNFS.DocumentDirectoryPath.concat('/test.pdf');
    //let pdfView = new pdfView(this);

    if (this.props.receiptImageIsLoading) {
      return (
        <View
          style={{
            flex: 1,
            padding: 20,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: CARD_BACKGROUND_COLOUR,
          }}
        >
          <Text> Loading... </Text>
        </View>
      );
    }

    return (
        <PDFView
          ref={(pdf) => { this.pdfView = pdf; }}
          key='sop'
          path={this.pdfPath}
          onLoadComplete={(pageCount) => {
                              this.pdfView.setNativeProps({
                              zoom: 1.0
                          });
                console.log('load done', pageCount);
                       }}
          style={{ flex: 1, paddingTop: 5, backgroundColor: 'grey' }}
        />
    );
  }
}

const styles = {
  name: {
    flex: 1,
    paddingTop: 5,
    paddingBottom: 5,
    padding: 5,
    width: null,
    borderBottomWidth: 1,
    borderBottomColor: 'grey'
    //width: 300,
  },
  row: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 5,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  col: {
    paddingTop: 5,
    paddingBottom: 5
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  catText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  textIn: {
    flex: 1,
    width: 100,
    textAlign: 'right',
    padding: 0,
  }
};

const mapStateToProps = ({ accounts, receipts, edit }) => {
  const {
    curAccountID,
    email
  } = accounts;
  const {
    newReceiptCategory,
    newReceiptNote,
    newReceipt,
    imageData,
    receiptDetail,
    receiptImageIsLoading,
    receiptImageURL,
    pdfImage
  } = receipts;
  const {
    docDetail,
    vendor,
    date,
    currency,
    total,
    preferred,
    tax,
    prefTax,
    paytype,
    categories,
    notes
  } = edit;
  return {
    curAccountID,
    email,
    newReceiptCategory,
    newReceiptNote,
    newReceipt,
    imageData,
    receiptDetail,
    receiptImageIsLoading,
    receiptImageURL,
    pdfImage,
    docDetail,
    vendor,
    date,
    currency,
    total,
    preferred,
    tax,
    prefTax,
    paytype,
    categories,
    notes
  };
};

export default connect(mapStateToProps, {
  loadReceiptImage,
  vendorChanged,
  dateChanged,
  currencyChanged,
  totalChanged,
  taxChanged,
  paytypeChanged,
  categoriesChanged,
  notesChanged,
  getEditReceiptDetail
})(EditReceipt);
