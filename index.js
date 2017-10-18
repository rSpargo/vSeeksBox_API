var express= require('express'),
api = require('./api.js');
app = express();

//app.get('/getUsers', api.getUsers);
app.get('/', function(req, res) {
    res.send("Welcome to the API.");
});
app.get('/saveUser', api.postUser);

app.listen(process.env.PORT || 5000);