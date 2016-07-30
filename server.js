//////// Customize this data! /////////
//
var particleEmail = "ENV-VAR" // The email address you use to log in to build.particle.io.
var particlePass = "ENV-VAR" // The password you use to log in to build.particle.io.
var particleToken = "ENV-VAR" // Photon token (build.particle.io > Settings)
var deviceOneId = "ENV-VAR"
var deviceTwoId = "ENV-VAR"
//
///////////////////////////////////////

// Set up Photon

var Particle = require("particle-api-js");
var particle = new Particle();
particle.login({ username: particleEmail, password: particlePass });

function getMusic() {

  // Get play pause events from devices

  var deviceOnePlay = particle.getEventStream({
    device: deviceOneId, // device id
    name: "PlayPausePlaylist", // event name
    auth: particleToken // access token
  });

  deviceOnePlay.then(
    function (data) {
      console.log("Straming data...");
      console.log(data);
    },
    function (err) {
      console.log("ERROR: " + err);
    }
  );

  var deviceTwoPlay = particle.getEventStream({
    device: deviceTwoId, // device id
    name: "PlayPausePlaylist", // event name
    auth: particleToken // access token
  });

  deviceTwoPlay.then(
    function (data) {
      console.log("Straming data...");
      console.log(data);
    },
    function (err) {
      console.log("ERROR: " + err);
    }
  );

  // Pick playlist

  var deviceOneParty = particle.getEventStream({
    device: deviceOneId, // device id
    name: "SetPlaylist", // event name
    auth: particleToken // access token
  });

  deviceTwoParty.then(
    function (data) {
      console.log("Straming data...");
      console.log(data);
    },
    function (err) {
      console.log("ERROR: " + err);
    }
  );

  var deviceTwoParty = particle.getEventStream({
    device: deviceTwoId, // device id
    name: "SetPlaylist", // event name
    auth: particleToken // access token
  });

  deviceTwoParty.then(
    function (data) {
      console.log("Straming data...");
      console.log(data);
    },
    function (err) {
      console.log("ERROR: " + err);
    }
  );

}

getMusic();

setInterval(getMusic, 1000);
