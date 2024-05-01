let person;
let video;
let yPos = 0; // Initial y-position for the person
const personHeight = 80; // Height of the person image
let videoIsPlaying = false;
let birthClicked = false;

let lightSize = 10; // Initial size of the light effect
let maxLightSize = 500; // Maximum size of the light effect
let circles = []; // Array to store circles
let scatterLights = []; // Array to store scatter lights

let newCanvas; // Variable to store the new canvas instance
let bgColor1, bgColor2;
let currentColor;
let lerping = false;
let fadeTime = 50;



function preload() {
  person = loadImage("falling.png"); // Load the person image
  video = createVideo("video.mp4"); // Load the video
  video.hide(); // Hide the video initially
  // sound = loadSound("baby.mp3"); // Load the sound file
}

function setup() {
  createCanvas(400,400);
  newCanvas = createGraphics(width, height); // Create a new canvas with the same size as the main canvas
  bgColor1 = color(0); // Black
  bgColor2 = color(255); // White
  currentColor = bgColor1;
}

function draw() {
  background(35); // Set background to black for outer space effect

  


  // Draw person falling and floating
  tint(255); // Set the tint to white
  image(person, 150, yPos, personHeight, personHeight); // Adjust image position and size here

  // Increment y-position to make the person fall slowly
  yPos += 1; // You can adjust the speed of falling by changing this value

  // Check if the person has reached the bottom of the canvas
  if (yPos > height) {
    yPos = -personHeight; // Reset y-position to the top
  }

  // Display the video if it's playing
  if (videoIsPlaying) {
    image(video, 0, 0, width, height); // Display video across the canvas

    // Add text on top of the video
    textSize(32);
    fill(255);
    textAlign(CENTER, CENTER);
    text("BIRTH", width / 2, height / 2); // Adjust text position and content here
  }

  if (birthClicked) {
    // Draw the content for the new canvas
    drawNewCanvas(); // Draw the new canvas content
  }
}

function drawStars() {
  for (let i = 0; i < 50; i++) {
    let x = random(width);
    let y = random(height);
    stroke(255);
    point(x, y);
  }
}

function mousePressed() {
  let d = dist(mouseX, mouseY, 150 + personHeight / 2, yPos + personHeight / 2); // Calculate distance from mouse to person image center

  if (d < personHeight / 2) { // Check if mouse is clicked on the person
    if (videoIsPlaying) {
      videoIsPlaying = false;
      video.pause(); // Pause the video
    } else {
      videoIsPlaying = true;
      video.loop(); // Play the video
    }
  }

  if (mouseX > width / 2 - 50 && mouseX < width / 2 + 50 && mouseY > height / 2 - 20 && mouseY < height / 2 + 20) {
    // Check if the mouse is clicked on the "BIRTH" text
    birthClicked = true;
  }

  // Check if the mouse is pressed on the new canvas
  if (birthClicked) {
    // Create a new circle at the mouse position
    let newCircle = {
      x: mouseX,
      y: mouseY,
      size: 10, // Initial size of the new circle
      alpha: 255 // Initial alpha value (fully opaque)
    };
    circles.push(newCircle); // Add the new circle to the array

    // Create scatter lights around the new circle
    for (let i = 0; i < 5; i++) {
      let scatterLight = {
        x: random(newCircle.x - 20, newCircle.x + 20), // Random x within a range
        y: random(newCircle.y - 20, newCircle.y + 20), // Random y within a range
        size: random(5, 20), // Random size
        alpha: random(50, 150) // Random alpha value for variation
      };
      scatterLights.push(scatterLight); // Add the scatter light to the array
    }
  }
}

function drawNewCanvas() {
  newCanvas.background(35); // Set background to black for outer space effect
  
 

  // Add text on the new canvas
  newCanvas.fill(255); // Text color (white)
  newCanvas.textSize(11); // Text size
  newCanvas.textAlign(CENTER, CENTER); // Text alignment
  newCanvas.text("As a newborn beholds the world,\ntheir eyes unfurl to embrace the dance of light for the very first time", width / 2, height / 2); // Text content and position
  
  //newCanvas.text("NEXT→", width / 2 + 150, height / 2 + -150);
  

 

  // Gradually increase the size of the light effect
  if (lightSize < maxLightSize) {
    lightSize += 3; // You can adjust the speed of expansion by changing this value
  }

  // Draw the expanding light effect
  let alpha = map(lightSize, -20, maxLightSize, 305, 0); // Map alpha value based on lightSize
  newCanvas.fill(255, alpha); // Set fill color with changing alpha
  newCanvas.noStroke();
  newCanvas.ellipse(width / 2, height / 2, lightSize); // Draw expanding circle at the center of the canvas

  // Draw existing circles
  for (let i = 0; i < circles.length; i++) {
    let circleData = circles[i];
    newCanvas.fill(255, circleData.alpha); // Set fill color with circle's alpha value
    newCanvas.ellipse(circleData.x, circleData.y, circleData.size); // Draw circle
  }
  
  

  // Draw existing scatter lights
  for (let i = 0; i < scatterLights.length; i++) {
    let light = scatterLights[i];
    newCanvas.fill(255, light.alpha); // Set fill color with light's alpha value
    newCanvas.ellipse(light.x, light.y, light.size); // Draw light
  }
  
 
 image(newCanvas, 0, 0); // Draw the new canvas on the main canvas

  function buttonClicked() {
  // Action to perform when the button is clicked
  console.log("Button clicked!");
  // Add your button functionality here
    buttonColor = color(100, 200, 100);
}
}


