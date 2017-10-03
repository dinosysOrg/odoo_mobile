import React, { Component } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { styles } from "./dashboard.styles";
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryStack,
  VictoryTheme,
  VictoryArea
} from "victory-native";
import strings from "../../strings";

export default class ProductChartComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.chartTitle}>
          {strings.dashboard_screen.order_chart_title}
        </Text>
      </View>
    );
  }
}
