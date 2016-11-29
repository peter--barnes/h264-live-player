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
    var readStream = net.connect(this.options.feed_port, this.options.feed_ip, function(){
      console.log("remote stream ready");
    });

    return readStream;
  },
});


module.exports = TCPFeed;
