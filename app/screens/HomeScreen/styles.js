import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
   container: {
    borderTopWidth: 0, 
    borderBottomWidth: 0, 
    marginTop: 0
  },
  itemContainer : {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 100,
    marginHorizontal: 10,
    marginTop: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderColor: 'gray',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowColor: 'gray',
    elevation: 2
  },
  itemInfoText: {
    flex: 1, 
    marginHorizontal: 10, 
    color: 'black',
    fontSize: 14,  
    textAlign: 'left',  
  },
  footer: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: "#CED0CE"
  },
});
