// Configure map settings
const mymap = L.map('mapid').setView([0, 0], 1);
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const attribution = {
    attribution: ' &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    maxZoom: 13,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'your.mapbox.access.token'
};
const mapLayer = L.tileLayer(tileUrl, attribution);

mapLayer.addTo(mymap);

const getAllData = async () => {
    const title = document.createElement("h3");
    const response = await fetch('/api');
    const payload = await response.json();

    document.body.append(title);

    for (item of payload.data) {
        const createdDate = new Date(item.createdDateTime).toLocaleString();
        const latitued = item.lat.toFixed(2);
        const longitued = item.lon.toFixed(2);
        const airQualityIn = item.air.results[0].location;
        const weatherReport = item.weather.weather[0].description;
        const marker = L.marker([item.lat, item.lon]);

        marker.addTo(mymap);
        marker.bindPopup(
            `
            <p>
            Current location <b>Latitude is ${latitued} and Longitude is ${longitued}. </b>
            Air quality in ${airQualityIn}. 
            Weather condition ${weatherReport}</br>
            <small>Published on ${createdDate}</small>
            <p>`
            );

        console.log(item)

        // const card = document.createElement("div");
        // const cardBody = document.createElement("div");
        // // const userName = document.createElement("div");
        // const geoLocation = document.createElement("p");
        // const timeStamp = document.createElement("small");
        // // const avatar = document.createElement("img");

        // title.textContent = "User Location Details";
        // // userName.textContent = `User Name: ${item.userName}`;
        // geoLocation.textContent = `Lat: ${item.lat} Long: ${item.lon}`;
        // const dateString = new Date(item.createdDateTime).toLocaleString();
        // timeStamp.textContent = `Created date: ${dateString}`;
        // // avatar.src = item.image64;
        // // avatar.alt = "Profile picture";
        // card.classList = "card text-white bg-dark m-4";
        // cardBody.classList = "card-body";
        // geoLocation.classList = "card-text";
        // timeStamp.classList = "card-text text-white"

        // // root.append(userName, geoLocation, timeStamp, avatar);
        // cardBody.append(geoLocation, timeStamp);
        // card.append(cardBody);
        // document.body.append(card);

    }
};

getAllData();