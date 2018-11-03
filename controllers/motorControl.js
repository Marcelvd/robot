var gpio = require('rpi-gpio');
var async = require('async');

const motors = {
  leftDrive: 11,
  leftReverse: 12,
  rightDrive: 15,
  rightReverse: 16
};

var forward = (callback) => {
   
  async.parallel([
    function(callback) {
         gpio.setup(motors.leftDrive, gpio.DIR_OUT, callback);
    },
    function(callback) {
  gpio.setup(motors.rightDrive, gpio.DIR_OUT, callback);
    },
], function(err, results) {
    console.log('Pins set up');
    write();
});
  
 function write() {
    async.series([
    
            function(callback) {
                gpio.write(motors.leftDrive, true, callback)
        },
                    function(callback) {
                gpio.write(motors.rightDrive, true, callback)
        },
       ], function(err, results) {
        console.log('Writes complete, pause then unexport pins');
    })}; 
 };




var reverse = (callback) => {
   
  async.parallel([
    function(callback) {
         gpio.setup(motors.leftReverse, gpio.DIR_OUT, callback);
    },
    function(callback) {
  gpio.setup(motors.rightReverse, gpio.DIR_OUT, callback);
    },
], function(err, results) {
    console.log('Pins set up');
    write();
});
  
 function write() {
    async.series([
    
            function(callback) {
                gpio.write(motors.leftReverse, true, callback)
        },
                    function(callback) {
                gpio.write(motors.rightReverse, true, callback)
        },
       ], function(err, results) {
        console.log('Writes complete, pause then unexport pins');
    })}; 
 };





var destroy = (callback) => {
    gpio.destroy(function() {
        console.log('All pins unexported');
    });
};





module.exports = {
  forward,
  destroy,
  reverse
};
