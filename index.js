let now = new Date();
let current = document.querySelector("#current-date");
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
current.innerHTML = ` ${today} ${hours}:${minutes}`;

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
  let apiKey = "3f6747337fbf92c2a1849a4d1e77403b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}
let form = document.querySelector("#search-city");
form.addEventListener("submit", search);

function showWeather(response) {
  let currentTemperature = document.querySelector("#temp");  
  let city = response.data.name;
  let currentCity = document.querySelector("#city-names");
  let weather = document.querySelector("#weather-icon");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  
  celsiusTemperature=response.data.main.temp;

  currentTemperature.innerHTML = Math.round(celsiusTemperature);
  currentCity.innerHTML = `${city}`;
  weather.innerHTML = response.data.weather[0].description; 
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);
}


function retrievePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "3f6747337fbf92c2a1849a4d1e77403b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

 function farenheitTemp(event) {
event.preventDefault();
let temperatureValue = document.querySelector("#temp");
let farenheitTemperature =(celsiusTemperature*9)/5+32;
temperatureValue.innerHTML = Math.round(farenheitTemperature);
}

function celsiusTemp(event) {
event.preventDefault();
let temperatureValue = document.querySelector("#temp");
temperatureValue.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let farenheit = document.querySelector("#farenheit-link");
farenheit.addEventListener("click", farenheitTemp);

let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", celsiusTemp);
