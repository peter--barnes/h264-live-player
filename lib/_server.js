var Class           = require('uclass');
var Options         = require('uclass/options');
var WebSocketServer = require('ws').Server; //it's a good idea to try uws instead of ws
var Splitter        = require('stream-split');
var os              = require('os');


var NALseparator    = new Buffer([0,0,0,1]);//NAL break


var _Server = new Class({
  Implements :  [Options],
  Binds  : ['new_client', 'start_feed', 'broadcast'],
  options  : {
  /*
    width : 1280,
    height: 720,
    */
    width : 640,
    height: 360,
  },
  
  getip: function(){
    var ifaces = os.networkInterfaces();
    var ret_ip = null;
    Object.keys(ifaces).forEach(function (ifname) {
      var alias = 0;
      ifaces[ifname].forEach(function (iface) {
        if ('IPv4' !== iface.family || iface.internal !== false) {
          // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
          return;
        }
        /*
        if (alias >= 1) {
          // this single interface has multiple ipv4 addresses
          console.log(ifname + ':' + alias, iface.address);
        } else {
          // this interface has only one ipv4 adress
          console.log(ifname, iface.address);
        }
        ++alias;
        */
        ret_ip = iface.address;
      });
    });
    return ret_ip;
  },
  
  initialize : function(server, options){
  //    this.wss = new WebSocketServer({server: server});
    /*setOptions is import.without it ,canvas won't work*/
    var host_ip = this.getip();
    if(host_ip != null)
    {
        console.log(host_ip);
    }
    this.setOptions(options);

    //this.wss = new WebSocketServer({port:options.ws_port,host:options.feed_ip});
    //this.wss = new WebSocketServer({port:options.ws_port,host:'192.168.2.78'});
    this.wss = new WebSocketServer({port:options.ws_port,host:host_ip});
    this.wss.on('connection', this.new_client);
    this.start_feed() ;
  },
  

  start_feed : function(){
    var readStream = this.get_feed();
    this.readStream = readStream;

    readStream = readStream.pipe(new Splitter(NALseparator));
    readStream.on("data", this.broadcast);
  },

  get_feed : function(){
    throw new Error("to be implemented");
  },

  broadcast : function(data){
    this.wss.clients.forEach(function(socket) {

      if(socket.buzy)
        return;

      socket.buzy = true;
      socket.buzy = false;

      socket.send(Buffer.concat([NALseparator, data]), { binary: true}, function ack(error) {
        socket.buzy = false;
      });
    });

  },

  new_client : function(socket) {
  
    var self = this;
    console.log('New guy');

    socket.send(JSON.stringify({
      action : "init",
      width  : this.options.width,
      height : this.options.height,
    }));

    socket.on("message", function(data){
      var cmd = "" + data, action = data.split(' ')[0];
      console.log("Incomming action '%s'", action);

      if(action == "REQUESTSTREAM")
        self.start_feed();
      if(action == "STOPSTREAM")
        self.readStream.pause();
    });

    socket.on('close', function() {
//      self.readStream.end();
      console.log('stopping client interval');
    });
  },


});


module.exports = _Server;
