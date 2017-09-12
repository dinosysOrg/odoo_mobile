import React, { Component } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Image } from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";
import {styles} from './styles'
import debounce from 'lodash/debounce'
import images from '../../images'

export default class ProductListComponent extends Component {

  constructor(props) {
    super(props);
  }

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

  _handleRefresh = () => {
    let { product, loadProduct, resetProductState, user } = this.props;
    if (product.isLoading) {
      return
    }
    resetProductState()
    let { odoo } = user
    loadProduct(odoo, product.searchText,  product.limit, 0);
  };

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

  _renderSeparator = () => ( <View style={styles.divider} /> )

  _renderHeader = () => (
      <SearchBar
        placeholder="Type Here..." 
        lightTheme
        round
        onChangeText={debounce((text) => this._doSearchAfterTextChange(text), 1000)}
      />
  )

  _doSearchAfterTextChange(text) {;
    let { product, loadProduct, resetProductState, user } = this.props;
    if (product.isLoading) {
      return
    }
    resetProductState()
    let { odoo } = user
    loadProduct(odoo, text,  product.limit, 0);
  }


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

  _renderProductItem = ({item, index}) => {
    const { onFinishedItem, onDeleteItem } = this.props;

    let productImage = this._renderProductImage(item)

    return (
      <View style={ styles.itemContainer } >            
        { productImage }
        <View style={ { flex: 1,  height: 80, marginLeft: 10, justifyContent: 'center', alignItems: 'flex-start' } }>
          <Text style={ [styles.itemInfoText, { fontWeight: 'bold' }] } numberOfLines={ 1 } ellipsizeMode= { 'tail' }>{ item.display_name }</Text>        
          <Text style={ styles.itemInfoText }>{ 'Price: ' + item.list_price + 'đ'}</Text> 
          <Text style={ styles.itemInfoText }>{ 'On hand: ' + item.virtual_available + ' Unit(s)'}</Text> 
          <Text style={ styles.itemInfoText }>{ 'Forecasted: ' + item.virtual_available + ' Unit(s)'}</Text> 
        </View>
      </View>
    );
  }

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
