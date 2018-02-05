$(document).ready(initialize);

var keys = [];

keys[37] = false;
keys[39] = false;

var canvas = null;
var ctx = null;

var groundImg = new Image();
var playerImg = new Image();
var skyImg = new Image();

var stand1 = new Image();
var stand2 = new Image();
var left1 = new Image();
var left2 = new Image();
var right1 = new Image();
var right2 = new Image();

var obj_bomb = new Image();
var obj_fish = new Image();
var obj_mouse = new Image();
var obj_spider = new Image();

var death = new Image();
var deathState = false;
var reachTop = false;

var heartFull = new Image();
var heartEmpty = new Image();

var heartBar = [];

var char = {
    x: 570,
    y: 500
};

var faster = 0;
var slower = 0;
var baseSpeed = 3;
var velY = 0;
var velX = 0;
var friction = 0.7;

var animationCounter = 0;

const tracker = createEntityTracker({x: 1280, y: 720}, {x: 570, y: 500}, game);
gameLoop.addListener(tracker.advanceTick);

function Character(){
    this.x = 570;
    this.y = 500;
}

function initialize() {

    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    $('canvas').attr({
        'width':"1280px",
        'height':"720px"
    });

    playerImg.src = './assets/images/stand.png';

    stand1.src = './assets/images/stand.png';
    stand2.src = './assets/images/stand2.png';
    left1.src = './assets/images/left1.png';
    left2.src = './assets/images/left2.png';
    right1.src = './assets/images/right1.png';
    right2.src = './assets/images/right2.png';
    death.src = './assets/images/death.png';

    obj_bomb.src = './assets/images/obj-bomb.png';
    obj_fish.src = './assets/images/obj-fish.png';
    obj_mouse.src = './assets/images/obj-mouse.png';
    obj_spider.src = './assets/images/obj-spider.png';

    heartFull.src = './assets/images/heartfull.png';
    heartEmpty.src = './assets/images/heartempty.png';

    heartBar = [
        heartFull,
        heartFull,
        heartFull,
        heartFull,
        heartFull,
        heartFull,
        heartFull,
        heartFull,
        heartFull
    ];

    groundImg.src = './assets/images/ground.png';
    skyImg.src = './assets/images/cloud sky.png';

    ctx.fillStyle = 'white';

    ctx.fillRect(0,0,1280,720);

    ctx.translate(0,0);

    gameLoop.start();
}

function handleDamage(){
    for(let counter = heartBar.length; counter >=0; counter--){
        if( $(heartBar[counter]).attr('src') === './assets/images/heartfull.png'){
            heartBar[counter] = heartEmpty;

            if(counter === 0){
                handleDeath();
            }
            break;
        }
    }
}

function handleDeath(){
    playerImg = death;
    deathState = true;
}

function game(gameObjects){

    // console.log('gameobj, ',gameObjects);

    ctx.clearRect(0,0,1280, 720);

    ctx.fillStyle = 'white';
    ctx.fillRect(0,0,1280,720);

    ctx.drawImage(skyImg, 0,0, 1920, 1080, 0,0, 1280, 720);
    ctx.drawImage(groundImg, 0, 0, 1920, 1080, 0, 0, 1280, 720);

    heartBar.map(function(heart, index){
        ctx.drawImage(heart, 0,0,240,180, 50+50*index, 50, 40, 30);
    });


    // ctx.drawImage(obj_spider, 0,0, 1056, 1788, 0,0, 52.8, 89.4); // 0.07 multiplier
    // ctx.drawImage(obj_mouse, 0, 0, 246, 468, 100, 0, 49.2, 93.6); // 0.2 multiplier
    // ctx.drawImage(obj_fish, 0,0,672, 1326, 200, 0,  47.04, 92.82); //0.07 multiplier
    // ctx.drawImage(obj_bomb, 0,0, 816, 1758, 300,0 , 48.96, 105.48); //0.06 multiplier

    ctx.drawImage(playerImg, gameObjects.player.x, char.y, 155.55, 191.25);

    animationCounter++;

    if(!deathState){
        if(keys[37] === false && keys[39] === false){
            if(animationCounter >= 15){

                if($(playerImg).attr('src') !== './assets/images/stand.png' && $(playerImg).attr('src') !== './assets/images/stand2.png'){
                    playerImg = stand1;
                }

                if($(playerImg).attr('src') === './assets/images/stand.png'){
                    playerImg = stand2;
                    animationCounter = 0;
                }
                else{
                    playerImg = stand1;
                    animationCounter = 0;
                }
            }
        }
        else if(keys[37]){

            if($(playerImg).attr('src') !== './assets/images/left1.png' && $(playerImg).attr('src') !== './assets/images/left2.png'){
                playerImg = left1;
            }

            if(animationCounter >= 10){
                if($(playerImg).attr('src') === './assets/images/left1.png'){
                    playerImg = left2;
                    animationCounter = 0;
                }
                else{
                    playerImg = left1;
                    animationCounter = 0;
                }
            }
        }
        else if(keys[39]){

            if($(playerImg).attr('src') !== './assets/images/right1.png' && $(playerImg).attr('src') !== './assets/images/right2.png'){
                playerImg = right1;
            }

            if(animationCounter >= 10){
                if($(playerImg).attr('src') === './assets/images/right1.png'){
                    playerImg = right2;
                    animationCounter = 0;
                }
                else{
                    playerImg = right1;
                    animationCounter = 0;
                }
            }
        }
    }
    else{
        // console.log('y: ',char.y);

        if(char.y > 400 && !reachTop){
            char.y-=10;
        }
        else if(char.y === 400 && !reachTop){
            reachTop = true;
        }
        else if(top && char.y < 500){
            char.y+=10;
        }

        $(document).off("keydown");
    };
};

$(document).on("keydown", function (e) {
    keys[e.keyCode] = true;

    if(keys[37]){
        tracker.setPlayerDirection(-1);
    }
    else if(keys[39]){
        tracker.setPlayerDirection(1);
    }

    console.log('key pressed: ', e.keyCode);
});

$(document).on("keyup", function (e) {
    keys[e.keyCode] = false;

    if(!keys[37] && !keys[39]){
        tracker.setPlayerDirection(0);
    }
});