let avatar;
let app = new PIXI.Application(
    {
        width: 800,
        height: 600,
        backgroundColor: 0x808080
    }
);
document.body.appendChild(app.view);

//creating an avatar for the player
avatar = new PIXI.Sprite.from("assets/protagonist.png");
avatar.anchor.set(0.5);
avatar.x = 27
avatar.y = 570

app.stage.addChild(avatar);

let keys = {};
//keyboard event handlers
window.addEventListener("keydown", keysDown);
window.addEventListener("keyup", keysUp);

//game updates every tick
app.ticker.add(gameLoop);
//detects when key is pressed 
function keysDown(e) {
    keys[e.keyCode] = true;
}

function keysUp(e) {
    keys[e.keyCode] = false;
}

let gravity = 0.9
let isJumping = false //prevents double jump 
function jump() {
    if (isJumping) return
    let timerUpID = setInterval(function () { //the setInterval method allows me to create a function that runs every certain interval of time
        if (avatar.y < 450) {
            clearInterval(timerUpID) // stops permanent jumping 
            let timerDownID = setInterval(function () {
                if (avatar.y > 570) {
                    clearInterval(timerDownID) //stops permanent fall
                    isJumping = false
                }
                avatar.y += 4
            }, 20)
        }
        isJumping = true
        avatar.y -= 10 //gradually decreases the height following a jump
    }, 20)
}

let bullets = []; //create an empty array to store bullets in
let bulletSpeed = 10;
let leftBullets = [];
let leftBulletSpeed = -10;
let recentBullets = 0;

function fire(left) {
    console.log("Fire!");
    let bullet = createBullet(left);
    bullets.push(bullet);
    recentBullets += 1;


}

function createBullet(left) { // is responsible for creating the bullets
    let bullet = new PIXI.Sprite.from("assets/protagbullet.png");
    bullet.anchor.set(0.5);
    bullet.startx = avatar.x;
    bullet.x = avatar.x;
    bullet.y = avatar.y;
    if(left) {
        bullet.speed = -bulletSpeed;
    } else {
        bullet.speed = bulletSpeed;
    }
    app.stage.addChild(bullet);

    return bullet;
}

function updateBullets() {
    for (let i = 0; i < bullets.length; i++) {
        bullets[i].x += bullets[i].speed; //bullets move to the right when x is pressed
        if (bullets[i].x > 800 || bullets[i].x < 0) {
            bullets[i].dead = true;
        }
        if (bullets[i].dead) { //removes bullets that are out of screen.
            app.stage.removeChild(bullets[i]);
            bullets.splice(i, 1);

        }
    }
}
/*function wait(milliseconds) { //no native sleep function in javascript so had to make one.
    const date = Date.now(); //Date method returns number of milliseconds since 1/1/1970
    let theDate = null;
    do {
      theDate = Date.now();
    } while (theDate - date < milliseconds);
  } */

function gameLoop() {
    updateBullets();
    //Z makes the player go up the screen by increasing the y position by 5 every tick.
    if (keys["90"]) {
        jump()
    }
    //X          
    if (keys["67"]) {
        if (recentBullets > 5) {
            setTimeout(function () {fire(false)}, 1000)
            recentBullets = 0;
        }
        else {
            fire(false);
        }
    }
    if (keys["88"]) {
        if (recentBullets > 5) {
            setTimeout(fire(true), 1000)
            recentBullets = 0;
        }
        fire(true);
    }

    //Left arrow
    if (keys["37"]) {
        avatar.x -= 5;
    }
    //Right arrow
    if (keys["39"]) {
        avatar.x += 5;
    }
}
