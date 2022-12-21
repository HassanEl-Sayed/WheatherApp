const request = require('request') 

const forecast = (latitude,longitude,callback) => {

    const url ='https://api.openweathermap.org/data/2.5/weather?units=metric&lat='+latitude+'&lon='+longitude+'&appid=de091c58c1b11dd67f5e2d1db16551a1'
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.message) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined,'It is '+ body.weather[0].main +' and the sky is  ' +body.weather[0].description +
            ',The high Temperature: '+ body.main.temp_max +' and The low Temperature: ' +body.main.temp_min )
        }
    })
}


module.exports = forecast