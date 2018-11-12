//
//var word1;
//var word2;
//var word3;
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
  word1 = loadImage('word1.png');
  word2 = loadImage('word2.png');
  word3 = loadImage('word3.png');
  word4 = loadImage("11.jpg");
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
    y = height/2.0;
    
    if (sensor1 == 0 && memory == 0){
        window.open("http://webspace.ocad.ca/~3170567/page3/index.html");
        memory = 1;

    }
    
    image(word4, 0, 0, windowWidth, windowHeight);
    image(word1, 300, y, 170, 68);
    image(word2, newX, newY, 170, 44);
    image(word3, 700, y, 280, 56);

  /*
    
     //newX = sensor2;
     //newY = sensor3;

    //STATIC IMAGES
    if(gameState == 0){
         // Game hasn't started
        image(word1, 300, y, 204,120);
        image(word2, 200, 500, 204,120);
        image(word3, 700, y, 250,120);
    } else {
         image(word1, 300, y, 204,120);
         image(word2, newX, newY, 204,120);
         image(word3, 700, y, 250,120);

    }
    
    */
}

/*
function mousePressed() {
	if (image.length > 0) {
		for (var i = 0; i < image.length; i++) {
			var image = images[i],
					distance = dist(mouseX, mouseY, image.x, image.y);
			if (distance < dist) {
				image.active = true;
			} else {
				image.active = false;
			}
		}
	}
  // Prevent default functionality.
  return false;
}

// Run when the mouse/touch is dragging.
function mouseDragged() {
	if (image.length > 0) {
		for (var i = 0; i < image.length; i++) {
			var image = images[i];
			if (image.active) {
				image.x = mouseX;
				image.y = mouseY;
				break;
			}
		}
	}
  // Prevent default functionality.
  return false;
}



function mousePressed() {
    
    if(sensor1==0 )
  { mouseIsPressed;
  }
    else
    {
        mouseIsDragged;
    }
     // Cordinates for image1

     /*
     newX = mouseX;
     newY = mouseY;
     */

     // for image2


     // for image3

     /*
    	distance = dist(mouseX, mouseY, image.x, image.y);
	if (distance < 100) {
        image(word1, mouseX, mouseY);
        image.active = true;
	} else {
          image.active = false;
     }
     

}

function mouseDragged() {
     // Something to decide which value to assign
     
     newX = sensor2;
     newY = sensor3;

     //newX2 = mouseX;
     //newY2 = mouseY;

     gameState = 1; // Add one to the gameState;
}
*/


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