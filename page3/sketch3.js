var serial; // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem1411';  // fill in your serial
var inData;// for incoming serial
var sensor1;      //buttonj: this variable will hold the value from "s1"
var sensor2;      //protentiometer: this variable will hold the value from "s2"
var sensor3;      //protentiometer: this variable will hold the value from "s3"

var x;
var y;
var word1;
var mouseIsDragged = false;
var gameState = 0;
var distance;
var newX = 0;
var newX2 = 0;
var newY = 0;
var newY2 = 0;

var memory;


var serial;       //variable to hold the serial port object

var serialPortName = '/dev/cu.usbmodem1411';        //FOR PC it will be COMX on mac it will be something like "/dev/cu.usbmodemXXXX"

function preload() {
  word4 = loadImage('word4.png');
  word5 = loadImage('word5.png');
  word6 = loadImage('word6.png');
  word7 = loadImage('12.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
    
  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.on('list', printList); // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen);        // callback for the port opening
  serial.on('data', serialEvent);     // callback for when new data arrives
  serial.on('error', serialError);    // callback for errors
  serial.on('close', portClose);      // callback for the port closing
  serial.list(); // list the serial ports
  serial.open(portName);              // open a serial port
    
    memory = 0;
    newX = 0;
    newY = 0;
}

function draw() {
    
    background(255);
    x = width/2.0;
    y = height/2.0;
    
    if (sensor1 == 0 && memory == 0){
        window.open("http://webspace.ocad.ca/~3170567/page4/index.html");
        memory = 1;

    }
    
    image(word7, 0, 0, windowWidth, windowHeight);
    image(word4, 400, 150, 354, 69);
    image(word5, newX, newY, 292, 57);
    image(word6, 300, y, 786, 72);


}


function serverConnected() {
  console.log('connected to server.');
}
 
function portOpen() {
  console.log('the serial port opened.')
}

function serialEvent() {
    // read a string from the serial port
  // until you get carriage return and newline:
  var inString = serial.readStringUntil('\r\n');
 
  //check to see that there's actually a string there:
  if (inString.length > 0 ) {
    var sensors = split(inString, ',');            // split the string on the commas
    if (sensors.length > 1) {                      // if there are three elements
      newX = int(map(sensors[0], 0, 1023, 0, windowWidth));   // element 0 is the locH
        console.log(newX);
      newY = int(map(sensors[1], 0, 1023, 0, windowHeight)); // element 1 is the locV
        console.log(newY);
      sensor1 = sensors[2];
    }
  }
}
 
function serialError(err) {
  console.log('Something went wrong with the serial port. ' + err);
}
 
function portClose() {
  console.log('The serial port closed.');
}


// get the list of ports:
function printList(portList) {
 // portList is an array of serial port names
 for (var i = 0; i < portList.length; i++) {
 // Display the list the console:
 console.log(i + " " + portList[i]);
 }
}