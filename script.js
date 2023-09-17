// Interação
const citySearchInput = document.getElementById('city-search-input');
const citySearchButton = document.getElementById('city-search-button');

// Exibição
const currentDate = document.getElementById("current-date");
const cityName = document.getElementById("city-name");
const countryFlag = document.getElementById("country-flag");
const weatherIcon = document.getElementById("weather-icon");
const weatherDescription = document.getElementById("weather-description");
const currentTemperature = document.getElementById("current-temperature");
const windSpeed = document.getElementById("wind-speed");
const feelsLikeTemperature = document.getElementById("feels-like-temperature");
const currentHumidity = document.getElementById("current-humidity");
const sunriseTime = document.getElementById("sunrise-time");
const sunsetTime = document.getElementById("sunset-time");

const api_key = "4a18b89d932aff437852fe600846f6f2";

citySearchButton.addEventListener("click", () => {
    let cityName = citySearchInput.value;
    getCityWeather(cityName);
});

navigator.geolocation.getCurrentPosition((position) => {
    console.log(position);
});

function getCityWeather(cityName) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&lang=pt_br&appid=${api_key}`)
      .then((response) => {
          if (response.ok) {
              return response.json();
          } else {
              throw new Error('City not found');
          }
      })
      .then((data) => {
          displayWeather(data);
          document.getElementById('city-error').style.display = 'none';
      })
      .catch((error) => {
          console.error(error);
          document.getElementById('city-error').innerHTML = 'Não foi identificada uma cidade  correspondente a essa pesquisa';
          document.getElementById('city-error').style.display = 'block';
          cityName.textContent = '';
      });
}


function displayWeather(data) {
    let {
        dt,
        name,
        sys: { country },
        weather: [{ icon, description }],
        main: { temp, feels_like, humidity },
        wind: { speed },
        sys: { sunrise, sunset },
    } = data;

    currentDate.textContent = formatDate(dt);
    cityName.textContent = name;
    document.getElementById('city-country').textContent = `, ${country}`;
    countryFlag.style.display = "inline";
    getCountryFlag(country);

    weatherIcon.src = `./assets/${icon}.svg`;
    weatherDescription.textContent = description;
    currentTemperature.textContent = `${Math.round(temp)}°C`;
    windSpeed.textContent = `${Math.round(speed * 3.6)}km`;
    feelsLikeTemperature.textContent = feels_like;
    currentHumidity.textContent = `${humidity}%`;
    sunriseTime.textContent = formatTime(sunrise);
    sunsetTime.textContent = formatTime(sunset);
}

function formatTime(epochTime) {
    let date = new Date(epochTime * 1000);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    return `${hours}:${minutes}`;
}

function formatDate(epochTime) {
    let date = new Date(epochTime * 1000);
    let formattedDate = date.toLocaleDateString('pt-BR', { month: "long", day: 'numeric' });
    return `Hoje, ${formattedDate}`;
}

function getCountryFlag(countryCode) {
    const flagUrl = `https://www.countryflagicons.com/FLAT/64/${countryCode}.png`;
    countryFlag.src = flagUrl;
    countryFlag.style.display = 'inline';
}


// Enter teclado

citySearchInput.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Evitar que a página seja recarregada
        let cityName = citySearchInput.value;
        getCityWeather(cityName);
    }
});

citySearchButton.addEventListener("click", () => {
    let cityName = citySearchInput.value;
    getCityWeather(cityName);
});