import React, { Component } from "react";
import { StyleSheet, View, Platform, Text, Image, TouchableOpacity } from "react-native";
import strings from '../../strings';
import Button from '../Button';
import PopupDialog from 'react-native-popup-dialog';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class MyDialog extends Component {

    constructor(props) {
        super(props);
        const { contentText, dialogTitle, typeDialog } = this.props;
        this.state = {
            title: dialogTitle,
            content: contentText,
            typeDialog: typeDialog
        }
    }

    _onOkClick() {
        this.popupDialog.dismiss();
    }

    show(type, title, content) {
        this._updateNewUI(type, title, content)
        this.popupDialog.show()
    }

    _updateNewUI(typeDialog, title, content) {
        let colorIcon = null;
        switch (typeDialog) {
            case "error":
            colorIcon = this.props.errorColor;
            break;
            case "loading":
            colorIcon = this.props.loadingColor;
            break;
            case "success":
            colorIcon = this.props.successColor;
            break;
        }
        this.setState({
            typeDialog,
            title, 
            content, 
            colorIcon
        });
    }

    _renderButton(){
        const { colorIcon, iconType, typeDialog } = this.state;
        if (typeDialog === "loading") {
            return null;
        }
        return (<Button style={[styles.buttonErrorActive]} 
            onClick={this._onOkClick.bind(this)} 
            customTextStyle={styles.buttonTextColor}
            text={strings.dialog.btn_close_text} 
            />)
    }

    render() {
        return (
            <PopupDialog
                        dialogStyle={styles.dialogContainer}
                        ref={(popupDialog) => { this.popupDialog = popupDialog; }}>
                        <View>
                            <View style={styles.contentDialog}>
                                <View>
                                    <Text style={styles.title}>
                                        {this.state.title}
                                    </Text>
                                    <Text style={styles.content}>
                                        {this.state.content}
                                    </Text>
                                    {this._renderButton()}
                                </View>
                            </View>    
                        </View>
            </PopupDialog>
        );

    }
}

MyDialog.propTypes = {
    typeDialog: React.PropTypes.string,
    dialogTitle: React.PropTypes.string,
    activeButtonText:  React.PropTypes.string,
    contentText: React.PropTypes.string,
    errorColor:  React.PropTypes.string,
    loadingColor: React.PropTypes.string,
    successColor: React.PropTypes.string
};

MyDialog.defaultProps = {
    typeDialog: 'success',
    dialogTitle: "title",
    contentText: "content",
    activeButtonText: strings.dialog.btn_close_text,
    errorColor:  '#dd4b39',
    loadingColor: '#ae7c40',
    successColor: '#2db475'
};

const styles = {
    dialogContainer: {
        backgroundColor: 'transparent'
    },
    buttonErrorActive: {
        backgroundColor: '#dd4b39',
        borderRadius: 5,
    },
    buttonTextColor: {
        color: 'white'
    },
    title: {
        fontWeight: '700',
        textAlign: 'center',
        marginTop: 15
    },
    content: {
        textAlign: 'center',
        marginTop: 0,
        marginBottom: 15
    },
    contentDialog: {
        padding: 0,
        marginLeft: 10,
        marginRight: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: 'white',
        zIndex: -1,
        borderRadius: 5,
    },
    topContent: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    circle: {
        width: 70,
        height: 70,
        borderRadius: 70/2,
        backgroundColor: '#dd4b39',
        borderWidth: 5,
        borderColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: -30,
        zIndex: 1,
    }
}