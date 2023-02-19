import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    headerBar: {
        backgroundColor: 'white', 
        height: 64, 
        alignItems:'center',
        flexDirection: 'row', 
        padding: 15
    },
    profileImg: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginTop:2
    },
    artistName: {
        color: 'black',
        marginBottom: 5,
        fontSize:12
    },
    time: {
        fontSize: 10,
        color:'darkgrey',
        paddingBottom: 2,
        fontWeight: '400'
    },
    text: {
        paddingTop: 8, 
        paddingBottom: 10, 
        paddingHorizontal: 12, 
        lineHeight:21, 
        fontSize:14.8,
        borderRadius: 14, 
        maxWidth: 270,
    },
    date: {
        color: 'grey',
        textAlign: 'center',
        fontSize: 11,
        borderColor: 'lightgrey',
        borderTopWidth: 0.5,
        padding: 5,
        marginVertical: 10
    },
    container: {
        backgroundColor:'#FFFFFF', 
        flex:1, 
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    profile: {
        width: 50,
        height: 50,
        borderRadius: 25
    },
    profileContainer: {
        borderRadius: 28, 
        borderColor:'#e54132', 
        borderWidth:1.5, 
        padding:2
    },
    centeredContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    addButton: {
        width: 50,
    },
    buttonText: {
        fontSize: 36,
        textAlign: 'center',
        
    },
    modal: {
        width: 250,
        height: 200,
        padding: 15,
        backgroundColor: '#FFF',
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    okButton:{
        backgroundColor: '#e54132',
        color: '#FFF',
        textAlign: 'center',
        padding: 8,
        margin: 5,
        borderRadius: 5
    },
    cancelButton: {
        color: '#e54132',
        textAlign: 'center',
        borderColor: '#e54132',
        padding: 8,
        margin: 5,
        borderRadius: 5
    },
    modalTitle: {
        fontWeight:'bold', 
        color: 'gray', 
        fontSize: 15,
        margin: 10
    },
    fileSelectButton: {
        textAlign: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginBottom: 15,
        backgroundColor: 'gray',
        borderRadius: 5,
        color: '#FFF',
        fontWeight:'bold'
    },
    buttonContainer:{
        flex: 1,
        justifyContent: 'center'
    },
    textinput: {
        borderColor:'lightgray', 
        borderBottomWidth:1
    }
});

export default styles;
