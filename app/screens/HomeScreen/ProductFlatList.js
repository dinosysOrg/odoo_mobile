import React, { Component } from 'react';
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
        <Text style={{ color: 'black'}}>{ 'Name: ' + item }</Text>      
        <Text style={{ color: 'black'}}>{ 'Created Date: ' + item }</Text>     
        <Text style={{ color: 'black'}}>{ 'Price: ' + item }</Text>     
        <Text style={{ color: 'black'}}>{ 'Number of Transaction: ' + item }</Text>  
      </View>
    );
  }

  render() {

    //const { dataList } = this.props;   
    const dataList = ["Durex","Kotex","Vinamil","TH True Milk"]; 

    return(
      <FlatList
        data={dataList}
        //extraData={this.props}
        keyExtractor={ (item, index) => index }
        renderItem={ this.renderItem }
      />
    );
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
  }
});