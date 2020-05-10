console.log ("Start weather app");

var cacheKey = "known-cities";



//Get mu starting data, try to load from local storage
var cities = JSON.parse(localStorage.getItem (cacheKey));

if (!cities){
    cities =[]; 
}

showHistory();

function showHistory() {
  $("#citylist").html("");
  for( var i=0; i<cities.length; i++){
    var city = cities[i];

    var cityEl = $("<li>");
    cityEl.text(city);
    cityEl.addClass("list-group-item");
    cityEl.on("click",function(){
      searchWeather($(this).text());
    })
    $("#citylist").append(cityEl);
  }
}

// configuring search button
var btn = $("#btn");
btn.on('click', function(){
  var searchCity = $("#city").val();
  console.log(searchCity);
  if(searchCity != "") {
    searchWeather (searchCity);
  } 
});


// Fetch the City


// Display the City


// Starting point
function searchWeather (city){
  addNewCity(city);
  fetchWeather(city);
}

//Get weather from API
function fetchWeather (city){
  var queryParams = $.param({
    q:city,
    appid:"ec0edd488270df0ee783102d43a65daf",
    units:"imperial"
  })
  console.log(queryParams)
  var queryUrl = "https://api.openweathermap.org/data/2.5/weather?"+queryParams
console.log(queryUrl)
  $.ajax({ 
    url: queryUrl,
    method: "GET",

  }) .then(function(response){
      console.log (response); 
      displayWeather (response);
      fetchUV (response.coord);
      fetchForcast (response.coord)

  }) 
}


// Display the city data
function displayWeather (cityData){
  var date = moment().format('l');
  var condition = cityData.weather[0].main; 
  var cityName = cityData.name + " (" + date + ") " + condition;
  $("#CityName").text(cityName);


  var temp = "Temperature: " + cityData.main.temp +" F";
  var hum = "Humidity: " + cityData.main.humidity + " %";
  var wind = "Wind Speed: " + cityData.wind.speed + " MPH";

  $("#Temp").text(temp);
  $("#Hum").text(hum);
  $("#Wind").text(wind);
}


// Get weather from the API
function fetchUV (coord){
  var queryParams = $.param({
    appid:"ec0edd488270df0ee783102d43a65daf",
    lat:coord.lat,
    lon:coord.lon
  })
  console.log(queryParams)
  var queryUrl = "https://api.openweathermap.org/data/2.5/uvi?"+queryParams
  console.log(queryUrl)
  $.ajax({ 
    url: queryUrl,
    method: "GET",

  }) .then(displayUVData) 
 
}


//Display the UV data
function displayUVData(UVData){
  console.log (UVData); 
  var uv ="UV Index: " + UVData.value;
  $("#UV").text(uv);
}

// Get weather from the API
function fetchForcast (coord){
  var queryParams = $.param({
    appid:"ec0edd488270df0ee783102d43a65daf",
    lat:coord.lat,
    lon:coord.lon 
    
  })
  console.log(queryParams)
  var queryUrl = "https://api.openweathermap.org/data/2.5/forecast?"+queryParams
  console.log(queryUrl)
  $.ajax({ 
    url: queryUrl,
    method: "GET",

  }) .then(displayForcast) 

}


//Display the forecast data
function displayForcast (forcastData){
  console.log (forcastData); 
for( var i=0; i<forcastData.list.length;i++){
 var data = forcastData.list[i];
 if( data.dt_txt.indexOf("12:00:00") != -1){
   
 }
}


function addNewCity(city){
  if (cities.indexOf (city)== -1){

      console.log ("Add new city")
      cities.push(city);
      localStorage.setItem(cacheKey, JSON.stringify(cities));

  }
  showHistory();
}
