import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({

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

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },

  switchButton: {
    width: 60,
    height: 44,
    borderRadius: 5,
    marginRight: 0,
  }

})
