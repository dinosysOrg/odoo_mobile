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
import styles from "./styles";
import { connect } from "react-redux";
import MyDialog from "../../components/MyDialog";
/**
 * The switch account screen.
 * Show list account already login
 * Add more account 
 */
class SwitchAccountScreen extends Component {
  constructor(props) {
    super(props);
    // the db, url , username, password  holded for testing.
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
    this._loadUserList();
  }

  /**
   * Load user list 
   */
  _loadUserList() {
    try {
      let { user: { odoo: { session: { loadList } } } } = this.props;
      loadList().then(list => {
        this.setState({ userList: list, animating: false });
      });
    } catch (error) {}
  }

  componentDidUpdate() {}

  render() {
    return (
      <View style={styles.dialogContainer}>
        {this.state.animating ? (
          <ActivityIndicator
            animating={this.state.animating}
            color="#00bfa5"
            size="large"
            style={styles.activityIndicator}
          />
        ) : (
          <ScrollView>
            {this.state.addAccount ? (
              <View style={styles.addContainer}>
                <Text style={styles.title}>
                  {strings.dialog.add.toUpperCase()}
                </Text>
                {this._renderAddAccountUI()}
              </View>
            ) : (
              <View style={styles.chooseContainer}>
                <Text style={styles.title}>
                  {strings.dialog.list_account.toUpperCase()}
                </Text>
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
        <MyDialog
          ref={dialog => {
            this.myDialog = dialog;
          }}
        />
      </View>
    );
  }

  /**
   * The list user footer 
   */
  _renderFooter = () => (
    <TouchableOpacity
      style={styles.footer}
      onPress={() => {
        this.setState({
          addAccount: true
        });
      }}
    >
      <Image style={styles.avatar} source={images.placeholder} />
      <Text style={styles.addAccountText}>{strings.dialog.add_button}</Text>
    </TouchableOpacity>
  );

  _keyExtractor = (item, index) => index;

  /**
   * The user item 
   */
  _renderItem = ({ item: { profile, auth } }) => (
    <TouchableOpacity
      style={styles.accountItem}
      onPress={() => {
        this._doLogin(auth);
      }}
    >
      <Image
        style={styles.avatar}
        source={{
          uri: `data:image/jpeg;base64,${profile[0].image}`
        }}
      />
      <Text style={{ marginLeft: 5, flex: 1 }}>{profile[0].display_name}</Text>
    </TouchableOpacity>
  );

  /**
   * Add more account ui
   */
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
            onClick={() => {
              this._doLogin(this.state);
            }}
            text={strings.dialog.add.toUpperCase()}
          />
          <View style={{ flex: 1 }} />
        </View>
      </View>
    );
  }

  /**
   * Do login
   * @param {string} url The url of odoo server
   * @param {string} db The database of odoo server
   * @param {string} username The user name of user
   * @param {string} password The password of user
   */
  _doLogin = async ({ db, username, password, url }) => {
    let { user: { odoo } } = this.props;
    let user = await odoo.session.getUserActive();
    if (user.auth.username === username) {
        let title = strings.dialog.title_error;
        let content = strings.dialog.current_acc_login;
        this._showLoginError({title, content});
        return;
    }
    this._showDialogLoading();
    odoo.doLogin({ db, username, password, url })
      .then(value => {
        if (value) {
          this._openHomeScreen();
        } else {
          throw "Save info with failure";
        }
      })
      .catch(error => {
        let title = strings.dialog.title_error;
        let content = strings.dialog.content_error;
        this._showLoginError({title, content});
      });
  };

  /**
   * Open home screen if user login successfully
   */
  _openHomeScreen = () => {
    this.props.navigation.dispatch({ type: "Main" });
  };

  /**
   * Show error dialog when user login with failure
   */
  _showLoginError = ({title, content}) => {
    this.myDialog.show("error", title, content);
  };


  /**
   * Show dialog loading
   */
  _showDialogLoading() {
    let title = strings.dialog.title_loading;
    let content = strings.dialog.content_loading;
    this.myDialog.show("loading", title, content);
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(SwitchAccountScreen);
