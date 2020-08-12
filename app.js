const express = require('express');
const morgan = require('morgan');
const DataStore = require('nedb');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();

// Logger
if (process.env.NODE_ENV !== "production") {
    app.use(morgan('dev'));
}

// DB connection
const database = new DataStore('geolocation.db');
database.loadDatabase();

// Json request
app.use(express.json());

// Serve static files
app.use(express.static('public'));

// const db = [];

app.post('/api', (req, res) => {
    const jsonData = req.body;
    jsonData.createdDateTime = Date.now();

    database.insert(jsonData, (err, data) => {
        // const { userName, latitude, longitude, timeStamp } = data;
        res.status(201).json({ message: "success", data: data });
    });

    // db.push({ message: "success", userName: userName, latitude: lat, longitude: lon, timeStamp: createdTime})
    //console.log(db) 

});

app.get('/api', (req, res) => {
    database.find({}, (err, data) => {
        res.status(200).json({ message: "Get all locations", data: data });
        console.log(data)
    });
});

app.get('/weather/:latlon', async (req, res) => {
    const geolocation = req.params.latlon.split(',');
    const locations = geolocation;
    const lat = locations[0];
    const lon = locations[1];

    // Send request to openweather API
    const apiKey = process.env.API_KEY;
    const weather_response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`);
    const weather_json = await weather_response.json();

    // Send request to open air quality API
    const aq_response = await fetch(`https://api.openaq.org/v1/latest?coordinates=${lat},${lon}`);
    const aq_json = await aq_response.json();

    const data = {
        weather: weather_json,
        air: aq_json
    }

    res.status(200).json({ data });
    console.log(req.params);
});

module.exports = app;