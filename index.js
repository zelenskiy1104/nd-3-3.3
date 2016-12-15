const express = require("express");
const app = express();
const bodyParser = require('body-parser');

mainDir = __dirname;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/nd-333');
db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));

let api = require('./api');
app.use('/api', api);

app.listen(3000, function() {
    console.log('Listening on port 3000...');
});
