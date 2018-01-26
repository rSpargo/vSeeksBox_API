var idJSON = require('./id_gen.json');

exports.genID = function (req, res) {
    var randNum = Math.floor(Math.random() * 100);
    var rand_a = Math.floor(Math.random() * idJSON.phrases_a.length);
    var rand_b = Math.floor(Math.random() * idJSON.phrases_b.length);

    res.send(idJSON.phrases_a[rand_a] + idJSON.phrases_b[rand_b] + randNum);
}