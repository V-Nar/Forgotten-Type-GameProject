const gameCanvas = document.querySelector('#game')
const ctx = gameCanvas.getContext('2d')

function clearGameCanvas() {
    ctx.clearRect(0, 0, 900, 550)
}

// const playerSpriteSheet = new Image();
// playerSpriteSheet.src = './images/Players/player.png';

class Player {
    constructor() {
        this.x = 20
        this.y = 232
        this.width = 42
        this.height = 67.5
        this.health = 100
        this.speed = 10
        this.image = new Image()
        this.image.addEventListener('load', () => {
            this.display()
        })
        this.image.src = '../images/Players/player1.png'
    }
    
    moveUp() {
        this.y -= this.speed
        if (this.y < 64) {
            return
        }
        this.display()
    }

    moveDown() {
        this.y += this.speed
        if (this.y > (550 - this.height)) {
            return
        }
        this.display()
    }

    moveLeft() {
        this.x -= this.speed
        if (this.x < 0){
            return
        }
        this.display()
    }

    moveRight() {
        this.x += this.speed
        if (this.x > (900 - this.width)) {
            return
        }
        this.display()
    }

    display() {
        ctx.imageSmoothingEnabled = false
        ctx.drawImage(this.image, 272, 6, 27, 44, this.x, this.y, this.width, this.height)
    }
}

const player = new Player()


class PlayerBullet {
    constructor() {
        this.pow = 30
        this.fireRate = 0.5
        this.speed = 10
        this.x = player.x + 36
        this.y = player.y + 17
        this.playerBullet = new Image()
        this.playerBullet.src = '../images/Players/laser.png'
    }
    
    shot() {
        this.x += this.speed   
    }
    
    generateBullet() {
        ctx.imageSmoothingEnabled = false
        ctx.drawImage(this.playerBullet, 81, 93, 32, 8, this.x, this.y, 8, 3)
    }
}


class Game {
    constructor() {
        this.hiScore = 1000;
        this.score = 0
        this.lifes = 3
        this.waves = 0
        this.wavesTimer = 0
    }

    

    countLifes() {
        if (player.health = 0) {
            this.lifes--
        }
    }

    
    startGame() {
        
    }
    endGame() {}
}

