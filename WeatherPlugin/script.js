const apiKey = '3cb49b27d8374bf5a5c37a2f1961f8a3';
const weatherBaseUrl = 'https://api.weatherbit.io/v2.0/current/';
const locationUrl = 'https://ipapi.co/json'

const updateWeather = function (options) {
    const defaultValues = {
        selector: "#app",
        tempratureUnits: "celcius",
        message: "It's currently {temprature} and {conditions} in {location}",
        displayIcon: true
    }
    const getTemp = function (temp) {
        if (settings.tempratureUnits === 'celcius') return temp;
        return (parseFloat(temp) * 9 / 5) + 32;
    }

    let settings = Object.assign({}, defaultValues, options)

    const loc = fetch(`${locationUrl}`)
        .then(res => res.json())
        .then(data => {
            const { latitude, longitude } = data;
            return { latitude, longitude }
        })
        .then(data => {
            return fetch(`${weatherBaseUrl}?key=${apiKey}&lat=${data.latitude}&lon=${data.longitude}`
            )
        })
        .then(res => {
            if (res.status !== 200) {
                Promise.reject(`couldnot fetch weather for the location`)
            }
            return res.json()
        })
        .then(data => {
            const { city_name, country_code, weather, temp } = data.data[0]
            const location = city_name + ',' + country_code
            const conditions = weather.description
            const icon = weather.icon
            const temprature = getTemp(temp)
            const message = settings.message.replace('{temprature}', temprature).replace('{conditions}', conditions).replace('{location}', location)
            console.log(message)

            return { location, conditions, icon, temp, message }
        })
        .catch(err => {
            console.log('couldnot fetch weather information for the user location. Reason: ' + err.message)
            return {}
        })

    loc.then(values => {
        const app = document.querySelector(settings.selector);
        if (Object.keys(values).length > 0) {
            app.innerHTML = settings.displayIcon ? '<p>' +
                '<img src="https://www.weatherbit.io/static/img/icons/' + values.icon + '.png" />' + '</p>' : '';
            app.innerHTML = app.innerHTML + `<p> ${values.message} </p>`
        }
        else {
            app.innerHTML = 'There was an error fetching data. Try later..'
        }
    })
}

updateWeather()

