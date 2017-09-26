import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Platform,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
  ScrollView,
  ActivityIndicator
} from "react-native";
import strings from "../../strings";
import PopupDialog from "react-native-popup-dialog";
import Icon from "react-native-vector-icons/FontAwesome";
import Button from "../../components/Button";
import images from "../../images";
export default class SwitchAccountDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: [],
      addAccount: false,
      db: "odoo-dev",
      username: "truong.nguyen@dinosys.vn",
      password: "123456",
      url: "https://odoo-dev.dinosys.vn",
      animating: true
    };
  }

  componentDidMount() {
    console.log("updated", this.props);
  }

  render() {
    return (
      <PopupDialog
        dialogStyle={styles.dialogContainer}
        ref={popupDialog => {
          this.popupDialog = popupDialog;
        }}
      >
        {this.state.animating ? (
          <ActivityIndicator
            animating={this.state.animating}
            color="#bc2b78"
            size="large"
            style={styles.activityIndicator}
          />
        ) : (
          <ScrollView>
            {this.state.addAccount ? (
              <View>
                <Text style={styles.title}>THÊM TÀI KHOẢN</Text>
                {this._renderAddAccountUI()}
              </View>
            ) : (
              <View>
                <Text style={styles.title}>CHỌN TÀI KHOẢN</Text>
                <FlatList
                  data={this.state.userList}
                  keyExtractor={this._keyExtractor}
                  renderItem={this._renderItem}
                  ListFooterComponent={this._renderFooter}
                />
              </View>
            )}
          </ScrollView>
        )}
      </PopupDialog>
    );
  }

  _renderFooter = () => (
    <TouchableOpacity
      style={styles.footer}
      onPress={() => {
        this.setState({
          addAccount: true
        });
      }}
    >
      <Image
        style={{ width: 50, height: 50, borderRadius: 50 }}
        source={images.placeholder}
      />
      <Text style={{ marginLeft: 5, flex: 1 }}>Thêm tài khoản</Text>
    </TouchableOpacity>
  );

  _keyExtractor = (item, index) => index;

  _renderItem = ({ item: { profile } }) => (
    <View style={styles.accountItem}>
      <Image
        style={{ width: 50, height: 50, borderRadius: 50 }}
        source={{
          uri: `data:image/jpeg;base64,${profile[0].image}`
        }}
      />
      <Text style={{ marginLeft: 5, flex: 1 }}>{profile[0].display_name}</Text>
    </View>
  );

  _renderAddAccountUI() {
    return (
      <View>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={text => this.setState({ url: text })}
          style={styles.textInput}
          value={this.state.url}
          placeholder={strings.login_screen.host}
        />
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          value={this.state.db}
          onChangeText={text => this.setState({ db: text })}
          style={styles.textInput}
          placeholder={strings.login_screen.database}
        />
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={text => this.setState({ username: text })}
          style={styles.textInput}
          value={this.state.username}
          placeholder={strings.login_screen.username}
        />
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.textInput}
          secureTextEntry={true}
          value={this.state.password}
          onChangeText={text => this.setState({ password: text })}
          placeholder={strings.login_screen.password}
        />
        <View
          style={{
            flexDirection: "row"
          }}
        >
          <View style={{ flex: 1 }} />
          <Button
            style={styles.buttonCancel}
            onClick={() => {
              this.setState({ addAccount: false });
            }}
            text={strings.dialog.cancel}
          />
          <View style={{ flex: 1 }} />
          <Button
            style={styles.buttonLogin}
            onClick={() => {}}
            text={strings.login_screen.title.toUpperCase()}
          />
          <View style={{ flex: 1 }} />
        </View>
      </View>
    );
  }

  show({ userList }) {
    try {
      this.setState({ userList });
      this.popupDialog.show();
    } catch (error) {}
  }
}

const styles = StyleSheet.create({
  dialogContainer: {
    marginTop: 50,
    marginBottom: 100,
    padding: 15,
    backgroundColor: "white"
  },
  title: {
    fontSize: 17,
    fontWeight: "bold",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    marginBottom: 15
  },
  buttonSwitchActive: {
    backgroundColor: "#54bda7",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    alignSelf: "center",
    margin: 0,
    padding: 0
  },
  textSwitchStyle: {
    margin: 0,
    padding: 5
  },
  accountItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10
  },
  textInput: {
    padding: 10,
    borderColor: "#c4c4c4",
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 5,
    marginLeft: 10,
    marginRight: 10,
    height: 50,
    width: window.width / 6 * 5
  },
  buttonLogin: {
    backgroundColor: "#54bda7",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    width: 150,
    alignSelf: "center",
    marginTop: 20
  },
  buttonCancel: {
    backgroundColor: "gray",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    width: 150,
    alignSelf: "center",
    marginTop: 20
  },
  footer: { flexDirection: "row", alignItems: "center" }
});
