import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import appReducer from './navigators/AppReducer';
import AppWithNavigationState from './navigators/AppNavigator';

const reducers = combineReducers({
                    nav: appReducer
                });
const store = createStore(reducers, applyMiddleware(thunk));

export default class OdooMobile extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }

}