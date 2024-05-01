let video;
let videoWidth = 400; // Adjust the width of the video
let videoHeight = 400; // Adjust the height of the video
let clicked = false;
let gameStarted = false;
let showResume = true;

function setup() {
  createCanvas(400, 400); // Adjust canvas size as needed

  // Load video from a file
  video = createVideo(['video.mp4'], videoLoaded); // Replace 'your_video_file.mp4' with your video file
  video.hide(); // Hide the video element
}

function videoLoaded() {
  video.play(); // Start playing the video once it's loaded
}

function draw() {
  background(0); // Black background for video
  image(video, 0, 0, width, height);

  if (!gameStarted && showResume) {
    fill(255);
    textSize(24);
    textAlign(CENTER, CENTER);
    text("Job Hunt", width / 2, height / 2);

    if (mouseIsPressed && mouseX > width / 2 - 50 && mouseX < width / 2 + 50 && mouseY > height / 2 - 15 && mouseY < height / 2 + 15) {
      clicked = true;
      video.hide(); // Hide the video when Education is clicked
      showResume = false; // Don't show the resume canvas anymore
      gameStarted = true;
      setupGameCanvas();
    }
  } else if (gameStarted) {
    // Game canvas
    background(0); // Adjust background color as needed
    // Gam // Display white paper
  fill(255); // White fill color
  stroke(0); // Black stroke colore code goes here...
     let paperWidth = 250; // Adjusted width to fit the horizontal text
  let paperHeight = 200;
  let paperX = (width - paperWidth) / 2;
  let paperY = (height - paperHeight) / 2;
     translate(width/2, height/2); // Translate origin to center of canvas
  rotate(HALF_PI); // Rotate 90 degrees (vertical rectangle)
  rect(-paperWidth/2, -paperHeight/2, paperWidth, paperHeight); // Draw white paper rectangle
    
     // Add text on the paper
  fill(0); // Black text color
  textSize(16);
  textAlign(CENTER, CENTER);
  translate(0, -paperWidth/4); // Offset text position
  rotate(-HALF_PI); // Rotate text back to horizontal
  text("Resume", -70, -90); // Center text on rotated paper
  textSize(10); 
  text("Education", -120, -50); // Center text on rotated paper
  text("Experience", -115,-10); // Center text on rotated paper
  text("Awards", -120,30); // Center text on rotated paper
  }
}

function setupGameCanvas() {
  createCanvas(400, 400); // Create a new canvas for the game
  background(290); // Light gray background
  
  // Display white paper
  fill(255); // White fill color
  stroke(0); // Black stroke color
  
  let paperWidth = 250; // Adjusted width to fit the horizontal text
  let paperHeight = 200;
  let paperX = (width - paperWidth) / 2;
  let paperY = (height - paperHeight) / 2;
  
  translate(width/2, height/2); // Translate origin to center of canvas
  rotate(HALF_PI); // Rotate 90 degrees (vertical rectangle)
  rect(-paperWidth/2, -paperHeight/2, paperWidth, paperHeight); // Draw white paper rectangle
  
  // Add text on the paper
  fill(0); // Black text color
  textSize(16);
  textAlign(CENTER, CENTER);
  translate(0, -paperWidth/4); // Offset text position
  rotate(-HALF_PI); // Rotate text back to horizontal
  text("Resume", -70, -90); // Center text on rotated paper
  textSize(10); 
  text("Education", -120, -50); // Center text on rotated paper
  text("Experience", -115,-10); // Center text on rotated paper
  text("Awards", -120,30); // Center text on rotated paper
}
