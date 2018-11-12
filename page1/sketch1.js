var x;
var y = 0;
var t;
var img1;

var serial; // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem1411';  // fill in your serial
var inData;// for incoming serial
var sensor1;      //buttonj: this variable will hold the value from "s1"

let snowflakes = []; // array to hold imag objects

var memory;


var serial;       //variable to hold the serial port object

var serialPortName = '/dev/cu.usbmodem1411';        //FOR PC it will be COMX on mac it will be something like "/dev/cu.usbmodemXXXX"

function preload() {
  img1 = loadImage('14.jpg');
  img2 = loadImage('15.jpg');

}

function setup() {
    createCanvas(2000, 2000);
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
    
 
}


function draw() { 
  background(89,34,93);
    
    if (sensor1 == 0 && memory == 0){
        window.open("http://webspace.ocadu.ca/~3170567/page3/index.html");
        memory = 1;

    }
    
  image(img1, 55, 55, 553, 737);
  image(img2, 600, 55, 553, 737);
    
 let t = frameCount / 60; // update time

  // create a random number of image each frame
  for (var i = 0; i < random(5); i++) {
      snowflakes.push(new snowflake()); // append snowflake object
  }

  // loop through snowflakes with a for..of loop
  for (let flake of snowflakes) {
    flake.update(t); // update snowflake position
    flake.display(); // draw snowflake
  }
}
    
    // snowflake class
function snowflake() {
  // initialize coordinates
  this.posX = 0;
  this.posY = random(-50, 0);
  this.initialangle = random(0, 2 * PI);
  this.size = random(5, 10);

  // radius of snowflake spiral
  // chosen so the snowflakes are uniformly spread out in area
  this.radius = sqrt(random(pow(width / 2, 2)));

  this.update = function(time) {
    // x position follows a circle
    let w = 0.6; // angular speed
    let angle = w * time + this.initialangle;
    this.posX = width / 2 + this.radius * sin(angle);

    // different size snowflakes fall at slightly different y speeds
    this.posY += pow(this.size, 0.5);

    // delete snowflake if past end of screen
    if (this.posY > height) {
      let index = snowflakes.indexOf(this);
      snowflakes.splice(index, 1);
    }
  };

  this.display = function() {
    ellipse(this.posX, this.posY, this.size);
  };
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
    




            


