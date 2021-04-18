/* L'icone correspondant aux conditions météo actuelles
Le descriptif
La température actuelle
La vistesse du vent */

import React, { useState } from 'react';
import { 
  Text, 
  View, 
  TextInput, 
  ImageBackground, 
  StatusBar,
  TouchableOpacity
} from 'react-native';
import styles from "./style/general.js";
import top from "./style/top.js";
import description from "./style/description.js";
import wind from "./style/wind.js";
import temp from "./style/temp.js";
import current from "./style/current.js";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from '@expo/vector-icons';

const clouds = require("./cloud.jpg");

function App() {
   
  const [weather, setWeather] = useState({});
  const [city, setCity] = useState("");
  const [logo, setLogo] = useState({});
/*   const [country, setCountry] = useState("");
 */
  
  async function getPosition() {
    /**Allow use of geolocatisation when app in use */
    let permission = await Location.getForegroundPermissionsAsync();
    // If user doesn't choose immediately
    if (permission.status == 'undetermined') {
      // ask for permission
      permission = await Location.requestForegroundPermissionsAsync();
    } 
    // if position authorised
    if (permission.status == 'granted') {
      // get position
      let city = await Location.getCurrentPositionAsync();
      // stock geolocalisation in the state
      setLocationData(city);
    };

    // Getting weather data
    async function getWeatherData () {
      
    }; 

    // Getting weather logo
    async function getWeatherLogo () {
      const waitLogo = await fetch (
        "http://openweathermap.org/img/wn/"
        + weather.weather[0].icon
        + "@2x.png" 
      );
      const logo = await waitLogo.json();
      setLogo(logo);
      /* Where should I add:
       * onChange={getWeatherLogo} */
      
    };  
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark"/>
      <ImageBackground source={clouds} style={styles.background}>
        
        <View style={top.topBlock}>
          {/* Heading */}
          <Text style={top.heading}>My Weather</Text>
          {/* Location */}
          <View style={top.location}>
         {/*    <TextInput
              style={top.locationInput}
              onChangeText={setCity}
              value={city}
              placeholder="Type your city or country here"
            />
            <TouchableOpacity
              style={top.buttonOne}
              title="Submit"
              color="#7788AA"
              onPress={getWeatherData}
            />  */}
            <View style="currentLocation">
              <TouchableOpacity
                style={top.buttonTwo}
                onPress={getPosition}
              >
              <Text style={top.textLocation}>Use my current location</Text> 
              </TouchableOpacity>              
           </View>
          </View>
        </View>

        <View style={styles.weather}>
          {/* Top icons */}
          <View style={styles.topWeather}>
            {/* Current weather */}
            <View style={current.current}>
              <Text style={current.currentTitle}>Forecast</Text>
              {/* Weather icon */}
              <View style={current.weatherLogo}>
                <Text >
                  
                  {Array.isArray(weather.weather) && weather.weather[0] 
                  ? weather.weather[0].icon : "-"}
                </Text>
              </View>
            </View>  
            {/* Description of weather */}
            <View style={description.description}>
              <Text style={description.descTitle}>Description</Text>
              <Text style={description.textWeather}>
                {Array.isArray(weather.weather) && weather.weather[0] 
                ? weather.weather[0].description
                : "-"}
                {/* simpler way of writing it
                IF weather.main exists, then render .temp,
                ELSE render -
                {weather.main?.temp ?? "-"} */}
              </Text>
            </View>  
          </View>
          {/* Bottom icons */}
          <View style={styles.bottomWeather}>
            {/* Temperature */}
            <View style={temp.temperature}>
              <Text style={temp.tempTitle}>Temperature</Text>
              <View style={temp.overallTemp}>
                <View style={temp.topTemp}>
                  <Ionicons 
                    name='thermometer-outline'
                    size={50}
                    color='blue'
                  />
                  <Text style={temp.tempValue}>
                    {weather.main?.temp_min ?? "-"}
                  </Text>
                </View>
                <View style={temp.bottomTemp}>
                  <Ionicons 
                    name='thermometer-outline'
                    size={50}
                    color='red'
                  />
                  <Text style={temp.tempValue}>
                    {weather.main?.temp_max ?? "-"}
                  </Text>
                </View>
              </View>
            </View>
            {/* Wind speed */}  
            <View style={wind.wind}>
              <Text style={wind.windTitle}>Wind speed</Text>
              
              <View style={wind.windIcon}>
                <FontAwesome5 name="wind" size={35} color="blue" />
                <Text>
                  {weather.wind?.speed ?? "-"} km/h
                </Text>
              </View>
            </View>  
          </View>
        </View>

      </ImageBackground>
    </View>
  );
}

export default App;

