"use strict";

var http               = require('http');
var express            = require('express');
var RemoteTCPFeedRelay = require('./lib/remotetcpfeed');
var app                = express();

/**
* on the remote rpi run
* raspivid -t 0 -o - -w 1280 -h 720 -fps 25 | nc -k -l 5001
* to create a raw tcp h264 streamer
*/

  //public website
app.use(express.static(__dirname + '/public'));

var server  = http.createServer(app);

var screen_num = 4;
var feed    = new Array(screen_num);
var feed_start_port = 9010;
var ws_start_port = 9020;

for(var i=0;i<screen_num;i++)
{
      feed[i]    = new RemoteTCPFeedRelay(server, {
      feed_ip   : "127.0.0.1",
      feed_port : feed_start_port + i,
      ws_port   : ws_start_port + i,
    });
}
/*
var feed1    = new RemoteTCPFeedRelay(server, {
  feed_ip   : "127.0.0.1",
  feed_port : 8083,
  ws_port   : 8086,
//  ws_id     : 1,
});
*/


server.listen(9000);


