//
//var word1;
//var word2;
//var word3;

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

function preload() {
  word1 = loadImage('word1.png');
  word2 = loadImage('word2.png');
  word3 = loadImage('word3.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(89,34,93);

  y = height/2.0;

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

*/

function mousePressed() {
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
     */

}

function mouseDragged() {
     // Something to decide which value to assign
     
     newX = mouseX;
     newY = mouseY;

     //newX2 = mouseX;
     //newY2 = mouseY;

     gameState = 1; // Add one to the gameState;
}