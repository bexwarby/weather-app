/* L'icone correspondant aux conditions météo actuelles
Le descriptif
La température actuelle
La vistesse du vent */

import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  Image,
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
import * as Location from "expo-location";

const clouds = require("./cloud.jpg");
/* const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?';
const WEATHER_API_KEY = '0b626d564aefeb00bdbd2c294ee1df7'; */

function App() {

  const [weather, setWeather] = useState({});
  /*   const [unitsSystem, setUnitsSystem] = useState('metric')*/

  async function getWeatherDataByLocation() {
    /* Appel de la fonction getPosition pour récupérer la position */
    const location = await getPosition();
    /* Vérification de l'objet location */
    if (!location.coords) {
      Alert.alert(
        "Impossible to find your location",
        "Please activate on your phone."
      );
      return;
    }
    const coords = location.coords;
    
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=0b626d564aefeb00bdbd2c294ee1df75&units=metric`
    );
    /* reads object JSON */
    const data = await response.json();
    /* store data in weather const */
    setWeather(data);/* 
    console.log(data); */
  }

  async function getPosition() {
    let permission = await Location.getForegroundPermissionsAsync();
    if (permission.status == 'undetermined') {
      permission = await Location.requestForegroundPermissionsAsync();
    }
    if (permission.status == 'granted') {
      let location = await Location.getCurrentPositionAsync();
      return location;
    } else {
      return {};
    }
  }

  // Getting weather logo
  /* async function getWeatherLogo() {
    const logo = Array.isArray(weather.weather) && weather.weather[0]
      ? weather.weather[0].icon : "-";
    setLogo(logo);
    /* Where should I add:
     * onChange={getWeatherLogo} 

  };  
};*/

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ImageBackground source={clouds} style={styles.background}>

        <View style={top.topBlock}>
          {/* Heading */}
          <Text style={top.heading}>My Weather</Text>
          {/* Location */}
          <View style={top.location}>
            <View style={top.currentLocation}>
              <TouchableOpacity
                style={top.buttonTwo}
                onPress={getWeatherDataByLocation}
              >
                <Text style={top.textLocation}>
                  Use my current location
                </Text>
              </TouchableOpacity>
            </View>
            <View style={top.currentLocation}>
              <Text style={top.textLocation}>
                {weather.weather?.name ?? "-"}
              </Text>
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
                {/* <Image
                  style={styles.stretch}
                  source={{
                    uri:
                      'http://openweathermap.org/img/wn/' +
                      icon +
                      '@2x.png',
                  }} />  */}
              </View>
            </View>
            {/* Description of weather */}
            <View style={description.description}>
              <Text style={description.descTitle}>Description</Text>
              <Text style={description.textWeather}>
                {weather.weather?.description ?? "-"}
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

