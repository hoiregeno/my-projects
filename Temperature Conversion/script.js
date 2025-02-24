const tempInput = document.getElementById("temp");
const resultDisplay = document.getElementById("result-display");
const currentTemp = document.getElementById("current-temp");
const toFahrenheit = document.getElementById("to-fahrenheit");
const toCelsius = document.getElementById("to-celsius");
let savedData;

function convert() {
    if (tempInput.value === "") {
        resultDisplay.textContent = "Please enter a temperature.";
        resultDisplay.style.display = "block";
        return; // Stop execution if input is empty.
    }

    if (!toFahrenheit.checked && !toCelsius.checked) {
        resultDisplay.textContent = "Please select a conversion option.";
        resultDisplay.style.display = "block";
        return; // Stop execution if no radio button is selected.
    }

    let result = 0;

    if (toFahrenheit.checked) {
        result = ((Number(tempInput.value) * 9) / 5) + 32;
        saveResult(result);
    } else {
        result = (((Number(tempInput.value) - 32) * 5) / 9);
        saveResult(result);
    }

    showResult(result);
}

function showResult(result) {
    let unit = toFahrenheit.checked ? "°F" : "°C";

    currentTemp.style.display = "block";
    currentTemp.textContent = `You Entered: ${tempInput.value}`;

    resultDisplay.style.display = "block";
    resultDisplay.textContent = `Result: ${result.toFixed(2)}${unit}`;

    // Reset input and uncheck radio buttons after conversion
    tempInput.value = "";
    toFahrenheit.checked = false;
    toCelsius.checked = false;
}

function showSavedData(result) {
    let unit = toFahrenheit.checked ? "°F" : "°C";

    resultDisplay.style.display = "block";
    resultDisplay.textContent = `Result: ${result.toFixed(2)}${unit}`;

    // Reset input and uncheck radio buttons after conversion
    tempInput.value = "";
    toFahrenheit.checked = false;
    toCelsius.checked = false;
}

// Clear result when user starts typing a new temperature
tempInput.addEventListener("input", () => {
    currentTemp.style.display = "none";
    resultDisplay.style.display = "none";
});

function saveResult(result) {
    savedData = localStorage.setItem("temp", result);
}

window.onload = function () {
    let data = Number(localStorage.getItem("temp"));

    if (data) {
        showSavedData(data);
    }
}