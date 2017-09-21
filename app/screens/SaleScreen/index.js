import React, { Component } from "react";
import { connect } from "react-redux";
import { loadOrder, resetOrderState } from "../../redux/order/order.action";
import OrderListComponent from "./orderList.ui";
import strings from "../../strings/index";
import { StyleSheet, Text, View, Button } from "react-native";
import moment from "moment";

class SaleScreen extends Component {

  /* Update header's title */
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Sales"
    };
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (<OrderListComponent style={{ flex: 1 }} {...this.props} />);
  }

  /* After component did mount, start loading order */
  componentDidMount() {
    let { order, loadOrder, user } = this.props;
    let { odoo } = user;

    if (order.month == null) {
      order.month = moment().format("YYYY-MM-DD");
    }

    loadOrder(odoo, order.month, order.limit, order.page);
  }
}

/* Map state to props */
const mapStateToProps = state => ({
  user: state.user,
  order: state.order
});

/* Map dispatch method to props */
const mapDispatchToProps = dispatch => ({
  loadOrder: (odooApi, month, limit, offset) =>
    dispatch(loadOrder(odooApi, month, limit, offset)),
  resetOrderState: () => dispatch(resetOrderState())
});

/* Connect props to screen */
export default connect(mapStateToProps, mapDispatchToProps)(SaleScreen);
