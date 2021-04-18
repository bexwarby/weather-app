import { StyleSheet } from 'react-native';

const top = StyleSheet.create({
/* Top Block */
    topBlock: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center', 
    },
    // Header
    heading: { 
        flex: 1, 
        fontSize: 35,
        marginTop: 10,
        color: '#0F073B',
    },
    // Location
    location: {
        flex: 2,
        marginTop: 10,
        backgroundColor: '#7788AA',
    },
    locationInput: {
        flex: 1,
        backgroundColor: '#FFFFAA'
    },
    currentLocation: {
        color:"#2D4471" 
    },
    buttonOne: {
        flex: 1
    }, 
    buttonTwo: {
        flex: 1
    },
    textLocation: {
        color: 'white',
        fontWeight: '600',
        fontSize: 18,
        width: '100%',
        padding: 15,
        textAlign: 'center'
    },
});
export default top;