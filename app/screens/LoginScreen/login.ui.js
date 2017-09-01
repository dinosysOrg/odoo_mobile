import React, { Component } from "react";
import { StyleSheet, View, Text, Image, TextInput } from "react-native";
import strings from '../../strings';
import styles from './login.styles';
import Button from '../../components/Button';

export default class LoginComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            database: null,
            host: null,
            username: null,
            password: null
        };
    }

    render() {
        return (
        <View style={styles.loginContainer}>
            {this._renderLoginInputUI()}    
        </View>
        );
    }

    _loginClick() {
        this.props.navigation.dispatch({ type: 'Main' });
    }

    _renderLoginInputUI() {
        return (
            <View>
                <TextInput  autoCapitalize='none'
                            autoCorrect={false}
                            onChangeText={(text) => this.setState({database: text})}
                            style={styles.textInput} 
                            placeholder={strings.login_screen.database} />
                <TextInput  autoCapitalize='none'
                            autoCorrect={false}
                            onChangeText={(text) => this.setState({host: text})}
                            style={styles.textInput} 
                            placeholder={strings.login_screen.host} />            
                <TextInput  autoCapitalize='none'
                            autoCorrect={false}
                            onChangeText={(text) => this.setState({username: text})}
                            style={styles.textInput} 
                            placeholder={strings.login_screen.username} />
                <TextInput  autoCapitalize='none'
                            autoCorrect={false}
                            style={styles.textInput} 
                            secureTextEntry={true}
                            onChangeText={(text) => this.setState({password: text})}
                            placeholder={strings.login_screen.password} />

                <Button style={styles.buttonLogin}
                        onClick={this._loginClick.bind(this)} 
                        text={strings.login_screen.title.toUpperCase()} />
        
            </View>
        );
    }

}