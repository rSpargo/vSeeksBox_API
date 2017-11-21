var idJSON = require('./id_gen.json');

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://admin:pass@ds113825.mlab.com:13825/vseeks-box');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'error connecting to database:'));
db.once('open', function(callback) {
    console.log('successfully connected to database.');
});

var userSchema = mongoose.Schema({
    userID: String,
    vSeeks: [
        {
            id: String,
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
            tone: {type: Boolean, default: true}
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
    console.log("REQ: ", req.body);
    User.findOne({ username: req.params.user }, function(err, doc) {
        doc.vSeeks.push({
            task: req.body.task,
            timer: {
                hours: req.body.timer.hours,
                minutes: req.body.timer.minutes,
                seconds: req.body.timer.seconds
            }
        });
        doc.save();
        res.send("Completed.");
        console.log("Successfully added vSeek with task: " + req.task + " to the database.");
    });
};

exports.postPrefs = function(req, res) {
    User.findOne({ userID: req.params.user }, function(err, doc) {
        if (err) { console.error(err); }
        doc.preferences.notifications.tone = req.body.tone;
        doc.preferences.commands = JSON.parse(req.body.commands);
        doc.save();
        res.send("Completed.");
        console.log("Successfully saved user preferences!");
    });
};

exports.postData = function(req, res) {
    User.findOne({ userID: req.params.user }, function(err, doc) {
        if (err) { console.error(err); }
        doc.preferences = JSON.parse(req.body.preferences);
        doc.vSeeks = JSON.parse(req.body.vSeeks);
        doc.save();
        res.send("Completed.");
    });
}

exports.getVSeeks = function (req, res) {
    User.findOne({ userID: req.params.user }, function(err, doc) {
        if (err) { console.error(err); }
        res.send(doc.vSeeks);
    });
};

exports.getData = function (req, res) {
    User.findOne({ userID: req.params.user }, function (err, doc) {
        if (doc) {
            var data = {
                preferences: doc.preferences,
                vSeeks: doc.vSeeks
            }
            res.send(data);
        }
        else {
            var user = new User({userID: req.params.user});
            user.save(function (err, person) {
                if (err) { return console.error(err); }
                var newData = {
                    preferences: person.preferences,
                    vSeeks: doc.vSeeks
                }
                res.send(newData);
            });
        }
        if (err) { console.error(err); }
    });
};

exports.genID = function (req, res) {
    var randNum = Math.floor(Math.random() * 100);
    var rand_a = Math.floor(Math.random() * idJSON.phrases_a.length);
    var rand_b = Math.floor(Math.random() * idJSON.phrases_b.length);

    res.send(idJSON.phrases_a[rand_a] + idJSON.phrases_b[rand_b] + randNum);

}