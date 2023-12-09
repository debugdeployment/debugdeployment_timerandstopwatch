
let stopwatchInterval;
let stopwatchStartTime;
let stopwatchRunning = false;

let timerTimeout;
let timerDuration;
let timerStartTime;
let timerRunning = false;

function startStopwatch() {
    if (!stopwatchRunning) {
        stopwatchStartTime = Date.now();
        stopwatchInterval = setInterval(updateStopwatch, 1000);
        stopwatchRunning = true;
    }
}

function stopStopwatch() {
    if (stopwatchRunning) {
        clearInterval(stopwatchInterval);
        stopwatchRunning = false;
    }
}

function resetStopwatch() {
    stopStopwatch();
    document.getElementById("stopwatch").textContent = "00:00:00";
}

function updateStopwatch() {
    const currentTime = Date.now();
    const elapsedTime = currentTime - stopwatchStartTime;
    const formattedTime = formatTime(elapsedTime);
    document.getElementById("stopwatch").textContent = formattedTime;
}

function startTimer() {
    if (!timerRunning) {
        const inputField = document.getElementById("timerInput");
        timerDuration = parseInt(inputField.value) * 1000;

        if (isNaN(timerDuration) || timerDuration <= 0) {
            alert("Please enter a valid duration in seconds.");
            return;
        }

        timerStartTime = Date.now();
        timerTimeout = setTimeout(timerFinished, timerDuration);
        timerRunning = true;
        inputField.disabled = true;
        updateTimer();
    }
}

function cancelTimer() {
    if (timerRunning) {
        clearTimeout(timerTimeout);
        timerRunning = false;
        document.getElementById("timerInput").disabled = false;
    }
}

function updateTimer() {
    if (timerRunning) {
        const currentTime = Date.now();
        const elapsedTime = currentTime - timerStartTime;
        const remainingTime = timerDuration - elapsedTime;
        if (remainingTime <= 0) {
            timerFinished();
        } else {
            const formattedTime = formatTime(remainingTime);
            document.getElementById("timer").textContent = formattedTime;
            setTimeout(updateTimer, 1000);
        }
    }
}

function timerFinished() {
    timerRunning = false;
    document.getElementById("timer").textContent = "00:00:00";
    document.getElementById("timerInput").disabled = false;
    alert("Timer finished!");
}

function formatTime(time) {
    const date = new Date(time);
    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    const seconds = date.getUTCSeconds().toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
}