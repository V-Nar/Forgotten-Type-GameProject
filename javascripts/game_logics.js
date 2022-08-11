const gameCanvas = document.querySelector("#game");
const ctx = gameCanvas.getContext("2d");

function clearGameCanvas() {
  ctx.clearRect(0, 0, 900, 550);
}

// const playerSpriteSheet = new Image();
// playerSpriteSheet.src = './images/Players/player.png';

// player definition
class Player {
  constructor() {
    this.x = 20;
    this.y = 232;
    this.width = 42;
    this.height = 67.5;
    this.speed = 5;
    this.image = new Image();
    this.image.addEventListener("load", () => {
      this.display();
    });
    this.image.src = "../images/Players/player1.png";
    this.fireRate = 0.2;
    this.bullets = [];
    this.timeToNextBullet = 0;
  }

  moveUp() {
    this.y -= this.speed;
  }
  moveDown() {
    this.y += this.speed;
  }
  moveLeft() {
    this.x -= this.speed;
  }
  moveRight() {
    this.x += this.speed;
  }

  display() {
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(this.image, 272, 6, 27, 44, this.x, this.y, this.width, this.height);
  }

  displayBullets(deltaTime) {
    this.timeToNextBullet += deltaTime;

    if (this.timeToNextBullet > interval * this.fireRate) {
      this.bullets.push(new PlayerBullet());
      this.timeToNextBullet = 0;
    }

    [...this.bullets].forEach((bullet, i) => {
      if (bullet.x > gameCanvas.width) {
        this.bullets.splice(i, 1);
      }
      bullet.move();
    });
    this.bullets.forEach((bullet) => bullet.draw());
  }
}

const player = new Player();

// player's bullet definition
class PlayerBullet {
  constructor(x, y, speed) {
      this.width = 8;
      this.height = 3;
      this.x = player.x + 36;
      this.y = player.y + 17;
      this.pow = 30;
      this.speed = 20;
    this.bullet = new Image();
    this.bullet.addEventListener("load", () => {
      this.draw();
    });
    this.bullet.src = "../images/Players/laser.png";
  }

  move() {
    this.x += this.speed;
  }

  draw() {
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(this.bullet, 81, 93, 32, 8, this.x, this.y, 8, 3);
  }
}

// alien definition
class Alien {
  constructor() {
    this.x = gameCanvas.width;
    this.y = Math.random() * 331 + 81;
    this.speed = 1.5;
    this.speedY = 0
    this.width = 34.5;
    this.height = 36;
    this.health = 50;
    this.value = 100;
    this.pow = Math.floor(this.health * 0.1);
    this.alien = new Image();
    this.alien.addEventListener("load", () => {
      this.display();
    });
    this.alien.src = "../images/Aliens/alien1.png";
    this.aliens = [];
    this.timeToNextY = 0;
    this.popRate = 3;
  }

  display() {
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(
      this.alien,
      0,
      0,
      23,
      24,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  move(deltaTime) {
    if (this.isOffScreen) {
      return;
    }

    this.x -= this.speed;

    this.calculateSpeedY(deltaTime);
    this.y += this.speedY;
    if (this.y < 81 + this.height) {
        this.y = 81 + this.height
    } 
    
    if (this.y > 331 - this.height) {
       this.y = 331 - this.height 
    }

    if (this.x < 0 - this.width) {
      this.isOffScreen = true;
    }
  }

  calculateSpeedY(deltaTime) {
    this.timeToNextY += deltaTime;
    if (this.timeToNextY > interval * 0.6) {
      this.speedY = 6 * (Math.random() - 0.5)
      this.timeToNextY = 0;
    }
    return this.newY;
  }
}

const alien = new Alien();

class AlienBullet {}
// general game logics
class Game {
  constructor() {
    this.hiScore = 1000;
    this.score = 0;
    this.lifes = 3;
  }

  countLifes() {
    if (player.health === 0) {
      this.lifes--;
    }
  }

  

  startGame() {}

  endGame() {
    if (player.health === 0 && this.lifes === 0) {
    }
  }
}
