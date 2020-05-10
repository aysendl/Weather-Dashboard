console.log ("Start weather app");

var cacheKey = "knownCities";


//Get mu starting data, try to load from local storage
var cities = JSON.parse(localStorage.getItem (cacheKey));

if (!cities){
    cities =[]; 
}


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
    appid:"ec0edd488270df0ee783102d43a65daf"
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

}
function addNewCity(city){
if (cities.indexOf (city)== -1){

    console.log ("Add new city")
    cities.push(city);
    localStorage.setItem(cacheKey, JSON.stringify(cities));

}

}
searchWeather ("Santa Rosa")