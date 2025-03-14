import React, { useState } from "react";
import "./WeatherApp.css";

function WeatherApp() {
    // State to store city name, weather data, and error messages
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState("");

    // API key for OpenWeatherMap
    const apiKey = import.meta.env.VITE_API_KEY;

    // ----- Helper Functions -----

    // Fetch weather data from OpenWeatherMap
    async function getWeatherData(city) {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);

            if (!response.ok) {
                throw new Error(`Could not locate ${city}.`);
            }

            return await response.json();
        } catch (error) {
            throw error;
        }
    }

    // Get a weather emoji based on the weather condition ID
    function getWeatherEmoji(id) {
        if (id >= 200 && id < 300) return "⛈️"; // Thunderstorm
        if (id >= 300 && id < 400) return "🌧️"; // Drizzle
        if (id >= 500 && id < 600) return "🌦️"; // Rain
        if (id >= 600 && id < 700) return "❄️"; // Snow
        if (id >= 700 && id < 800) return "🌫️"; // Fog or mist
        if (id === 800) return "☀️"; // Clear sky
        if (id > 800) return "☁️"; // Clouds
        return "❓"; // Unknown condition
    }

    // ----- Event Handler -----

    // Handle the form submission
    async function handleSubmit(event) {
        event.preventDefault();

        if (!city) {
            setError("Please enter a city name.");
            setWeather(null);
            return;
        }

        try {
            const data = await getWeatherData(city);
            setWeather(data);
            setError("");
        } catch (error) {
            setError(error.message);
            setWeather(null);
        }

        setCity("");
    }

    // ----- Main Component Return -----
    return (
        <div className="container">
            <h1>Weather App</h1>
            <form className="weather-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter city"
                    value={city}
                    onChange={(event) => setCity(event.target.value)}
                />
                <button type="submit">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"></path>
                    </svg>
                </button>
            </form>

            {error && <p className="error-display">{error}</p>}

            {weather && (
                <div className="card">
                    <h2 className="city-display">
                        {weather.name}, {weather.sys.country}
                    </h2>
                    <p className="temp-display">
                        {(weather.main.temp - 273.15).toFixed(2)}°C
                    </p>
                    <p className="feels-temp-display">
                        Feels Like: {(weather.main.feels_like - 273.15).toFixed(2)}°C
                    </p>
                    <p className="humidity-display">
                        Humidity: {weather.main.humidity}%
                    </p>
                    <p className="desc-display">
                        {weather.weather[0].description}
                    </p>
                    <p className="weather-emoji">
                        {getWeatherEmoji(weather.weather[0].id)}
                    </p>
                </div>
            )}
        </div>
    );
}

export default WeatherApp;