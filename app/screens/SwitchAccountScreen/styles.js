import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  dialogContainer: {
    backgroundColor: "white",
    flex: 1,
  },
  addContainer: {
    padding: 15
  },
  chooseContainer: {
    padding: 15
  },
  title: {
    fontSize: 17,
    fontWeight: "bold",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    marginBottom: 15
  },
  buttonSwitchActive: {
    backgroundColor: "#54bda7",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    alignSelf: "center",
    margin: 0,
    padding: 0
  },
  textSwitchStyle: {
    margin: 0,
    padding: 5
  },
  addAccountText: { marginLeft: 5, flex: 1 },
  avatar: { width: 50, height: 50, borderRadius: 50 },
  accountItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10
  },
  textInput: {
    padding: 10,
    borderColor: "#c4c4c4",
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 5,
    marginLeft: 10,
    marginRight: 10,
    height: 50,
    width: window.width / 6 * 5
  },
  buttonLogin: {
    backgroundColor: "#54bda7",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    width: 150,
    alignSelf: "center",
    marginTop: 20
  },
  buttonCancel: {
    backgroundColor: "gray",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    width: 150,
    alignSelf: "center",
    marginTop: 20
  },
  footer: { flexDirection: "row", alignItems: "center" }
});
export default styles;
