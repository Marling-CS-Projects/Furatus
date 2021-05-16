let app;
let avatar;
let keys = {};

    window.onload = function() {
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
            if(isJumping) return
            let timerUpID = setInterval( function () { //the setInterval method allows me to create a function that runs every certain interval of time
                if (avatar.y < 450) {
                    clearInterval(timerUpID) // stops permanent jumping 
                    let timerDownID = setInterval( function () {
                        if(avatar.y > 570) { 
                            clearInterval(timerDownID) //stops permanent fall
                            isJumping = false
                        }
                        avatar.y += 2
                    }, 20)
                }  
                isJumping = true
                avatar.y -= 5
                avatar.y = avatar.y * gravity //gradually decreases the height following a jump
            }, 20)
        }
            
        function gameLoop(){
            //Z makes the player go up the screen by increasing the y position by 5 every tick.
            if (keys["90"]) {
                jump()
            }
            //X          
            if (keys["88"]) {
                //add shooting here
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

    }