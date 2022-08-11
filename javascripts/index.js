// credits to #frankslaboratory for the use of <timestamp> in animate()
const game = new Game();
const playerBullet = new PlayerBullet();

// global variables
let lastTime = 0;
let interval = 1000;
let reqAnim


// smooth player moves
let keys = {
    z: false,
    s: false,
    q: false,
    d: false
}

document.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "z":
            keys.z = true;
            break;
        case "s":
            keys.s = true;
            break;
        case "q":
            keys.q = true;
            break;
        case "d":
            keys.d = true;
            break;
    }
})

document.addEventListener("keyup", (e) => {
    switch (e.key) {
        case "z":
            keys.z = false;
            break;
        case "s":
            keys.s = false;
            break;
        case "q":
            keys.q = false;
            break;
        case "d":
            keys.d = false;
            break;
    }
});

function move() {
    if (player.y > 64 && keys.z) {
        player.moveUp();
    }
    if (player.y < (470 - player.height) && keys.s) {
        player.moveDown();
    }
    if (player.x > 0 && keys.q) {
        player.moveLeft();
    }
    if (player.x < (gameCanvas.width - player.width) && keys.d) {
        player.moveRight();
    }
}

// collision detection
function isColliding(a, b) {
    let aCollideB = false;
    const distanceX =  Math.abs(getCenterX(a) - getCenterX(b));
    const distanceY = Math.abs(getCenterY(a) - getCenterY(b));
    if (distanceX <= (a.width + b.width) / 2 && distanceY <= (a.height + b.height) / 2) {
        aCollideB = true;
    }
    return aCollideB;
}

function getCenterX(element) {
    return element.x + (element.width / 2);
  }

function getCenterY(element) {
    return element.y + (element.height / 2);
  }

//damages management
function dealDamages() {
    game.aliens.forEach((alien, i) => {
        if (isColliding(alien, player)) {
            if (!player.touched) {
                player.touched = true;
                player.health -= Math.floor(alien.health / 2);
                if (player.health === 0) {
                    
                }
            }
        }

        player.bullets.forEach((bullet, j) => {
            if (isColliding(alien, bullet)) {
            alien.health -= bullet.pow;
            player.bullets.splice(j, 1);
            game.countScore()
        }
        })
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
    game.countLifes();
    game.launchAliens(deltaTime);
    dealDamages()
    console.log(game.lifes);
    game.endGame()
    reqAnim = requestAnimationFrame(animate);
}


// DOM
// welcome screen

animate(0);

// rules and hi-scores

// GUI

// Game Over screen
