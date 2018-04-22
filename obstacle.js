class Obstacle {
  constructor(speed) {
    this.x = width;
    this.maxHeight = 1.01;
    this.minHeight = 0.5;
    this.height = random(this.minHeight, this.maxHeight) * 100;
    this.y = 0.75 * height - this.height;
    this.speed = speed;
    this.highlight = true;
  }

  show() {
    fill(0);
    if (this.highlight) {
      fill('#FF0863')
    }
    rect(this.x, this.y, 25, this.height);

  }
  update() {
    this.x -= this.speed
  }
  offscreen() {
    return this.x < 0;
  }

  // Calculate if dino hits the things.
  hits(dino) {

    if (
      (dino.x + 50 > this.x && dino.x + 50 < this.x + 25) ||
      (dino.x > this.x && dino.x < this.x + 25) ||
      (this.x >= dino.x && this.x + 25 < dino.x + 50)){
      if (dino.y + 75 > this.y) {
        return true;
      }
    }
    else {
      return false;
    }
  }
}