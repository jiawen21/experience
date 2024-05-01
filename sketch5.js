let eyeHeight = 100;
let speed = 0.5;
let img;
let yPos = -100; // Initial position of the image outside the canvas

function preload() {
  img = loadImage('falling.png'); // Load your image file
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(255);
  
  // Draw the eye white part
  fill(255);
  ellipse(width / 2, height / 2, 200, eyeHeight);
  
  // Draw the pupil
  fill(0);
  let pupilSize = map(eyeHeight, 0, 100, 20, 50); // Adjust pupil size based on eye height
  ellipse(width / 2, height / 2, pupilSize, pupilSize);
  
  // Gradually decrease eye height until fully closed
  eyeHeight -= speed;
  if (eyeHeight <= 0) {
    eyeHeight = 0; // Ensure eye height doesn't go below 0
    moveImage();
  }
}

function moveImage() {
  let imageSize = 100; // Adjust the size of the image
  image(img, width / 2 - imageSize / 2, yPos, imageSize, imageSize); // Display the image with adjusted size
  yPos += 2; // Adjust the speed of image movement
  
  if (yPos > height) {
    yPos = -imageSize; // Reset the image position when it reaches the bottom
  }
}