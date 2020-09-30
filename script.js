// Getting Local storage and avoiding fetting null the first time around. 
var btnArr = JSON.parse(localStorage.getItem("history")) || [];
var apiKey = "58d666652ff1413e43798800e2896f32";
renderBtn();


// This is an event listener for the search button.
$(".searchBtn").on("click", function () {
  var cityName = $("#input").val();
  btnArr.push(cityName);
  localStorage.setItem("history", JSON.stringify(btnArr));
  renderBtn(cityName);
  currentWeather(cityName);
  get5Day(cityName);
 
});

// This is an event listener for the buttons in the search history. 
$(document).on("click", ".cityWeather", function () {
  var cityName = $(this).text();
  console.log(cityName);
  currentWeather(cityName);    
  get5Day(cityName); 
});

// This Function renders Buttons and it called both for local storage and for the search button. 
function renderBtn() {
  // make this render from your btnArr instead
  var searchHistory = $(".searchHistory");
  searchHistory.empty();
  for (var i = 0; i < btnArr.length; i++) {
    var historyBtn = $("<button>").addClass("mt-2 cityWeather");
    var cityName = btnArr[i];
    historyBtn.text(cityName);
    searchHistory.append(historyBtn);
    
  }
}

// This function does an api call for both the current weather and the UV index. 
// Then it appends the information to each button that is clciked. 
function currentWeather(cityName){

var currentDate = moment().format(" (dddd, MMMM Do YYYY)");  
var queryURL =
"https://api.openweathermap.org/data/2.5/weather?q=" +
cityName +
"&appid=" +
apiKey +
"&units=imperial";

$.ajax({
url: queryURL,
method: "GET",
}).then(function (response) {

var tempEquation = response.main.temp;

$(".cityName").text(response.name + currentDate);
$(".temp").text("temperature: " + tempEquation + "°");
$(".humidity").text("Humidity: " + response.main.humidity + "%");
$(".windSpeed").text("Wind Speed: " + response.wind.speed + "MPH");

// This Section sets the UV index
var long = response.coord.lon;
var latt = response.coord.lat;
var UVurl =
  "https://api.openweathermap.org/data/2.5/uvi?lat=" +
  latt +
  "&lon=" +
  long +
  "&appid=" +
  apiKey;
$.ajax({
  url: UVurl,
  method: "GET",
}).then(function (UVresponse) {

  // This Section gives new colors depending on the UV index. 
  var UVindexVal = UVresponse.value;
  var UvSpan = $(".uvIndex")
  UvSpan.text(UVindexVal);
  if (UVindexVal > 10) {
  UvSpan.attr("style", "background-color: purple; padding: 5px; border: 1px solid black");
  } else if (UVindexVal < 10 && UVindexVal > 7) {
    UvSpan.attr("style", "background-color: red; padding: 5px; border: 1px solid black");
  } else if (UVindexVal < 8 && UVindexVal > 5) {
    UvSpan.attr("style", "background-color: orange; padding: 5px; border: 1px solid black");
  } else if (UVindexVal < 6 && UVindexVal > 2) {
    UvSpan.attr("style", "background-color: yellow; padding: 5px; border: 1px solid black");
  } else {
    UvSpan.attr("style", "background-color: green; padding: 5px; border: 1px solid black");
  }
});
})
}

// function to get the five day forcast using the 5 day forcast API 
// Then it appends all the information in the call to cards styled mainly by bootstrap.
function get5Day(cityName) {
  // Five Day forcast function
  $.ajax({
    url:
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      cityName +
      "&appid=" +
      apiKey +
      "&units=imperial",
    method: "GET",
  }).then(function (fiveResponse) {
    $(".fiveDayCon").empty();
    for (i = 0; i < 40; i = i + 8) {
      var cardDiv = $("<div>");
      var currentDay = fiveResponse.list[i];
      var temp = $("<p>").text(
        "Temperature: " + currentDay.main.temp + "°"
      );
      var currenTime = $("<p>").text(currentDay.dt_txt.substring(0, 10));
      currenTime.attr("style", "font-weight: bold;")
      var humidity = $("<p>").text("Humidity: " + currentDay.main.humidity);
      var iconImg = $("<img>");
      iconImg.attr(
        "src",
        "https://openweathermap.org/img/wn/" +
          currentDay.weather[0].icon +
          "@2x.png"
      );
      cardDiv.attr("class", "card card-body border border-secondary bg-primary");
      cardDiv.append(iconImg, currenTime, temp, humidity);
      $(".fiveDayCon").append(cardDiv);
    }
  });
}

// This button clears the history section of the page by clearing the local storage and the history section. 
$(".clearBtn").on("click", function(){
    localStorage.removeItem("history");
    $(".searchHistory").empty();
    btnArr = [];

})