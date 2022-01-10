let input = document.getElementById("input");
let button = document.getElementById("button");
let form = document.getElementById("form");

let weather = {
    ApiKey: "774a019ca4da208abd61e0b947b0f1f2",
    getWeather: function(city){
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q="
            + city +
            "&units=metric&appid=" 
            + this.ApiKey
        )
        .then((response) => {
            if(!response.ok){
                alert("Weather not found");
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
            this.showWeather(data)
        })
    },
    showWeather: function(data){
        const name = data.name;
        const temp = data.main.temp;
        let desc = data.weather[0].description;
        desc = desc.charAt(0).toUpperCase() + desc.slice(1);
        const humidity = data.main.humidity;
        const windSpeed = (data.wind.speed * 3.6).toFixed(1);

        document.getElementById("cityName").innerText = "Weather in " + name;
        document.getElementById("temp").innerHTML = temp + " °C";
        document.getElementById("desc").innerHTML = desc;
        document.getElementById("humidity").innerHTML = "Humidity: " + humidity + "%"
        document.getElementById("windSpeed").innerHTML = "Wind Speed: " + windSpeed + " kmph"
    },
};

form.addEventListener("submit", searchWeather);

function searchWeather(e){
    e.preventDefault();
    console.log(input.value);
    if(input.value === ""){
        alert("Enter City Name");
    }
    else{
        let cityN = input.value;
        weather.getWeather(cityN);
        input.value = "";
    }
}

weather.getWeather("pune");