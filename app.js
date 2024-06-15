const inputSearch = document.querySelector(".input-box");
const searchBtn = document.getElementById("search-btn");
const weatherImg = document.querySelector(".weather-img");
const temperature = document.querySelector(".temperature");
const description = document.querySelector(".description");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");
const data = document.getElementById("date");
const location_not_found = document.querySelector(".location-not-found");
const weatherBody = document.querySelector(".weather-card");
const APIurl =
  "https://api.openweathermap.org/data/2.5/weather?appid=69518b1f8f16c35f8705550dc4161056&units=metric&q=";

async function checkWeather(city) {
  const weatherData = await fetch(`${APIurl}${city}`).then((response) =>
    response.json()
  );

  if (weatherData.cod === `404`) {
    location_not_found.style.display = "flex";
    weatherBody.style.display = "none";
    console.log("error");
    return;
  }

  console.log("run");
  location_not_found.style.display = "none";
  weatherBody.style.display = "flex";

  //data transformata din unixtime in format eupean
  const getLocaleDateFromUnixTime = (unixTimeInSeconds) => {
    // timpul Unix în milisecunde
    const date = new Date(unixTimeInSeconds * 1000);
    //utilizarea metodelor pentru a extrage componente specifice datei
    const day = date.getDate();
    //lunile sunt indexate de la 0
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
  };
  const date = getLocaleDateFromUnixTime(weatherData.dt);

  data.innerHTML = ` ${date}`;
  temperature.innerHTML = `${Math.round(weatherData.main.temp)}°C`;
  description.innerHTML = `${weatherData.weather[0].description}`;
  humidity.innerHTML = `${weatherData.main.humidity}%`;

  windSpeed.innerHTML = `${weatherData.wind.speed.toFixed(1)}km/h`;

  if (weatherData.weather[0].main === "Clear") {
    weatherImg.src = "/img/sun.png";
  } else if (weatherData.weather[0].description === "broken clouds") {
    weatherImg.src = "/img/broken-clouds.png";
  } else if (weatherData.weather[0].description === "overcast clouds") {
    weatherImg.src = "/img/broken-clouds.png";
  } else if (weatherData.weather[0].main === "Clouds") {
    weatherImg.src = "/img/cloud.png";
  } else if (weatherData.weather[0].main === "Rain") {
    weatherImg.src = "/img/rain.png";
  } else if (weatherData.weather[0].main === "Storm") {
    weatherImg.src = "/img/strom.png";
  } else if (weatherData.weather[0].main === "Mist") {
    weatherImg.src = "/img/mist.png";
  } else if (weatherData.weather[0].main === "Snow") {
    weatherImg.src = "/img/snow.png";
  } else if (weatherData.weather[0].main === "Smoke") {
    weatherImg.src = "/img/smoke.png";
  } else if (weatherData.weather[0].main === "Fog") {
    weatherImg.src = "/img/smoke.png";
  }

  console.log(weatherData);
}

searchBtn.addEventListener("click", () => {
  checkWeather(inputSearch.value);
});
