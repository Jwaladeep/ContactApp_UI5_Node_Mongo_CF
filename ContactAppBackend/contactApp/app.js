
// app.js

const express = require('express');
const  cfenv = require('cfenv');
const bodyParser = require('body-parser');
const appEnv = cfenv.getAppEnv();

const app = express();

// Set up mongoose connection
const mongoose = require('mongoose');
const mongoDB = appEnv.isLocal ?
'mongodb://localhost:27017/contactApp' :
appEnv.getService('cfinstance').credentials.uri;

mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Imports routes for the products
const contact = require('./routes/contactApp.route');

app.use('/contactApp', contact);

const iPort = appEnv.isLocal ? 1234: appEnv.port;
app.listen(iPort, function () {
    console.log(`Congrats, your producer app is listening on port ${iPort}!`);
});