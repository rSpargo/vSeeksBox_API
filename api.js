var mongoose = require('mongoose');
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

var User = mongoose.model('users', userSchema);

exports.postUser = function(req, res) {
    var user = new User({username: req.query.username, pass: req.query.pass, vSeeks: []});
    user.save(function (err, person) {
        if (err) { return console.error(err); }
        console.log("Successfully added " + person + " to database!");
    });
    res.send("test");
};