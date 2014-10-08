var express = require('express');
var app = express();
var mongojs = require('mongojs');

var mongodbConnectionString = "mongodb://admin:DGyHedwqyyk6@127.2.104.2:27017/cs561001";
//if (typeof process.env.OPENSHIFT_MONGODB_DB_URL == "undefined") {
//    mongodbConnectionString = "mean_experiments";
//}
var db = mongojs(mongodbConnectionString, ["applications"]);

var applications = require("./public/features/services/server.js");

app.use(express.static(__dirname + '/public'));
app.use(express.bodyParser());//turn the parser on so that server can read the json from req. body


applications(app, db, mongojs);


var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port      = process.env.OPENSHIFT_NODEJS_PORT || 8080;

app.listen(port, ipaddress);