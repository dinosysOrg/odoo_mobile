import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadProduct } from '../../redux/product/product.action'
import ProductFlatList from './ProductFlatList'
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

class Home extends Component {

  constructor(props) {
        super(props);
        this.state = {
            db: 'odoo-dev',
            username: 'odoo.dev@dinosys.vn',
            password: 'dino.dev.204',
            url:'odoo-dev.dinosys.vn'
        };
        this.odoo = null;
  }

  render() {
    return (<ProductFlatList style={{ flex: 1 }} {...this.props} />);
  }
}

const mapStateToProps = state => ({
    user: state.user,
    product: state.product
});

const mapDispatchToProps = dispatch => ({
    loadProduct: (options) => dispatch( loadProduct(options))
});

export default connect( mapStateToProps, mapDispatchToProps )(Home);