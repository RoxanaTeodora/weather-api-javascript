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

// Built-in API request by city name
// You can call by city name or city name in English:
//Bucharest Almaty Prague  Malaga Nairobi  Munich Alaska New York

//Serverul Web de Informații Meteorologice: Furnizează date meteorologice și oferă un API prin care aplicatia web poate solicita și primi aceste date.

//functie asincrona cu wait fetch

async function checkWeather(city) {
  const url =
    "https://api.openweathermap.org/data/2.5/weather?appid=69518b1f8f16c35f8705550dc4161056&units=metric&q=";

  //utilizare fetch pt obtinerea datelor din api endpoin si transformarea lor in json care apoi sa fie utilizate in DOM cand promisiunea se rezolva
  //get cu url schimbate in
  const weatherData = await fetch(`${url}${city}`).then((response) =>
    response.json()
  );

  //display error for location clasa location_not_found trece din none la display:flex, clasa weatherBody ramane in display none
  if (weatherData.cod === `404`) {
    location_not_found.style.display = "flex";
    weatherBody.style.display = "none";
    console.log("error");
    return;
  }

  //display clasa weatherBody si clasa in location_not_found ramene in display:none
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

  //output in html a informatiilor primite din api
  data.innerHTML = ` ${date}`;
  temperature.innerHTML = `${Math.round(weatherData.main.temp)}°C`;
  description.innerHTML = `${weatherData.weather[0].description}`;
  humidity.innerHTML = `${weatherData.main.humidity}%`;

  //wind.speed cu o zecimale
  windSpeed.innerHTML = `${weatherData.wind.speed.toFixed(1)}km/h`;

  //schimbarea tipului de icon in functie de descrierea vremei

  // switch case
  // switch (weatherData.weather[0].main) {
  //   case "Clear":
  //     weatherImg.src = "/img/sun.png";
  //     breack;
  //   case "Clouds":
  //     weatherImg.src = "/img/cloud.png";
  //     breack;
  //   case "Rain":
  //     weatherImg.src = "/img/rain.png";
  //     breack;
  //   case "Snow":
  //     weatherImg.src = "/img/snow.png";
  //   case "Storm":
  //     weatherImg.src = "/img/strom.png";
  //     breack;
  //   case "Mist":
  //     weatherImg.src = "/img/mist.png";
  //     breack;
  //   case "Smoke":
  //     weatherImg.src = "/img/mist.png";
  //     breack;
  //   case "Fog":
  //     weatherImg.src = "/img/mist.png";
  //     breack;
  // }

  // switch (weatherData.weather[0].description) {
  //   case "broken clouds":
  //     weatherImg.src = "/img/broken-clouds.png";
  //     breack;
  //   case "overcast clouds":
  //     weatherImg.src = "/img/broken-clouds.png";
  //     breack;
  // }

  //if case pt flexibilitate mai mare de a folosii mai multe variabile
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
//prin apasarrea butonului de search se exercuta functia
searchBtn.addEventListener("click", () => {
  checkWeather(inputSearch.value);
});
