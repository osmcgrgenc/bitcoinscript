var pubnub = new PubNub({
    publishKey: 'demo', // replace with your own pub-key
    subscribeKey: 'demo' // replace with your own sub-key
});
var xhr = new XMLHttpRequest();

var pointLimit = 100;
var useLabels = false;

var d = new Date(),
    h = new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours() + 10, d.getMinutes(), d.getSeconds(), 0);
var countDownDate = h.getTime();

// Update the count down every 1 second
var x = setInterval(function () {

    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    document.getElementById("hoursVal").innerHTML = hours;
    document.getElementById("minVal").innerHTML = minutes;
    document.getElementById("secVal").innerHTML = seconds;
    // Display the result in the element with id="demo"


    // If the count down is finished, write some text

}, 1000);


function setTime(timeType, value) {
    var d = new Date(countDownDate);
    switch (timeType) {
        case 'h':
            h = new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours() + value, d.getMinutes(), d.getSeconds(), 0);
            break;
        case 'm':
            h = new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes() + value, d.getSeconds(), 0);
            break;
        case 's':
            h = new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds() + value, 0);
            break;
        default:
            break;
    }
    countDownDate = h.getTime();
}

$(document).ready(function () {
    console.log("ready!");
    setInterval(function () {

        xhr.open('GET', 'https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,LTC&tsyms=USD', true)
        xhr.send();
        xhr.onreadystatechange = processRequest;
    }, 5000)
});
function processRequest(e) {
    if (xhr.readyState == 4 && xhr.status == 200) {
        var response = JSON.parse(xhr.responseText);
        console.log(response);
        $("#btcvalue")[0].innerText = "$" + response.BTC.USD;
        $("#etcvalue")[0].innerText = "$" + response.ETH.USD;
        $("#ltcvalue")[0].innerText = "$" + response.LTC.USD;



        //var notification = new Notification("Hi there!");
    }
}