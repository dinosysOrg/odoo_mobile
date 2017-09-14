import React, { Component } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Image } from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";
import {styles} from './styles'
import debounce from 'lodash/debounce'
import images from '../../images'
import strings from '../../strings/index'

export default class OrderListComponent extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    let { data } = this.props.order

    return (
        <FlatList
          data={data}
          renderItem={this._renderOrderItem.bind(this)}
          keyExtractor={item => item.id}/>
    )
  }

  componentDidUpdate() {
    console.log(this.props)
  }

  _renderOrderItem = ({item, index}) => {
    const { onFinishedItem, onDeleteItem } = this.props;

    return (
      <View style={ styles.itemContainer }>
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
      </View>
    );
  }
}
