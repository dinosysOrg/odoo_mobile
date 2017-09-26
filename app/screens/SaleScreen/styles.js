import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  orderInfoContainer: {
    flex: 1,
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 10
  },
  itemContainer: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    height: 100,
    marginTop: 10,
    marginHorizontal: 10,
    borderRadius: 5,
    borderColor: "gray",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowColor: "gray",
    elevation: 2
  },
  itemNameText: {
    fontWeight: "bold"
  },
  itemInfoText: {
    color: "black",
    fontSize: 14,
    textAlign: "left"
  },
  datePickerContainer: {
    flexDirection: "row",
    height: 60,
    backgroundColor: "white"
  },
  datePicker: {
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 10
  }
});
