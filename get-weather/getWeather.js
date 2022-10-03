
const API_URL = 'https://api.openweathermap.org/data/2.5/weather?lat=47.66&lon=36.27';

async function getWeather() {
    let response = await fetch(API_URL);
    if (response.ok) {
        let res = await response.json();
        return res;
    }

    else {
        console.log('Error');
    }
}

module.exports = getWeather;
