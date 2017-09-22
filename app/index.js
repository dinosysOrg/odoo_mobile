import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import AppWithNavigationState from './navigators/AppNavigator';
import store from './redux/configStore';
import { Font } from 'expo';

import Menu, {
  MenuContext,
  MenuTrigger,
  MenuOptions,
  MenuOption,
  renderers
} from 'react-native-popup-menu';

export default class OdooMobile extends React.Component {

  /**
  * Add custom font for search bar icon
  */
  componentDidMount() {
    Font.loadAsync({
      'Material Icons': require('../assets/fonts/MaterialIcons.ttf'),
    });
  }

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
