/* App.js 
* Main functions of the weather app
*/

/* IMPORTS */
import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  Image,
  ImageBackground,
  StatusBar,
  TouchableOpacity
} from 'react-native';
/** Style imports */
import styles from "./style/general.js";
import top from "./style/top.js";
import description from "./style/description.js";
import wind from "./style/wind.js";
import temp from "./style/temp.js";
import current from "./style/current.js";
/** Icon imports */
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from '@expo/vector-icons';
import * as Location from "expo-location";

const clouds = require("./cloud.jpg");/* 
const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?';
const WEATHER_API_KEY = '0b626d564aefeb00bdbd2c294ee1df7'; */

function App() {

  const [errorMsg, setErrorMsg] = useState('');
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState({});
  const [logo, setLogo] = useState('');
  /*   const [unitsSystem, setUnitsSystem] = useState('metric')*/

  React.useEffect(() => {
    getWeatherDataByLocation();
  }, []);

  /** Call the devices coordinates and set in API */
  const getWeatherDataByLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    /* set location state */
    setLocation(location);
    const coords = location.coords;
    /* fetch api data */
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=0b626d564aefeb00bdbd2c294ee1df75&units=metric`
    );
    /* reads object JSON */
    const data = await response.json();
    /* store data in weather state */
    setWeather(data);
    getWeatherLogo();
  };

  // Getting weather logo
  async function getWeatherLogo() {
    const logo = Array.isArray(weather.weather) && weather.weather[0]
      ? weather.weather[0].icon : "-";
    setLogo(logo);
  }
    
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
                {weather.name ?? "-"}
              </Text>
            </View> 
          </View>
        </View>

        <View style={styles.weather}>

          {/* Left icons */}
          <View style={styles.topWeather}>
            {/* Current weather */}
            <View style={current.current}>
              <Text style={current.currentTitle}>Forecast</Text>
              
              <View style={current.weatherLogo}>
                {/* Weather icon */}
                <Image
                  style={styles.stretch}
                  source={{
                    uri:
                      "http://openweathermap.org/img/wn/" +
                      {logo} +
                      "@2x.png",
                  }} />  
              </View>
            </View>
            {/* Description of weather */}
            <View style={description.description}>
              <Text style={description.descTitle}>Description</Text>
              {/* Description text */}
              <Text style={description.textWeather}>
                {weather.weather?.description ?? "-"}
              </Text>
            </View>
          </View>
          
          {/* Right icons */}
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
                  {/* Minimum temperature */}
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
                  {/* Maximum temperature */}
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
                {/* Wind speed */}
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

