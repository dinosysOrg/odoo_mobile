import { StyleSheet, Dimensions } from 'react-native';
const window = Dimensions.get('window');

export const IMAGE_WIDTH = window.width/2;
export const IMAGE_WIDTH_SMALL = window.width/3;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    loginContainer: {
        flex: 1,
        padding: 10,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textInput: {
        padding: 10,
        borderColor: '#c4c4c4',
        borderWidth: 1,
        marginBottom: 10,
        borderRadius: 5,
        marginLeft: 10,
        marginRight: 10,
        height: 50,
        width: window.width/6*5,
    },
    buttonLogin: {
        backgroundColor: '#54bda7',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        width: 150,
        alignSelf: 'center',
        marginTop: 20
    },
    logo: {
      width: IMAGE_WIDTH,
      alignSelf: 'center',
    }
})
