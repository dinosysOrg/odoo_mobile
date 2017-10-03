import React, { Component } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { styles } from "./dashboard.styles";
import strings from "../../strings";
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryStack,
  VictoryTheme,
  VictoryArea,
  VictoryLabel
} from "victory-native";

export default class OrderChartComponent extends Component {
  constructor(props) {
    super(props);
  }

  /**
   * Render Order Chart with data
   */
  render() {
    let { orderData } = this.props.dashboard;
    let currency = "";

    try {
      currency = orderData[0].currency;
    } catch (error) {}

    return (
      <View style={styles.container}>
        <Text style={styles.chartTitle}>
          {strings.dashboard_screen.order_chart_title}
        </Text>
        <VictoryChart domainPadding={40} theme={VictoryTheme.material}>
          <VictoryAxis />
          <VictoryAxis dependentAxis tickFormat={x => `${x / 1000}k`} />
          <VictoryBar
            style={{
              data: { width: 30, strokeWidth: 0, fill: "red" }
            }}
            data={orderData}
            x="create_date"
            y="amount_total"
          />
        </VictoryChart>
      </View>
    );
  }
}
