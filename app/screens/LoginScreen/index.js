import React, { Component } from "react";
import { View} from "react-native";
import LoginComponent from './login.ui';
import { connect } from 'react-redux';
import { loginSuccessfully } from '../../redux/login/login.action';

class LoginScreen extends Component {
    render() {
        return (<LoginComponent style={{ flex: 1 }} {...this.props} />);
    }
}

const mapStateToProps = state => ({
    user: state.user
});

const mapDispatchToProps = dispatch => ({
    loginSuccessfully: (json) => dispatch( loginSuccessfully(json))
});

export default connect( mapStateToProps, mapDispatchToProps )(LoginScreen);