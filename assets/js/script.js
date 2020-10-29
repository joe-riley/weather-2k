var api_key = '9217f1ef2659514ded2247d6d5bfb3dc'

let weatherData = (cityName) => {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${api_key}`)
        .then(response => {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);
                });
            } else {
                // set error message
            }
        })
        .catch(function (error) {
            console.warn(`Unable to connect to Open Weather:\n${error}`);
        });
}

weatherData('asldkfj');

// create city card

// create 5 day forcast


// Save button event
let citySearch = (event) => {
    var searchInput = document.getElementById("city-search").value;
    // check for empty and set validation error


};
