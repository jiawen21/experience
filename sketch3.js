let toddlerX, toddlerY;
let armAngle = 0;
let legAngle = 0;
let subjects = ['Math', 'Science', 'History', 'English', 'Art', 'Music', 'Geography', 'Biology', 'Physics']; // More school subjects
let subjectColors = ['#FF5733', '#33FF57', '#3333FF', '#FF3333', '#FFFF33', '#FF33FF', '#33FFFF', '#FF9933', '#9933FF']; // Colors for each subject
let score = 0;
let gameover = false;
let books = [];
let congratsMessage = "Congratulations, you graduated!";
let balloons = [];

// Define modern color scheme
let backgroundColor = '#f0f0f0'; // Light gray background
let buttonColor = '#4CAF50'; // Green button color
let textColor = '#333333'; // Dark text color

function setup() {
  createCanvas(400, 400);
  toddlerX = width / 2;
  toddlerY = height - 50;

  // Create falling books
  for (let i = 0; i < subjects.length; i++) {
    let book = {
      x: random(width),
      y: random(-height, -50),
      speed: random(1, 4), // Increased speed for harder gameplay
      subject: subjects[i],
      color: subjectColors[i],
      caught: false
    };
    books.push(book);
  }
}

function draw() {
  background(backgroundColor);

  // Check gameover
  if (!gameover) {
    // Move and display falling books
    for (let i = 0; i < books.length; i++) {
      let book = books[i];
      if (!book.caught) {
        book.y += book.speed;
        if (book.y > height) {
          book.y = random(-height, -50);
          book.x = random(width);
        }
        fill(book.color);
        rect(book.x, book.y, 40, 60);
        textSize(12);
        fill(255);
        textAlign(CENTER);
        text(book.subject, book.x + 20, book.y + 35);

        // Check for collision with toddler's head
        if (dist(toddlerX, toddlerY - 70, book.x + 20, book.y + 60) < 40) {
          book.caught = true;
          score++;
        }
      }
    }

    // Toddler drawing code...
    drawToddler();

    // Display score
    fill(textColor);
    textSize(20);
    text(`Score: ${score}`, 60, 50);

    // Check score for congratulatory message
    if (score >= 9) {
      fill(textColor);
      textSize(20);
      textAlign(CENTER, CENTER);
      text(congratsMessage, width / 2, height / 2);

      // Create balloons when score reaches 9
      if (balloons.length < 10) {
        let balloon = new Balloon(random(width), height + 50, random(1, 4));
        balloons.push(balloon);
      }
    }
  } else {
    // Gameover screen
    fill(textColor);
    textSize(30);
    textAlign(CENTER, CENTER);
    text('Game Over', width / 2, height / 2);
    textSize(20);
    text(`Score: ${score}`, width / 2, height / 2 + 40);
  }
}

// Function to draw the toddler
function drawToddler() {
  // Toddler's body
  fill(0, 0, 0); // Red color for simplicity
  ellipse(toddlerX, toddlerY, 50, 100);
  
  fill(255); // White color for the buttons
  ellipse(toddlerX, toddlerY + -20, 5, 5); // First button
  ellipse(toddlerX, toddlerY + 0, 5, 5); // Second button
  ellipse(toddlerX, toddlerY + 20, 5, 5); // Third button

  // Toddler's head
  fill(255);
  ellipse(toddlerX, toddlerY - 70, 60);

  // Eyes
  fill(0);
  ellipse(toddlerX - 15, toddlerY - 80, 10);
  ellipse(toddlerX + 15, toddlerY - 80, 10);

  noFill();
  stroke(0);
  strokeWeight(2);
  arc(toddlerX, toddlerY - 60, 20, 20, 0, PI); // Draw a smile

  // Left arm
  push();
  translate(toddlerX - 25, toddlerY - 40);
  rotate(radians(-45 + armAngle));
  line(0, 0, -40, -40);
  pop();

  // Right arm
  push();
  translate(toddlerX + 25, toddlerY - 40);
  rotate(radians(45 - armAngle));
  line(0, 0, 40, -40);
  pop();

  // Left leg
  push();
  translate(toddlerX - 10, toddlerY + 40);
  rotate(radians(-30 + legAngle));
  line(0, 0, -20, 40);
  pop();

  // Right leg
  push();
  translate(toddlerX + 10, toddlerY + 40);
  rotate(radians(30 - legAngle));
  line(0, 0, 20, 40);
  pop();

  // Update arm and leg movement
  armAngle = sin(frameCount * 0.1) * 30;
  legAngle = sin(frameCount * 0.1) * 15;

  // Constrain toddler's X position to stay within canvas
  toddlerX = constrain(toddlerX, 25, width - 25);
}

// Mouse movement event listener to move the toddler
function mouseMoved() {
  toddlerX = mouseX;
}

// Class for balloons
class Balloon {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.color = color(random(0), random(255), random(255), 200); // Random color with transparency
  }

  move() {
    this.y -= this.speed;
    if (this.y < -50) {
      this.y = height + 50;
      this.x = random(width);
    }
  }
}