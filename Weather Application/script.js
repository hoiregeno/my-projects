const weatherForm = document.querySelector(".weather-form");
const cityInput = document.getElementById("city-input");
const wrapper = document.querySelector(".wrapper");

weatherForm.addEventListener("submit", e => {
    e.preventDefault();

    const city = cityInput.value;

    if (city) {

    }
    else {
        displayMessage("Please enter a city.");
    }
});

async function getWeatherData(city) {

}

function getWeatherInfo(data) {

}

function getWeatherEmoji(weatherId) {

}

function displayMessage(message) {
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    wrapper.appendChild(errorDisplay);
}