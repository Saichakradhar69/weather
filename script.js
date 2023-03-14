const searchBtn = document.querySelector("button");
const searchInput = document.querySelector(".search-bar");
const cardOutput = document.querySelector("#card-output");

function fetchWeatherData(city) {
  const apiKey = "520bcb6a0ff7262898dd6cf6b4df38f8";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const temperature = Math.round(data.main.temp);
      const description = data.weather[0].description;
      const icon = data.weather[0].icon;
      const cityName = data.name;
      const countryName = data.sys.country;

      const cardContent = `
        <h1> Weather in ${cityName}</h1>
        <img src="http://openweathermap.org/img/w/${icon}.png" alt="weather icon" />
        <h2>${temperature}°C</h2>
        <h3>${description}</h3>
        <h4>${cityName}, ${countryName}</h4>
      `;
      cardOutput.innerHTML = cardContent;
      document.body.style.backgroundImage =
        "url('https://source.unsplash.com/1600x900/?" + description +"')";
    })
    .catch((error) => {
      console.log("Error: ", error);
      cardOutput.innerHTML = "Sorry, an error occurred.";
    });
    
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const apiKey = "520bcb6a0ff7262898dd6cf6b4df38f8";
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

        fetch(apiUrl)
          .then((response) => response.json())
          .then((data) => {
            const cityName = data.name;
            fetchWeatherData(cityName);
          })
          .catch((error) => {
            console.log("Error: ", error);
            cardOutput.innerHTML = "Sorry, an error occurred.";
          });
      },
      (error) => {
        console.log("Error: ", error);
        cardOutput.innerHTML = "Sorry, an error occurred.";
      }
    );
  } else {
    cardOutput.innerHTML = "Geolocation is not supported by this browser.";
  }
}
searchBtn.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      fetchWeatherData(city);
    }
  });

searchBtn.addEventListener("click", () => {
  const city = searchInput.value;
  fetchWeatherData(city);
});


getLocation();
