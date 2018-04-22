class Dino {
  constructor(brain) {
    this.y = height / 2
    this.x = 64
    this.width = 50;
    this.height = 100;
    this.gravity = 0.6
    this.lift = -20
    this.velocity = 0
    this.ducked = false;

    // Is this a copy of another Bird or a new one?
    // The Neural Network is the bird's "brain"
    if (brain instanceof NeuralNetwork) {
      this.brain = brain.copy();
    } else {
      this.brain = new NeuralNetwork(4, 16, 3);
    }

    // Score is how many frames it's been alive
    this.score = 0;
    // Fitness is normalized version of score
    this.fitness = 0;
  }
  show() {
    fill(10,10,10,10)
    if (this.ducked == true) {
      this.y = height / 2 + 50;
      this.height = 50;
    }
    if (this.onGround() == true && this.ducked == false) {
      this.y = height / 2;
      this.height = 100;
    }
    rect(this.x, this.y, this.width, this.height);
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
      // inputs[0] = this.y / height;
      inputs[0] = nearestObstacle.x / width;
      inputs[1] = nearestObstacle.speed / maxSpeed;
      inputs[2] = map(nearestObstacle.height / 100, nearestObstacle.minHeight, nearestObstacle.maxHeight, 0, 1);
      inputs[3  ] = map(nearestObstacle.y, 0.55*height - 70,  0.75*height - 50, 0, 1);
      var output = this.brain.predict(inputs);
      var indexOfMaxValue = output.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);
      if (indexOfMaxValue == 0 && this.onGround()) {
        this.ducked = false;
        this.goUp();
      }
      if (indexOfMaxValue == 1 && this.onGround()) {
        this.ducked = true;
      }
      if (indexOfMaxValue == 2) {
        this.ducked = false;
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