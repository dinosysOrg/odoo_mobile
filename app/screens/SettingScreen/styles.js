import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({

  parentView: {
    justifyContent: 'center',
  },

  topView: {
    backgroundColor: 'white',
    paddingTop:20,
    paddingBottom: 20,
  },

  containerItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    backgroundColor: 'white',
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 5,
  },

  divider: {
    marginVertical: 5,
    marginHorizontal: 2,
    borderBottomWidth: 1,
    borderColor: '#ccc'
  },

  titleView: {
    paddingLeft: 5,
  },

  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },

  subtitleView: {
    flexDirection: 'column',
    paddingLeft: 5,
  },

  subtitleText: {
    marginTop: 10,
    fontSize: 14,
    color: 'gray',
  },

  avatar: {
    alignItems: 'center',
  },

  detailView: {
    marginTop: 20,
    marginLeft: 30,
  },

  switchButton: {
    width: 60,
    height: 44,
    borderRadius: 5,
    marginRight: 0,
  },

  logoutButton: {
    marginTop: 30,
    width: 100,
    height: 44,
    borderRadius: 5,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },

  titleButton: {
    color: 'white',
    fontWeight: 'bold',
  }

})
