const weatherData = [];
let cityIndex = 0;

function changeCity() {
  city = document.querySelector("#change-city");
  city.classList.toggle("show");
}

function selectCity(event) {
  cityIndex = event.target.value;
  updateWeatherDetails();
  updateIncomingWeatherDetails();
}

async function fetchData() {
  try {
    const response = await fetch("./placeholderData.json");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    // Assuming each data item represents weather details
    weatherData.push(...data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Call fetchData and wait for it to complete before rendering
async function initialize() {
  await fetchData();
  customElements.define("weather-details", WeatherDetails);
  customElements.define("incoming-weather-details", IncomingWeatherDetails);
  customElements.define("select-city", SelectCity);
}

function updateWeatherDetails() {
  const weatherDetailsElement = document.querySelector("weather-details");

  if (weatherData.length > 0) {
    weatherDetailsElement.innerHTML = `
      <h1 onclick="changeCity()">${weatherData[cityIndex].location}</h1>
      <div>
        <img src="${weatherData[cityIndex].current.weather_icon}" alt="weather-icon" />
        <h1>${weatherData[cityIndex].current.weather_condition}</h1>
        <div>
          <span>wind: ${weatherData[cityIndex].current.wind}</span>
          <span>temperature: ${weatherData[cityIndex].current.temperature}</span>
          <span>humidity: ${weatherData[cityIndex].current.humidity}</span>
        </div>
      </div>
    `;
  } else {
    weatherDetailsElement.innerHTML = `<p>No weather data available</p>`;
  }
}

class WeatherDetails extends HTMLElement {
  connectedCallback() {
    // Check if weatherData has data before trying to access it
    if (weatherData.length > 0) {
      updateWeatherDetails();
    } else {
      this.innerHTML = `<p>No weather data available</p>`;
    }
  }
}

function updateIncomingWeatherDetails() {
  const incomingWeatherDetailsElement = document.querySelector("incoming-weather-details");

  // Check if IncomingWeatherData has data before trying to access it
  if (weatherData[cityIndex].succeeding.length > 0) {
    incomingWeatherDetailsElement.innerHTML = `
            <span>
              <small>Weather Condition</small> |
              <small>Wind</small> |
              <small>Temperature</small> |
              <small>Humidity</small> |
              <small>Time</small>
            </span>
      ${weatherData[cityIndex].succeeding
        .map(
          (item) =>
            `<span>
              <small>${item.weather_condition}</small> |
              <small>${item.wind}</small> |
              <small>${item.temperature}</small> |
              <small>${item.humidity}</small> |
              <small>${item.time}</small>
            </span>`
        )
        .join(" ")}`;
  } else {
    incomingWeatherDetailsElement.innerHTML = `<span>No weather data available</span>`;
  }
}

class IncomingWeatherDetails extends HTMLElement {
  connectedCallback() {
    if (weatherData.length > 0) {
      updateIncomingWeatherDetails();
    } else {
      this.innerHTML = `<p>No weather data available</p>`;
    }
  }
}

class SelectCity extends HTMLElement {
  connectedCallback() {
    // Check if IncomingWeatherData has data before trying to access it
    if (weatherData.length > 0) {
      this.innerHTML = `
      ${weatherData
        .map(
          (item, index) =>
            ` <span>
                <input type="radio" name="city" value="${index}" onclick="selectCity(event)" />
                <label for="city">${item.location}</label>
              </span>`
        )
        .join(" ")}`;
    } else {
      this.innerHTML = `<span>No Data Available</span>`;
    }
  }
}

// Call initialize to set up the custom element and render it
initialize();
