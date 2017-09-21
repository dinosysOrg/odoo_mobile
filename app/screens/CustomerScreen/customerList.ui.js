import React, { Component } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";
import { styles } from './styles';
import debounce from 'lodash/debounce';
import { FontAwesome } from '@expo/vector-icons';

class CustomerListComponent extends Component {

  constructor(props) {
    super(props);
  }

  render() {
   let { data } = this.props.customer
    return (
      <List containerStyle={styles.container}>
        <FlatList
          data={data}
          renderItem={this._renderCustomerItem.bind(this)}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={this._renderSeparator}
          ListHeaderComponent={this._renderHeader}
          ListFooterComponent={this._renderFooter}
          onRefresh={this._handleRefresh}
          refreshing={false}
          onEndReached={this._handleLoadMore}
          onEndReachedThreshold={0.2}
        />
      </List>
    )
  }

  componentDidUpdate() {

  }

  // Pull to refresh list of customer
  _handleRefresh = () => {
    let { customer, loadCustomer, resetCustomerState, user } = this.props;
    if (customer.isLoading) {
      return
    }
    resetCustomerState()
    let { odoo } = user
    this.search.clearText();
  };

  // Load more customer when scroll to bottom
  _handleLoadMore = () => {
    let { customer, loadCustomer, user } = this.props
    if (customer.isLoading) {
      return
    }
    if (customer.isFinish) {
      return;
    }
    let { odoo } = user
    loadCustomer(odoo, customer.searchText,  customer.limit, customer.page);
  }

  _renderSeparator = () => ( <View style={styles.divider} /> )

  // Add search bar on top
  _renderHeader = () => (
      <SearchBar
        ref={search => this.search = search}
        placeholder="Type Here..."
        lightTheme
        round
        noIcon
        onChangeText={debounce((text) => this._doSearchAfterTextChange(text), 1000)}
      />
  )

  /* Handle event typing in search bar
    Load customers by key in search text
  */
  _doSearchAfterTextChange(text) {;
    let { customer, loadCustomer, resetCustomerState, user } = this.props;
    if (customer.isLoading) {
      return
    }
    resetCustomerState()
    let { odoo } = user
    loadCustomer(odoo, text,  customer.limit, 0);
  }


  // Show activity indicator when load list
  _renderFooter = () => {
    let { isLoading } = this.props.customer;
    if (isLoading) {
      return (
        <View style={styles.footer}>
          <ActivityIndicator animating size="large" />
        </View>
      );
    }
    return null
  };

  //Custom cell show infor of per customer
  _renderCustomerItem = ({item}) => {
    return (
      <ListItem
        hideChevron={true}
        roundAvatar
        title={
          <View style={styles.titleView}>
            <Text style={styles.titleText}> {item.name} </Text>
          </View>
        }
        subtitle={
          <View style={styles.subtitleView}>
            <Text style={styles.subtitleText} numberOfLines={1} ellipsizeMode={"tail"}> {item.create_date} </Text>
            <Text style={styles.subtitleText} numberOfLines={1} ellipsizeMode={"tail"}> {item.email} </Text>
          </View>
        }
        avatar={{ uri: `data:image/png;base64, ${item.image}` }}
        containerStyle={{ borderBottomWidth: 0 }}
    />
    )
  }
}

export default CustomerListComponent;
