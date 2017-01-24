
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import createLogger from 'redux-logger';
import Router from './Router';
import reducers from './reducers';

class App extends Component {
  componentWillMount() {

  }

  componentDidMount() {
    console.log('mounted');
  }

  render() {
    const logger = createLogger();
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk, logger));

    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
