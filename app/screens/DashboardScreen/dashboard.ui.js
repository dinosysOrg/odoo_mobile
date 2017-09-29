import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Image
} from "react-native";
import { styles } from "./dashboard.styles";
import strings from "../../strings";
import OrderChartComponent from "./orderChart.ui";
import ProductChartComponent from "./productChart.ui";

const charts = [
  {
    title: strings.dashboard_screen.order
  },
  {
    title: strings.dashboard_screen.order
  }
];

export default class DashboardComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <OrderChartComponent />
        {/*<ProductChartComponent />*/}
      </View>
    );
  }
}
