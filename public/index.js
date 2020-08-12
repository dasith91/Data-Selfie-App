function setup() {

    // // background(225, 0, 0);
    // let capture;
    // noCanvas();
    // capture = createCapture(VIDEO);
    // capture.size(160, 120)

    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;
            let createdDateTime = Date.now();

            document.getElementById("latitude").textContent = lat.toFixed(2);
            document.getElementById("longitude").textContent = lon.toFixed(2);
            // console.log(position)
            // doSomething(position.coords.latitude, position.coords.longitude);

            // Fetch weather api data.
            const weatherResponse = await fetch(`/weather/${lat},${lon}`);
            const weatherData = await weatherResponse.json();

            const weather = weatherData.data.weather;

            const air = weatherData.data.air;

            document.getElementById("description").textContent = weather['weather'][0]['description'];
            document.getElementById("temperature").textContent = weather['main']['temp'] + "° Fahrenheit";
            document.getElementById("location").textContent = air['results'][0].location;
            document.getElementById("air_quality").textContent = air['results'][0].measurements[0].value;
            document.getElementById("air_unit").textContent = air['results'][0].measurements[0].unit;

            console.log(weatherData.data)

            const data = { lat, lon, createdDateTime, weather, air };
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            }

            const response = await fetch('/api', options);
            const payload = await response.json();

            console.log(payload)

            // const postLocation = async () => {
            //     // const userName = document.getElementById("ueser_name").value;
            //     // console.log(userName);
            //     // // Webcam image convert to the base64 and send it to the db
            //     // capture.loadPixels();
            //     // const image64 = capture.canvas.toDataURL();
            //     // console.log(image64);
            //     const data = { lat, lon, createdDateTime };
            //     const options = {
            //         method: "POST",
            //         headers: {
            //             "Content-Type": "application/json",
            //         },
            //         body: JSON.stringify(data)
            //     }

            //     const response = await fetch('/api', options);
            //     const payload = await response.json();

            //     console.log(payload)
            // }

            // const submitLocation = () => {
            //     postLocation();
            // }

            // document.getElementById("btn").addEventListener("click", submitLocation);

            console.log("Geolocation available")
        });
    } else {
        console.log("Geolocation not available")
    }

}