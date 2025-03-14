import React, { useState } from "react";
import "./WeatherApp.css";

function WeatherApp() {
    // State hooks to manage city input, weather data, and error messages
    const [city, setCity] = useState("");  // Stores the name of the city
    const [weather, setWeather] = useState(null);  // Stores the weather data
    const [error, setError] = useState("");  // Stores error messages

    // API key for OpenWeatherMap (using environment variable)
    const apiKey = import.meta.env.VITE_API_KEY;

    // Function to fetch weather data from OpenWeatherMap API
    async function getWeatherData(city) {
        try {
            // API call to fetch weather data
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);

            // Check if the response is successful
            if (!response.ok) {
                throw new Error(`Could not locate ${city}.`);  // Throw error if city is not found
            }

            // Parse and return the JSON data from the API
            return await response.json();
        } catch (error) {
            throw error;  // Propagate the error if there's an issue with the API call
        }
    }

    // Handle the form submission
    async function handleSubmit(event) {
        event.preventDefault();  // Prevent the default form submit behavior

        // If city input is empty, set an error message
        if (!city) {
            setError("Please enter a city name.");
            setWeather(null);
            return;
        }

        try {
            // Attempt to fetch the weather data
            const data = await getWeatherData(city);
            setWeather(data);  // Store the fetched weather data
            setError("");  // Clear any existing error message
        } catch (error) {
            setError(error.message);  // Display error message
            setWeather(null);  // Clear any previous weather data
        }

        setCity("");  // Clear the city input field after submission
    }

    // Function to return an appropriate emoji based on the weather condition
    function getWeatherEmoji(id) {
        // Return an emoji based on the weather condition ID
        if (id >= 200 && id < 300) return "⛈️";  // Thunderstorm
        if (id >= 300 && id < 400) return "🌧️";  // Drizzle
        if (id >= 500 && id < 600) return "🌦️";  // Rain
        if (id >= 600 && id < 700) return "❄️";  // Snow
        if (id >= 700 && id < 800) return "🌫️";  // Atmosphere (fog, mist)
        if (id === 800) return "☀️";  // Clear sky
        if (id > 800) return "☁️";  // Clouds
        return "❓";  // Unknown weather condition
    }

    return (
        <div className="container">
            <h1>Weather App</h1>

            {/* Form to input city name */}
            <form className="weather-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter city"
                    value={city}
                    onChange={(event) => setCity(event.target.value)}  // Update city state on input change
                />
                <button type="submit">
                    {/* Search icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"></path>
                    </svg>
                </button>
            </form>

            {/* Display error message if there's an issue */}
            {error && <p className="error-display">{error}</p>}

            {/* Display weather data if available */}
            {weather && (
                <div className="card">
                    <h2 className="city-display">
                        {weather.name}, {weather.sys.country}  {/* City and country */}
                    </h2>
                    <p className="temp-display">
                        {(weather.main.temp - 273.15).toFixed(2)}°C  {/* Convert temperature from Kelvin to Celsius */}
                    </p>
                    <p className="feels-temp-display">
                        Feels Like: {(weather.main.feels_like - 273.15).toFixed(2)}°C  {/* Feels like temperature */}
                    </p>
                    <p className="humidity-display">
                        Humidity: {weather.main.humidity}%  {/* Humidity percentage */}
                    </p>
                    <p className="desc-display">
                        {weather.weather[0].description}  {/* Weather description */}
                    </p>
                    <p className="weather-emoji">
                        {getWeatherEmoji(weather.weather[0].id)}  {/* Display weather emoji based on condition */}
                    </p>
                </div>
            )}
        </div>
    );
}

export default WeatherApp;
