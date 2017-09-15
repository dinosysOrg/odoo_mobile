import React, { Component } from "react";
import { StyleSheet, View, Text, Image, TextInput, AsyncStorage } from "react-native";
import strings from '../../strings';
import styles from './login.styles';
import Button from '../../components/Button';
import getOdoo from '../../api/odoo';
import MyDialog from '../../components/MyDialog'
import images from '../../images';

export default class LoginComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            db: 'odoo-dev',
            username: 'odoo.dev@dinosys.vn',
            password: 'dino.dev.204',
            url:'odoo-dev.dinosys.vn'
        };
        this.myDialog = null;
    }

    componentDidMount() {
        this._loadInfoFromStore()
    }

    render() {
        return (
        <View style={styles.loginContainer}>
            <Image resizeMode={"contain"} style={styles.logo} source={images.logo} />
            {this._renderLoginInputUI()}   
            <MyDialog  ref={(dialog) => { this.myDialog = dialog; }} />    
        </View>
        );
    }

    _saveInfoToStore = async (options) => await AsyncStorage.setItem('@MySuperStore:key', options)

    _loadInfoFromStore= async () => {
        try {
            const options = await AsyncStorage.getItem('@MySuperStore:key');
            if (options !== null){
                this._showDialogLoading()
                setTimeout(()=> {
                    this._doLogin(options);
                }, 1500)
            }
          } catch (error) {
                
          }
    }

    _showDialogLoading() {
        let title = strings.dialog.title_loading;
        let content = strings.dialog.content_loading;
        this.myDialog.show("loading", title, content);
    }

    _loginClick() {
        this._showDialogLoading()
        this._doLogin(this.state);
    }

    _doLogin(options) {
        let { odoo } = this.props.user;
        odoo.doLogin(this.state).then(res => {
            if (res) {
                this._saveInfoToStore(JSON.stringify(this.state))
            } else {
                throw "Login failure"
            }
        })
        .then(value => {
            this._openHomeScreen()
        })
        .catch( error => { 
            this._showLoginError() 
        });
    }

    _openHomeScreen = () => {
        this.props.navigation.dispatch({ type: 'Main' });
    }

    _showLoginError = () => {
        let title = strings.dialog.title_error;
        let content = strings.dialog.content_error;
        this.myDialog.show("error", title, content);
    }

    _renderLoginInputUI() {
        return (
            <View>
                <TextInput  autoCapitalize='none'
                            autoCorrect={false}
                            value={this.state.db}
                            onChangeText={(text) => this.setState({db: text})}
                            style={styles.textInput} 
                            placeholder={strings.login_screen.database} />
                <TextInput  autoCapitalize='none'
                            autoCorrect={false}
                            onChangeText={(text) => this.setState({url: text})}
                            style={styles.textInput} 
                            value={this.state.url}
                            placeholder={strings.login_screen.host} />            
                <TextInput  autoCapitalize='none'
                            autoCorrect={false}
                            onChangeText={(text) => this.setState({username: text})}
                            style={styles.textInput} 
                            value={this.state.username}
                            placeholder={strings.login_screen.username} />
                <TextInput  autoCapitalize='none'
                            autoCorrect={false}
                            style={styles.textInput} 
                            secureTextEntry={true}
                            value={this.state.password}
                            onChangeText={(text) => this.setState({password: text})}
                            placeholder={strings.login_screen.password} />

                <Button style={styles.buttonLogin}
                        onClick={this._loginClick.bind(this)} 
                        text={strings.login_screen.title.toUpperCase()} />
        
            </View>
        );
    }

}