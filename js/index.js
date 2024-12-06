


var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// Fetch weather data from the WeatherAPI
async function getWeather(cityName) {


  try {
    var response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=fdce13cd590849da8e591745240512&q=07112&q=${cityName}&days=3`);
    if (response.ok) {
      var cityWeather = await response.json();
      display(cityWeather.location, cityWeather.current);
      displayForecast(cityWeather.forecast.forecastday);
    } else {
      console.error(`Failed to fetch weather data: ${response.status}`);
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
    alert(error)
  }
}

// Display current weather information
function display(weatherLoc, weatherCurrent) {
  if (weatherCurrent) {
    var date = new Date(weatherCurrent.last_updated.replace(" ", "T"));
    var mainInfo = `
            <div class="today col-md-4 forecast">
                <div class="content">
                    <div class="forecast-header d-flex justify-content-between" id="today">
                        <div class="day">${days[date.getDay()]}</div>
                        <div class="date">${date.getDate()} ${monthNames[date.getMonth()]}</div>
                    </div>
                    <div class="forecast-content text-start" id="current">
                        <div class="location">${weatherLoc.country}</div>
                        <div class="degree d-flex align-items-center justify-content-between">
                            <div class="num">${weatherCurrent.temp_c}<sup>o</sup>C</div>
                            <div class="forecast-icon">
                                <img src="${weatherCurrent.condition.icon}" alt="" width="90" />
                            </div>
                        </div>
                        <div class="custom text-primary my-3">${weatherCurrent.condition.text}</div>
                        <span><i class="fa-solid me-2 fa-umbrella"></i>${weatherCurrent.cloud}%</span>
                        <span><i class="fa-solid me-1 fa-wind"></i>${weatherCurrent.wind_kph} km/h</span>
                        <span><i class="fa-regular me-1 fa-compass"></i>${weatherCurrent.wind_dir}</span>
                    </div>
                </div>
            </div>`;
    document.getElementById('forecast').innerHTML = mainInfo;
  }
}

// Display forecast information for the next days
function displayForecast(daysForecast) {
  let cartona = '';
  for (let i = 1; i < daysForecast.length; i++) {
    var day = daysForecast[i];
    var forecastDate = new Date(day.date.replace(" ", "T"));
    cartona += `
            <div class="forecast col-md-4 second-day">
                <div class="forecast-header">
                    <div class="day">${days[forecastDate.getDay()]}</div>
                </div>
                <div class="forecast-content">
                    <div class="forecast-icon">
                        <img src="${day.day.condition.icon}" alt="" width="48" />
                    </div>
                    <div class="degree">${day.day.maxtemp_c}<sup>o</sup>C</div>
                    <small>${day.day.mintemp_c}<sup>o</sup></small>
                    <div class="custom text-primary my-3">${day.day.condition.text}</div>
                </div>
            </div>`;
  }
  document.getElementById('forecast').innerHTML += cartona;
}

// Search functionality triggered by keyup event
document.querySelector('.searchInput').addEventListener('keyup', async function (e) {

  var cityName = e.target.value;
  if (cityName) {
    // Clear previous results
    document.getElementById('forecast').innerHTML = '';
    await getWeather(cityName);
  }
});


getWeather('Cairo');
