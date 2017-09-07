import React, { Component } from "react";
import { StyleSheet, View, Platform, Text, Image, TouchableOpacity } from "react-native";

export default class Button extends Component {

    render() {
        return (<TouchableOpacity style={[styles.container, this.props.style]} onPress={() => this.props.onClick()}>
                    <Text style={[styles.textStyle, this.props.textStyle]}>{this.props.text}</Text>
            </TouchableOpacity>);
    }
}

const styles = {
    textStyle: { margin: 5, padding: 10,  textAlign: 'center', color: 'white'},
    container: { backgroundColor: 'white' }
}

Button.propTypes = {
  textStyle: React.PropTypes.any,
  onClick: React.PropTypes.func.isRequired,
  text: React.PropTypes.string.isRequired
};

Button.defaultProps = {
    textStyle: {},
};