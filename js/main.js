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

    groundImg.src = './assets/images/ground.png';
    skyImg.src = './assets/images/cloud sky.png';

    // playerImg.onload = function(){
    //     ctx.drawImage(img, playerX, playerY, 50, 50);
    // };

    ctx.fillStyle = 'white';

    ctx.fillRect(0,0,1280,720);

    ctx.translate(0,0);

    requestAnimationFrame(game);
}

function game(){

    ctx.clearRect(0,0,1280, 720);

    ctx.fillStyle = 'white';
    ctx.fillRect(0,0,1280,720);

    ctx.drawImage(skyImg, 0,0, 1920, 1080, 0,0, 1280, 720);
    ctx.drawImage(groundImg, 0, 0, 1920, 1080, 0, 0, 1280, 720);

    if(keys[16]){
        faster = 2;
        friction = 0.85;
    }
    else{
        faster = 0;
        friction = 0.7;
    }

    // if(keys[38]){
    //     velY -=baseSpeed+faster;
    // }
    //
    // if(keys[40]){
    //     velY +=baseSpeed+faster;
    // }

    if(keys[39]){
        velX +=baseSpeed+faster;
    }

    if(keys[37]){
        velX -=baseSpeed+faster;
    }

    if(char.x >= 1150){
        char.x = 1150;
    }
    else if(char.x <= 0){
        char.x = 0;
    }

    if(char.y >= 670){
        char.y = 670;
    }
    else if(char.y <= -10){
        char.y = -10;
    }

    velY *= friction;
    char.y += velY;

    velX *= friction;
    char.x += velX;

    // ctx.fillStyle = 'black';
    // ctx.fillRect(char.x,char.y,50,50);

    ctx.drawImage(playerImg, char.x, char.y, 155.55, 191.25);

    animationCounter++;

    if(keys[37] === false && keys[39] === false){
        if(animationCounter >= 20){

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

        if(animationCounter >= 7){
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

        if(animationCounter >= 7){
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

    requestAnimationFrame(game);
};

$(document).on("keydown", function (e) {
    keys[e.keyCode] = true;

    console.log('key pressed: ', e.keyCode);
});

$(document).on("keyup", function (e) {
    keys[e.keyCode] = false;
});