//////// Customize this data! /////////
//
var particleEmail = process.env.EMAIL
var particlePass = process.env.PASS
var particleToken = process.env.PARTICLE_TOKEN
//
///////////////////////////////////////

// Set up Photon

var Particle = require("particle-api-js");
var particle = new Particle();

particle.on('login', function() {

  // Play playlist

  var play = particle.getEventStream({
    name: "play", // event name
    auth: particleToken // access token
  });

  play.then(
    function (data) {
      console.log("PLAY event from device 1");
      console.log(data);
    },
    function (err) {
      console.log("ERROR: " + err);
    }
  );

  // Set volume

  var volume = particle.getEventStream({
    name: "volumeChange", // event name
    auth: particleToken // access token
  });

  volume.then(
    function (data) {
      console.log("VOLUME CHANGE event from device 1");
      console.log(data);
    },
    function (err) {
      console.log("ERROR: " + err);
    }
  );

});

particle.login({ username: particleEmail, password: particlePass });
