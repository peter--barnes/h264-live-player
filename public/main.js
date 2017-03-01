var WSAvcPlayer = require('../vendor/wsavc/index.js');

/*
canvas[0] = document.createElement("canvas0");
canvas[1] = document.createElement("canvas1");
document.body.appendChild(canvas[0]);
document.body.appendChild(canvas[1]);
*/
var screen_num = 4;
var ws_start_port = 9020;
var canvas = new Array(screen_num);
var wsavc = new Array(screen_num);
var ws_uri = new Array(screen_num);
for(var i=0;i<screen_num;i++)
{
    canvas[i] = document.getElementById("canvas"+i);
    wsavc[i] = new WSAvcPlayer(canvas[i], "webgl", 1, 35);
    //document.write("ws://"+document.location.hostname+":"+(ws_start_port+i));
    wsavc[i].connect("ws://"+document.location.hostname+":"+(ws_start_port+i));
}

/*
window.wsavc0 = wsavc[0];
window.wsavc1 = wsavc[1];
*/
