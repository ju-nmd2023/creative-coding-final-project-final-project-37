class Alien {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  draw() {
    // the head and body
    push();
    fill(51, 238, 34);
    noStroke();
    ellipse(this.x, this.y, 52);
    triangle(
      this.x - 25,
      this.y + 10,
      this.x + 25,
      this.y + 10,
      this.x,
      this.y + 40
    );
    rect(this.x - 5, this.y, 10, 50);
    rect(this.x - 15, this.y + 50, 30, 50);
    rect(this.x - 20, this.y + 50, 10, 30);
    rect(this.x + 10, this.y + 50, 10, 30);
    rect(this.x - 15, this.y + 80, 10, 50);
    rect(this.x + 5, this.y + 80, 10, 50);
    pop();

    // the eyes
    push();
    translate(this.x - 12, this.y + 3);
    angleMode(DEGREES);
    rotate(45);
    fill(0);
    ellipse(0, 0, 25, 15);

    pop();
    push();
    translate(this.x + 12, this.y + 2);
    angleMode(DEGREES);
    rotate(-45);
    fill(0);
    ellipse(0, 0, 25, 15);
    pop();

    push();
    fill(255);
    noStroke();
    ellipse(this.x - 7, this.y + 7, 5);
    ellipse(this.x - 15, this.y, 10);
    ellipse(this.x + 15, this.y, 10);
    ellipse(this.x + 7, this.y + 7, 5);
    pop();
  }
}

let alien;
let x = innerWidth / 2;
let y = innerHeight / 2;

function setup() {
  createCanvas(innerWidth, innerHeight);
}

function draw() {
  background(25);
  if (mouseIsPressed) {
    x = mouseX;
    y = mouseY;
  }
  alien = new Alien(x, y);
  alien.draw();
}
