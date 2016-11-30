//var WSAvcPlayer = require('../vendor');
var WSAvcPlayer = require('../vendor/wsavc/index.js');

/*
canvas[0] = document.createElement("canvas0");
canvas[1] = document.createElement("canvas1");
document.body.appendChild(canvas[0]);
document.body.appendChild(canvas[1]);
*/
var screen_num = 2;
var canvas = new Array(screen_num);
var wsavc = new Array(screen_num);
var ws_uri = new Array(screen_num);
var ws_start_port = 8085;
for(i=0;i<screen_num;i++)
{
    canvas[i] = document.getElementById("canvas"+i);
    wsavc[i] = new WSAvcPlayer(canvas[i], "webgl", 1, 35);
    wsavc[i].connect("ws://127.0.0.1:"+(ws_start_port+i));
}

// connect ws://127.0.0.1:8084 
//var uri = "ws://" + document.location.host;



//for button callbacks
window.wsavc0 = wsavc[0];
window.wsavc1 = wsavc[1];
