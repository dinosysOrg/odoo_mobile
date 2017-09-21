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
  sortButton: {
  marginRight: 5,
  },
  topbar: {
    flexDirection: 'row',
    backgroundColor: 'dimgray',
    paddingTop : 15,
  },
  menu: {
    backgroundColor: 'blue',
    width: 100,
    flexDirection: 'column',
    alignSelf: 'flex-end',
  },
  options: {
    width: 100,
    backgroundColor: "red",
  },
  trigger: {
    padding: 5,
    width: 100,
    backgroundColor: 'red',
  },
  triggerText: {
    color: 'white',
    textAlign: 'right',
    backgroundColor: 'green',
  },
  disabled: {
    color: '#ccc',
  },
  divider: {
    marginVertical: 5,
    marginHorizontal: 2,
    borderBottomWidth: 1,
    borderColor: '#ccc'
  },
  logView: {
    flex: 1,
    flexDirection: 'column',
  },
  logItem: {
    flexDirection: 'row',
    padding: 8,
  },
})

export const optionsStyles = {
  optionsContainer: {
    backgroundColor: 'white',
    padding: 5,
  },
  optionsWrapper: {
    backgroundColor: 'white',
  },
  optionWrapper: {
    backgroundColor: 'white',
    margin: 5,
  },
  optionTouchable: {
    underlayColor: 'gray',
    activeOpacity: 70,
  },
  optionText: {
    color: 'black',
  },
};
