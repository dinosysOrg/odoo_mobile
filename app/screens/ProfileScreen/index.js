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
import { List, ListItem, SearchBar, Avatar } from "react-native-elements";
import getOdoo from "../../api/odoo";
import { styles } from "./styles";
import { FontAwesome } from "@expo/vector-icons";

class ProfileScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Profiles"
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
    let users = this.state.profileList;
    return (
      <FlatList
        data={users}
        keyExtractor={item => item.auth.username}
        renderItem={this._renderItem}
      />
    );
  }

  _renderItem = ({ item, index }) => {
    console.log("item", item);
    return (
      <View key={Math.random()} style={styles.containerItem}>
        <View style={{ flex: 2 }}>
          <Avatar
            large
            rounded
            source={{ uri: `data:image/jpeg;base64, ${item.profile[0].image}` }}
          />
        </View>
        <View style={{ flex: 6 }}>
          <Text> {item.profile[0].name} </Text>
          <Text> {item.profile[0].phone} </Text>
          <Text> {item.profile[0].email} </Text>
        </View>
        <View
          style={{ flex: 2, justifyContent: "center", alignItems: "center" }}
        >
          <Switch onTintColor="green" value={true} />
        </View>
      </View>
    );
  };
}

const SwitchButton = props => {
  return (
    <TouchableOpacity
      style={styles.switchButton}
      onPress={() => {
        console.log("press on switch button");
      }}
    >
      <FontAwesome
        style={styles.menuIcon}
        name="toggle-on"
        size={32}
        color="green"
      />
    </TouchableOpacity>
  );
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(ProfileScreen);
