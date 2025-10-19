class Alien {
  constructor(x, y) {
    // this.x = x;
    // this.y = y;

    // the force vectors and functions are taken from the course lecture "force example 2"
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.size = 120;
    this.mass = 80;
  }

  applyForce(force) {
    let newForce = force.copy();
    newForce.div(this.mass);
    this.acceleration.add(newForce);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(10);
    this.position.add(this.velocity);

    this.acceleration.mult(0);
  }

  draw() {
    if (mouseIsPressed) {
      //   this.position.x = mouseX;
      this.position.y = mouseY;
    }
    // the head and body
    push();
    fill(51, 238, 34);
    noStroke();
    ellipse(this.position.x, this.position.y, 52);
    triangle(
      this.position.x - 25,
      this.position.y + 10,
      this.position.x + 25,
      this.position.y + 10,
      this.position.x,
      this.position.y + 40
    );
    rect(this.position.x - 5, this.position.y, 10, 50);
    rect(this.position.x - 15, this.position.y + 50, 30, 50);
    rect(this.position.x - 20, this.position.y + 50, 10, 30);
    rect(this.position.x + 10, this.position.y + 50, 10, 30);
    rect(this.position.x - 15, this.position.y + 80, 10, 50);
    rect(this.position.x + 5, this.position.y + 80, 10, 50);
    pop();

    // the eyes
    push();
    translate(this.position.x - 12, this.position.y + 3);
    angleMode(DEGREES);
    rotate(45);
    fill(0);
    ellipse(0, 0, 25, 15);

    pop();
    push();
    translate(this.position.x + 12, this.position.y + 2);
    angleMode(DEGREES);
    rotate(-45);
    fill(0);
    ellipse(0, 0, 25, 15);
    pop();

    push();
    fill(255);
    noStroke();
    ellipse(this.position.x - 7, this.position.y + 7, 5);
    ellipse(this.position.x - 15, this.position.y, 10);
    ellipse(this.position.x + 15, this.position.y, 10);
    ellipse(this.position.x + 7, this.position.y + 7, 5);
    pop();
  }
}

class Rectangle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  draw() {
    push();
    noStroke();
    fill(255, 150);
    rect(this.x, this.y, 75, 500);
    pop();
  }
}

class Sphere {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  draw() {
    push();
    translate(this.x, this.y, this.z);
    let c = color(255);
    pointLight(c, 0, -150, 0);

    // c = color(221, 102, 255);
    // pointLight(c, 0, 150, 0);

    // ambientLight(221, 102, 255);
    ambientLight(51, 238, 34);

    rotateZ(frameCount * 0.6);
    rotateY(frameCount * 0.6);

    fill(255, 150);
    noStroke();
    // stroke(255);

    // have found out how to do the sphere from this https://www.youtube.com/watch?v=SGHWZz5Mrsw
    for (let phi = 0; phi < 180; phi += 5) {
      beginShape();
      for (let theta = 0; theta < 360; theta += 5) {
        let x1 = r * cos(phi);
        let y1 = r * sin(phi) * sin(theta);
        let z1 = r * sin(phi) * cos(theta);
        vertex(x1, y1, z1);
      }
      endShape();
    }
    pop();
  }
}

let alien;
let x = innerWidth / 10;
let y = innerHeight / 2;
// taken from Force example 2
let element;
let gravity;
const c = 2;
let synth;

let counter = 0;
let counter2 = 0;
let trigger_rect = true;
let first_Screen = true;
let second_screen = false;

let r = 280;

window.addEventListener("load", () => {
  synth = new Tone.PolySynth().toDestination();
});

// taken from the tone js examples and my own assignemtn in the individual portfolio
function synthSound() {
  synth.set({
    oscillator: {
      type: "sine",
    },
  });
  synth.set({
    envelope: {
      attack: 0.2,
      decay: 0.3,
      sustain: 0.5,
      release: 0.8,
    },
  });
}

function setup() {
  createCanvas(innerWidth, innerHeight, WEBGL);
  gravity = createVector(0, 10);

  alien = new Alien(x, y);

  rectangle1 = new Rectangle(width / 2, height / 3);
  rectangle2 = new Rectangle(width / 3, height / 2);
  rectangle3 = new Rectangle(width / 4 + 20, height / 3);
  rectangle4 = new Rectangle(width / 5, height / 5);
  rectangle5 = new Rectangle(width / 2 + width / 3, height / 4);
  rectangle6 = new Rectangle(width / 2 + width / 4, height / 2);
  rectangle6 = new Rectangle(width / 2 + width / 5, height / 7);
  rectangle7 = new Rectangle(width / 2 + width / 7.5, height / 4);
  rectangle8 = new Rectangle(width / 2 + width / 14, height / 6);
  rectangle9 = new Rectangle(width / 2 + width / 2.5, height / 2 - 100);
  rectangle10 = new Rectangle(width / 2 + width / 3.8, height / 3);

  alien_sphere = new Sphere(200, 10, 200);
}

function draw() {
  background(0);
  push();
  translate(-width / 2, -height / 2);
  // image(pg, width / 2, 250);
  if (first_Screen === true) {
    // taken from the force example 2
    let friction = alien.velocity.copy();
    friction.mult(-1);
    friction.normalize();
    friction.mult(c);

    alien.applyForce(friction);
    alien.applyForce(gravity);
    alien.update();
    alien.draw();

    // Check for the walls
    if (alien.position.x < 0) {
      alien.position.x = 0;
      alien.velocity.x *= -1;
    } else if (alien.position.x > width) {
      alien.position.x = width;
      alien.velocity.x *= -1;
    }
    if (alien.position.y < 0) {
      alien.position.y = 0;
      alien.velocity.y *= -1;
    } else if (alien.position.y > height - 150) {
      alien.position.y = height - 150;
      alien.velocity.y *= -1;
      if (trigger_rect === true) {
        counter = counter + 1;
        trigger_rect = false;
      }

      // synth.triggerAttackRelease(["F3", "A3"], "8n");
    }
    if (counter >= 1) {
      rectangle1.draw();
      rectangle4.draw();
    }
    if (counter >= 2) {
      rectangle9.draw();
      rectangle4.draw();
    }
    if (counter >= 3) {
      rectangle6.draw();
      rectangle10.draw();
    }
    if (counter >= 4) {
      rectangle7.draw();
      rectangle5.draw();
    }
    if (counter >= 5) {
      rectangle8.draw();
      rectangle6.draw();
    }
    if (counter >= 6) {
      rectangle5.draw();
      rectangle2.draw();
    }
    if (counter >= 7) {
      rectangle2.draw();
      rectangle7.draw();
    }
    if (counter >= 8) {
      rectangle3.draw();
      rectangle8.draw();
    }
    if (counter >= 9) {
      rectangle4.draw();
      rectangle3.draw();
    }
    if (counter >= 10) {
      rectangle10.draw();
      rectangle9.draw();
    }

    if (counter >= 11) {
      rectangle1.draw();
      push();
      noStroke();
      fill(51, 238, 34);
      //   fill(255, 100);
      rect(width / 3 + width / 16, 0, 150, height);
      pop();
    }
    if (counter >= 12) {
      push();
      noStroke();
      fill(51, 238, 34);
      //   fill(255, 100);
      rect(width / 3 + width / 15, 0, 300, height);
      pop();
    }
    if (counter >= 13) {
      push();
      noStroke();
      fill(51, 238, 34);
      //   fill(255, 100);
      rect(width / 3 + width / 15, 0, 450, height);
      pop();
    }
    if (counter >= 14) {
      push();
      noStroke();
      fill(51, 238, 34);
      //   fill(255, 100);
      rect(width / 3 + width / 15, 0, 600, height);
      pop();
    }
    if (counter >= 15) {
      push();
      noStroke();
      fill(51, 238, 34);
      //   fill(255, 100);
      rect(width / 3 + width / 15, 0, 750, height);
      pop();
    }
    if (counter >= 16) {
      push();
      noStroke();
      fill(51, 238, 34);
      //   fill(255, 100);
      rect(width / 3 + width / 15, 0, 900, height);
      pop();
    }
    if (counter >= 17) {
      push();
      noStroke();
      fill(51, 238, 34);
      //   fill(255, 100);
      rect(width / 3 + width / 15, 0, 1050, height);

      push();
      translate(width / 2, height / 2);
      alien_sphere.draw();
      pop();

      pop();
    }

    pop();

    // if (counter2 >= 2) {
    //   push();
    //   noStroke();
    //   fill(51, 238, 34);
    //   rect(width / 3 + width / 16, 0, 150 * counter2, height);
    //   pop();
    // }
  }
}

setInterval(() => {
  if (alien.position.y < height - 150) {
    trigger_rect = true;
  }
}, 1000);
