// BUMPER CARS
// By: Ryan Jacob
// 3/18/2026
// YAYYYYYY

//CONSTANTS
const ROT_SPEED = 3
const SPEED = 1
const CAR_RADIUS = 40

var canvas = document.getElementById("canv");
var ctx = canvas.getContext("2d");
var keys = [];
var cars = [
 {
  num: 1,
  color: "#FF0000",
  pos: {x:(window.innerWidth/4),y:window.innerHeight/2},
  rotation: 0,
  force: 0
 },
 {
  num: 2,
  color: "#0000FF",
  pos: {x:(window.innerWidth/4)*3,y:window.innerHeight/2},
  rotation: 180,
  force: 0
 }
];

canvas.height = window.innerHeight - 20;
canvas.width = window.innerWidth - 20;

function bumpCars(car1, car2) {
 const dx = cars[car2].pos.x - cars[car1].pos.x;
 const dy = cars[car2].pos.y - cars[car1].pos.y;
 const distance = Math.sqrt(dx * dx + dy * dy);
 const overlap = (CAR_RADIUS * 2) - distance;
 if (overlap > 0 && distance > 0) {
  const pushX = (dx / distance) * (overlap / 2);
  const pushY = (dy / distance) * (overlap / 2);
  cars[car1].pos.x -= pushX;
  cars[car1].pos.y -= pushY;
  cars[car2].pos.x += pushX;
  cars[car2].pos.y += pushY;
 }
 const collisionAngle = Math.atan2(dy,dx);
 const v1 = getVelocity(cars[car1].force,cars[car1].rotation);
 const v2 = getVelocity(cars[car2].force,cars[car2].rotation);
 const normalSpeed1 = v1.x * Math.cos(collisionAngle) + v1.y * Math.sin(collisionAngle);
 const normalSpeed2 = v2.x * Math.cos(collisionAngle) + v2.y * Math.sin(collisionAngle);
 const tangentSpeed1 = -v1.x * Math.sin(collisionAngle) + v1.y * Math.cos(collisionAngle);
 const tangentSpeed2 = -v2.x * Math.sin(collisionAngle) + v2.y * Math.cos(collisionAngle);
 const newNormalSpeed1 = normalSpeed2;
 const newNormalSpeed2 = normalSpeed1;
 const newV1x = newNormalSpeed1 * Math.cos(collisionAngle) - tangentSpeed1 * Math.sin(collisionAngle);
 const newV1y = newNormalSpeed1 * Math.sin(collisionAngle) + tangentSpeed1 * Math.cos(collisionAngle);
 const newV2x = newNormalSpeed2 * Math.cos(collisionAngle) - tangentSpeed2 * Math.sin(collisionAngle);
 const newV2y = newNormalSpeed2 * Math.sin(collisionAngle) + tangentSpeed2 * Math.cos(collisionAngle);
 const rads1 = cars[car1].rotation * (Math.PI / 180);
 const rads2 = cars[car2].rotation * (Math.PI / 180);
 cars[car1].force = newV1x * Math.cos(rads1) + newV1y * Math.sin(rads1);
 cars[car2].force = newV2x * Math.cos(rads2) + newV2y * Math.sin(rads2);
}

function bounceWall(caridx) {
 let hitWall = false;
 let v = getVelocity(cars[caridx].force,cars[caridx].rotation);
 let newVx = v.x;
 let newVy = v.y;
 if (cars[caridx].pos.x < CAR_RADIUS) {
  cars[caridx].pos.x = CAR_RADIUS;
  newVx = -v.x;
  hitWall = true;
 } else if (cars[caridx].pos.x > canvas.width-CAR_RADIUS) {
  cars[caridx].pos.x = canvas.width - CAR_RADIUS;
  newVx = -v.x;
  hitWall = true;
 }
 if (cars[caridx].pos.y < CAR_RADIUS) {
  cars[caridx].pos.y = CAR_RADIUS;
  newVy = -v.y;
  hitWall = true;
 } else if (cars[caridx].pos.y > canvas.height - CAR_RADIUS) {
  cars[caridx].pos.y = canvas.height - CAR_RADIUS;
  newVy = -v.y;
  hitWall = true;
 }
 if (hitWall) {
  const rads = cars[caridx].rotation * (Math.PI / 180);
  cars[caridx].force = newVx * Math.cos(rads) + newVy * Math.sin(rads);
 }
}

function arePointsClose(x1, y1, x2, y2, dist) {
  const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  return distance < dist;
}

function trueMod(num,mod) {
 return ((num % mod) + mod) % mod
}

function getVelocity(force,rotation) {
 const rads = rotation * (Math.PI / 180)
 var x = force * Math.cos(rads);
 var y = force * Math.sin(rads);
 return {x:x,y:y}
}

function draw() {
 ctx.clearRect(0,0,canvas.width,canvas.height)
 // CAR ONE
 ctx.beginPath()
 ctx.arc(cars[0].pos.x,cars[0].pos.y,CAR_RADIUS,0,Math.PI*2,false)
 ctx.fillStyle = cars[0].color;
 ctx.fill()
 ctx.beginPath()
 ctx.arc(cars[0].pos.x,cars[0].pos.y,(CAR_RADIUS/4)*3,0,Math.PI*2,false)
 ctx.fillStyle = "#606060";
 ctx.fill()
 ctx.beginPath()
 var rev = trueMod(cars[0].rotation - (45+180),360)
 ctx.arc(cars[0].pos.x,cars[0].pos.y,(CAR_RADIUS/2),rev*(Math.PI/180),trueMod(rev+90,360)*(Math.PI/180),false)
 ctx.fillStyle = "#a0a0a0";
 ctx.fill()

 // CAR TWO
 ctx.beginPath()
 ctx.arc(cars[1].pos.x,cars[1].pos.y,CAR_RADIUS,0,Math.PI*2,false)
 ctx.fillStyle = cars[1].color;
 ctx.fill()
 ctx.beginPath()
 ctx.arc(cars[1].pos.x,cars[1].pos.y,(CAR_RADIUS/4)*3,0,Math.PI*2,false)
 ctx.fillStyle = "#606060";
 ctx.fill()
 ctx.beginPath()
 var rev = trueMod(cars[1].rotation - (45+180),360)
 ctx.arc(cars[1].pos.x,cars[1].pos.y,(CAR_RADIUS/2),rev*(Math.PI/180),trueMod(rev+90,360)*(Math.PI/180),false)
 ctx.fillStyle = "#a0a0a0";
 ctx.fill()
}

function control() {
 cars[0].force *= 0.8;
 cars[1].force *= 0.8;
 if (keys.includes("q")) {cars[0].rotation += ROT_SPEED;cars[0].force += SPEED;}
 if (keys.includes("a")) {cars[0].rotation -= ROT_SPEED;cars[0].force -= SPEED;}
 if (keys.includes("e")) {cars[0].rotation += -ROT_SPEED;cars[0].force += SPEED;}
 if (keys.includes("d")) {cars[0].rotation -= -ROT_SPEED;cars[0].force -= SPEED;}
 cars[0].rotation = trueMod(cars[0].rotation,360); 

 if (keys.includes("u")) {cars[1].rotation += ROT_SPEED;cars[1].force += SPEED;}
 if (keys.includes("j")) {cars[1].rotation -= ROT_SPEED;cars[1].force -= SPEED;}
 if (keys.includes("o")) {cars[1].rotation += -ROT_SPEED;cars[1].force += SPEED;}
 if (keys.includes("l")) {cars[1].rotation -= -ROT_SPEED;cars[1].force -= SPEED;}
 cars[1].rotation = trueMod(cars[1].rotation,360);
 
 var carzero_vel = getVelocity(cars[0].force,cars[0].rotation)
 var carone_vel = getVelocity(cars[1].force,cars[1].rotation)
 cars[0].pos.x += carzero_vel.x
 cars[0].pos.y += carzero_vel.y
 cars[1].pos.x += carone_vel.x
 cars[1].pos.y += carone_vel.y

 // DETECT BUMPING
 if (arePointsClose(cars[0].pos.x,cars[0].pos.y,cars[1].pos.x,cars[1].pos.y,CAR_RADIUS*2)) {
  //BUMPING LOGIC
  bumpCars(0,1)
 }
 bounceWall(0);
 bounceWall(1);
}

function loop() {
 control();
 draw();
 window.requestAnimationFrame(loop);
}

window.addEventListener("keydown", function (e) {
 if (!keys.includes(e.key.toLowerCase())) {
  keys.push(e.key.toLowerCase());
 }
});

window.addEventListener("keyup", function (e) {
 if (keys.includes(e.key.toLowerCase())) {
  keys.splice(keys.indexOf(e.key.toLowerCase()),1);
 }
});

window.requestAnimationFrame(loop)