var Class  = require('uclass');
var http = require('http');
var request = require("request")
var net    = require('net');
var fs = require('fs');
var Throttle     = require('stream-throttle').Throttle;
var Server = require('./_server');

var TCPFeed = new Class({
  Extends : Server,

  options : {
    feed_ip   : '127.0.0.1',
//    feed_port : 5001,
    feed_port : 8082,
    video_path     : "/test.h264",
  },

  get_feed : function(){

/*
    var readStream = net.connect(this.options.feed_port, this.options.feed_ip, function(){
      console.log("remote stream ready");
    });
    var readStream = net.connect('http://127.0.0.1:8082/test.h264', function(){
      console.log("remote stream ready");
    });

    var readStream = fs.createReadStream('http://127.0.0.1:8082/test.h264');
    var sourceThrottleRate = 72733;
    readStream = readStream.pipe(new Throttle({rate: sourceThrottleRate}));

  var readStream = http.get('http://127.0.0.1:8082/test.h264', function (res){
      var pageData = "";
      res.on('data', function (chunk) {
          pageData += chunk;
          });
    console.log("111111111111111",pageData );
  });
  */
  /*
     var readStream;
     var options = {
          hostname: '127.0.0.1',
          port: 8082,
          path: '/test.h264',
          method: 'GET'
     }; 
     var req = http.request(options);
     req.end();
     req.on('connect', (res, socket, head) => {
             console.log('got connected!');
             });
     req.on('response', (res) => {
             console.log('got response!');
             readStream = res;
             var sourceThrottleRate = 72733;
             readStream = readStream.pipe(new Throttle({rate: sourceThrottleRate}));
             });
   */


    return readStream;
  },
});


module.exports = TCPFeed;
