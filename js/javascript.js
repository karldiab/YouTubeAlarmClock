$(document).ready(function() {
// Create two variable with the names of the months and days in an array
var monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]; 
var dayNames= ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
var am = true;
var minutes;
var hours;
var hoursTillAlarm
var minutesTillAlarm
var alarmSet = false;
var URL;
// Create a newDate() object
var newDate = new Date();
// Extract the current date from Date object
newDate.setDate(newDate.getDate());
// Output the day, date, month and year   
$('#Date').html(dayNames[newDate.getDay()] + " " + newDate.getDate() + ' ' + monthNames[newDate.getMonth()] + ' ' + newDate.getFullYear());

setInterval( function() {
	// Create a newDate() object and extract the seconds of the current time on the visitor's
	var seconds = new Date().getSeconds();
	// Add a leading zero to seconds value
	$("#sec").html(( seconds < 10 ? "0" : "" ) + seconds);
    //updates alarm
    updateAlarm();
	},1000);
	
setInterval( function() {
	// Create a newDate() object and extract the minutes of the current time on the visitor's
	minutes = new Date().getMinutes();
	// Add a leading zero to the minutes value
	$("#min").html(( minutes < 10 ? "0" : "" ) + minutes);
    },1000);
	
setInterval( function() {
	// Create a newDate() object and extract the hours of the current time on the visitor's
	hours = new Date().getHours();
	//convert hours to am/pm time
    if (hours > 12) {
        hours -= 12;
        am = false;
    } else {
        am = true;
    }
    // Add a leading zero to the hours value
	$("#hours").html(hours == 0 ? "12" : (( hours < 10 ? "0" : "" ) + hours));
    //change back to 24 hour time for alarm function
    if (!am) {
        hours += 12;
    }
    }, 1000);	
//displays whether it is currently AM or PM
setInterval( function() {
    if (am) {
        $("#ampm").html("AM");
    } else {
        $("#ampm").html("PM");
    }
    },1000);
       
//function to set alarm when set alarm button clicked  
$('#setAlarmButton').click(function() {
    //assign URL var to user inputted url
    URL = $("#URL").val();
    //ensures user has inputted a URL starting with HTTP so that it resirrects properly
    if (URL.substring(0,4).toUpperCase() !== "HTTP") {
        URL = "http://" + URL;
    }
    alarmSet = true;
    updateAlarm();

});
/*function that updates how many hours and minutes left till alarm sounds, updates the text display said info, and redirrects page when
the alarm time == the current time */
function updateAlarm() {
    var alarmHour = $("#hour").find(":selected").val();
    var alarmMinute = $("#minute").find(":selected").val();
    hoursTillAlarm = alarmHour - hours;
    if (hoursTillAlarm < 0) {
        hoursTillAlarm += 24;
    }
    minutesTillAlarm = alarmMinute - minutes;
    if (minutesTillAlarm < 0) {
        minutesTillAlarm += 60;
        hoursTillAlarm--;
    }
    if (hoursTillAlarm == -1) {
        hoursTillAlarm = 23;
    }
    if (alarmSet) {
        $("#alarmConfirm").html("You will be sent to that link in " + (hoursTillAlarm == 0? "" : hoursTillAlarm + (hoursTillAlarm == 1? " hour and " : " hours and ")) + minutesTillAlarm + (minutesTillAlarm == 1 ? " minute." : " minutes."));
    }
    if (alarmSet && hoursTillAlarm == 0 && minutesTillAlarm == 0) {
        window.location.href = URL;
    }
    
}
});
