const game = new Game();
const playerBullet = new PlayerBullet();


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
    console.log(aCollideB);
    return aCollideB;
}

function getCenterX(element) {
    return element.x + (element.width / 2);
  }

function getCenterY(element) {
    return element.y + (element.height / 2);
  }

//damages management
function takeDamages() {
    if (isColliding(alien, player)) {
        alien.health -= Math.floor(player.health / 2);
        player.health -= Math.floor(alien.health / 2);
    }
}



// credits to #frankslaboratory for the use of <timestamp> in animate()
let lastTime = 0;
let interval = 1000;

// refresh canvas function
function animate(timestamp) {
    clearGameCanvas();
    move();
    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    alien.move(deltaTime);
    alien.display();
    //console.log(alien);d
    player.display();
    player.displayBullets(deltaTime);
    requestAnimationFrame(animate);
}

animate(0);
