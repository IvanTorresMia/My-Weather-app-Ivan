# My-Weather-app-Ivan


## Description 
Welcome to your own personal Weather app! Weather you are an athlete trying wanting to know when you can and cannot not go out for a run, or you're a traveler wanting to see the weather of the next location you are going to. This app is for you! He you will be presented with a serch bar, there you will type the name of the city or location that you are visting or are currently in. You will then be presented with a container displaying the current weather forcast and as well as the five day forcast. Under your search bar you will have a history of the cities you have searched for. You will then have the option to clear all of your history through a button. with the text of "Clear History." 

## Technologies
* [JavaScript](https://www.w3schools.com/js/)
* [Bootstrap](https://getbootstrap.com/)
* [jQuery](https://jquery.com/)
* [momentsjs](https://momentjs.com/)
* [openweathermap](https://openweathermap.org/)


## Features
* Gif of my Website. 

![Quiz-Gif](Work-Gif-HW.gif)

* There are two parts to this first function. The first is this. Getting the current weather with the exception of the Uv Index. I had to call to another ap url for that. 
```
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

  ```


* This is the call to the UV Index API, I also have to take it and make if and else statements soo that it would change colors depending on the index. 

```
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
```
* This Code gets the history section and clears the local storage. 
```
  $(".clearBtn").on("click", function(){
    localStorage.removeItem("history");
    $(".searchHistory").empty();
    btnArr = [];

})
```

## Author
Ivan Torres
* [Deployed-Link](https://ivantorresmia.github.io/My-Weather-app-Ivan/)
* [GitHub-Repo](https://github.com/IvanTorresMia/My-Weather-app-Ivan)
* [linkedIn](www.linkedin.com/in/ivan-torres-0828931b2)

## Credits
* Credits for this homework assignment go out to Jerome, Manuel, Kerwin, Roger, and all of my classmates who helped me in study sessions. As well as my tutor who helped me a ton with understanding this homework assignment. As well as BC assistants who helped tons!
* [StackOverFlow](https://stackoverflow.com/)




## License]
[MIT](https://choosealicense.com/licenses/mit/#) license 