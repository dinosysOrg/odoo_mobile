import React, { Component } from "react";
import Menu, {
  MenuContext,
  MenuTrigger,
  MenuOptions,
  MenuOption,
  renderers
} from "react-native-popup-menu";
import { FontAwesome } from "@expo/vector-icons";
import { connect } from "react-redux";
import {
  loadProduct,
  resetProductState
} from "../../redux/product/product.action";

class ProductSortMenu extends Component {
  render() {
    return (
      <Menu>
        <MenuTrigger>
          <FontAwesome
            name="sort-amount-asc"
            color="white"
            size={18}
            style={{ margin: 9 }}
          />
        </MenuTrigger>
        <MenuOptions customStyles={optionsStyles}>
          <MenuOption
            onSelect={() => {
              this._sortProduct("name");
            }}
            text="Name: a -> z"
          />
          <MenuOption
            onSelect={() => {
              this._sortProduct("create_date");
            }}
            text="Created Date"
          />
          <MenuOption
            onSelect={() => {
              this._sortProduct("price");
            }}
            text="Price"
          />
          <MenuOption
            onSelect={() => {
              this._sortProduct("onHand");
            }}
            text="Quanity"
          />
        </MenuOptions>
      </Menu>
    );
  }

  /**
     * Sort product by the selected field 
     * @param {string} orderBy The field to be ordered
     */
  _sortProduct(orderBy) {
    let { product, loadProduct, user, resetProductState } = this.props;
    let { odoo } = user;

    resetProductState();
    loadProduct(odoo, product.searchText, product.limit, product.page, orderBy);
  }
}

const mapStateToProps = state => ({
  user: state.user,
  product: state.product
});

const mapDispatchToProps = dispatch => ({
  loadProduct: (odooApi, currentSearchKey, limit, page, orderBy) =>
    dispatch(loadProduct(odooApi, currentSearchKey, limit, page, orderBy)),
  resetProductState: () => dispatch(resetProductState())
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductSortMenu);

export const optionsStyles = {
  optionsContainer: {
    backgroundColor: "white",
    padding: 5
  },
  optionsWrapper: {
    backgroundColor: "white"
  },
  optionWrapper: {
    backgroundColor: "white",
    margin: 5
  },
  optionTouchable: {
    underlayColor: "gray",
    activeOpacity: 70
  },
  optionText: {
    color: "black"
  }
};
