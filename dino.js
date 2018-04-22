class Dino {
  constructor(brain) {
    this.y = height / 2
    this.x = 64
    this.gravity = 0.6
    this.lift = -20
    this.velocity = 0

    // Is this a copy of another Bird or a new one?
    // The Neural Network is the bird's "brain"
    if (brain instanceof NeuralNetwork) {
      this.brain = brain.copy();
    } else {
      this.brain = new NeuralNetwork(4, 4, 1);
    }

    // Score is how many frames it's been alive
    this.score = 0;
    // Fitness is normalized version of score
    this.fitness = 0;
  }
  show() {
    fill(255)
    rect(this.x, this.y, 50, 100);

    line(0, height - height / 4, width, height - height / 4);
  }
  goUp() {
    this.velocity += this.lift
  }
  onGround() {
    if (this.y >= height / 2 - 5) {
      return true;
    } else {
      return false
    }
  }
  copy() {
    return new Dino(this.brain);
  }

  think(obstacles, maxSpeed) {
    let inputs = [];
    var nearestObstacle = obstacles[0];
    if (nearestObstacle) {
      inputs[0] = this.y / height;
      inputs[1] = nearestObstacle.x / width;
      inputs[2] = nearestObstacle.speed / maxSpeed;
      inputs[3] = map(nearestObstacle.height / 100, nearestObstacle.minHeight, nearestObstacle.maxHeight, 0, 1);
      var output = this.brain.predict(inputs);
      if (output > 0.5 && this.onGround()) {
        this.goUp();
      }
    }
  }

  update() {
    // Increment the score for every frame.
    this.score++;
    this.velocity += this.gravity
    this.velocity *= 0.90
    this.y += this.velocity
    if (this.y + 0.5 * height > height) {
      this.y = height / 2;
      this.velocity = 0
    }
  }


}