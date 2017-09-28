import React from "react";
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
  StackNavigator,
  TabNavigator,
  DrawerNavigator
} from "react-navigation";
import Menu from "./index";
import Product from "../ProductScreen/index";
import Setting from "../SettingScreen/index";
import CustomerList from "../CustomerScreen/index";
import SaleScreen from "../SaleScreen";
import DashboardScreen from "../DashboardScreen";

//List of screen in menu
export const SideMenu = DrawerNavigator(
  {
    DashboardScreen: {
      screen: DashboardScreen
    },
    SaleScreen: {
      screen: SaleScreen
    },
    ProductScreen: {
      screen: Product
    },
    CustomerScreen: {
      screen: CustomerList
    },
    SettingScreen: {
      screen: Setting
    }
  },
  {
    drawerWidth: Dimensions.get("window").width - 56,
    drawerPosition: "left",
    contentComponent: props => <Menu {...props} />
  }
);
