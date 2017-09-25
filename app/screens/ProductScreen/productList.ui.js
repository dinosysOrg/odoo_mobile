import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Image
} from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";
import { styles } from "./styles";
import debounce from "lodash/debounce";
import images from "../../images";
import strings from "../../strings/index";

export default class ProductListComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { data } = this.props.product;

    return (
      <List containerStyle={styles.container}>
        <FlatList
          data={data}
          renderItem={this._renderProductItem.bind(this)}
          keyExtractor={item => item.id}
          ListHeaderComponent={this._renderHeader}
          ListFooterComponent={this._renderFooter}
          onRefresh={this._handleRefresh}
          refreshing={false}
          onEndReached={this._handleLoadMore}
          onEndReachedThreshold={0.1}
        />
      </List>
    );
  }

  /**
   * When user pull the list at the top, this method will be called to refresh data by loading data with current search text in page 0
   */
  _handleRefresh = () => {
    let { product, loadProduct, resetProductState, user } = this.props;
    if (product.isLoading) {
      return;
    }
    resetProductState();
    let { odoo } = user;
    loadProduct(odoo, product.searchKey, product.limit, 0);
  };

  /**
   * When user scroll the list to the bottom, this method will be called to load more data by increasing page
   */
  _handleLoadMore = () => {
    let { product, loadProduct, user } = this.props;
    if (product.isLoading) {
      return;
    }
    if (product.isFinish) {
      return;
    }
    let { odoo } = user;
    loadProduct(odoo, product.searchKey, product.limit, product.page);
  };

  /**
 * Render product item separator
 */
  _renderSeparator = () => <View style={styles.divider} />;

  /**
 * Render search bar at the top of the list
 */
  _renderHeader = () => (
    <SearchBar
      placeholder={strings.input.searchPlaceHolder}
      lightTheme
      round
      noIcon
      onChangeText={debounce(text => this._doSearchAfterTextChange(text), 1000)}
    />
  );

  /**
 * Do search data with text after user type
 * @param {string} text user's input
 */
  _doSearchAfterTextChange(text) {
    let { product, loadProduct, resetProductState, user } = this.props;
    if (product.isLoading) {
      return;
    }
    resetProductState();
    let { odoo } = user;
    loadProduct(odoo, text, product.limit, 0);
  }

  /**
 * Render loading activity indicator at the bottom of the list when loading more data
 */
  _renderFooter = () => {
    let { isLoading } = this.props.product;
    if (isLoading) {
      return (
        <View style={styles.footer}>
          <ActivityIndicator animating size="large" />
        </View>
      );
    }
    return null;
  };

  /**
   * Render product item in list
   */
  _renderProductItem = ({ item, index }) => {
    const { onFinishedItem, onDeleteItem } = this.props;

    let productImage = this._renderProductImage(item);

    return (
      <View style={styles.itemContainer}>
        {productImage}
        <View style={styles.productInfoContainer}>
          <Text
            style={[styles.itemInfoText, styles.itemNameText]}
            numberOfLines={1}
            ellipsizeMode={"tail"}
          >
            {item.display_name}
          </Text>
          <Text style={styles.itemInfoText}>{`${strings.product
            .price}: ${item.list_price} ${strings.product.currency}`}</Text>
          <Text style={styles.itemInfoText}>{`${strings.product
            .onHand}: ${item.virtual_available} ${strings.product
            .units}`}</Text>
          <Text style={styles.itemInfoText}>{`${strings.product
            .forecasted}: ${item.virtual_available} ${strings.product
            .units}`}</Text>
        </View>
      </View>
    );
  };

  /**
   * Render product image if product has image or placeholder image instead if product doesn't have image.
   * @param {object} product the product data
   */
  _renderProductImage(product) {
    if (product.image_small != null && product.image_small != false) {
      return (
        <Image
          style={styles.itemImage}
          source={{ uri: "data:image/png;base64," + product.image_small }}
          resizeMode={"contain"}
        />
      );
    } else {
      return (
        <Image
          style={styles.itemImage}
          source={images.placeholder}
          resizeMode={"contain"}
        />
      );
    }
  }
}
