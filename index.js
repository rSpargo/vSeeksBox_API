var express= require('express'),
api = require('./api.js'),
bodyParser = require('body-parser');

app = express();
var urlEncodedParser = bodyParser.urlencoded({ extended: true });
var jsonParser = bodyParse.json();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

//app.get('/getUsers', api.getUsers);
app.get('/', function(req, res) {
    res.send("Welcome to the API.");
});
app.post('/saveUser', urlEncodedParser, api.postUser);
app.post('/saveVSeeks/:user', jsonParser, api.postVSeeks);
app.post('/savePrefs/:user', urlEncodedParser, api.postPrefs);

app.listen(process.env.PORT || 5000);