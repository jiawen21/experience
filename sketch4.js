<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Falling Text</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js"></script>
</head>
<body style="background-color: black; color: white;">
    <script>
        let input;
        let texts = [];

        function setup() {
            createCanvas(400, 400);
            input = createInput();
            input.position(20, 20);
            let saveButton = createButton('Save Text');
            saveButton.position(input.x + input.width + 10, 20);
            saveButton.mousePressed(saveText);
        }

        function draw() {
            background(0); // Set background to black
            for (let i = 0; i < texts.length; i++) {
                texts[i].fall();
                texts[i].display();
            }
        }

        function saveText() {
            let textValue = input.value();
            let newText = new FallingText(textValue);
            texts.push(newText);
            input.value('');
        }

        class FallingText {
            constructor(txt) {
                this.text = txt;
                this.x = random(width);
                this.y = -50;
                this.speed = random(1, 4);
            }

            fall() {
                this.y += this.speed;
                if (this.y > height + 20) {
                    this.y = -50;
                }
            }

            display() {
                textSize(20);
                textAlign(CENTER);
                fill(255); // Set text color to white
                text(this.text, this.x, this.y);
            }
        }
    </script>
</body>
</html>