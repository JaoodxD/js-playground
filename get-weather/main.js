let getInfo = require('./getWeather.js');

async function main() {
    let weatherJSON = await getInfo();
    console.log({ weatherJSON });
}
main();
