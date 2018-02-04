$(document).ready(initialize);


var canvas = null;
var ctx = null;

function initialize() {

    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';

    let randomX = getRandomNum(0, 900);

    let y = 1;

    fallingObject = new FallingObject(randomX, y, 20, 20);

    fallingObject.draw();

   // requestAnimationFrame(() => { animate(randomX, y, 20, 20)});
    animate(randomX, y, 20, 20);

}

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
