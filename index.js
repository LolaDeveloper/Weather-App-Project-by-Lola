function formatDate(timestamp){
let now = new Date();

let greeting = document.querySelector("#greet-user");
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
if (hours >= 5) {
  greeting.innerHTML = `Good morning! 🌄`;
}
if (hours >= 12) {
  greeting.innerHTML = `Good afternoon!`;
}
if (hours >= 18) {
  greeting.innerHTML = `Good evening! 🌆`;
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let today = days[now.getDay()];
return ` ${today} ${hours}:${minutes}`;
}

function formatDay(timestamp){
let date= new Date (timestamp* 1000);
let day= date.getDay();
let days= ["Sun","Mon", "Tue", "Wed", "Thu", "Fri", "Sat",];

return days[day];
}

function displayForecast (response){
  let forecast=response.data.daily;

  let weekForecast = document.querySelector("#dailyForecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index){
  if (index < 6){
    forecastHTML =
    forecastHTML +
  `
  <div class= "col-2">
  <div class = "weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="44"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temp.max
          )}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}° </span>
        </div>
      </div>
  `;
  }
});

forecastHTML=forecastHTML + `</div>`;
weekForecast.innerHTML=forecastHTML;
}

function getForecast (coordinates){
let apiKey = "3f6747337fbf92c2a1849a4d1e77403b";
let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function showWeather(response) {
  let currentTemperature = document.querySelector("#temp");  
  let city = response.data.name;
  let currentCity = document.querySelector("#city-names");
  let weather = document.querySelector("#weather-icon");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let currentDate = document.querySelector("#current-date");
  let iconElement = document.querySelector("#icon");
  
  celsiusTemperature=response.data.main.temp;

  currentTemperature.innerHTML = Math.round(celsiusTemperature);
  currentCity.innerHTML = `${city}`;
  weather.innerHTML = response.data.weather[0].description; 
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);
  currentDate.innerHTML= formatDate(response.data.dt*1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
getForecast(response.data.coord);
}

function search(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let h1 = document.querySelector("h1");
  if (cityInput.value) {
    h1.innerHTML = `${cityInput.value}`;
  } else {
    h1.innerHTML = null;
    alert("please type a city");
  }
  let city = `${cityInput.value}`;
}
function search(city) {
  let apiKey = "3f6747337fbf92c2a1849a4d1e77403b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

let form = document.querySelector("#search-city");
form.addEventListener("submit", search);

search ("Kutchan");







 function farenheitTemp(event) {
event.preventDefault();
let temperatureValue = document.querySelector("#temp");
celsius.classList.remove("active");
farenheit.classList.add("active");
let farenheitTemperature =(celsiusTemperature*9)/5+32;
temperatureValue.innerHTML = Math.round(farenheitTemperature);
}

function celsiusTemp(event) {
event.preventDefault();
celsius.classList.add("active");
farenheit.classList.remove("active");
let temperatureValue = document.querySelector("#temp");
temperatureValue.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let farenheit = document.querySelector("#farenheit-link");
farenheit.addEventListener("click", farenheitTemp);

let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", celsiusTemp);
