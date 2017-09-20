import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Image,
  TouchableOpacity,
  Button
} from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";
import { styles } from "./styles";
import debounce from "lodash/debounce";
import images from "../../images";
import strings from "../../strings/index";
import { SaleDetail } from "../SaleDetailScreen/index";
import moment from "moment";

export default class OrderListComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { data } = this.props.order;
    let { month } = this.props.order;

    let currentSelectedMonth = moment(month).format("YYYY-MM-DD");

    return (
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            height: 40,
            backgroundColor: "white",
            justifyContent: "space-around",
            alignItems: "stretch"
          }}
        >
          <View style={{ flex: 1.5, marginVertical: 0 }}>
            <Button
              style={{ marginVertical: 0, marginHorizontal: 0 }}
              onPress={this._onPreviousMonthPress}
              title="<<"
              color='black'
            />
          </View>

          <View style={{ flex: 7, marginVertical: 0, alignItems: 'center', justifyContent: 'center' }}>
            <Text fontSize={ 20 }>
              {currentSelectedMonth}
            </Text>
          </View>

          <View style={{ flex: 1.5, marginVertical: 0 }}>
            <Button
              style={{ marginVertical: 0, marginHorizontal: 0 }}
              onPress={this._onNextMonthPress}
              title=">>"
              color='black'
            />
          </View>
        </View>
        <FlatList
          data={data}
          renderItem={this._renderOrderItem.bind(this)}
          keyExtractor={item => item.id}
          on
        />
      </View>
    );
  }

  _onPreviousMonthPress = () => {
    let { order, loadOrder, resetOrderState, user } = this.props;
    if (order.isLoading) {
      return
    }

    let currentSelectedMonth = order.month;

    let previousMonth = moment(currentSelectedMonth).subtract(1,'M').format("YYYY-MM-DD");

    resetOrderState()

    let { odoo } = user

    loadOrder(odoo, previousMonth,  order.limit, 0);

  };

  _onNextMonthPress = () => {
    let { order, loadOrder, resetOrderState, user } = this.props;
    if (order.isLoading) {
      return
    }

    let currentSelectedMonth = order.month;

    let nextMonth = moment(currentSelectedMonth).add(1,'M').format("YYYY-MM-DD");

    resetOrderState()

    let { odoo } = user

    loadOrder(odoo, nextMonth,  order.limit, 0);
  };

  _renderOrderItem = ({ item, index }) => {
    const { onFinishedItem, onDeleteItem } = this.props;

    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => this._onOrderClicked(item)}
        >
          <View style={styles.orderInfoContainer}>
            <Text
              style={[styles.itemInfoText, styles.itemNameText]}
              numberOfLines={1}
              ellipsizeMode={"tail"}
            >
              {`${strings.order.order}: ${item.display_name}`}
            </Text>
            <Text style={styles.itemInfoText}>
              {`${strings.order.customer}: ${item.partner_id[1]}`}
            </Text>
            <Text style={styles.itemInfoText}>
              {`${strings.order.createdDate}: ${item.create_date}`}
            </Text>
            <Text style={styles.itemInfoText}>
              {`${strings.order.state}: ${item.state}`}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  _onOrderClicked = data => {
    this.props.navigation.navigate("SaleDetail", {
      order: JSON.stringify(data)
    });
  };
}
