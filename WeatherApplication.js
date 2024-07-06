let cityName = document.querySelector(".weather_city");
let dateTime = document.querySelector(".weather_date_time");
let w_forecast = document.querySelector(".weather_forecast");
let w_temperature = document.querySelector(".weather_tempearture");
let w_icon = document.querySelector(".weather_icon");
let w_minTem = document.querySelector(".weather_min");
let w_maxTem = document.querySelector(".weather_max");

let w_feelsLike = document.querySelector(".weather_feelsLike");
let w_humidity = document.querySelector(".weather_humidity");
let w_wind = document.querySelector(".weather_wind");
let w_pressure = document.querySelector(".weather_pressure");
let citySearch = document.querySelector(".weather_search");

const getCountryName = (code) => {
    return new Intl.DisplayNames(['en'], { type: 'region' }).of(code);
};

const getDateTime = (dt) => {
    const curDate = new Date(dt * 1000);
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    };
    const formatter = new Intl.DateTimeFormat("en-US", options);
    const formattedDate = formatter.format(curDate);
    return formattedDate;
};

let city = "pune";

citySearch.addEventListener('submit', async (e) => {
    e.preventDefault();
    let cityNameInput = document.querySelector(".city_name");
    city = cityNameInput.value;
    await getWeatherData();
    cityNameInput.value = "";
});

const getWeatherData = async () => {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=6458800a234cabba283328fb5a734474`;
    try {
        const res = await fetch(weatherUrl);
        const data = await res.json();

        const { main, name, weather, wind, sys, dt } = data;
        cityName.innerHTML = `${name}, ${getCountryName(sys.country)}`;
        dateTime.innerHTML = getDateTime(dt);

        w_forecast.innerHTML = weather[0].main;
        w_icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${weather[0].icon}.png"/>`;

        // Convert temperatures from Kelvin to Celsius
        const tempCelsius = main.temp - 273.15;
        const feelsLikeCelsius = main.feels_like - 273.15;
        const tempMinCelsius = main.temp_min - 273.15;
        const tempMaxCelsius = main.temp_max - 273.15;

        w_temperature.innerHTML = `${tempCelsius.toFixed()}&#176;C`;
        w_minTem.innerHTML = `Min: ${tempMinCelsius.toFixed()}&#176;C`;
        w_maxTem.innerHTML = `Max: ${tempMaxCelsius.toFixed()}&#176;C`;

        w_feelsLike.innerHTML = `${feelsLikeCelsius.toFixed()}&#176;C`;
        w_humidity.innerHTML = `${main.humidity}%`;
        w_wind.innerHTML = `${wind.speed} m/s`;
        w_pressure.innerHTML = `${main.pressure} hPa`;
    } catch (error) {
        console.log(error);
    }
};

window.addEventListener('load', getWeatherData);