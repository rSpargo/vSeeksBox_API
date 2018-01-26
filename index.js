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

app.get('/', function(req, res) {
    res.send("Welcome to the API.");
});
app.get('/genID', api.genID);

app.listen(process.env.PORT || 5000);