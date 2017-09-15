import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  parentView: {
    flex: 1,
    flexDirection: "column",
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },

  childView: {
    backgroundColor: "white",
    flexDirection: "column",
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    borderRadius: 5,
    borderColor: 'gray',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowColor: 'gray',
  },

  mainText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "black",
  },

  extraText: {
    paddingTop: 5,
    fontSize: 14,
    color: "gray",
  },
})
