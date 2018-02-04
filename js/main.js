$(document).ready(initialize);

var keys = [];

var canvas = null;
var ctx = null;
var charPosition = [640,360];

function initialize() {

    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    ctx.fillStyle = 'white';

    ctx.fillRect(0,0,1280,720);

    ctx.translate(0,0);

    requestAnimationFrame(game);
}

function game(){

    ctx.clearRect(0,0,1280, 720);

    ctx.fillStyle = 'white';
    ctx.fillRect(0,0,1280,720);

    ctx.fillStyle = 'black';
    ctx.fillRect(charPosition[0],charPosition[1],50,50);

    requestAnimationFrame(game);
};

$(document).on("keydown", function (e) {
    keys[e.keyCode] = true;

    switch(e.keyCode){
        case 13:
            console.log('enter pressed');
            break;
        case 38:
            charPosition[1]-=10;
            console.log('up pressed');
            break;
        case 40:
            charPosition[1]+=10;
            console.log('down pressed');
            break;
        case 37:
            charPosition[0]-=10;
            console.log('left pressed');
            break;
        case 39:
            charPosition[0]+=10;
            console.log('right pressed');
            break;
        default:
            break;
    }

    console.log('key pressed: ', e.keyCode);
});

$(document).on("keyup", function (e) {
    keys[e.keyCode] = false;
});