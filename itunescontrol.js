var itunesControl = function () {
    var applescript = require('applescript'),
        self = this;

    this.playPause = function () {
        applescript.execString("tell application \"iTunes\" to playpause", function (err, res) {
            if (err) {
                console.log('Error controlling iTunes', err);
            }
        });
    };

    this.partyMode = function () {
        var command = "tell application \"iTunes\" \n play track 1 of user playlist \"Party Mode\" \n set player position to 18 \n end tell";
        applescript.execString(command, function (err, res) {
            if (err) {
                console.log("Error controlling iTunes", err);
            }
            console.log(err);
        });
    };

    this.getVolume = function (callback) {
        applescript.execString('output volume of (get volume settings)', function (err, res) {
            if (err) {
                console.log('Error getting volume', err);
            }
            callback(res);
        });
    };

    this.setVolume = function (volume, callback) {
        applescript.execString('set volume output volume ' + volume, function (err, res) {
            if (err) {
                console.log('Error setting volume', err);
            }
            if (callback) {
                callback();
            }
        });
    };

    this.volumeUp = function () {
        self.getVolume(function (vol) {
            self.setVolume(vol + 10);
        });
    };

    this.volumeDown = function () {
        self.getVolume(function (vol) {
            self.setVolume(vol - 10);
        });
    };
};

var itunes = new itunesControl();
itunes.partyMode();

module.exports = new itunesControl();
