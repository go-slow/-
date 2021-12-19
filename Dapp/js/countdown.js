 

// Display the countdown  
 
function makeTimer() {
    var endTime = new Date("november  30, 2023 17:00:00 PDT");
    var endTime = Date.parse(endTime) / 1000;
    var now = new Date();
    var now = Date.parse(now) / 1000;
    var timeLeft = endTime - now;
    var days = Math.floor(timeLeft / 86400);
    var hours = Math.floor((timeLeft - days * 86400) / 3600);
    var minutes = Math.floor((timeLeft - days * 86400 - hours * 3600) / 60);
    var seconds = Math.floor(timeLeft - days * 86400 - hours * 3600 - minutes * 60);
    if (hours < "10") {
        hours = "0" + hours;
    }
    if (minutes < "10") {
        minutes = "0" + minutes;
    }
    if (seconds < "10") {
        seconds = "0" + seconds;
    }
    $("#days").html(days + "<span>Days</span>");
    $("#hours").html(hours + "<span>Hours</span>");
    $("#minutes").html(minutes + "<span>Mins</span>");
    $("#seconds").html(seconds + "<span>Seco</span>");        
    
    $("#days2").html(days + "<span>Days</span>");
    $("#hours2").html(hours + "<span>Hours</span>");
    $("#minutes2").html(minutes + "<span>Mins</span>");
    $("#seconds2").html(seconds + "<span>Seco</span>");    
    
    $("#days3").html(days + "<span>Days</span>");
    $("#hours3").html(hours + "<span>Hours</span>");
    $("#minutes3").html(minutes + "<span>Mins</span>");
    $("#seconds3").html(seconds + "<span>Seco</span>");  

    $("#days4").html(days + "<span>Days</span>");
    $("#hours4").html(hours + "<span>Hours</span>");
    $("#minutes4").html(minutes + "<span>Mins</span>");
    $("#seconds4").html(seconds + "<span>Seco</span>");   

    $("#days5").html(days + "<span>Days</span>");
    $("#hours5").html(hours + "<span>Hours</span>");
    $("#minutes5").html(minutes + "<span>Mins</span>");
    $("#seconds5").html(seconds + "<span>Seco</span>");
}
setInterval(function () {
    makeTimer();
}, 300);
 