import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
} from "react-native";
import { styles } from "./dashboard.styles";
import strings from "../../strings";

export default class DashboardComponent extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    return (
      <View style={styles.container}/>
    );
  }
}
