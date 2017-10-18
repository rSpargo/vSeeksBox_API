var express= require('express'),
api = require('./api.js'),
bodyParser = require('body-parser');

app = express();
var urlEncodedParser = bodyParser.urlencoded({ extended: true });

//app.get('/getUsers', api.getUsers);
app.get('/', function(req, res) {
    res.send("Welcome to the API.");
});
app.get('/saveUser', urlEncodedParser, api.postUser);
app.post('/saveVSeeks/:user', urlEncodedParser, api.postVSeeks);

app.listen(process.env.PORT || 5000);