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

    this.playPlaylist = function (playlist, track) {
        var command = "tell application \"iTunes\" \n play track " + track + " of user playlist \"" + playlist + "\" \n set player position to 18 \n end tell";

        if (playlist && track) {
          applescript.execString(command, function (err, res) {
              if (err) {
                  console.log("Error controlling iTunes", err);
              }
              console.log(err);
          });
        } else {
          console.log("ERROR: playlist name and track is required to be passed when calling playPlaylist()")
        }
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

module.exports = new itunesControl();
