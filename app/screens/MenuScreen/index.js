import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform
} from "react-native";
import { NavigationActions } from "react-navigation";
import { styles } from "./styles";
import { FontAwesome } from "@expo/vector-icons";
import strings from "../../strings";
import { connect } from "react-redux";

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: 0
    };
    this._initListMenu();
  }

  _initListMenu() {
    let { roles } = this.props.user.odoo.userInfo;

    // Get roles for menu
    let customerRole = roles.resPartner.read
    let productRole = roles.productProduct.read
    let saleRole = roles.saleOrder.read

    // Setup menu list
    this.menuList = [
      {
        title: strings.slide_menu.sale,
        icon: "tags",
        screen: "SaleScreen",
        enableMenu: true
      },
      {
        title: strings.slide_menu.product,
        icon: "steam",
        screen: "ProductScreen",
        enableMenu: true
      },
      {
        title: strings.slide_menu.customer,
        icon: "users",
        screen: "CustomerScreen",
        enableMenu: true
      },
      {
        title: strings.slide_menu.setting,
        icon: "user",
        screen: "SettingScreen",
        enableMenu: true
      },
    ];
  }

  // Handle touch event on item selected, move to screen selected
  _selectScreen = (name, index) => {
    this.setState({ selectedItem: index });
    let { navigation } = this.props;
    navigation.navigate(name);
  };

  // Render per item in menu
  _renderMenuItem = (item, index) => {
    if (!item.enableMenu) {
      return null;
    }
    return (
      <MenuItem
        key={index}
        title={item.title}
        icon={item.icon}
        selected={this.state.selectedItem == index}
        onPress={() => this._selectScreen(item.screen, index)}
      />
    );
  };

  _renderMenus = () =>
    this.menuList.map((item, index) => this._renderMenuItem(item, index));


  // Load avatar for current user
  _renderAvatar() {
    let { profile } = this.props.user.odoo.userInfo;
    return (
      <View style={styles.avatarView}>
        <Image
          style={styles.avatar}
          source={{
            uri: `data:image/jpeg;base64,${profile[0].image}`
          }}
        />
        <Text style={styles.userName}>
          {profile[0].name}{" "}
        </Text>
      </View>
    );
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.sideMenu}>
        {this._renderAvatar()}
        <ScrollView>
          <View style={{ paddingTop: 10, flex: 1 }}>{this._renderMenus()}</View>
        </ScrollView>
      </View>
    );
  }
}

// Custom item in menu
const MenuItem = ({ title, icon, onPress, selected }) => (
  <TouchableOpacity
    style={selected ? styles.menuItemSelected : styles.menuItem}
    onPress={onPress}
  >
    <View style={{ height: 30, width: 30, alignItems: "center" }}>
      <FontAwesome
        name={icon}
        size={26}
        c
        color={selected ? "#5FC5B0" : "gray"}
      />
    </View>
    <Text style={selected ? styles.menuTextSelected : styles.menuText}>
      {title}
    </Text>
  </TouchableOpacity>
);

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(Menu);
