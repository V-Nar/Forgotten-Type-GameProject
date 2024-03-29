const gameCanvas = document.querySelector('#game');
const ctx = gameCanvas.getContext('2d');

function clearGameCanvas() {
  ctx.clearRect(0, 0, 900, 550);
}

// player definition
class Player {
  constructor() {
    this.x = 20;
    this.y = 232;
    this.width = 42;
    this.height = 67.5;
    this.speed = 5;
    this.health = 100;
    this.image = new Image();
    this.image.addEventListener('load', () => {
      this.display();
    });
    this.image.src = 'images/Players/player1.png';
    this.fireRate = 0.2;
    this.bullets = [];
    this.timeToNextBullet = 0;
    this.touched = false;
    this.timeToNextTouch = 0;
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
    ctx.drawImage(
      this.image,
      272,
      6,
      27,
      44,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  displayBullets(delay) {
    this.timeToNextBullet += delay;

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

  checkStatus(delay) {
    if (this.touched) {
      this.timeToNextTouch += delay;
      if (this.timeToNextTouch > interval * 2) {
        this.touched = false;
        this.timeToNextTouch = 0;
      }
    }
  }
}

// player's bullet definition
class PlayerBullet {
  constructor() {
    this.width = 8;
    this.height = 3;
    this.x = player.x + 36;
    this.y = player.y + 17;
    this.pow = 30;
    this.speed = 20;
    this.bullet = new Image();
    this.bullet.addEventListener('load', () => {
      this.draw();
    });
    this.bullet.src = 'images/Players/laser.png';
  }

  move() {
    this.x += this.speed;
  }

  draw() {
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(this.bullet, 81, 93, 32, 8, this.x, this.y, 10, 5);
  }
}

// alien definition
class Alien {
  constructor() {
    this.x = gameCanvas.width;
    this.y = Math.random() * 380 + 64;
    this.speed = Math.random() * 3 + 1;
    this.speedY = 0;
    this.width = 34.5;
    this.height = 36;
    this.health = 90;
    this.value = 50;
    this.pow = Math.floor(this.health * 0.1);
    this.alien = new Image();
    this.alien.addEventListener('load', () => {
      this.display();
    });
    this.alien.src = 'images/Aliens/alien_states.png';
    this.timeToNextY = 0;
    this.popRate = 3;
    this.timeToNextFrame = 0;
    this.frame = 0;
    this.frameX = 30;
  }

  display() {
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(
      this.alien,
      this.frameX,
      35,
      23,
      24,
      this.x,
      this.y,
      this.width,
      this.height
    );
    ctx.beginPath();
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 3;
    ctx.moveTo(this.x, this.y - 5);
    ctx.lineTo(this.x + (this.health / 90) * this.width, this.y - 5);
    ctx.stroke();
  }

  calculateNextFrame(delay) {
    this.timeToNextFrame += delay;
    if (this.timeToNextFrame > interval * 0.08) {
      if (this.frame < 5) {
        this.frameX += 41;
        this.frame++;
      } else {
        this.frame = 0;
        this.frameX = 30;
      }
      this.timeToNextFrame = 0;
    }
  }

  move(delay) {
    if (this.isOffScreen) {
      return;
    }

    this.x -= this.speed;

    this.calculateSpeedY(delay);
    this.y += this.speedY;
    if (this.y < 81 + this.height) {
      this.y = 81 + this.height;
    }

    if (this.y > 425 - this.height) {
      this.y = 425 - this.height;
    }

    if (this.x < 0 - this.width) {
      this.isOffScreen = true;
    }
  }

  calculateSpeedY(delay) {
    this.timeToNextY += delay;
    if (this.timeToNextY > interval * 0.6) {
      this.speedY = 6 * (Math.random() - 0.5);
      this.timeToNextY = 0;
    }
  }

  killTheAlien() {
    if (this.health <= 0) {
      ctx.clearRect(this.x, this.y - 5, this.width, this.height + 5);
      return true;
    }
  }
}

// general game logics

class Game {
  constructor() {
    // this.hiScore = 1000;
    this.score = 0;
    this.lives = 3;
    this.aliens = [];
    this.timeToNextAlien = 0;
  }

  countLives() {
    if (this.lives === 0) {
      return true;
    }
    if (player.health <= 0) {
      this.lives--;
      // console.log(this.lives);
      hearts.removeChild(hearts.lastElementChild);
      if (this.lives > 0) {
        player.health = 100;
      }
    }
  }

  getScore() {
    document.getElementById('score').textContent = `${this.score}`;
  }

  launchAliens(delay) {
    this.timeToNextAlien += delay;
    if (this.timeToNextAlien > interval) {
      this.aliens.push(new Alien());
      this.timeToNextAlien = 0;
    }
    [...this.aliens].forEach((alien, i) => {
      if (alien.x < 0 - alien.width) {
        this.aliens.splice(i, 1);
      }
    });
    [...this.aliens].forEach((alien) => alien.move(delay));
    this.aliens.forEach((alien) => {
      alien.calculateNextFrame(delay);
      alien.display(delay);
    });
  }

  countScore() {
    this.aliens.forEach((alien, i) => {
      if (alien.killTheAlien()) {
        this.score += alien.value;
        this.aliens.splice(i, 1);
        this.getScore();
      }
    });
    // if (this.score > this.hiScore) {
    //     this.hiScore = this.score;
    // }
  }
}
