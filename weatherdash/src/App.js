import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";
import sunsetImage from "./assets/sunset.jpg";
import clearImage from "./assets/clear.jpg";
import cloudsImage from "./assets/clouds.jpg";
import rainImage from "./assets/rain.jpg"
import snowImage from "./assets/snow.jpg"
import thunderstormImage from "./assets/thunderstorm.jpg"
import drizzleImage from "./assets/drizzle.jpg"
import fogImage from "./assets/fog.jpg"


function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const [backgroundImage, setBackgroundImage] = useState(
    "url('./assets/sunset.jpg') no-repeat center center/cover"
  );

  const apiKey = "02e0072134353ebbca2b1ecb7b50ca8f";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

  const weatherBackgrounds = {
    "Clear": `url(${clearImage})`,
    "Clouds": `url(${cloudsImage}) `,
    "Rain": `url(${rainImage})`,
    "Snow": `url(${snowImage})`,
    "Thunderstorm": `url(${thunderstormImage})`,
    "Haze":`url(${fogImage})`,
    "Drizzle": `url(${drizzleImage})`,
    "Atmosphere": `url(${fogImage})`,
    "default": `url(${sunsetImage}) no-repeat center center/cover`
  };

  useEffect(() => {
    setBackgroundImage(weatherBackgrounds.default);
  }, [weatherBackgrounds.default]); 

  const searchLocation = () => {
    if (!location) {
      setError("Please enter a location");
      return;
    }

    axios.get(url).then((response) => {
      setData(response.data);
      setError("");
      const weather = response.data.weather[0].main;
      setBackgroundImage(weatherBackgrounds[weather] || weatherBackgrounds.default);
    }).catch((error) => {
      setError("Location not found. Please try again.");
    });
    setLocation("");
  };

  return (
    <div className="app" style={{ backgroundImage: backgroundImage }}>
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          placeholder="Enter Location"
          type="text"
        />
        <button onClick={searchLocation}>Search</button>
      </div>
      {error && <div className="error">{error}</div>}
      <div className="container">
        {data.name && (
          <div className="top">
            <div className="location">
              <p className="loc">{data.name}</p>
            </div>
            <div className="temp">
              {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
            </div>
            <div className="description">
              {data.weather ? <p>{data.weather[0].main}</p> : null}
              {data.weather ? (
                <img
                  src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
                  alt={data.weather[0].main}
                />
              ) : null}
            </div>
          </div>
        )}
        {data.name && (
          <div className="bottom">
            <div className="feels">
              {data.main ? (
                <p className="bold">{data.main.feels_like.toFixed()}°C</p>
              ) : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? (
                <p className="bold">{data.wind.speed.toFixed()} MPH</p>
              ) : null}
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
















