// credits to #frankslaboratory for the use of <timestamp> in animate()

// global variables
let lastTime = 0;
let interval = 1000;
let reqAnim;

// smooth player moves
let keys = {
  z: false,
  s: false,
  q: false,
  d: false,
};

document.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'z':
      keys.z = true;
      break;
    case 's':
      keys.s = true;
      break;
    case 'q':
      keys.q = true;
      break;
    case 'd':
      keys.d = true;
      break;
  }
});

document.addEventListener('keyup', (e) => {
  switch (e.key) {
    case 'z':
      keys.z = false;
      break;
    case 's':
      keys.s = false;
      break;
    case 'q':
      keys.q = false;
      break;
    case 'd':
      keys.d = false;
      break;
  }
});

function move() {
  if (player.y > 64 && keys.z) {
    player.moveUp();
  }
  if (player.y < 470 - player.height && keys.s) {
    player.moveDown();
  }
  if (player.x > 0 && keys.q) {
    player.moveLeft();
  }
  if (player.x < gameCanvas.width - player.width && keys.d) {
    player.moveRight();
  }
}

// collision detection
// function getCenterX(element) {
//     return element.x + (element.width / 2);
//   }

// function getCenterY(element) {
//     return element.y + (element.height / 2);
//   }
const getCenterX = (element) => element.x + element.width / 2;

const getCenterY = (element) => element.y + element.height / 2;

const isColliding = (a, b) => {
  let aCollideB = false;
  const distanceX = Math.abs(getCenterX(a) - getCenterX(b));
  const distanceY = Math.abs(getCenterY(a) - getCenterY(b));
  if (
    distanceX <= (a.width + b.width) / 2 &&
    distanceY <= (a.height + b.height) / 2
  ) {
    aCollideB = true;
  }
  return aCollideB;
};

//damages management
function dealDamages() {
  game.aliens.forEach((alien) => {
    if (isColliding(alien, player)) {
      if (!player.touched) {
        player.touched = true;
        player.health -= Math.floor(alien.health / 2);
      }
    }

    player.bullets.forEach((bullet, i) => {
      if (isColliding(alien, bullet)) {
        alien.health -= bullet.pow;
        player.bullets.splice(i, 1);
        game.countScore();
      }
    });
  });
}

// refresh canvas function
const animate = (timestamp) => {
  clearGameCanvas();
  const deltaTime = timestamp - lastTime;
  lastTime = timestamp;
  move();
  player.display();
  player.displayBullets(deltaTime);
  player.checkStatus(deltaTime);
  const endGame = game.countLives();
  if (endGame) {
    cancelAnimationFrame(reqAnim);
    gameOver();
    return;
  }
  game.launchAliens(deltaTime);
  dealDamages();
  updateHealthAndPortrait();
  reqAnim = requestAnimationFrame(animate);
};

// DOM - globale constants
const gameOverScreen = document.getElementById('game-over');
// const loser = document.getElementById('loser');
// const fame = document.getElementById('fame');
const homeBtn = document.querySelector('.home');
// const nameInput = document.getElementById('name');

// welcome screen
const welcomeScreen = document.getElementById('welcome');
const startBtn = document.getElementById('btn-newGame');
const rulesBtn = document.getElementById('btn-rules');
// const hiScoresBtn = document.getElementById('btn-hi-scores');
let player, game, playerBullet;

startBtn.addEventListener('click', () => {
  welcomeScreen.classList.toggle('hidden');
  gameScreen.classList.toggle('hidden');
  player = new Player();
  game = new Game();
  playerBullet = new PlayerBullet();
  displayLives();
  animate(0);
});

rulesBtn.addEventListener('click', () =>
  rulesScreen.classList.toggle('hidden')
);

// hiScoresBtn.addEventListener('click', () => hiScroresScreen.classList.toggle('hidden'));

// rules and hi-scores X button
const rulesScreen = document.getElementById('rules');
const rulesScreenBtn = document.querySelector('#rules button');
// const hiScroresScreen = document.getElementById('hi-scores');
// const hiScroresScreenBtn = document.querySelector('#hi-scores button');

rulesScreenBtn.addEventListener('click', () =>
  rulesScreen.classList.toggle('hidden')
);
// hiScroresScreenBtn.addEventListener('click', () => hiScroresScreen.classList.toggle('hidden'))

// report score on GUI

// GUI
const gameScreen = document.getElementById('game-screen');

// health bar, portrait and lives update
const hearts = document.getElementById('hearts');
const portait = document.getElementById('marine');
const healthBar = document.querySelector('progress');

function updateHealthAndPortrait() {
  let health = player.health;
  healthBar.setAttribute('value', health);
  if (health <= 100 && health >= 80) {
    portait.setAttribute('src', 'images/Marine_states/marine_good.png');
  } else if (health < 80 && health >= 60) {
    portait.setAttribute(
      'src',
      'images/Marine_states/marine_slightly_damaged.png'
    );
  } else if (health < 60 && health >= 40) {
    portait.setAttribute('src', 'images/Marine_states/marine_damaged.png');
  } else if (health < 40 && health >= 20) {
    portait.setAttribute(
      'src',
      'images/Marine_states/marine_badly_damaged.png'
    );
  } else if (health < 20 && health > 0) {
    portait.setAttribute(
      'src',
      'images/Marine_states/marine_heavy_damaged.png'
    );
  } else if (health === 0) {
    portait.setAttribute('src', 'images/Marine_states/marine_dead.png');
  }
}
function displayLives() {
  let count = game.lives;
  for (let i = 0; i < count; i++) {
    hearts.innerHTML += `<div class="heart"></div>`;
  }
}

// const hiScoresTab = document.getElementById('hi-score');

// Game Over screen

const finalScore = document.getElementById('final-score');
function gameOver() {
  gameOverScreen.classList.toggle('hidden');
  finalScore.textContent = `${game.score}`;
}

homeBtn.addEventListener('click', () => {
  gameOverScreen.classList.toggle('hidden');
  gameScreen.classList.toggle('hidden');
  welcomeScreen.classList.toggle('hidden');
});
