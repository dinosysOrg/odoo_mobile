import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  AsyncStorage
} from "react-native";
import strings from "../../strings";
import styles from "./login.styles";
import Button from "../../components/Button";
import getOdoo from "../../api/odoo";
import MyDialog from "../../components/MyDialog";
import images from "../../images";
/**
 * The login ui 
 */
export default class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      db: "odoo-dev",
      username: "odoo.dev@dinosys.vn",
      password: "dino.dev.204",
      url: "https://odoo-dev.dinosys.vn"
    };
    this.myDialog = null;
  }

  componentDidMount() {
    // Checking login from store 
    this._loadInfoFromStore()
  }

  render() {
    return (
      <View style={styles.loginContainer}>
        <Image
          resizeMode={"contain"}
          style={styles.logo}
          source={images.logo}
        />
        {this._renderLoginInputUI()}
        <MyDialog
          ref={dialog => {
            this.myDialog = dialog;
          }}
        />
      </View>
    );
  }

  /**
   * Automatically open home screen if user already login.
   */
  _loadInfoFromStore = async () => {
    let { odoo } = this.props.user;
    odoo.doLoginFormSession()
      .then(value => {
        if (value) {
            this._openHomeScreen();
        }
      })
      .catch(error => {
        console.log("error", error);
      });
  };

  /**
   * Show dialog loading 
   */
  _showDialogLoading() {
    let title = strings.dialog.title_loading;
    let content = strings.dialog.content_loading;
    this.myDialog.show("loading", title, content);
  }

  /**
   * Login button click
   */
  _loginClick() {
    this._showDialogLoading();
    this._doLogin(this.state);
  }

  /**
   * Do login 
   * @param {object} options The authentication info for odoo
   * @param {string} options.url The url of odoo server  
   * @param {string} options.db The database of odoo server
   * @param {string} options.username The user name of user
   * @param {string} options.password The password of user
   */
  _doLogin(options) {
    let { odoo } = this.props.user;
    odoo.doLogin(options)
      .then(value => {
        if (value) {
          this._openHomeScreen();
        } else {
          throw "Save info with failure";
        }
      })
      .catch(error => {
        this._showLoginError();
      });
  }

  /**
   * Open home screen if user login successfully
   */
  _openHomeScreen = () => {
    this.props.navigation.dispatch({ type: "Main" });
  };

  /**
   * Show error dialog when user login with failure
   */
  _showLoginError = () => {
    let title = strings.dialog.title_error;
    let content = strings.dialog.content_error;
    this.myDialog.show("error", title, content);
  };

  /**
   * The UI for Login 
   */
  _renderLoginInputUI() {
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

        <Button
          style={styles.buttonLogin}
          onClick={this._loginClick.bind(this)}
          text={strings.login_screen.title.toUpperCase()}
        />
      </View>
    );
  }
}
