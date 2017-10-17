var express= require('express'),
api = require('./api.js');
app = express();

//app.get('/getUsers', api.getUsers);
app.get('/saveUser', api.postUser);