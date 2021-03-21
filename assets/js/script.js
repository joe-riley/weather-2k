const apiKey = '9217f1ef2659514ded2247d6d5bfb3dc'
const baseUrl = 'https://api.openweathermap.org/data'
const endpointVersion = 2.5
const currentWeather = 'weather?q='
const currentFiveDayForcast = 'forecast?q='
const units = 'imperial'
const today = new Date();

let weatherData = (cityName) => {
    let weather, uv;
    fetch(`${baseUrl}/${endpointVersion}/weather?q=${cityName}&appid=${apiKey}&units=${units}`)
    .then(response => response.json())
    .then(weatherCallData => {
        weather = weatherCallData
        console.log(weather);
        fetch(`${baseUrl}/${endpointVersion}/uvi?lat=${weatherCallData.coord.lat}&lon=${weatherCallData.coord.lon}&appid=${apiKey}`)
        .then(uVResponse => uVResponse.json())
        .then((uVCallData) => {
            uv = uVCallData;
            console.log(uv);
        })
        .then(() => {
            clearCard();
            createCard(
                weather.name,
                weather.main.temp,
                weather.main.humidity,
                weather.wind.speed,
                uv.value,
            );
            addCityToList(weather.name);
        })
    })

    // Get 5 day forcast
    fetch(`${baseUrl}/${endpointVersion}/forecast?q=${cityName}&appid=${apiKey}&units=${units}`)
    .then(response => response.json())
    .then(weatherCallData => {
        console.log(weatherCallData);
        weatherCallData.list.forEach(dateTime => {
            if(dateTime.dt_txt.match(/.* 00:00:00/) ) {
                createForecastDay(
                    moment(dateTime.dt_txt).format('M/D/YYYY'),
                    dateTime.main.temp,
                    dateTime.main.humidity

                )
            }

        });
    })
};


const createTempSpan = (num) => {
    let temp = document.createElement('span')
    temp.innerText = `${num}°`;
    return temp;
}

const createCloudSpan = () => {
    return document.createElement('span')
        .setAttribute('class', 'oi oi-cloud');
}

const createHumiditySpan = (num) => {
    let humidity = document.createElement('span');
    humidity.textContent = `${num}%`;
    return humidity;
}

const createWindSpeedSpan = (num) => {
    let windSpeed = document.createElement('span');
    windSpeed.textContent = `${num} MPH`;
    return windSpeed;
}

const createUvIndexSpan = (num) => {
    let uVIndex = document.createElement('span');
    uVIndex.innerText = num;
    return uVIndex;
}

const clearCard = () => {
    let parentContainer = document.getElementById('cardBody');
    parentContainer.innerHTML = '';
}

// create city card - split some of the elements used in other areas as utility functions.
const createCard = (cityName, currentTemperature, currentHumidity, currentWindSpeed, currentUvIndex) => {
    let parentContainer = document.getElementById('cardBody');
    let city = document.createElement('h3');
        city.setAttribute('class', 'card-title');;
        city.setAttribute('id', 'cityName');
        city.innerText = cityName;
    let temperature = document.createElement('h6');
        temperature.setAttribute('class', 'card-subtitle mb-2 text-muted');
        temperature.setAttribute('id', 'currentTemperature');
        temperature.innerText = 'Temperature: ';
        temperature.append(createTempSpan(currentTemperature));
    let humidity = document.createElement('h6');
        humidity.setAttribute('class', 'card-subtitle mb-2 text-muted');
        humidity.setAttribute('id', 'currentHumidity');
        humidity.innerText = 'Humidity: ';
        humidity.append(createHumiditySpan(currentHumidity));
    let windSpeed = document.createElement('h6');
        windSpeed.setAttribute('class', 'card-subtitle mb-2 text-muted');
        windSpeed.setAttribute('id', 'currentWindSpeed');
        windSpeed.innerText = 'Wind Speed: ';
        windSpeed.append(createWindSpeedSpan(currentWindSpeed));
    let uVIndex = document.createElement('h6');
        uVIndex.setAttribute('class', 'card-subtitle mb-2 text-muted');
        uVIndex.setAttribute('id', 'currentUvIndex');
        uVIndex.innerText = 'UV Index: ';
        uVIndex.append(createUvIndexSpan(currentUvIndex));
    
    parentContainer.append(city);
    parentContainer.append(temperature)
    parentContainer.append(humidity)
    parentContainer.append(windSpeed)
    parentContainer.append(uVIndex);
}

const createForecastDay = (date, temp, humidity, image) => {
    const forcastSection = document.querySelector('#fiveDayForcast');

    const card = document.createElement('div');
    card.classList.add('card');
    
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    const heading = document.createElement('h5');
    heading.classList.add('card-title');
    heading.textContent = date.split(' ')[0];

    const tempText = document.createElement('p');
    tempText.classList.add('card-text');
    tempText.textContent = `Temp: ${temp}`;

    const humidityText = document.createElement('p');
    tempText.classList.add('card-text');
    humidityText.textContent = `Humidity: ${humidity}`;

    card.append(cardBody);
    cardBody.append(heading);
    cardBody.append(tempText);
    cardBody.append(humidityText);
    forcastSection.append(card);

}

// Save button event
let citySearch = (event) => {
    var searchInput = document.getElementById("city-search").value;
    // check for empty and set validation error
    if (searchInput) {
        weatherData(searchInput);
        //weatherData(searchInput, currentFiveDayForcast);
    }

};

// Add city to list
let addCityToList = (city) => {
    const citiesSearchedUl = document.querySelector('#cities-searched');
    const listEl = document.createElement('li');
    listEl.classList.add('list-group-item');
    listEl.textContent = city;
    citiesSearchedUl.appendChild(listEl);
}
