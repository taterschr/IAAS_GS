const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const SerialPort = require('serialport');

app.use(express.static(__dirname + '/public'));

const Readline = SerialPort.parsers.Readline;
const usbport = new SerialPort('/dev/ttyUSB0', {baudRate: 9600});
const parser = usbport.pipe(new Readline());

app.get('/', function(req, res) {
    res.render('index.ejs');
});

app.get('/resetserial', function(req, res){
	SerialPort.close(function (err) {
		console.log('port closed', err);
		res.send("closed\n");
	});
	//
	// if (SerialPort.isOpen){
	// 	console.log("port open.. closing and restarting...\n");
	// 	SerialPort.close();
	// 	res.send("port open.. closing and restarting...\n");
	// }
	const usbport = new SerialPort('/dev/ttyUSB0', {baudRate: 9600});
	const parser = usbport.pipe(new Readline());
	res.send("reset");
	console.log("reset");
});

io.sockets.on('connection', function(socket) {

    socket.on('chat_message', function(message) {
				console.log(message);
        io.emit('chat_message', '<strong>' + socket.username + '</strong>: ' + message);
    });

});

parser.on('data', function (data) {
	console.log(data);
	const chunks = data.split(',');

	io.emit('RAW', data);

	if(chunks[1] == 'GPS'){
		  io.emit('GPS', chunks);
	}
	if(chunks[1] == 'PTU'){
			io.emit('PTU', chunks);
	}

	if(chunks[1] == 'PME'){
		  io.emit('PME', chunks);
	}

	if(chunks[1] == 'BAT'){
		  io.emit('BAT', chunks);
	}

	if(chunks[1] == 'ERR'){
		  io.emit('ERR', chunks);
	}
	if(chunks[1] == 'INF'){
			io.emit('INF', chunks);
	}




});

const server = http.listen(8080, function() {
    console.log('listening on *:8080');
});
