import React from 'react';
import { Provider } from 'react-redux';
import AppWithNavigationState from './navigators/AppNavigator';
import store from './redux/configStore';
import Menu, {
  MenuContext
} from 'react-native-popup-menu';

export default class OdooMobile extends React.Component {

  render() {
    return (
      <Provider store={store}>
      <MenuContext style={{flex: 1}}>
        <AppWithNavigationState />
      </MenuContext>
      </Provider>
    );
  }
}
