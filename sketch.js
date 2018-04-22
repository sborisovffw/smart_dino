
// How big is the population
const totalPopulation = 500;
// All active dinos (not yet collided with pipe)
var activeDinos = [];
var speed = 5;
var savedDinos = [];
var obstacles = []
var dino = 0;
var obstaclesHit = 0;
var generate_frame = 100;
var nextSpawn = 0;
var maxSpeed = 10;
var generation = 0;
function setup() {
  createCanvas(800, 400);
  slider = createSlider(1, 100, 1, 1);
  div = createDiv('');
  div.id('scores');
  // Create a population
  for (var i = 0; i < totalPopulation; i++) {
    var dino = new Dino();
    activeDinos[i] = dino;
  }
  obstacles.push(new Obstacle(speed))
}

function draw() {
  for (let c = 0; c < slider.value(); c++) {
    for (var i = activeDinos.length - 1; i >= 0; i--) {
      var dino = activeDinos[i];
      dino.think(obstacles, maxSpeed);
      dino.update();
      dino.show();

      for (var j = 0; j < obstacles.length; j++) {
        // Hit an obstacle.
        if (obstacles[j].hits(dino)) {
          // Remove this dino
          savedDinos.push(activeDinos.splice(i, 1)[0]);
          break;
        }
      }
    }
    if (obstacles.length < 1) {
      obstacles.push(new Obstacle(speed));
    }

    if (obstacles[obstacles.length - 1].x > 0.9 * width) {
      nextSpawn = ceil(frameCount + random(40, 130));
    }

    if (frameCount == nextSpawn) {
      obstacles.push(new Obstacle(speed));
    }

    for (var i = obstacles.length - 1; i >= 0; i--) {
      // if (frameCount % 500 == 0 && speed < maxSpeed) {
      // speed *= 1.05
      // obstacles[i].speed = speed;
      // }

      if (obstacles[i].offscreen()) {
        obstacles.splice(i, 1);
      }
      if (obstacles.length < 1) {
        obstacles.push(new Obstacle(speed));
      }
      obstacles[i].show();
      obstacles[i].update();
    }

    // If we're out of dinos go to the next generation
    if (activeDinos.length == 0) {
      obstacles.splice(0, 1);
      nextGeneration();
    }
  }
  background(220);
  line(0, 0.75 * height, width, 0.75 * height);
  for (let dino of activeDinos) {
    dino.show();
  }
  for (let obstacle of obstacles) {
    obstacle.show();
  }
}
