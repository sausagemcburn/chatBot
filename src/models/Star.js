// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/17WoOqgXsRM

// I create a "Star" Class.
class Star {
  
  constructor() {
    // I place values in the variables
    //this.x = map(Math.random(), 1, -width/2, width/2);
    this.x = random(-width/2, width/2);
    // note: height and width are the same: the canvas is a square.
    //this.y = map(Math.random(), 1, -height/2, height/2);
    this.y = random(-height/2, height/2);
    // note: the z value can't exceed the width/2 (and height/2) value,
    // beacuse I'll use "z" as divisor of the "x" and "y",
    // whose values are also between "0" and "width/2".
    this.z = random(width/2);
    // I set the previous position of "z" in the same position of "z",
    // which it's like to say that the stars are not moving during the first frame.
    this.pz = this.z;
    
    // color_r = random(255);
    // color_g = random(255);
    // color_b = random(255);
    this.c = generateRandomColor();
  }

  update() {
    // In the formula to set the new stars coordinates
    // I'll divide a value for the "z" value and the outcome will be
    // the new x-coordinate and y-coordinate of the star.
    // Which means if I decrease the value of "z" (which is a divisor),
    // the outcome will be bigger.
    // Wich means the more the speed value is bigger, the more the "z" decrease,
    // and the more the x and y coordinates increase.
    // Note: the "z" value is the first value I updated for the new frame.
    this.z = this.z - speed;
    // when the "z" value equals to 1, I'm sure the star have passed the
    // borders of the canvas( probably it's already far away from the borders),
    // so i can place it on more time in the canvas, with new x, y and z values.
    // Note: in this way I also avoid a potential division by 0.
    if (this.z < 1) {
      this.z = width/2;
      this.x = random(-width/2, width/2);
      this.y = random(-height/2, height/2);
      this.pz = this.z;
    }
  }

  show() {
    fill(this.c);
    noStroke();

    // with theese "map", I get the new star positions
    // the division x / z get a number between 0 and a very high number,
    // we map this number (proportionally to a range of 0 - 1), inside a range of 0 - width/2.
    // In this way we are sure the new coordinates "sx" and "sy" move faster at each frame
    // and which they finish their travel outside of the canvas (they finish when "z" is less than a).

    let sx = map(this.x / this.z, 0, 1, 0, width/2);
    let sy = map(this.y / this.z, 0, 1, 0, height/2);;

    // I use the z value to increase the star size between a range from 0 to 16.
    let r = map(this.z, 0, width/2, 16, 0);
    ellipse(sx, sy, r, r);

    // Here i use the "pz" valute to get the previous position of the stars,
    // so I can draw a line from the previous position to the new (current) one.
    let px = map(this.x / this.pz, 0, 1, 0, width/2);
    let py = map(this.y / this.pz, 0, 1, 0, height/2);

    // Placing here this line of code, I'm sure the "pz" value are updated after the
    // coordinates are already calculated; in this way the "pz" value is always equals
    // to the "z" value of the previous frame.
    this.pz = this.z;

    stroke(this.c);
    line(px, py, sx, sy);

  }
}
