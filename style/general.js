import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    // Main container
    container: {
        flex: 1,
        flexDirection: "column",
        margin: 20,
    },
    background: {
        flex: 1,
        resizeMode: "cover"
    },

    // Weather display
    weather: {
        flex: 3,
        flexDirection:'row',
        flexWrap: 'wrap', 
        margin: 10,
        marginTop: 30
    },
    
    /* Top line of weather display */
    topWeather: {
        flex: 1
    },
     /* Bottom line of weather display */
     bottomWeather: {
        flex: 1
    },
});

export default styles;