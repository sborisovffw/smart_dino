
/**
 * Create the next generation of dinosaurs.
 */
function nextGeneration() {
  // Generate fitness for the dinos.
  calculateFitness();
  generation ++;
  let debug = document.getElementById('scores');
  debug.innerHTML += 'Generation' + generation + ':' + calculateGenerationFittness() + '<br>';
  
  for (let i = 0;  i < totalPopulation; i++) {
    // Selectively pick a random high fitness dino.
    activeDinos[i] = pickOne();
  }
  savedDinos = [];
}

/** 
 * Calculate the average dino score.
 */
function calculateGenerationFittness() {
  let sum = 0;
  for(let dino of savedDinos) {
    sum += dino.score;
  }
  return sum/savedDinos.length;
}

/**
 * Calculate the fitness of every dino.
 */
function calculateFitness() {
  let sum = 0;
  // Calculate the overall score of the generation.
  for(let dino of savedDinos) { 
    sum += dino.score;
  }

  // Calculate the normalized fitness of each dino.
  for(let dino of savedDinos) {
    dino.fitness = dino.score/sum;
  }
}

/**
 * Pick one randomly, with preference for higher fitness.
 */
function pickOne() {
  let index = 0;
  let rand = random(1);
  // console.log(r);
  while (rand > 0) {
    rand = rand - savedDinos[index].fitness;
    index++;
  }
  index--;
  let dino = savedDinos[index];
  let child = new Dino(dino.brain);
  child.brain.mutate(0.1);
  return child;
}