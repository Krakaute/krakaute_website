var express = require('express');

var app = express();

app.use(express.static("client"));

var server = app.listen(80);

console.log("server: on");

var socket = require("socket.io");

var io = socket(server);
