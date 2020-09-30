# My-Weather-app-Ivan


## Description 
Welcome to your own personal Day Work Shedule. That's right, now you can be orginized and know exactly what you are going to do two hours from now. As long as you stay between the hours of 9 and ten. He you will be presented with page, the current day and text areas where you can write out your day and save your plans for work. You start by writing out your plans and everytime you want to save that specific plan then you press the blue button to the right with the cool icon. wallah, you have saved your plans permenantly until you decide to change them. 

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