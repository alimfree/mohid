function updateClock() {
    let months = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    let currentTime = new Date ( ).toLocaleString("en-US", {timeZone: "America/Chicago"})
    // let currentHours = currentTime.getHours ();
    // let currentDay = currentTime.getDay ( ) ;
    // let currentYear = currentTime.getFullYear ( );
    // let currentMonth = currentTime.getMonth ( );
    // currentMonth = months[currentMonth];
    // let currentMinutes = currentTime.getMinutes ( );
    // let currentSeconds = currentTime.getSeconds ( );

    // currentMinutes = ( currentMinutes < 10 ? "0" : "" ) + currentMinutes;
    // currentSeconds = ( currentSeconds < 10 ? "0" : "" ) + currentSeconds;

    // let timeOfDay = ( currentHours < 12 ) ? "AM" : "PM";
    // currentHours = ( currentHours > 12 ) ? currentHours - 12 : currentHours;
    // currentHours = ( currentHours == 0 ) ? 12 : currentHours;
    // let currentDate = currentMonth + ", " + currentDay + ", " + currentYear + " ";
    // let currentTimeString = currentHours + ":" + currentMinutes + ":" + currentSeconds + " " + timeOfDay;
    document.getElementById("clock").firstChild.nodeValue = currentTime;
};