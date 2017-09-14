import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
   container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  orderInfoContainer: {
    flex: 1,
    height: 80,
    justifyContent: 'center',
    alignItems: 'flex-start'
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
  itemNameText: {
    fontWeight: 'bold'
  },
  itemInfoText: {
    flex: 1, 
    marginHorizontal: 10, 
    color: 'black',
    fontSize: 14,  
    textAlign: 'left',  
  },
});
