import React, { Component } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Image, TouchableOpacity } from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";
import {styles} from './styles'
import debounce from 'lodash/debounce'
import images from '../../images'
import strings from '../../strings/index'
import {SaleDetail} from "../SaleDetailScreen/index"
import moment from "moment"

export default class OrderListComponent extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    let { data } = this.props.order
    let currentMonth = moment().format("MMMM-YYYY");

    let currentMonthOrder = strings.order.currentMonthOrder;

    let currentMonthOrderText = `${currentMonthOrder}:    ${currentMonth}`

    return (
      <View style={ styles.container }>
        <View style={ { height: 40, backgroundColor: 'white', justifyContent: 'center', alignItems: 'flex-start'}}>
          <Text style={{ marginHorizontal: 10 }}>{ currentMonthOrderText }</Text>
        </View>
        <FlatList
          data={data}
          renderItem={this._renderOrderItem.bind(this)}
          keyExtractor={item => item.id}
          on/>
      </View>
    )
  }

  _renderOrderItem = ({item, index}) => {
    const { onFinishedItem, onDeleteItem } = this.props;

    return (
      <View style={ styles.itemContainer }>
        <TouchableOpacity style={ { flex: 1 } } onPress={() => this._onOrderClicked(item)}>
          <View style={ styles.orderInfoContainer }>
              <Text style={ [styles.itemInfoText, styles.itemNameText] } numberOfLines={ 1 } ellipsizeMode= { 'tail' }>
                { `${strings.order.order}: ${item.display_name}` }
              </Text>
              <Text style={ styles.itemInfoText }>
                { `${strings.order.customer}: ${item.partner_id[1]}`}
              </Text>
              <Text style={ styles.itemInfoText }>
                { `${strings.order.createdDate}: ${item.create_date}`}
              </Text>
              <Text style={ styles.itemInfoText }>
                { `${strings.order.state}: ${item.state}`}
              </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  _onOrderClicked = (data) => {
    this.props.navigation.navigate("SaleDetail", {order: JSON.stringify(data)});
  }
}
