let btnArr = JSON.parse(localStorage.getItem("history")) || []; // Getting Local storage
let apiKey = "9ddc8097fb5593b533f4685eec567503";
renderBtn(); //Render the history buttons as soon as the page loads

// Global Varaibles
let currentCity = $(".cityName");
let temp = $(".temp");
let humidity = $(".humidity");
let windSpeed = $(".windSpeed");
let currentDate = moment().format(" (dddd, MMMM Do YYYY)");

// Event handlers
$(".searchBtn").on("click", search);
$(document).on("click", ".cityWeather", city);
$(".clearBtn").on("click", clearHistory);
$(".removeBtn").on("click", removeCity);

// Functions start here.
// =======================
//
// =======================

// Function to handle search.
function search() {
  let cityName = $("#input").val();
  btnArr.push(cityName);
  localStorage.setItem("history", JSON.stringify(btnArr));
  renderBtn(cityName);
  currentWeather(cityName);
  get5Day(cityName);
  $("#input").val("");
}

// Function to pass the city value to fucntions making API calls.
function city() {
  let cityName = $(this).text();
  currentWeather(cityName);
  get5Day(cityName);
}

// Function to render the Buttons once City is searched.
// Add a delete button for each button.
function renderBtn() {
  let searchHistory = $(".searchHistory");
  searchHistory.empty();
  for (let i = 0; i < btnArr.length; i++) {
    let historyBtn = $("<button>").addClass(
      "btn btn-secondary mt-2 cityWeather"
    );
    let removeBtn = $("<button>").addClass("btn btn-danger mt-2 removeBtn");
    let cityName = btnArr[i];
    historyBtn.text(cityName);
    removeBtn.text("Delete");
    searchHistory.append(historyBtn);
    searchHistory.append(removeBtn);
  }
}

function removeCity(event) {
  // event.preventDefault();

  console.log(this.previousElementSibling);

  for (i = 0; i < btnArr.length; i++) {
    if (this.previousElementSibling.innerHTML == btnArr[i]) {
      btnArr.splice(btnArr[i], 1);
    }
  }
  let searchHistory = $(".searchHistory");
  searchHistory.innerHTML = "";
  localStorage.setItem("history", JSON.stringify(btnArr));
  renderBtn(btnArr);
}

function currentWeather(cityName) {
  let queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&appid=" +
    apiKey +
    "&units=imperial";
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    let tempEquation = response.main.temp;

    currentCity.text(response.name + currentDate);
    temp.text("temperature: " + tempEquation + "°");
    humidity.text("Humidity: " + response.main.humidity + "%");
    windSpeed.text("Wind Speed: " + response.wind.speed + "MPH");

    let long = response.coord.lon;
    let latt = response.coord.lat;
    let UVurl =
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
      let UVindexVal = UVresponse.value;
      let UvSpan = $(".uvIndex");
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

function get5Day(cityName) {
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
      let cardDiv = $("<div>");
      let currentDay = fiveResponse.list[i];
      let temp = $("<p>").text("Temperature: " + currentDay.main.temp + "°");
      let currenTime = $("<p>").text(currentDay.dt_txt.substring(0, 10));
      currenTime.attr("style", "font-weight: bold;");
      let humidity = $("<p>").text("Humidity: " + currentDay.main.humidity);
      let iconImg = $("<img>");
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

function clearHistory() {
  localStorage.removeItem("history");
  $(".searchHistory").empty();
  btnArr = [];
}
