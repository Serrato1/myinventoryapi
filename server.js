const env = 'development';
const config = require('./knexfile.js')[env];
const knex = require('knex')(config);
const path = require('path');
var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 8000;

var routes = require('./config/routes');
routes(app);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials",true)
    next();
});
  
app.listen(port,() => {
    console.log('Server Listening on Port', port);
})