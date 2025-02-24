const tempInput = document.getElementById("temp");
const resultDisplay = document.getElementById("result-display");
const currentTemp = document.getElementById("current-temp");
const toFahrenheit = document.getElementById("to-fahrenheit");
const toCelsius = document.getElementById("to-celsius");

// Function to handle the temperature conversion logic
function convert() {
    const tempValue = Number(tempInput.value);
    const selectedUnit = toFahrenheit.checked ? "°F" : "°C";
    let result;

    // Validate input before proceeding
    if (isInputValid(tempValue)) {
        result = calculateConversion(tempValue, selectedUnit); // Perform the conversion
        saveResult(result, selectedUnit, tempInput.value); // Save the result to local storage
        displayResult(result, selectedUnit); // Display the result
    }
}

// Function to validate the user input for temperature
function isInputValid(tempValue) {
    if (!tempInput.value) {
        showErrorMessage("Please enter a temperature.");
        return false;
    }

    if (isNaN(tempValue)) {
        showErrorMessage("Please enter a valid number.");
        return false;
    }

    if (!toFahrenheit.checked && !toCelsius.checked) {
        showErrorMessage("Please select a conversion option.");
        return false;
    }

    return true; // Input is valid if all checks pass
}

// Function to display an error message
function showErrorMessage(message) {
    resultDisplay.textContent = message;
    resultDisplay.style.display = "block"; // Show error message
}

// Function to calculate the conversion based on selected unit
function calculateConversion(tempValue, unit) {
    return unit === "°F"
        ? (tempValue * 9) / 5 + 32  // Convert to Fahrenheit
        : ((tempValue - 32) * 5) / 9; // Convert to Celsius
}

// Function to display the conversion result and entered temperature
function displayResult(result, unit) {
    currentTemp.style.display = "block";
    currentTemp.textContent = `You Entered: ${tempInput.value}`; // Show entered temperature

    resultDisplay.style.display = "block";
    resultDisplay.textContent = `Result: ${result.toFixed(2)}${unit}`; // Show conversion result

    tempInput.value = ""; // Reset input after conversion
}

// Function to retrieve and display saved conversion result from local storage
function showSavedData() {
    const savedData = JSON.parse(localStorage.getItem("temp"));
    if (savedData) {
        resultDisplay.style.display = "block";
        resultDisplay.textContent = `Last Result: ${savedData.value.toFixed(2)}${savedData.unit}`;

        currentTemp.style.display = "block";
        currentTemp.textContent = `Last Temperature Entered: ${savedData.inputTemp}`;
    }
}

// Function to save the conversion result to local storage
function saveResult(result, unit, inputTemp) {
    localStorage.setItem("temp", JSON.stringify({ value: result, unit, inputTemp }));
}

// Event listener to hide result when the user starts typing a new temperature
tempInput.addEventListener("input", () => {
    currentTemp.style.display = "none"; // Hide the last entered temperature
    resultDisplay.style.display = "none"; // Hide the result display
});

// Display saved data on page load
window.onload = showSavedData;