import React, { Component } from 'react';
import strings from '../../strings';
import Button from '../../components/Button';
import MyDialog from '../../components/MyDialog'
import images from '../../images';
import {
  AppRegistry,
  StyleSheet,
  Platform,
  TextInput,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  View
} from 'react-native';
import { connect } from 'react-redux'; 

export default class ProductFlatList extends Component {

  renderItem = ({item, index}) => {
    const { onFinishedItem, onDeleteItem } = this.props;

    let productImage = this.renderProductImage(item)

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

  renderProductImage(product) {
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

  onLoadingProductImageError(error){
    console.log('Image Load Failed')
    console.log(this.props)
    this.setState({ image_small: images.placeholder})
  }

  render() {
    let { data } = this.props.product;
    if (data == null) {
        data = []
    }

    return(
      <FlatList
        data={data}
        keyExtractor={ (item, index) => index }
        renderItem={ this.renderItem }
      />
    );
  }

  componentDidMount() {
    this.props.loadProduct(this.props.user.user)
  }  
}

const styles = StyleSheet.create({
  itemContainer : {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 100,
    marginHorizontal: 10,
    marginTop: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderColor: 'gray',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowColor: 'gray',
    elevation: 2
  },
  itemInfoText: {
    flex: 1, 
    marginHorizontal: 10, 
    color: 'black',
    fontSize: 14,  
    textAlign: 'left',  
  }
});