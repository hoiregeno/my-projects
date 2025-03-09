const weatherForm = document.querySelector(".weather-form");
const apiKey = "80ee21a3e3f38c58fd71a39839cb8e0c";
const cityInput = document.getElementById("city-input");
const card = document.querySelector(".card");

weatherForm.addEventListener("submit", async e => {
    e.preventDefault();
    const city = cityInput.value;

    if (city) {
        try {
            const data = await getWeatherData(city);
            displayWeatherInfo(data);
        }
        catch (error) {
            console.error(error)
            displayError(error);
        }
    }
    else {
        displayError("Please enter something.");
    }

    cityInput.value = "";
});

async function getWeatherData(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);

    if (!response.ok) {
        throw new Error(`Could not find ${cityInput.value}.`);
    }

    return await response.json();
}

function displayWeatherInfo(data) {
    console.log(data);

    const {
        name: city,
        main: { temp, feels_like, humidity },
        sys: { country },
        weather: [{ id, description }]
    } = data;

    const cityDisplay = document.createElement("h2");
    const tempDisplay = document.createElement("p");
    const feelsLikeDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    card.textContent = "";

    cityDisplay.textContent = `${city}, ${country}`;
    cityDisplay.classList.add("city-display");

    tempDisplay.textContent = `${(temp - 273.15).toFixed(2)}°C`;
    tempDisplay.classList.add("temp-display");

    feelsLikeDisplay.textContent = `Feels Like: ${(feels_like - 273.15).toFixed(2)}°C`;
    feelsLikeDisplay.classList.add("feels-temp-display");

    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    humidityDisplay.classList.add("humidity-display");

    descDisplay.textContent = description;
    descDisplay.classList.add("desc-display");

    weatherEmoji.textContent = getWeatherEmoji(id);
    weatherEmoji.classList.add("weather-emoji");

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(feelsLikeDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);

    card.style.display = "flex";
}

function getWeatherEmoji(weatherId) {
    switch (true) {
        case (weatherId >= 200 && weatherId < 300):
            return "⛈️";
        case (weatherId >= 300 && weatherId < 500):
            return "🌦️";
        case (weatherId >= 500 && weatherId < 600):
            return "🌧️";
        case (weatherId >= 600 && weatherId < 700):
            return "🌨️";
        case (weatherId >= 700 && weatherId < 800):
            return "🌫️";
        case (weatherId === 800):
            return "☀️";
        case (weatherId >= 800 && weatherId < 805):
            return "☁️";
    }
}

function displayError(message) {
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("error-display");

    card.textContent = "";
    card.appendChild(errorDisplay);
    card.style.display = "flex";
}