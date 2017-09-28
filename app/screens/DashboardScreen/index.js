import React, { Component } from "react";
import { View} from "react-native";
import DashboardComponent from './dashboard.ui';
import { connect } from 'react-redux';

class DashboardScreen extends Component {
    render() {
        return (<DashboardComponent style={{ flex: 1 }} {...this.props} />);
    }
}

const mapStateToProps = state => ({
    user: state.user
});

const mapDispatchToProps = dispatch => ({
});

export default connect( mapStateToProps, mapDispatchToProps )(DashboardScreen);