var five = require('johnny-five'),
    particle = require('particle-io'),
    board = new five.Board({
        io: new particle({
            token: "176efca31945a72af08e163ff73775645cf40f83",
            deviceId: "1f0038000847353138383138"
        })
    });

board.on("ready", function () {
    console.log("Device ready...");
    var led = new five.Led("D7");
    led.strobe(50);

});

board.on("error", function (err) {
    console.log("Error!", err);
});
