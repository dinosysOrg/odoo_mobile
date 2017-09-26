import React, { Component } from "react";
import { connect } from "react-redux";
import { loadOrder, resetOrderState } from "../../redux/order/order.action";
import OrderListComponent from "./orderList.ui";
import strings from "../../strings/index";
import { StyleSheet, Text, View, Button } from "react-native";
import moment from "moment";

class SaleScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: strings.slide_menu.sale
    };
  };

  constructor(props) {
    super(props);
  }

  render() {
    return <OrderListComponent style={{ flex: 1 }} {...this.props} />;
  }

  /**
   * When component did mount, 
   * start loading order in range from 30 days ago to current day
   */
  componentDidMount() {
    let { order, loadOrder, user } = this.props;
    let { odoo } = user;

    loadOrder(odoo, order.from, order.to, order.limit, order.page);
  }
}

const mapStateToProps = state => ({
  user: state.user,
  order: state.order
});

const mapDispatchToProps = dispatch => ({
  loadOrder: (odooApi, from, to, limit, offset) =>
    dispatch(loadOrder(odooApi, from, to, limit, offset)),
  resetOrderState: () => dispatch(resetOrderState())
});

export default connect(mapStateToProps, mapDispatchToProps)(SaleScreen);
