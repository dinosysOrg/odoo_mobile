import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import AppWithNavigationState from './navigators/AppNavigator';
import store from './redux/configStore';
import Menu, {
  MenuContext,
  MenuTrigger,
  MenuOptions,
  MenuOption,
  renderers
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
