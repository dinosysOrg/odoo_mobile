import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  titleView: {
    paddingLeft: 5,
  },
  titleText: {
    fontWeight: "bold",
    color: "black",
  },
  subtitleView: {
    flexDirection: "column",
    paddingLeft: 5,
  },
  subtitleText: {
    fontSize: 14,
    color: "gray",
  },
  container: {
    borderTopWidth: 0,
    borderBottomWidth: 0,
    marginTop: 0,
    backgroundColor: "#e5e5ea",
  },
  footer: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: "#CED0CE",
  },
  sortButton: {
  marginRight: 5,
  },
  topbar: {
    flexDirection: "row",
    backgroundColor: "dimgray",
    paddingTop : 15,
  },
  menu: {
    backgroundColor: "blue",
    width: 100,
    flexDirection: "column",
    alignSelf: "flex-end",
  },
  options: {
    width: 100,
    backgroundColor: "red",
  },
  trigger: {
    padding: 5,
    width: 100,
    backgroundColor: "red",
  },
  triggerText: {
    color: "white",
    textAlign: "right",
    backgroundColor: "green",
  },
  disabled: {
    color: "#ccc",
  },
  divider: {
    marginVertical: 5,
    marginHorizontal: 2,
    borderBottomWidth: 1,
    borderColor: "white"
  },
  logView: {
    flex: 1,
    flexDirection: "column",
  },
  logItem: {
    flexDirection: "row",
    padding: 8,
  },
  listItem: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    height: 100,
    marginHorizontal: 10,
    marginTop: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderColor: "gray",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowColor: "gray",
    elevation: 2
  },
  infoItem: {
    flex: 1,
    flexDirection: "row",
    height: 80,
    justifyContent: "flex-start",
    alignItems: "flex-start"
  }
})

export const optionsStyles = {
  optionsContainer: {
    backgroundColor: "white",
    padding: 5,
  },
  optionsWrapper: {
    backgroundColor: "white",
  },
  optionWrapper: {
    backgroundColor: "white",
    margin: 5,
  },
  optionTouchable: {
    underlayColor: "green",
    activeOpacity: 70,
  },
  optionText: {
    color: "black",
  },
};
