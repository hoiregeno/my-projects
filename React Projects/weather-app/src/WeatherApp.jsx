import React, { useState } from 'react'
import './WeatherApp.css'

function WeatherApp() {
    // State to store city name, weather data and error messages.
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState("");

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
        }
        catch (error) {
            setError(error.message);
            setWeather(null);
        }
    }

    const getWeatherEmoji = (weatherId) => {

    }

    return (
        <div className="container">
            <h1>Weather App</h1>
            <form className="weather-form" onSubmit={handleSubmit}>
                <input type="text" placeholder="Enter city" value={city} onChange={event => setCity(event.target.value)} />
                <button type="submit">Find</button>
            </form>

            <div className="card">
                <h2 className="city-display">{data.name}</h2>
                <p className="temp-display"></p>
                <p className="humidity-display"></p>
                <p className="desc-display"></p>
                <p className="weather-emoji"></p>
            </div>
        </div>
    )
}

export default WeatherApp