import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadProduct } from '../../redux/product/product.action'
import ProductListComponent from './productList.ui'
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

class Home extends Component {

  constructor(props) {
        super(props);
  }

  render() {
    return (<ProductListComponent style={{ flex: 1 }} {...this.props} />);
  }

  componentDidMount() {
    let { odoo } = this.props.user;
    this.props.loadProduct(odoo, 10, 0);
  }

}

const mapStateToProps = state => ({
    user: state.user,
    product: state.product
});

const mapDispatchToProps = dispatch => ({
    loadProduct: (odooApi, limit, offset) => dispatch( loadProduct(odooApi, limit, offset))
});

export default connect( mapStateToProps, mapDispatchToProps )(Home);