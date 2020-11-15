const loc = fetch('https://ipapi.co/json')
    .then(res => res.json())
    .then(data => {
        const { latitude, longitude } = data;
        // return { latitude, longitude }
        return { latitude, longitude }
    })
    .then(data => {
        return fetch(`https://api.weatherbit.io/v2.0/current/?key=3cb49b27d8374bf5a5c37a2f1961f8a3&lat=${data.latitude}&lon=${data.longitude}`
        )
    })
    .then(res => {
        if (res.status !== 200) {
            Promise.reject(`couldnot fetch weather for the location`)
        }
        return res.json()
    })
    .then(data => {
        const { precip, pres, temp, wind_spd } = data.data[0]
        return { precip, pres, temp, wind_spd }
    })
    .catch(err => {
        console.log('couldnot fetch weather information for the user location. Reason: ' + err.message)
        return {}
    })

loc.then(values => {
    const app = document.querySelector('#app');
    if (Object.keys(values).length > 0 ) {
        app.innerHTML = `
        <div>Precipitation - ${values.precip} mm</div>
        <div>Pressure - ${values.pres} pa</div>
        <div>Temprature in Celcius - ${values.temp} celcius</div>
    `
    }
    else {
        app.innerHTML = 'There was an error fetching data. Try later..'
    }
    
})

