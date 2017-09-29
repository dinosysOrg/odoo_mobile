import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Platform
} from "react-native";
import {
  addNavigationHelpers,
  StackNavigator,
  NavigationActions
} from "react-navigation";
import MainScreen from "../screens/MainScreen/index";
import LoginScreen from "../screens/LoginScreen/index";
import SaleDetail from "../screens/SaleDetailScreen/index";
import SwitchAccountScreen from "../screens/SwitchAccountScreen";
import { SideMenu } from "../screens/MenuScreen/route";
import strings from "../strings";
import { Ionicons, Entypo } from "@expo/vector-icons";

/**
 * App Style
 * Primary Color: #00bfa5
 * Light Color: #5df2d6
 * Dark Color: #008e76
 */
export const AppNavigator = StackNavigator(
  {
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        title: strings.login_screen.title,
        headerStyle: { backgroundColor: "#00bfa5" },
        headerTintColor: "white"
      }
    },
    Main: {
      screen: SideMenu,
      navigationOptions: ({ navigation }) => ({
        title: strings.home_screen.title,
        headerStyle: { backgroundColor: "#00bfa5" },
        headerTintColor: "white",
        headerLeft: <DrawerButton navigation={navigation} />
      })
    },
    SaleDetail: {
      screen: SaleDetail,
      path: "order/:data",
      navigationOptions: ({ navigation }) => ({
        title: strings.sub_Screen.detailSale,
        headerStyle: { backgroundColor: "#00bfa5" },
        headerTintColor: "white",
        headerLeft: <BackButton navigation={navigation} />
      })
    },
    Main: {
      screen: SideMenu,
      navigationOptions: ({ navigation }) => ({
        title: strings.home_screen.title,
        headerStyle: { backgroundColor: "#00bfa5" },
        headerTintColor: "white",
        headerLeft: <DrawerButton navigation={navigation} />
      })
    },
    SwitchAccount: {
      screen: SwitchAccountScreen,
      navigationOptions: ({ navigation }) => ({
        headerStyle: { backgroundColor: "#00bfa5" },
        headerTintColor: "white",
      })
    }
  },
  {
    index: 0,
    initialRouteName: "Login",
    navigationOptions: {
      gesturesEnabled: false
    }
  }
);

const backAction = NavigationActions.back({
  key: null
});

const AppWithNavigationState = ({ dispatch, nav }) => (
  <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
);

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  nav: state.nav
});

const DrawerButton = props => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        props.navigation.navigate("DrawerToggle");
      }}
    >
      <Entypo
        style={styles.menuIcon}
        name="menu"
        size={32}
        color="white"
        style={styles.menuIcon}
      />
    </TouchableOpacity>
  );
};

const styles = {
  container: {},
  menuIcon: {
    padding: 10
  }
};

const BackButton = props => {
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          props.navigation.dispatch(NavigationActions.back());
        }}
      >
        <Entypo
          name="chevron-left"
          color="white"
          size={30}
          style={{ margin: 9 }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default connect(mapStateToProps)(AppWithNavigationState);
