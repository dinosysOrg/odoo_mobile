import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Switch
} from "react-native";
import { connect } from "react-redux";
import { loadUser } from "../../redux/user/user.action";
import {
  List,
  ListItem,
  SearchBar,
  Avatar,
  Button
} from "react-native-elements";
import getOdoo from "../../api/odoo";
import strings from "../../strings";
import { styles } from "./styles";
import { FontAwesome } from "@expo/vector-icons";

class SettingScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: strings.slide_menu.setting
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      profileList: []
    };
  }

  componentDidMount() {
    const { session } = this.props.user.odoo;
    let users = session.loadList().then(userList => {
      this.setState({ profileList: userList });
    });
  }

  render() {
    let activeUser = this.props.user.odoo.userInfo.profile[0];
    return (
      <View style={styles.parentView}>
        <View style={styles.topView}>
          <View style={styles.avatar}>
            <Avatar
              xlarge
              rounded
              source={{ uri: `data:image/jpeg;base64, ${activeUser.image}` }}
            />
          </View>
          <View style={styles.detailView}>
            <Text style={styles.titleText}>Name: {activeUser.name}</Text>
            <Text style={styles.subtitleText}>
              Company: {activeUser.company_id[1]}
            </Text>
            <Text style={styles.subtitleText}>Email: {activeUser.email}</Text>
            <Text style={styles.subtitleText}>City: {activeUser.tz}</Text>
            <Text style={styles.subtitleText}>Phone: {activeUser.phone}</Text>
          </View>
        </View>

        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => this._doLogout()}
          >
            <Text style={styles.titleButton}> LOGOUT </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

// Logout and remove session and list user
  _doLogout() {
    let { session } = this.props.user.odoo;
    let activeUser = this.props.user.odoo.userInfo;
    session
      .removeUser(activeUser)
      .then(value => {
        this.props.navigation.dispatch({ type: "Logout" });
      })
      .catch(error => {
        console.error("error", error)
      });
  }

}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(SettingScreen);
