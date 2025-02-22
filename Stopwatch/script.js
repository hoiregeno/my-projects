const display = document.getElementById("display");
let startTime = 0;
let elapsedTime = 0;
let timer = null;
let isRunning = false;

// Load saved data when page loads
window.onload = function () {

    const savedData = JSON.parse(localStorage.getItem("stopwatch"));
    console.log(savedData);

    if (savedData) {
        elapsedTime = savedData.elapsedTime;
        isRunning = savedData.isRunning;

        if (isRunning) {
            startTime = Date.now() - elapsedTime;
            timer = setInterval(update, 10);

            document.getElementById("start-btn").disabled = true;
            document.getElementById("stop-btn").disabled = false;
        } else {
            updateDisplay(elapsedTime);
        }
    }
};

// Start Button
function startBtn() {

    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(update, 10);
        isRunning = true;
        saveData();

        document.getElementById("start-btn").disabled = true;
        document.getElementById("stop-btn").disabled = false;
    }
}

// Stop Button
function stopBtn() {

    if (isRunning) {
        clearInterval(timer);
        elapsedTime = Date.now() - startTime;
        isRunning = false;
        saveData();

        document.getElementById("start-btn").disabled = false;
        document.getElementById("stop-btn").disabled = true;
    }
}

// Reset Button
function resetBtn() {
    clearInterval(timer);
    startTime = 0;
    elapsedTime = 0;
    timer = null;
    isRunning = false;

    updateDisplay(0);
    localStorage.removeItem("stopwatch");

    document.getElementById("start-btn").disabled = false;
    document.getElementById("stop-btn").disabled = true;
}

// Update Timer Display
function update() {
    elapsedTime = Date.now() - startTime;

    updateDisplay(elapsedTime);
    saveData();
}

// Format and Display Time
function updateDisplay(time) {
    const hours = Math.floor(time / 3600000).toString().padStart(2, "0");
    const minutes = Math.floor((time % 3600000) / 60000).toString().padStart(2, "0");
    const seconds = Math.floor((time % 60000) / 1000).toString().padStart(2, "0");
    const milliseconds = Math.floor((time % 1000) / 10).toString().padStart(2, "0");

    display.textContent = `${hours}:${minutes}:${seconds}:${milliseconds}`;
}

// Save Stopwatch Data to Local Storage
function saveData() {
    localStorage.setItem("stopwatch", JSON.stringify({ elapsedTime, isRunning }));
}