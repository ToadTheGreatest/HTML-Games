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
var botsActive = false;
var cars = [
 {
  num: 1,
  color: "#FF0000",
  pos: {x:(window.innerWidth/4),y:(window.innerHeight/4)},
  rotation: 45,
  force: 0
 },
 {
  num: 2,
  color: "#FFFF00",
  pos: {x:(window.innerWidth/4)*3,y:(window.innerHeight/4)},
  rotation: -45,
  force: 0
 },
 {
  num: 3,
  color: "#00FF00",
  pos: {x:(window.innerWidth/4),y:(window.innerHeight/4)*3},
  rotation: 135,
  force: 0
 },
 {
  num: 4,
  color: "#0000FF",
  pos: {x:(window.innerWidth/4)*3,y:(window.innerHeight/4)*3},
  rotation: 135,
  force: 0
 }
];
var botMovement = []
var microframes = 0

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

function botupdate() {
 botMovement = []
 //bots
 if (botsActive) {
  for (let c=1;c<cars.length;c++) {
   if (Math.round(Math.random()*2)===0) {
    botMovement.push(c+"lf")
   } else if (Math.round(Math.random()*4)===0) {
    botMovement.push(c+"lb")
   }
   if (Math.round(Math.random()*2)===0) {
    botMovement.push(c+"rf")
   } else if (Math.round(Math.random()*4)===0) {
    botMovement.push(c+"rb")
   }
  }
 }
}

function draw() {
 ctx.clearRect(0,0,canvas.width,canvas.height)
 // CARS
 for (let c=0;c<cars.length;c++) {
  ctx.beginPath()
  ctx.arc(cars[c].pos.x,cars[c].pos.y,CAR_RADIUS,0,Math.PI*2,false)
  ctx.fillStyle = cars[c].color;
  ctx.fill()
  ctx.beginPath()
  ctx.arc(cars[c].pos.x,cars[c].pos.y,(CAR_RADIUS/4)*3,0,Math.PI*2,false)
  ctx.fillStyle = "#606060";
  ctx.fill()
  ctx.beginPath()
  var rev = trueMod(cars[c].rotation - (45+180),360)
  ctx.arc(cars[c].pos.x,cars[c].pos.y,(CAR_RADIUS/2),rev*(Math.PI/180),trueMod(rev+90,360)*(Math.PI/180),false)
  ctx.fillStyle = "#a0a0a0";
  ctx.fill()
 }
}

function control() {
 microframes = (microframes+1) % 20;
 if (microframes===0) {botupdate();}
 for (let c=0;c<cars.length;c++) {cars[c].force *= 0.8;}

 if (keys.includes("w")) {cars[0].rotation += ROT_SPEED;cars[0].force += SPEED;}
 if (keys.includes("s")) {cars[0].rotation -= ROT_SPEED;cars[0].force -= SPEED;}
 if (keys.includes("i")) {cars[0].rotation += -ROT_SPEED;cars[0].force += SPEED;}
 if (keys.includes("k")) {cars[0].rotation -= -ROT_SPEED;cars[0].force -= SPEED;}

 if (botMovement.includes("1lf")) {cars[1].rotation += ROT_SPEED;cars[1].force += SPEED;}
 if (botMovement.includes("1lb")) {cars[1].rotation -= ROT_SPEED;cars[1].force -= SPEED;}
 if (botMovement.includes("1rf")) {cars[1].rotation += -ROT_SPEED;cars[1].force += SPEED;}
 if (botMovement.includes("1rb")) {cars[1].rotation -= -ROT_SPEED;cars[1].force -= SPEED;}

 if (botMovement.includes("2lf")) {cars[2].rotation += ROT_SPEED;cars[2].force += SPEED;}
 if (botMovement.includes("2lb")) {cars[2].rotation -= ROT_SPEED;cars[2].force -= SPEED;}
 if (botMovement.includes("2rf")) {cars[2].rotation += -ROT_SPEED;cars[2].force += SPEED;}
 if (botMovement.includes("2rb")) {cars[2].rotation -= -ROT_SPEED;cars[2].force -= SPEED;}

 if (botMovement.includes("3lf")) {cars[3].rotation += ROT_SPEED;cars[3].force += SPEED;}
 if (botMovement.includes("3lb")) {cars[3].rotation -= ROT_SPEED;cars[3].force -= SPEED;}
 if (botMovement.includes("3rf")) {cars[3].rotation += -ROT_SPEED;cars[3].force += SPEED;}
 if (botMovement.includes("3rb")) {cars[3].rotation -= -ROT_SPEED;cars[3].force -= SPEED;}

 cars[0].rotation = trueMod(cars[0].rotation,360);
 for (let d=0;d<cars.length;d++) {
  var car_vel = getVelocity(cars[d].force,cars[d].rotation)
  cars[d].pos.x += car_vel.x
  cars[d].pos.y += car_vel.y
 }

 // DETECT BUMPING
 for (let a=0;a<cars.length;a++) {for (let b=a;b<cars.length;b++) {
  if (arePointsClose(cars[a].pos.x,cars[a].pos.y,cars[b].pos.x,cars[b].pos.y,CAR_RADIUS*2)) {
   //BUMPING LOGIC
   bumpCars(a,b)
  }
 }}
 for (let x=0;x<cars.length;x++) {bounceWall(x)}
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