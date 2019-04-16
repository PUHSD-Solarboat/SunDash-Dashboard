var app = require('express')();
var express =require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);
const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const jsonfile = require("jsonfile")
const port = new SerialPort('/dev/ttyUSB0', { baudRate: 9600 });
const parser = port.pipe(new Readline({ delimiter: '\n' }));

app.use(express.static('public'))

var adc_values = [];
var converted_values = [];
var mutlipliers = [1,1,1,1];


const file = 'consts.json'
jsonfile.readFile(file, function (err, obj) {
  if (err) console.error(err)
  mutlipliers = obj.mutlipliers;
})

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on("adc_calibrate", (data)=>{
    //multiplier = data/last_val;
    mutlipliers[data.index] = data.value / adc_values[data.index];
    console.log(`Calibrating ${data.index} to ${data.value}. New Value: ${mutlipliers[data.index]}`)
    jsonfile.writeFile(file, {mutlipliers:mutlipliers}, function (err) {
      if (err) console.error(err)
    })
  })
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});


// Read the port data
port.on("open", () => {
  console.log('serial port open');
});


parser.on('data', data =>{
  
  data = data.toString();
  adc_values = data.split(" ");
  
  
  for(var i=0;i<adc_values.length;i++){
    converted_values[i] = adc_values[i] * mutlipliers[i];
  }
  
  console.log(adc_values,mutlipliers, converted_values)
  io.emit('adc_values', converted_values);
});