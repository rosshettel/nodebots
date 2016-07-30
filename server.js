
var iTunes = require("./itunescontrol"),
    Particle = require("particle-api-js"),
    particle = new Particle();

particle.getEventStream({auth: process.env.TOKEN, deviceId: 'mine'}).then(function(stream) {
    stream.on('event', function (event) {
        if (event.name === 'play') {
            var data = JSON.parse(event.data);
            console.log(data);
            iTunes.playPlaylist(data.playlist, data.trackNum);
        }

        if (event.name === 'volumeChange' ) {
            iTunes.setVolume(event.data);
        }

        console.log("Event received", event);
    });
});
