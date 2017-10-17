var express= require('express'),
api = require('./api.js');
app = express();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://admin:pass@ds113825.mlab.com:13825/vseeks-box');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'error connecting to database:'));
db.once('open', function(callback) {
    console.log('successfully connected to database.');
});

var userSchema = mongoose.Schema({
    username: String,
    pass: String,
    vSeeks: [
        {
            task: String,
            timer: {
                ticks: Number,
                hours: Number,
                minutes: Number,
                seconds: Number
            }
        }
    ]
});

var user = mongoose.model('users', userSchema);

app.get('/users', api.getUsers);
app.post('/users', api.postUser);