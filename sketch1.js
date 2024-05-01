let video;
let videoWidth = 400; // Adjust the width of the video
let videoHeight = 400; // Adjust the height of the video
let particles = [];
let showVideo = true; // Variable to control video visibility
let showText = true; // Variable to control text visibility

function setup() {
  createCanvas(400, 400); // Initial canvas size

  // Load video from a file
  video = createVideo(['video.mp4'], videoLoaded); // Replace 'video.mp4' with your video file//
  //video = createVideo("video.mp4"); // Load the video
  video.hide(); // Hide the video element
}

function videoLoaded() {
  video.play(); // Start playing the video once it's loaded
}

function draw() {
  background(220);

  if (showVideo) {
    // Display the video on the canvas at specified position and size
    image(video, (width - videoWidth) / 2, (height - videoHeight) / 2, videoWidth, videoHeight);
  } else {
    // New canvas without video
    setupNewCanvas();
  }

  if (showText) {
    textSize(24);
    fill(255);
    textAlign(CENTER, CENTER); // Center align text both horizontally and vertically
    text("Marriage", width / 2, height / 2);
  }
}

function mousePressed() {
  if (showVideo && mouseX > width / 2 - 60 && mouseX < width / 2 + 60 && mouseY > height / 2 - 20 && mouseY < height / 2 + 20) {
    // Check if the mouse is clicked on the text
    showVideo = false; // Hide the video
    showText = false; // Hide the text
  } else {
    let col = color(random(255), random(255), random(255), 100); // Random transparent color
    let particle = new Particle(mouseX, mouseY, col);
    particles.push(particle);
  }
}

function setupNewCanvas() {
  // Create a new blank canvas when the text is clicked
  createCanvas(width, height); // Match canvas size with the original canvas
  background(255, 192, 203); // Pink background color
  
  // Draw wedding rings
  noFill();
  strokeWeight(8);
  stroke(255, 215, 0); // Gold color
  ellipse(150, height / 2, 150, 150); // First ring
  stroke(192); // Silver color
  ellipse(250, height / 2, 150, 150); // Second ring
  
  // Display text
  textSize(15);
  textAlign(CENTER, CENTER);
  fill(0);
  text("Being deeply loved by someone gives you strength,\nwhile loving someone deeply gives you courage", width / 2, height / 2 - 120);

  // Display particles
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].display();
    if (particles[i].lifespan <= 0) {
      particles.splice(i, 1); // Remove dead particles
    }
  }
}

class Particle {
  constructor(x, y, col) {
    this.pos = createVector(x, y);
    this.vel = createVector(random(-2, 2), random(-2, 2));
    this.acc = createVector(0, 0);
    this.col = col;
    this.lifespan = 255; // Initial transparency
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.lifespan -= 2; // Decrease transparency
  }

  display() {
    noStroke();
    fill(this.col);
    ellipse(this.pos.x, this.pos.y, 10, 10); // Particle size
  }
}



