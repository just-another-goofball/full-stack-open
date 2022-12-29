import { useEffect, useState } from 'react';
import axios from 'axios';

const OPEN_WEATHER_API_BASE_URL = 'https://api.openweathermap.org';
const OPEN_WEATHER_BASE_URL = 'https://openweathermap.org';
const API_KEY = process.env.REACT_APP_OPEN_WEATHER_API_KEY;

function CapitalWeather({capital}) {
  const [weather, setWeather] = useState({});

  const hook = () => {
    axios.get(`${OPEN_WEATHER_API_BASE_URL}/data/2.5/weather?q=${capital}&units=metric&appid=${API_KEY}`)
      .then((res) => {
        console.log(res.data);
        setWeather(res.data);
      });
  };

  useEffect(hook, [capital]);

  if (!weather.hasOwnProperty('weather')) {
    return (
      <div>
        <h3>Weather in {capital}</h3>
        <p><em>fetching data...</em></p>
      </div>
    );
  }

  return (
    <div>
      <h3>Weather in {capital}</h3>
      <p>temperature <em>{weather.main.temp}</em> Celcius</p>
      <img src={`${OPEN_WEATHER_BASE_URL}/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
      <p>wind <em>{weather.wind.speed}</em> m&#47;s</p>
    </div>
  )
}

export default CapitalWeather;
