import React, { Component } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Image } from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";
import {styles} from './styles'
import debounce from 'lodash/debounce'
import images from '../../images'
import strings from '../../strings/index'

export default class ProductListComponent extends Component {

  constructor(props) {
    super(props);
  }

  /* Render product list UI */
  render() {    
    let { data } = this.props.product

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
    )
  }

  /* Function to reload when user pull down at the top of the list */
  _handleRefresh = () => {
    let { product, loadProduct, resetProductState, user } = this.props;
    if (product.isLoading) {
      return
    }
    resetProductState()
    let { odoo } = user
    loadProduct(odoo, product.searchText,  product.limit, 0);
  };

  /* Function to load more when user scroll to the bottom of the list */
  _handleLoadMore = () => {
    let { product, loadProduct, user } = this.props
    if (product.isLoading) {
      return
    }
    if (product.isFinish) {
      return;
    }
    let { odoo } = user
    loadProduct(odoo, product.searchText,  product.limit, product.page);
  }

  /* Render item's separator */
  _renderSeparator = () => ( <View style={styles.divider} /> )

  /* Render search bar which is the header of the list */
  _renderHeader = () => (
      <SearchBar
        placeholder = { strings.input.searchPlaceHolder }
        lightTheme
        round
        noIcon
        onChangeText={debounce((text) => this._doSearchAfterTextChange(text), 1000)}
      />
  )

  /* Search product by keyword after user type in the search box */
  _doSearchAfterTextChange(text) {;
    let { product, loadProduct, resetProductState, user } = this.props;
    if (product.isLoading) {
      return
    }
    resetProductState()
    let { odoo } = user
    loadProduct(odoo, text,  product.limit, 0);
  }

  /* Render activity indicator at the bottom of the list when user 
   * scroll to bottom to load more
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
    return null
  };

  /* Render product item
   * {object} product The product
   * {number} index The product's index in list
   */
  _renderProductItem = ({item, index}) => {
    const { onFinishedItem, onDeleteItem } = this.props;

    let productImage = this._renderProductImage(item)

    return (
      <View style={ styles.itemContainer } >            
        { productImage }
        <View style={ styles.productInfoContainer }>
          <Text style={ [styles.itemInfoText, styles.itemNameText] } numberOfLines={ 1 } ellipsizeMode= { 'tail' }>{ item.display_name }</Text>        
          <Text style={ styles.itemInfoText }>{ `${strings.product.price}: ${item.list_price} ${strings.product.currency}`}</Text> 
          <Text style={ styles.itemInfoText }>{ `${strings.product.onHand}: ${item.virtual_available} ${strings.product.units}`}</Text> 
          <Text style={ styles.itemInfoText }>{ `${strings.product.forecasted}: ${item.virtual_available} ${strings.product.units}`}</Text> 
        </View>
      </View>
    );
  }

  /* Render product image. If product has no image, set image placeholder
   * {object} product The product
   */
  _renderProductImage(product) {
    if (product.image_small != null && product.image_small != false) {
      return (
            <Image style={ { width: 80, height: 80 } } 
                   source={ {uri: 'data:image/png;base64,' + product.image_small} }
                   resizeMode= { 'contain' }/>
      )
    } else {
      return (
            <Image style={ { width: 80, height: 80 } } 
                   source={ images.placeholder }
                   resizeMode= { 'contain' }/>
      )
    }    
  }
}
