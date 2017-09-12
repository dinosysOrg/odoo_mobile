import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadProduct, resetProductState } from '../../redux/product/product.action'
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
    let { product, loadProduct, user } = this.props;
    let { odoo } = user;
    loadProduct(odoo, product.searchText,  product.limit, product.page);
  }
}

const mapStateToProps = state => ({
    user: state.user,
    product: state.product
});

const mapDispatchToProps = dispatch => ({
    loadProduct: (odooApi, currentSearchKey, limit, offset) => dispatch( loadProduct(odooApi, currentSearchKey, limit, offset)),
    resetProductState: () => dispatch( resetProductState())
});

export default connect( mapStateToProps, mapDispatchToProps )(Home);