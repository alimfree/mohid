function updateClock() {
    let currentTime = new Date ( ).toLocaleString("en-US", {timeZone: "America/Chicago"})
    document.getElementById("clock").firstChild.nodeValue = currentTime;
};