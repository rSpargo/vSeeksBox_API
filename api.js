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
                hours: Number,
                minutes: Number,
                seconds: Number
            }
        }
    ],
    preferences: {
        notifications: {
            tone: Boolean
        },
        commands: [
            {
                phrase: String,
                site_blacklist: [String]
            }
        ]
    }
});

var User = mongoose.model('users', userSchema);

exports.postUser = function(req, res) {
    var user = new User({username: req.query.username, pass: req.query.pass});
    user.save(function (err, person) {
        if (err) { return console.error(err); }
        res.send("Successfully added '" + person.username + "' to database!");
    });
};
exports.postVSeeks = function(req, res) {
    User.findOne({ username: req.params.user }, function(err, doc) {
        doc.vSeeks.push({
            task: req.task,
            timer: {
                hours: req.hours,
                minutes: req.minutes,
                seconds: req.seconds
            }
        });
        doc.save();
        res.send("Completed.");
        console.log("Successfully added vSeek with task: " + req.task + " to the database.");
    });
};

exports.postPrefs = function(req, res) {
    User.findOne({ username: req.params.user }, function(err, doc) {
        if (err) { console.error(err); }
        doc.preferences.notifications.tone = req.body.tone;
        doc.preferences.commands = JSON.parse(req.body.commands);
        doc.save();
        res.send("Completed.");
        console.log("Successfully saved user preferences!");
    });
};