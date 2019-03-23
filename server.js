var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');

const port = new SerialPort('COM4', { baudRate: 9600 });
const parser = port.pipe(new Readline({ delimiter: '\n' }));


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});


// Read the port data
port.on("open", () => {
  console.log('serial port open');
});

parser.on('data', data =>{
  console.log('got word from arduino:', data);
  io.emit('voltage', data);
});