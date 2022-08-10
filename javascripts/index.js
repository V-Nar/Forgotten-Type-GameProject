const game = new Game()



// player.image.addEventListener('load', () => {
//     player.display()
// })

let bullets = []

function autoShot() {
    const playerBullet = new PlayerBullet()
    setInterval(() => {
        playerBullet.generateBullet()
       return bullets.push(playerBullet)
    }, 1000 * playerBullet.fireRate );
        
    for (let i = 0; i < bullets.length; i++) {
        playerBullet.shot()
        if (playerBullet.x === gameCanvas.width) {
           return bullets.shift()
        }
    }
}

document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp':
            player.moveUp()
            break
        case 'ArrowDown':
            player.moveDown()
            break
        case 'ArrowLeft':
            player.moveLeft()
            break
        case 'ArrowRight':
            player.moveRight()
            break
    }
})


function updateGameCanvas() {
    // requestAnimationFrame(updateGameCanvas)
    clearGameCanvas()
    player.display()
    // player.bulletX += player.bulletSpeed
    autoShot()
    requestAnimationFrame(updateGameCanvas)
}

updateGameCanvas()
