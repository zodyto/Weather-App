let searchMethod;

function getSearchMethod(searchTerm) {
    if (
        searchTerm.length === 5 &&
        Number.parseInt(searchTerm) + "" === searchTerm
    )
        searchMethod = "zip";
    else searchMethod = "q";
}

function setFavicon(url) {
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        document.getElementsByTagName("head")[0].appendChild(link);
    }
    link.href = url;
}

async function makeApiCall(searchTerm) {
    try {
        let response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&units=metric&appid=6573d4efd1d5a8a073edf58f672e5335`
        );
        let data = await response.json();

        document.getElementById("city-name").innerHTML = data.name;
        document.getElementById("temperature").innerHTML = data.main.temp;
        document.getElementById("weather-description").innerHTML =
            data.weather[0].description;
        const weatherImg = document.getElementById("weather-img");
        const weatherImageUrl =
            "http://openweathermap.org/img/wn/" +
            data.weather[0].icon +
            "@4x.png";
        weatherImg.src = weatherImageUrl;

        setFavicon(weatherImageUrl)

        document.getElementById("cloudiness").innerHTML =
            "Cloudiness: " + data.clouds.all + "%";
        document.getElementById("wind-speed").innerHTML =
            "Wind: " + data.wind.speed + " m/s";
        document.getElementById("humidity").innerHTML =
            "Humidity: " + data.main.humidity + "%";

        document.getElementById("weather-display").classList.remove("hidden");

        return data;
    } catch (err) {
        document.getElementById("weather-display").classList.add("hidden");
        setFavicon("/images/favicon.png");
        alert("Incorrect City Name / Zip code !");
    }
}

function getWeather() {
    let searchTerm = document.getElementById("query").value;
    getSearchMethod(searchTerm);
    makeApiCall(searchTerm).then((data) => {
        console.log(data);
    });
}
