import { combineReducers } from 'redux';
import { NavigationActions } from 'react-navigation';
import { AppNavigator } from './AppNavigator';

const firstAction = AppNavigator.router.getActionForPathAndParams('Login');
const tempNavState = AppNavigator.router.getStateForAction(firstAction);
const initialNavState = AppNavigator.router.getStateForAction(
  tempNavState
);

function appReducer(state = initialNavState, action) {
  console.log("appReducer");
  let nextState;
  switch (action.type) {
    case 'Main':
      nextState = createNavigator('Main', state);
    break
    case 'Login':
    nextState = createNavigator('Login', state);
    break
    default:
      nextState = AppNavigator.router.getStateForAction(action, state);
      break;
  }
  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
}

createNavigator = (screen, currentState) => (
  nextState = AppNavigator.router.getStateForAction(
    NavigationActions.navigate({ routeName: screen }),
    currentState
  )
)

export default appReducer;
