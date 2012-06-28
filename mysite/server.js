var mysocket = require('socket.io').listen(1264);

mysocket.sockets.on('connection', arranque);

function arranque(usuario){
	  usuario.on("nuevoNombre", emitir);
}

function emitir(data) {
	console.log("CONSOLE: "+data);
	mysocket.sockets.emit("nombreDesdeServidor",data+"");
}