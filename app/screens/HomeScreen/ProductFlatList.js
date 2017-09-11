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
  View
} from 'react-native';
import { connect } from 'react-redux'; 

export default class ProductFlatList extends Component {

  renderItem = ({item, index}) => {
    const { onFinishedItem, onDeleteItem } = this.props;

    return (
      <View style={ styles.itemContainer } >
        <Text style={{ color: 'black'}}>{ 'Name: ' + item.name }</Text>        
        <Text style={{ color: 'black'}}>{ 'Price: ' + item.price }</Text> 
      </View>
    );
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
    flexDirection: 'column',
    alignItems: 'flex-start',
    backgroundColor: 'white',
    marginHorizontal : 10,
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 5,
    borderColor: 'gray',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowColor: 'gray',
    elevation: 2
  },
});