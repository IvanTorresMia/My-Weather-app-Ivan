// Getting Local Storage and avoiding a "null" the first time around
var btnArr = JSON.parse(localStorage.getItem("history")) || [];
// API key for the 3rd party API
var apiKey = "58d666652ff1413e43798800e2896f32";

renderBtn();

// This is an event listener for the search button.
$(".searchBtn").on("click", function () {
  // grabbing the value for the input inside the city name
  var cityName = $("#input").val();
  // Pushing into local storage, im ussiming it acts as an array.
  btnArr.push(cityName);
  // Setting local storage, using the array btnArr
  localStorage.setItem("history", JSON.stringify(btnArr));
  // passing the value of the city name to the renderBtn function.
  renderBtn(cityName);
  // Passing that same value to the function currentWeather
  currentWeather(cityName);
  // passing that same value to the function get5Dat()
  get5Day(cityName);
});

// This function will render the weather depending on which button you click 
// from search history. 
$(document).on("click", ".cityWeather", function () {
  // This stores the current button being clicked with the same class. 
  var cityName = $(this).text();
  // this is to test which button I am clicking at the bmoment. 
  console.log(cityName);
  // This passes the valuye of the current button that is being pressed
  currentWeather(cityName);
  // passing the text of the current button being pressed to this function.
  get5Day(cityName);
});
// This Function renders Buttons and it called both for local storage and for the search button.
function renderBtn() {
  // make this render from your btnArr instead

  // This is a hook to the search history div
  var searchHistory = $(".searchHistory");
// we have to empty the search container each time that we render the buttons
// if we don't do this then we will have doubles.
  searchHistory.empty();
  // redering buttons for every item in the local storage.
  for (var i = 0; i < btnArr.length; i++) {
    // Button inside the history 
    var historyBtn = $("<button>").addClass("mt-2 cityWeather");
    // storing the name of the city in this variable. 
    var cityName = btnArr[i];
    // appending the text of the button with the city name. 
    historyBtn.text(cityName);
    // appending the 
    searchHistory.append(historyBtn);
  }
}

// This function does an api call for both the current weather and the UV index.
// Then it appends the information to each button that is clciked.
function currentWeather(cityName) {
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
      var UvSpan = $(".uvIndex");
      UvSpan.text(UVindexVal);
      if (UVindexVal > 10) {
        UvSpan.attr(
          "style",
          "background-color: purple; padding: 5px; border: 1px solid black"
        );
      } else if (UVindexVal < 10 && UVindexVal > 7) {
        UvSpan.attr(
          "style",
          "background-color: red; padding: 5px; border: 1px solid black"
        );
      } else if (UVindexVal < 8 && UVindexVal > 5) {
        UvSpan.attr(
          "style",
          "background-color: orange; padding: 5px; border: 1px solid black"
        );
      } else if (UVindexVal < 6 && UVindexVal > 2) {
        UvSpan.attr(
          "style",
          "background-color: yellow; padding: 5px; border: 1px solid black"
        );
      } else {
        UvSpan.attr(
          "style",
          "background-color: green; padding: 5px; border: 1px solid black"
        );
      }
    });
  });
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
      var temp = $("<p>").text("Temperature: " + currentDay.main.temp + "°");
      var currenTime = $("<p>").text(currentDay.dt_txt.substring(0, 10));
      currenTime.attr("style", "font-weight: bold;");
      var humidity = $("<p>").text("Humidity: " + currentDay.main.humidity);
      var iconImg = $("<img>");
      iconImg.attr(
        "src",
        "https://openweathermap.org/img/wn/" +
          currentDay.weather[0].icon +
          "@2x.png"
      );
      cardDiv.attr(
        "class",
        "card card-body border border-secondary bg-primary"
      );
      cardDiv.append(iconImg, currenTime, temp, humidity);
      $(".fiveDayCon").append(cardDiv);
    }
  });
}

// This button clears the history section of the page by clearing the local storage and the history section.
$(".clearBtn").on("click", function () {
  localStorage.removeItem("history");
  $(".searchHistory").empty();
  btnArr = [];
});
