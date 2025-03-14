import React, { useState } from 'react'
import './WeatherApp.css'

function WeatherApp() {
    // State to store city name, weather data and error messages.
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState("");

    return (
        <div className="container">
            <h1>Weather App</h1>
            <form className="weather-form">
                <input type="text" placeholder="Enter city" />
                <button type="submit">Find</button>
            </form>

            <div className="card">
                <h2 className="city-display">Paris</h2>
                <p className="temp-display">28°C</p>
                <p className="humidity-display">Humidity: 79%</p>
                <p className="desc-display">Moderate Rain</p>
                <p className="weather-emoji">🌧️</p>
            </div>
        </div>
    )
}

export default WeatherApp