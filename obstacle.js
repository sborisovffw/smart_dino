class Obstacle {
  constructor(speed) {

    createObstacle(this, speed);
  }

  show() {

    fill(this.color);
    rect(this.x, this.y, this.width, this.height);
  }
  update() {
    this.x -= this.speed
  }
  offscreen() {
    return this.x < 0;
  }

  // Calculate if dino hits the things.
  hits(dino) {
    if (this.x < dino.x + dino.width &&
      this.x + this.width > dino.x &&
      this.y < dino.y + dino.height &&
      this.height + this.y > dino.y) {
      return true;
      console.log('heelo');
    }
    else {
      return false;
    }
  }
}

function createObstacle(obst, speed) {
  var probability = random(0, 1);
  if (probability > 0.3) {
    obst.x = width;
    obst.maxHeight = 0.6;
    obst.minHeight = 0.5;
    obst.height = random(obst.minHeight, obst.maxHeight) * 100;
    obst.width = 25;
    obst.y = 0.75 * height - obst.height;
    obst.speed = speed;
    obst.highlight = true;
    obst.color = '#FF0863';
  }
  else {
    obst.x = width;
    obst.maxHeight = 0.6;
    obst.minHeight = 0.7;
    obst.height = random(obst.minHeight, obst.maxHeight) * 100;
    obst.width = 25;
    obst.y = 0.55 * height - obst.height;
    obst.speed = speed;
    obst.highlight = true;
    obst.color = '#03ff9e';
  }
}