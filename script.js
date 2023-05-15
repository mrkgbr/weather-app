const input = document.getElementById("search");
const city = document.querySelector(".city");
const country = document.querySelector(".country");
const localDate = document.querySelector(".local-date");
const localTime = document.querySelector(".local-time");
const temp = document.querySelector(".temp");
const feelsTemp = document.querySelector(".feels-temp");
const condition = document.querySelector(".condition");
const conditionIcon = document.querySelector(".condition-image");

async function getWeatherData(location) {
  const response = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=6c1d98490ab649898c675305231005&q=${location}&aqi=no`
  );
  const weatherData = response.json();
  return weatherData;
}

function fillHTML(data) {
  city.textContent = data.location.name;
  country.textContent = data.location.country;
  const fullDate = data.location.localtime;
  localDate.textContent = fullDate.split(" ")[0];
  localTime.textContent = fullDate.split(" ")[1];
  temp.textContent = data.current.temp_c + "°C";
  feelsTemp.textContent = data.current.feelslike_c + "°C";
  condition.textContent = data.current.condition.text;
  conditionIcon.src = data.current.condition.icon;
}

async function setWeatherData(loc) {
  // get weather data
  const data = await getWeatherData(loc);
  // fill html with data
  fillHTML(data);
}

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    setWeatherData(input.value);
  }
});

setWeatherData("Budapest");
