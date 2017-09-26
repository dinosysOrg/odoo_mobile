import React, { Component } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Button,
  FlatList,
  Image,
  TouchableOpacity
} from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";
import { styles } from "./styles";
import debounce from "lodash/debounce";
import images from "../../images";
import strings from "../../strings/index";
import { SaleDetail } from "../SaleDetailScreen/index";
import DatePicker from "react-native-datepicker";
import MyDialog from "../../components/MyDialog";
import moment from "moment";

export default class OrderListComponent extends Component {
  constructor(props) {
    super(props);

    let { from } = this.props.order;

    let { to } = this.props.order;

    let fromDate = moment(from).format("YYYY-MM-DD");

    let toDate = moment(to).format("YYYY-MM-DD");

    let maxDate = moment().format("YYYY-MM-DD");

    let minDate = moment()
      .subtract(10, "y")
      .format("YYYY-MM-DD");

    this.state = {
      minDate: minDate,
      maxDate: maxDate
    };

    this.myDialog = null;
  }

  render() {
    let { data } = this.props.order;

    return (
      <View style={styles.container}>
        <View style={styles.datePickerContainer}>
          {this._renderFromDatePicker()}
          {this._renderToDatePicker()}
        </View>
        <FlatList
          data={data}
          renderItem={this._renderOrderItem.bind(this)}
          keyExtractor={item => item.id}
        />
        <MyDialog
          ref={dialog => {
            this.myDialog = dialog;
          }}
        />
      </View>
    );
  }

  _renderFromDatePicker = () => {
    let { from } = this.props.order;

    let { to } = this.props.order;

    let fromDate = moment(from).format("YYYY-MM-DD");

    let toDate = moment(to).format("YYYY-MM-DD");

    return (
      <DatePicker
        style={styles.datePicker}
        date={fromDate}
        mode="date"
        placeholder={strings.order.select_date}
        format="YYYY-MM-DD"
        minDate={this.state.minDate}
        maxDate={this.state.maxDate}
        confirmBtnText={strings.dialog.confirm}
        cancelBtnText={strings.dialog.confirm}
        customStyles={{
          dateIcon: {
            position: "absolute",
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={date => {
          if (moment(to) < moment(date)) {
            this._showInvalidRangePickWarning();
          } else {
            let newFromDate = moment(date).format("YYYY-MM-DD");
            this._reloadOrderInRange(newFromDate, toDate);
          }
        }}
      />
    );
  };

  _renderToDatePicker = () => {
    let { from } = this.props.order;

    let { to } = this.props.order;

    let fromDate = moment(from).format("YYYY-MM-DD");

    let toDate = moment(to).format("YYYY-MM-DD");

    return (
      <DatePicker
        style={styles.datePicker}
        date={toDate}
        mode="date"
        placeholder={strings.order.select_date}
        format="YYYY-MM-DD"
        minDate={this.state.minDate}
        maxDate={this.state.maxDate}
        confirmBtnText={strings.dialog.confirm}
        cancelBtnText={strings.dialog.confirm}
        customStyles={{
          dateIcon: {
            position: "absolute",
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
        }}
        onDateChange={date => {
          if (moment(date) < moment(from)) {
            this._showInvalidRangePickWarning();
          } else {
            let newToDate = moment(date).format("YYYY-MM-DD");
            this._reloadOrderInRange(fromDate, newToDate);
          }
        }}
      />
    );
  };

  /**
   * Render order item in list
   */
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

  /**
   * Method will be called when user clicked an order item, then navigate to sale detail screen to view detail order
   */
  _onOrderClicked = data => {
    this.props.navigation.navigate("SaleDetail", {
      order: JSON.stringify(data)
    });
  };

  _reloadOrderInRange = (from, to) => {
    console.log(`Reload Order In Range from ${from} to ${to}`);

    let { order, loadOrder, resetOrderState, user } = this.props;
    let { odoo } = user;

    if (order.isLoading) {
      return;
    }

    resetOrderState();

    loadOrder(odoo, from, to, order.limit, 0);
  };

  /**
   * Show warning dialog when user picked invalid range. Ex: The end date is before the begin date.
   */
  _showInvalidRangePickWarning = () => {
    let title = strings.dialog.title_warning;
    let content = strings.order.invalid_range_warning;
    this.myDialog.show("error", title, content);
  };
}
