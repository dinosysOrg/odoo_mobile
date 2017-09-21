import React, { Component } from "react";
import { StyleSheet, Dimensions } from "react-native";

let SideMenuWidth = Dimensions.get("window").width - 56
let heightTopView = (Dimensions.get("window").width - 56) / 3 * 2

export const styles = StyleSheet.create({
    sideMenu: {
        top: 0,
        right: 56,
        bottom: 0,
        left: 0,
        flexDirection: "column",
        backgroundColor: "white",
    },

    avatarView: {
      top: 0,
      right: 0,
      left: 0,
      flexDirection: "column",
      backgroundColor: "#e5e5ea",
      paddingTop: 10,
      paddingBottom: 20,
      marginBottom: 8,
      paddingHorizontal: 16,
    },

    avatar: {
      width: SideMenuWidth/3,
      height: SideMenuWidth/3,
      borderWidth: 2,
      borderColor: "yellow",
      borderRadius: SideMenuWidth/6,
      shadowColor: "yellow",
      shadowOffset: {width: 0, height: 0},
      shadowOpacity: 1,
      shadowRadius: 10,
      marginBottom: 20,
    },

    menuItem: {
        flexDirection: "row",
        flex: 1,
        alignItems: "center",
        height: 48,
        paddingHorizontal: 16,
    },

    menuItemSelected: {
        flexDirection: "row",
        flex: 1,
        alignItems: "center",
        height: 48,
        paddingHorizontal: 16,
    },

    menuText: {
        left: 20,
        color: "gray",
        fontWeight: "700",
    },

    menuTextSelected: {
        left: 20,
        color: "#5FC5B0",
        fontWeight: "700",
    },

    userName: {
      alignItems: "center",
      fontWeight: "700",
      color: "#5FC5B0",
    },
})
