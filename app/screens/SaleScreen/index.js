import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadOrder, resetOrderState } from '../../redux/order/order.action'
import OrderListComponent from './orderList.ui'
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

class SaleScreen extends Component {
  
  constructor(props) {
        super(props);
  }

  render() {
    return (<OrderListComponent style={{ flex: 1 }} {...this.props} />);
  }

  componentDidMount() {    
    let { order, loadOrder, user } = this.props;    
    let { odoo } = user;
    loadOrder(odoo, order.searchText,  order.limit, order.page);
  }
}

const mapStateToProps = state => ({
    user: state.user,
    order: state.order
});

const mapDispatchToProps = dispatch => ({
    loadOrder: (odooApi, currentSearchText, limit, offset) => dispatch( loadOrder(odooApi, currentSearchText, limit, offset)),
    resetOrderState: () => dispatch( resetOrderState())
});

export default connect( mapStateToProps, mapDispatchToProps )(SaleScreen);