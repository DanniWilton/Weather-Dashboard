currentDate = moment().format('dddd, MMMM Do YYYY');
$("#currentDay").text(currentDate);

// fetch weather data
var weatherData = "";

const searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", clickEventFunction)

let search = document.getElementById("searchInput");

function clickEventFunction() {

  let city = search.value
  var searchedCity = document.getElementById ("searchedCity");
  searchedCity.textContent = city
  getFetch(city)
  }

function getFetch(city) {
fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=6c06f9f1820d7cce0add7c2c813d7985`)
  .then(function (response) {
    return response.json();})
  .then(function(data) {
    weatherData = data
    var lat = data.coord.lat;
    var lon = data.coord.lon;
    secondFetchCall(lat, lon)
  ;})
  .catch (error => console.log(error));}

  function secondFetchCall(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=6c06f9f1820d7cce0add7c2c813d7985&units=metric`)
    .then(function(response) {
      return response.json();})
    .then(function(data) {
      
      var currentTemp = data.current.temp;
      var currentTempElement = document.getElementById("currentTemp")
      currentTempElement.textContent = `Temp: ${currentTemp} °C`

      var currentWind = data.current.wind_speed;
      var currentWindElement = document.getElementById("currentWind")
      currentWindElement.textContent = `Wind: ${currentWind}`

      var currentHumidity = data.current.humidity;
      var currentHumidityElement = document.getElementById("currentHumidity")
      currentHumidityElement.textContent = `Humidity: ${currentHumidity} `

      var currentUvIndex = data.current.uvi;
      var currentUvIndexElement = document.getElementById("currentUvIndex")
      currentUvIndexElement.textContent = `UV Index: ${currentUvIndex}`

      var icon = document.getElementById (`icon`)
      var image = data.daily[0].weather[0].icon
      icon.src = `http://openweathermap.org/img/wn/${image}@2x.png`

      for (let i = 1; i < 6; i++) {;
        var fiveDayForecastTemp = data.daily[i].temp.max
        var fiveDayForecastWind = data.daily[i].wind_speed
        var fiveDayForecastHumidity = data.daily[i].humidity

        var tempElement = document.querySelector (`#day${i} .temp`)
        var windElement = document.querySelector (`#day${i} .wind`)
        var humidityElement = document.querySelector (`#day${i} .Humidity`)
        tempElement.textContent = `Temp: ${fiveDayForecastTemp} °C`
        windElement.textContent = `Wind: ${fiveDayForecastWind}`
        humidityElement.textContent = `Humidity: ${fiveDayForecastHumidity}`

        var date = document.querySelector (`#day${i} .date `)
        date.textContent = moment().add(i, 'days').format('DD/MM/YY');

        var icon = document.querySelector (`#day${i} .icon`)
        var image = data.daily[i].weather[0].icon
        icon.src = `http://openweathermap.org/img/wn/${image}@2x.png`

      }

      })
    }

    //retrieve data and append to element






// favourable/moderate/severe
//icons 
//local storage


// function localStorageSearchHistory() {
//   cityNames = ["searchedCity"];
//   localStorage.setItem("searchHistory", JSON.stringify(cityNames));
// }
// localStorage.setItem('search', city)




// .fetch(apiInHere).then(function (whatYouWantItToDoWithThisApi){
//   return whatYouWantItToDoWithThisApi.json()



