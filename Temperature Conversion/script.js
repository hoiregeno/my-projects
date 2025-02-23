const tempInput = document.getElementById("temp");
const resultDisplay = document.getElementById("result-display");
const currentTemp = document.getElementById("current-temp");
const toFahrenheit = document.getElementById("to-fahrenheit");
const toCelsius = document.getElementById("to-celsius");

function convert() {
    if (tempInput.value === "") {
        window.alert("Please enter a temperature.");
        return; // Stop execution if input is empty
    }

    if (!toFahrenheit.checked && !toCelsius.checked) {
        window.alert("Please select a conversion option.");
        return; // Stop execution if no radio button is selected
    }

    let result = 0;

    if (toFahrenheit.checked) {
        result = ((Number(tempInput.value) * 9) / 5) + 32;
    } else {
        result = (((Number(tempInput.value) - 32) * 5) / 9);
    }

    showResult(result);
}

function showResult(result) {
    let unit = toFahrenheit.checked ? "°F" : "°C";

    currentTemp.textContent = `Current Temperature: ${tempInput.value}${unit}`;
    currentTemp.style.display = "block";
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