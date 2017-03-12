

import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import axios from 'axios';
import Querystring from 'querystring';
import { Actions } from 'react-native-router-flux';

import { FullScreenView, Button } from '../components';
import { ssAuthConfig, ssApiQueryURL } from '../config/auth';
import { HEADER } from '../global/margins';

class APITest extends Component
{
  constructor(props) {
    super(props);

    this.state = {
      token: '',
      accounts: [],
      accountArray: [],
      isLoading: false,
      labels: [],
      id: '',
      trips: [],
      tripsId: [],
      categories: [],
      categoryNames: [],
      processedReceipts: [],
      processedReceiptsId: []
    };
  }

  onPressAuthClient() {
    this.setState({ isLoading: true });

    console.log('buttonpressed');
    const data = {
      grant_type: ssAuthConfig.userGrantType,
      client_id: ssAuthConfig.clientId,
      client_secret: ssAuthConfig.clientSecret,
      scope: ssAuthConfig.scopeInternal,
      username: ssAuthConfig.demoEmail,
      password: ssAuthConfig.demoPassword
    };

    console.log(Querystring.stringify(data));

    axios.post(ssAuthConfig.tokenURL, Querystring.stringify(data))
      .then(response => {
        console.log('response : : : '+response.data);
        this.setState({ token: response.data.access_token });
        console.log(this.state.token);
        console.log('userresponse ', response.data.access_token);
        AsyncStorage.setItem('clientToken', response.data.access_token);
        AsyncStorage.setItem('clientRefreshToken', response.data.refresh_token)
          .then(this.setState({ isLoading: false }));
      })
      .catch((error) => {
        console.log('error 2 ', error);
      });
  }

  onPressGetAccounts() {
    let i;
    this.setState({ isLoading: true });
    const AuthStr = 'Bearer '.concat(this.state.token);
    console.log(AuthStr);

    axios.get(ssApiQueryURL.userAccounts, { headers: { Authorization: AuthStr } })
        .then(response => {
              console.log(response.data);
              console.log(response.data.accounts[1].label);
        /*      for (i = 0; i < response.data.accounts.length; i++) {
                this.state.labels[i] = response.data.accounts[i].label;
                console.log('labelfor', this.state.labels[i]);
              } */
        this.setState({ accounts: response.data.accounts });
        this.setState({ id: this.state.accounts[2].id });

        for (i = 0; i < this.state.accounts.length; i++) {
          this.state.labels[i] = this.state.accounts[i].label;
          this.state.accountArray[i] = this.state.accounts[i];
          console.log('labelfor', this.state.labels[i]);
        }
              console.log('labels ', this.state.labels);
              console.log(this.state.accounts);
              this.setState({ isLoading: false });
          }).catch((error) => {
            console.log('error ', error);
          });
  }

  onPressAuthClientGetAccounts() {
    function getAuthToken() {

    }
    function getAccounts() {

    }

    axios.all([getAuthToken(), getAccounts()])
      .then(axios.spread(function (auth, accts) {
        this.setState({ accounts: accts });
      }));
  }

  onPressGetCategories() {
    let i;
    this.setState({ isLoading: true });
    const AuthStr = 'Bearer '.concat(this.state.token);
    const URL = 'https://api.sbaustralia.com:443/v2/accounts/'.concat(this.state.id).concat('/categories');


    axios.get(URL, { headers: { Authorization: AuthStr } })
        .then(response => {
        console.log(response.data);

        this.setState({ categories: response.data.categories });

        for (i = 0; i < this.state.categories.length; i++) {
          this.state.categoryNames[i] = this.state.categories[i].name;
          console.log('namefor', this.state.categoryNames[i]);
        }
              console.log('labels ', this.state.categoryNames);
              this.setState({ isLoading: false });
          }).catch((error) => {
            console.log('error ', error);
          });
  }

  onPressGetTrips() {
    const AuthStr = 'Bearer '.concat(this.state.token);
    const tripsURL = 'https://api.sbaustralia.com:443/v2/accounts/'.concat(this.state.id).concat('/documents');
/*
    var instance = axios.create({
      baseURL: tripsURL,
      timeout: 1000,
      headers: { Authorization: AuthStr }
    });
*/
    const dataParams = {
      category: 'Trips',
      order_by_desc: 'uploaded'
    };

    axios.get(tripsURL, { params: { category: 'Trips', order_by_desc: 'uploaded' }, headers: { Authorization: AuthStr } })
        .then(response => {
        console.log(response.data.documents);
        this.setState({ trips: response.data.documents });
        let i;
        for (i = 0; i < this.state.trips.length; i++) {
          this.state.tripsId[i] = this.state.trips[i].issued;
        }
        //this.setState({ isLoading: false });
        }).catch((error) => {
            console.log('error ', error);
        });
  }

  onPressGetProcessedReceipts() {
    const AuthStr = 'Bearer '.concat(this.state.token);
    const tripsURL = 'https://api.sbaustralia.com:443/v2/accounts/'.concat(this.state.id).concat('/documents');

    const dataParams = {
      processing_state: 'PROCESSED',
      order_by_desc: 'uploaded'
    };

    axios.get(tripsURL, { params: { processing_state: 'PROCESSED', order_by_desc: 'uploaded' }, headers: { Authorization: AuthStr } })
        .then(response => {
        console.log(response.data.documents);
        this.setState({ processedReceipts: response.data.documents });
        let i;
        for (i = 0; i < this.state.processedReceipts.length; i++) {
          this.state.processedReceiptsId[i] = this.state.processedReceipts[i].id;
        }
        //this.setState({ isLoading: false });
        }).catch((error) => {
            console.log('error ', error);
        });
  }

  goToList() {
    Actions.list({
      labels: this.state.labels,
      accountArray: this.state.accountArray
    });
  }

  renderTrips() {
    return this.state.trips;
  }

  render() {
    return (

    <FullScreenView style={{ backgroundColor: 'white', paddingTop: HEADER.height }}>

      <Button
        onPress={this.onPressAuthClient.bind(this)}
        style={{ flexGrow: 0, height: 60 }}
      >
        authClient
      </Button>
      <View style={{ backgroundColor: 'grey', padding: 30 }}>
        <Text> {this.state.token} </Text>
      </View>
        <Button
          onPress={this.onPressGetAccounts.bind(this)}
          style={{ flexGrow: 0, height: 60 }}
        >
          Get Accounts
        </Button>
        <View style={{ backgroundColor: 'grey', padding: 30 }}>
          <Text>{this.state.labels}</Text>
          <Text>{this.state.id}</Text>
        </View>
        <Button
          onPress={this.onPressGetProcessedReceipts.bind(this)}
          style={{ flexGrow: 0, height: 60 }}
        >
          Get Processed receipts
        </Button>
        <View style={{ backgroundColor: 'grey', padding: 30 }}>
          <Text>{this.state.processedReceiptsId}</Text>
        </View>
        <Button
          onPress={this.onPressGetTrips.bind(this)}
          style={{ flexGrow: 0, height: 60 }}
        >
          Get Trips
        </Button>
        <View style={{ backgroundColor: 'grey', padding: 30 }}>
          <Text>{this.state.tripsId}</Text>
        </View>
      </FullScreenView>
    );
  }
}

export default APITest;
