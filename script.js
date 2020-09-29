var btnArr = [];

$(".searchBtn").on("click", function () {
  // The First Click.
  var currenDate = moment().format(" (dddd, MMMM Do YYYY)");
  var searchHistory = $(".searchHistory");
  var historyBtn = $("<button>").addClass("mt-2 cityWeather");
  var cityName = $("#input").val();
  historyBtn.text(cityName);
  searchHistory.append(historyBtn);
  btnArr.push(historyBtn);

  // funtion to loop through the array 
  




  // This Imputs to the Current Weather on The first Click
  cityName = $("#input").val();
  var apiKey = "58d666652ff1413e43798800e2896f32";
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&appid=" +
    apiKey;

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    var tempEquation = (response.main.temp - 273.15) * 1.8 + 32;

    $(".cityName").text(response.name + currenDate);
    $(".temp").text("temperature: " + tempEquation);
    $(".humidity").text("Humidity: " + response.main.humidity + "%");
    $(".windSpeed").text("Wind Speed: " + response.wind.speed + "%");

    // console.log(response);

    // This Section sets the UV index
    var long = response.coord.lon;
    var latt = response.coord.lat;

    var UVurl =
      "http://api.openweathermap.org/data/2.5/uvi?lat=" +
      latt +
      "&lon=" +
      long +
      "&appid=" +
      apiKey;

    $.ajax({
      url: UVurl,
      method: "GET",
    }).then(function (UVresponse) {
      var UVindexVal = UVresponse.value;
      var UvId = $(".UVindex");
      UvId.text("UV Index: " + UVindexVal);



      // the date, an icon representation of weather conditions, the temperature,
      var fiveDayUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + apiKey;

      $.ajax({
        url: fiveDayUrl,
        method: "GET",
      }).then(function (fiveResponse) {
        // console.log((fiveResponse.list[0].main.temp - 273.15) * 1.8 + 32);
        console.log(fiveResponse);
        for (i = 0; i < 5; i++) {
          var cardDiv = $("<div>");
          var currentDay = fiveResponse.list[i];
          var temp = $("<p>").text("Temperature: " + (currentDay.main.temp - 273.15) * 1.8 + 32);
          var icon = $("<p>").text(currentDay.weather[0].icon);
          var currentDayText = $("<h1>").text(currentDay.dt_txt + icon);
          cardDiv.attr("class", "card-body border border-secondary");
          cardDiv.append(currentDayText, temp);
          $(".fiveDayCon").append(cardDiv);
        }

      });

      


    });
  });

  // This inputs to the Current on the Click of a history button.
  $(".cityWeather").on("click", function () {
    var searchBtn = $(this).text();

    cityName = $("#input").val();
    var apiKey = "58d666652ff1413e43798800e2896f32";
    var queryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      searchBtn +
      "&appid=" +
      apiKey;

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      var tempEquation = (response.main.temp - 273.15) * 1.8 + 32;

      $(".cityName").text(response.name);
      $(".temp").text("temperature: " + tempEquation);
      $(".humidity").text("Humidity: " + response.main.humidity + "%");
      $(".windSpeed").text("Wind Speed: " + response.wind.speed + "%");

      // This section sets the UV Index at the click of the history butoon
      var long = response.coord.lon;
      var latt = response.coord.lat;

      var UVurl =
        "http://api.openweathermap.org/data/2.5/uvi?lat=" +
        latt +
        "&lon=" +
        long +
        "&appid=" +
        apiKey;

      $.ajax({
        url: UVurl,
        method: "GET",
      }).then(function (UVresponse) {
        var UVindexVal = UVresponse.value;
        var UvId = $(".UVindex");
        UvId.text("UV Index: " + UVindexVal);
      });
    });
  });
});

function renderBtn() {
  // Create a for loop that will render the buttons and
}

