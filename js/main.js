$(document).ready(initialize);


var canvas = null;
var ctx = null;

function initialize() {

    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    ctx.fillStyle = 'white';

}
//
// var initialize = function(){
// // Initial Setup
//     var canvas = document.getElementById('#canvas');
//     var c = canvas.getContext('2d');
//
//     canvas.width = innerWidth/2;
//     canvas.height = innerHeight/2;
//
// // Variables
//     var mouse = {
//         x: innerWidth / 2,
//         y: innerHeight / 2
//     };
//
//     var gravity = 1;
//     var friction = 0.99;
//
// // Event Listeners
//     addEventListener('mousemove', function (event) {
//         mouse.x = event.clientX;
//         mouse.y = event.clientY;
//     });
//
//     addEventListener('resize', function () {
//         canvas.width = innerWidth/2;
//         canvas.height = innerHeight/2;
//
//         init();
//     });
//
//     addEventListener('click', function() {
//         init();
//     });
//
// // Utility Functions
//     function randomIntFromRange(min, max) {
//         return Math.floor(Math.random() * (max - min + 1) + min);
//     }
//
//
// // Objects
//     function FallingObject (x, y, dx, dy, radius) {
//         this.x = x;
//         this.y = y;
//         this.dx = dx;
//         this.dy = dy;
//         this.radius = radius;
//
//         this.update = function () {
//             if(this.y + this.radius + this.dy > canvas.height){
//                 this.dy = -this.dy * friction;
//             }else{
//                 this.dy += gravity;
//             }
//             if (this.x + this.radius + this.dx > canvas.width || this.x - this.radius <= 0){
//                 this.dx = -this.dx;
//             }
//
//             this.x += this.dx;
//             this.y += this.dy;
//             this.draw();
//         };
//
//         this.draw = function () {
//             c.beginPath();
//             c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
//             c.fillStyle = black;
//             c.fill();
//             c.stroke();
//             c.closePath();
//         };
//     }
//
// // Implementation
//     var object;
//     var objectArray =[];
//     function init() {
//         objectArray = [];
//         for (var i=0; i<250; i++) {
//             var radius = randomIntFromRange(10, 20);
//             var x = randomIntFromRange(radius, canvas.width - radius);
//             var y = randomIntFromRange(radius, canvas.height - radius);
//             var dx = randomIntFromRange(-2, 2);
//             var dy = randomIntFromRange(-2, 2);
//             objectArray.push(new FallingObject(x, y, dx, dy, radius))
//         }
//     }
//
// // Animation Loop
//     function animate() {
//         requestAnimationFrame(animate);
//         c.clearRect(0, 0, canvas.width, canvas.height);
//         for(var i=0; i<objectArray.length; i++) {
//             objectArray[i].update()
//         }
//     }
//
//     init();
//     animate();
// };