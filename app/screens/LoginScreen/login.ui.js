import React, { Component } from "react";
import { StyleSheet, View, Text, Image, TextInput } from "react-native";
import strings from '../../strings';
import styles from './login.styles';
import Button from '../../components/Button';
import Odoo from 'react-native-odoo-client';
import MyDialog from '../../components/MyDialog'

//let odoo = new Odoo(options);
export default class LoginComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            db: 'odoo-dev',
            username: 'odoo.dev@dinosys.vn',
            password: 'dino.dev.204',
            url:'odoo-dev.dinosys.vn'
        };
        this.odoo = null;
        this.myDialog = null;
    }

    render() {
        return (
        <View style={styles.loginContainer}>
            {this._renderLoginInputUI()}   
            <MyDialog  ref={(dialog) => { this.myDialog = dialog; }} />    
        </View>
        );
    }

    _loginClick() {
        let title = strings.dialog.title_loading;
        let content = strings.dialog.content_loading;
        this.myDialog.show("loading", title, content);
        this.odoo = new Odoo(this.state);
        this.odoo.authenticate()
                    .then(res => {
                        if (res) {
                            this._openHomeScreen()
                        } else {
                            this._showLoginError();
                        }
                    })
                    .catch(error=> this._showLoginError());
       
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