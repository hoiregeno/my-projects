import React, { useState } from 'react';
import './WeatherApp.css';

function WeatherApp() {
    const [city, setCity] = useState("");
    const [error, setError] = useState("");
    const [weather, setWeather] = useState(null);

    const apiKey = import.meta.env.VITE_API_KEY;

    const getWeatherData = async (city) => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);

            if (!response.ok) {
                throw new Error(`Could not locate ${city}.`);
            }

            return await response.json();
        }
        catch (error) {
            throw error;
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!city) {
            setError("Please enter a city.");
            setWeather(null);
            return;
        }

        try {
            const data = await getWeatherData(city);
            setWeather(data);
            setError("");

            console.log(data);
        }
        catch (error) {
            setError(error.message);
            setWeather(null);
        }

        setCity("");
    }

    const getWeatherEmoji = (weatherId) => {
        if (weatherId >= 200 && weatherId < 300) return "⛈️";
        if (weatherId >= 300 && weatherId < 500) return "🌦️";
        if (weatherId >= 500 && weatherId < 600) return "🌧️";
        if (weatherId >= 600 && weatherId < 700) return "🌨️";
        if (weatherId >= 700 && weatherId < 800) return "🌫️";
        if (weatherId === 800) return "☀️";
        if (weatherId >= 800 && weatherId < 805) return "☁️";
    }

    return (
        <div className="container">
            <h1>Weather App</h1>

            <form className="weather-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter a city"
                    value={city}
                    onChange={event => {
                        setCity(event.target.value);
                        setError("");
                    }} />
                <button type="submit">Find</button>
            </form>

            {error && <p className="error-display">{error}</p>}

            {weather && <div className="card">
                <h2 className="city-display">{weather.name}, {weather.sys.country}</h2>
                <p className="temp-display">{Math.floor((weather.main.temp - 273.15))}°C</p>
                <p className="feels-temp-display">Feels Like: {Math.floor(weather.main.feels_like - 273.15)}°C</p>
                <p className="humidity-display">Humidity: {weather.main.humidity}%</p>
                <p className="desc-display">{weather.weather[0].description}</p>
                <p className="weather-emoji">
                    {getWeatherEmoji(weather.weather[0].id)}
                </p>
            </div>}
        </div>
    );
}

export default WeatherApp