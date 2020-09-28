
$(".searchBtn").on("click", function() {
    var searchHistory = $(".searchHistory");
    var historyBtn = $("<button>").addClass("mt-2 cityWeather");
    var cityName = $("#input").val();
    historyBtn.text(cityName);
    searchHistory.append(historyBtn);


    setCurrent();
    });  


function setCurrent() {

      var cityName = $("#input").val();
    var apiKey = "58d666652ff1413e43798800e2896f32";
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;

    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response){
        var tempEquation =  ((response.main.temp) - 273.15) * 1.80 + 32; 

         $(".cityName").text(response.name);
        $(".temp").text("temperature: " + tempEquation);
       $(".humidity").text("Humidity: " + response.main.humidity + "%");
       $(".windSpeed").text("Wind Speed: " + response.wind.speed + "%"); 
       $(".UVindex").text("UV Index: ")   
       
       
      }); 
}