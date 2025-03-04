const weatherForm = document.querySelector(".weather-form");
const cityInput = document.getElementById("city-input");
const wrapper = document.querySelector(".wrapper");
const apiKey = "80ee21a3e3f38c58fd71a39839cb8e0c";

// Event listener for form submission
weatherForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const city = cityInput.value.trim(); // Trim input to remove extra spaces

    if (city) {
        try {
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        } catch (error) {
            console.error(error);
            displayMessage("Could not fetch weather data.");
        }
    } else {
        displayMessage("Please enter a city.");
    }
});

// Fetch weather data from API
async function getWeatherData(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);

    if (!response.ok) {
        throw new Error("Could not fetch weather data.");
    }

    return await response.json();
}

// Display weather information on the page
function displayWeatherInfo(data) {
    const {
        name: city,
        main: { temp, humidity },
        weather: [{ description, id }]
    } = data;

    console.log(temp);

    wrapper.textContent = ""; // Clear previous content
    wrapper.style.display = "flex";

    // Create elements for displaying weather info
    const cityDisplay = document.createElement("h1");
    cityDisplay.textContent = city;
    cityDisplay.classList.add("myH1");

    const tempDisplay = document.createElement("p");
    tempDisplay.textContent = `${(temp - 273.15).toFixed(2)}°C`;
    tempDisplay.classList.add("temp-display");

    const humidityDisplay = document.createElement("p");
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    humidityDisplay.classList.add("weatherInfo");

    const descDisplay = document.createElement("p");
    descDisplay.textContent = description;
    descDisplay.classList.add("weatherInfo");

    const weatherEmoji = document.createElement("p");
    weatherEmoji.textContent = getWeatherEmoji(id);
    weatherEmoji.classList.add("weather-emoji");

    // Append all elements to the wrapper
    wrapper.append(cityDisplay, tempDisplay, humidityDisplay, descDisplay, weatherEmoji);

    cityInput.value = "";
}

// Get corresponding weather emoji based on weather ID
function getWeatherEmoji(weatherId) {
    switch (true) {
        case (weatherId >= 200 && weatherId < 300):
            return "⛈️"; // Thunderstorm
        case (weatherId >= 300 && weatherId < 400):
            return "🌦️"; // Drizzle
        case (weatherId >= 500 && weatherId < 600):
            return "🌧️"; // Rain
        case (weatherId >= 600 && weatherId < 700):
            return "❄️"; // Snow
        case (weatherId >= 700 && weatherId < 800):
            return "🌫️"; // Atmosphere (Fog, Mist, etc.)
        case (weatherId === 800): return "☀️"; // Clear sky
        case (weatherId >= 801 && weatherId < 810):
            return "☁️"; // Clouds
        default:
            return "❓"; // Unknown weather
    }
}

// Display error or info messages
function displayMessage(message) {
    wrapper.textContent = ""; // Clear previous content

    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;

    wrapper.appendChild(errorDisplay);
    wrapper.style.display = "flex";
}