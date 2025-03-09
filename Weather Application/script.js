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
        throw new Error("Could not locate city");
    }

    return await response.json();
}

function displayWeatherInfo(data) {
    console.log(data);

    const {
        name: city,
        main: { temp, humidity },

    } = data;
}

function getWeatherEmoji(weatherId) {

}

function displayError(message) {
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("error-display");

    card.textContent = "";
    card.appendChild(errorDisplay);
    card.style.display = "flex";
}