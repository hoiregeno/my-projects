const tempInput = document.getElementById("temp");
const resultDisplay = document.getElementById("result-display");
const currentTemp = document.getElementById("current-temp");
const toFahrenheit = document.getElementById("to-fahrenheit");
const toCelsius = document.getElementById("to-celsius");

function convert() {
    if (tempInput.value === "") {
        resultDisplay.textContent = "Please enter a temperature.";
        resultDisplay.style.display = "block";
        return;
    }

    if (isNaN(tempInput.value)) {
        resultDisplay.textContent = "Please enter a valid number.";
        resultDisplay.style.display = "block";
        return;
    }

    if (!toFahrenheit.checked && !toCelsius.checked) {
        resultDisplay.textContent = "Please select a conversion option.";
        resultDisplay.style.display = "block";
        return;
    }

    let result = 0;
    let unit = "";

    if (toFahrenheit.checked) {
        result = ((Number(tempInput.value) * 9) / 5) + 32;
        unit = "°F";
    } else {
        result = (((Number(tempInput.value) - 32) * 5) / 9);
        unit = "°C";
    }

    saveResult(result, unit);
    showResult(result, unit);
}

function showResult(result, unit) {
    currentTemp.style.display = "block";
    currentTemp.textContent = `You Entered: ${tempInput.value}`;

    resultDisplay.style.display = "block";
    resultDisplay.textContent = `Result: ${result.toFixed(2)}${unit}`;

    // Reset input only (keep radio selection)
    tempInput.value = "";
}

function showSavedData() {
    let data = JSON.parse(localStorage.getItem("temp"));
    if (!data) return;

    resultDisplay.style.display = "block";
    resultDisplay.textContent = `Last Result: ${data.value.toFixed(2)}${data.unit}`;
}

// Clear result when user starts typing a new temperature
tempInput.addEventListener("input", () => {
    currentTemp.style.display = "none";
    resultDisplay.style.display = "none";
});

function saveResult(result, unit) {
    localStorage.setItem("temp", JSON.stringify({ value: result, unit }));
}

window.onload = showSavedData;
