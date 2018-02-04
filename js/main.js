$(document).ready(initialize);

var keys = [];

var canvas = null;
var ctx = null;

var groundImg = new Image();
var playerImg = new Image();

var char = {
    x: 640,
    y: 500
};

var faster = 0;
var slower = 0;
var baseSpeed = 3;
var velY = 0;
var velX = 0;
var friction = 0.7;

function initialize() {

    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    $('canvas').attr({
        'width':"1280px",
        'height':"720px"
    });

    playerImg.src = './assets/images/Cat eat.png';
    groundImg.src = './assets/images/ground.png';

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

    ctx.drawImage(groundImg, 0, 0, 1080, 1920, 0, 0, 1280, 1280);

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

    requestAnimationFrame(game);
};

$(document).on("keydown", function (e) {
    keys[e.keyCode] = true;

    console.log('key pressed: ', e.keyCode);
});

$(document).on("keyup", function (e) {
    keys[e.keyCode] = false;
});