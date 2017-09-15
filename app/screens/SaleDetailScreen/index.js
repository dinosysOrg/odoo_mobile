import React, { Component } from "react";
import { connect } from 'react-redux';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, ScrollView } from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";
import {styles} from "./styles";

class SaleDetail extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    let order = JSON.parse(this.props.navigation.state.params.order);

    return (
      <View style={styles.parentView}>
      <ScrollView>
        <View style={styles.childView}>
          <Text style={styles.mainText}> {order.display_name} </Text>
          <Text style={styles.extraText}> {order.create_date} </Text>
          <Text style={styles.extraText}> Company: {order.company_id[1]} </Text>
          <Text style={styles.extraText}> Partner Name: {order.partner_id[1]} </Text>
          <Text style={styles.extraText}> Partner Invoice: {order.partner_invoice_id[1]} </Text>
          <Text style={styles.extraText}> Partner Shipping: {order.partner_shipping_id[1]} </Text>
        </View>
        <View style={styles.childView}>
          <Text style={styles.mainText}> Product Name: {order.product_id[1]} </Text>
          <Text style={styles.extraText}> Amount Total: {order.amount_total} </Text>
          <Text style={styles.extraText}> Cart Quantity: {order.cart_quantity} </Text>
          <Text style={styles.extraText}> Date Order: {order.date_order} </Text>
        </View>
      </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = state => ({
    user: state.user,
    order: state.order
});

const mapDispatchToProps = dispatch => ({
    loadOrder: (odooApi, currentSearchText, limit, offset) => dispatch( loadOrder(odooApi, currentSearchText, limit, offset)),
    resetOrderState: () => dispatch( resetOrderState())
});

export default connect( mapStateToProps, mapDispatchToProps ) (SaleDetail);
