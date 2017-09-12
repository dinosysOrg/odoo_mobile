import React, { Component } from 'react';
import { StyleSheet, Dimensions } from 'react-native';

let SideMenuWidth = Dimensions.get('window').width * 3/4

export const styles = StyleSheet.create({
    sideMenu: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        width: SideMenuWidth,
        flexDirection: 'column',
        backgroundColor: 'white',
    },

    avatarView: {
      top: 0,
      right: 0,
      left: 0,
      width: SideMenuWidth,
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: 'white',
      paddingTop: 10,
    },

    avatar: {
      width: SideMenuWidth/2,
      height: SideMenuWidth/2,
      borderWidth: 2,
      borderColor: 'yellow',
      borderRadius: SideMenuWidth/4,
      shadowColor: 'yellow',
      shadowOffset: {width: 0, height: 0},
      shadowOpacity: 1,
      shadowRadius: 10,
    },

    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        paddingHorizontal: 50,
        paddingVertical: 10,
    },

    menuItemSelected: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        paddingHorizontal: 50,
        paddingVertical: 10,
    },

    menuText: {
        left: 20,
        color: 'gray',
        fontWeight: '700',
    },

    menuTextSelected: {
        left: 20,
        color: '#5FC5B0',
        fontWeight: '700',
    },

    userName: {
      marginTop: 10,
      fontWeight: '700',
      color: '#5FC5B0',
    },
})
