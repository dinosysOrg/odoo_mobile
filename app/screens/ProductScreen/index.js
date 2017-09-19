import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadProduct, resetProductState } from '../../redux/product/product.action'
import ProductListComponent from './productList.ui'
import { FontAwesome } from '@expo/vector-icons';
import SortMenu from './sortMenu'

class Product extends Component {

  constructor(props) {
        super(props);
  }

  static navigationOptions = ({navigation}) => {
    return {
      headerRight: <SortMenu/>
    }
  };

  render() {
    return (<ProductListComponent {...this.props}/>);
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
    loadProduct: (odooApi, currentSearchText, limit, offset) => dispatch( loadProduct(odooApi, currentSearchText, limit, offset)),
    resetProductState: () => dispatch( resetProductState())
});

export default connect( mapStateToProps, mapDispatchToProps )(Product);