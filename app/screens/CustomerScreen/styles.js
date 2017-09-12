import React, { Component } from 'react';
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  titleView: {
    paddingLeft: 5,
  },
  titleText: {
    fontSize: 16,
    color: 'black',
  },
  subtitleView: {
    flexDirection: 'column',
    paddingLeft: 5,
  },
  subtitleText: {
    fontSize: 14,
    color: 'gray',
  },
  container: {
    borderTopWidth: 0, 
    borderBottomWidth: 0, 
    marginTop: 0
  },
  footer: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: "#CED0CE"
  },
  divider: {
    height: 1,
    width: "86%",
    backgroundColor: "#CED0CE",
    marginLeft: "14%" 
  }
})
