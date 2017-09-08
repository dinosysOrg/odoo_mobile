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

  componentWillMount(){

  }

  render() {
    console.log(this.props)

    return (<ProductFlatList style={{ flex: 1 }} {...this.props} />);
  }
}

const mapStateToProps = state => ({
    user: state.user
});

const mapDispatchToProps = dispatch => ({
    loadProduct: () => dispatch( loadProduct())
});

export default connect( mapStateToProps, mapDispatchToProps )(Home);