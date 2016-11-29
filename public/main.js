//var WSAvcPlayer = require('../vendor');
//var WSAvcPlayer = require('../vendor/wsavc/index.js');

var canvas = new Array(9);
/*
canvas[0] = document.createElement("canvas0");
canvas[1] = document.createElement("canvas1");
document.body.appendChild(canvas[0]);
document.body.appendChild(canvas[1]);
*/
document.write('快点显示出来!');
canvas[0] = document.getElementById("canvas0");
canvas[1] = document.getElementById("canvas1");

// Create h264 player
var uri = "ws://" + document.location.host;
var wsavc = new WSAvcPlayer(canvas[1], "webgl", 1, 35);
wsavc.connect(uri);



        var gl; // WebGL的全局变量
		gl = initWebGL(canvas[0],gl,1);   
		clear_gl(gl);

		function clear_gl(gl)
		{
			  // 只有在 WebGL 可用的时候才继续
			  if (gl) {
				// 设置清除颜色为黑色，不透明
				gl.clearColor(0.0, 0.0, 0.0, 1.0);    
				// 清除颜色和深度缓存
				gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
			  }
		}
		function initWebGL(canvas,gl,i) {
		  try {
			// 尝试获取标准上下文，如果失败，回退到试验性上下文
			gl = canvas.getContext("webgl1") || canvas.getContext("experimental-webgl");
		  }
		  catch(e) {}
		  
		  // 如果没有GL上下文，马上放弃
		  if (!gl) {
			alert("WebGL初始化失败，可能是因为您的浏览器不支持。");
			gl = null;
		  }
		  return gl;
		}

//for button callbacks
window.wsavc = wsavc;
