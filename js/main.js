const showMenu = (nav_toggle, nav_menu) => {
    const toggle = document.getElementById(nav_toggle),
        nav = document.getElementById(nav_menu);

    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('show-menu'); 
        });
    }
};

showMenu('nav_toggle', 'nav_menu'); 

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav-link')
const navClose = document.querySelector('.nav-close'); 

function linkAction(){
    const navMenu = document.getElementById('nav_menu')
    // When we click on each nav-link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))
navClose.addEventListener('click', linkAction);

/* ===== Header background ===== */

const shadowHeader =() =>{
    const header = document.getElementById('header')
    this.scrollY >= 50 ? header.classList.add('shadow-header')
                         : header.classList.remove('shadow-header')
}

window.addEventListener('scroll', shadowHeader)


/* ==== WEATHER SECTION ==== */

let weather = {
    "apikey": "48446d63bfd2884b47a81588cd660df7"
}


// Get user's location and fetch weather data
function getWeatherByLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            // Call the function to fetch weather data based on the location
            await getWeatherData(latitude, longitude);
        }, (error) => {
            console.error("Error getting location:", error);
        });
    } else {
        console.error("Geolocation is not supported by this browser.");
    }
}

// Fetch weather data based on latitude and longitude
async function getWeatherData(latitude, longitude) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weather.apikey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Update the weather card with the fetched data
        updateWeatherCard(data);
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}


// Update weather card with fetched data
function updateWeatherCard(data) {
    const weatherCity = document.querySelector('.weather-city');
    const weatherTemp = document.querySelector('.weather-temp');
    const weatherIcon = document.querySelector('.weather-icon');
    const weatherDescription = document.querySelector('.weather-description');
    const weatherHumidity = document.querySelector('.weather-humidity');
    const weatherWind = document.querySelector('.weather-wind');

    if (data.name && data.main) {
        weatherCity.textContent = `Weather in ${data.name}:`;
        weatherTemp.textContent = `${data.main.temp.toFixed(1)}°C`;
        weatherDescription.textContent = data.weather[0].description;
        weatherHumidity.textContent = `Humidity: ${data.main.humidity}%`;
        weatherWind.textContent = `Wind speed: ${data.wind.speed.toFixed(1)} km/h`;

        // You may want to handle weather icons separately based on the OpenWeatherMap API documentation
        // Example: weatherIcon.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    } else {
        console.error("Invalid weather data received:", data);
    }
}

// Automatically get weather on page load
document.addEventListener('DOMContentLoaded', () => {
    getWeatherByLocation();
});

// Function to handle the search button click event
function searchWeatherByCity() {
    const searchBar = document.querySelector('.weather-search-bar');
    const city = searchBar.value.trim();

    if (city !== '') {
        // Call the function to fetch weather data based on the entered city
        getWeatherByCity(city);
    }
}

// Add an event listener to the search button to trigger the manual weather search
const searchButton = document.querySelector('.weather-search-button');
searchButton.addEventListener('click', searchWeatherByCity);

// Function to fetch weather data based on the entered city
async function getWeatherByCity(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weather.apikey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Update the weather card with the fetched data
        updateWeatherCard(data);
    } catch (error) {
        console.error("Error fetching weather data by city:", error);
    }
}

// Function to handle the search button click event
function searchWeatherByCity() {
    const searchBar = document.querySelector('.weather-search-bar');
    const city = searchBar.value.trim();

    if (city !== '') {
        // Call the function to fetch weather data based on the entered city
        getWeatherByCity(city);
    }
}

// Add an event listener to the search button to trigger the manual weather search
searchButton = document.querySelector('.weather-search-button');
searchButton.addEventListener('click', searchWeatherByCity);



// Make scrolling smooth

document.addEventListener("DOMContentLoaded", function () {
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
  
    for (const link of smoothScrollLinks) {
      link.addEventListener("click", smoothScroll);
    }
  
    function smoothScroll(e) {
      e.preventDefault();
  
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);
  
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: "smooth",
        });
      }
    }
});
  