var express= require('express'),
api = require('./api.js'),
bodyParser = require('body-parser');

app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

//app.get('/getUsers', api.getUsers);
app.get('/', function(req, res) {
    res.send("Welcome to the API.");
});
app.post('/saveUser', api.postUser);
app.post('/saveVSeeks/:user', api.postVSeeks);
app.post('/savePrefs/:user', api.postPrefs);
app.post('/saveData/:user', api.postData);

app.get('/getVSeeks/:user', api.getVSeeks);
app.get('/getData/:user', api.getData);
app.get('/genID', api.genID);

app.listen(process.env.PORT || 5000);