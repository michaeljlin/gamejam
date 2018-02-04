$(document).ready(initialize);

var keys = [];

var canvas = null;
var ctx = null;
var charPosition = [640,360];

var char = {
    x: 640,
    y: 360
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
    ctx.fillStyle = 'white';
    ctx.fillRect(0,0,1280,720);
    ctx.translate(0,0);

    let randomX = getRandomNum(0, 900);

    let y = 1;

    fallingObject = new FallingObject(randomX, y, 20, 20);

    fallingObject.draw();

    animate(randomX, y, 20, 20);

    $('canvas').attr({
        'width':"1280px",
        'height':"720px"
    });

    requestAnimationFrame(game);
}

function game(){

    ctx.clearRect(0,0,1280, 720);

    ctx.fillStyle = 'white';
    ctx.fillRect(0,0,1280,720);

    if(keys[16]){
        faster = 2;
        friction = 0.85;
    }
    else{
        faster = 0;
        friction = 0.7;
    }

    if(keys[38]){
        velY -=baseSpeed+faster;
    }

    if(keys[40]){
        velY +=baseSpeed+faster;
    }

    if(keys[39]){
        velX +=baseSpeed+faster;
    }

    if(keys[37]){
        velX -=baseSpeed+faster;
    }

    if(char.x >= 1230){
        char.x = 1230;
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

    ctx.fillStyle = 'black';
    ctx.fillRect(char.x,char.y,50,50);

    requestAnimationFrame(game);
}

$(document).on("keydown", function (e) {
    keys[e.keyCode] = true;

    // switch(e.keyCode){
    //     case 27:
    //         console.log('escape pressed');
    //         break;
    //     case 13:
    //         console.log('enter pressed');
    //         break;
    //     case 38:
    //         charPosition[1]-=10;
    //         console.log('up pressed');
    //         break;
    //     case 40:
    //         charPosition[1]+=10;
    //         console.log('down pressed');
    //         break;
    //     case 37:
    //         charPosition[0]-=10;
    //         console.log('left pressed');
    //         break;
    //     case 39:
    //         charPosition[0]+=10;
    //         console.log('right pressed');
    //         break;
    //     default:
    //         break;
    // }

    console.log('key pressed: ', e.keyCode);
});

$(document).on("keyup", function (e) {
    keys[e.keyCode] = false;
});


function getRandomNum (min, max) {
    return Math.random() * (max - min) + min;
}

function FallingObject (x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.draw = function () {
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(this.x,this.y,this.width,this.height);
    };
}

function animate(x, y, width, height) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(x,y+20,width,height)
}

