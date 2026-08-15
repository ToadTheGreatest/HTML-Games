// OVERFLOW XD
// By: Ryan Jacob
// 03 / 04 / 2026
//
// TETRIS v1.1
// SCORING UPDATEs
//
// BASED ON THE NES VERSION
// CONTROL SCHEME
// Z X TO ROTATE
// ARROW KEYS TO MOVE
// DOWN IS SOFT DROP
var tileGrid = [
 "0000000000",
 "0000000000",
 "0000000000",
 "0000000000",
 "0000000000",
 "0000000000",
 "0000000000",
 "0000000000",
 "0000000000",
 "0000000000",
 "0000000000",
 "0000000000",
 "0000000000",
 "0000000000",
 "0000000000",
 "0000000000",
 "0000000000",
 "0000000000",
 "0000000000",
 "0000000000"
];
const colors = [
 "#000000",
 "#ff0000",
 "#ffff00",
 "#00ff00",
 "#00ffff",
 "#0000ff",
 "#ff00ff"
];
const tetrominoes = [
 [
  [
   "0000",
   "1111",
   "0000",
   "0000"
  ],
  [
   "0010",
   "0010",
   "0010",
   "0010"
  ],
  [
   "0000",
   "0000",
   "1111",
   "0000"
  ],
  [
   "0100",
   "0100",
   "0100",
   "0100"
  ]
 ],
 [
  [
   "1000",
   "1110",
   "0000",
   "0000"
  ],
  [
   "0110",
   "0100",
   "0100",
   "0000"
  ],
  [
   "0000",
   "1110",
   "0010",
   "0000"
  ],
  [
   "0100",
   "0100",
   "1100",
   "0000"
  ]
 ],
 [
  [
   "0010",
   "1110",
   "0000",
   "0000"
  ],
  [
   "0100",
   "0100",
   "0110",
   "0000"
  ],
  [
   "0000",
   "1110",
   "1000",
   "0000"
  ],
  [
   "1100",
   "0100",
   "0100",
   "0000"
  ]
 ],
 [
  [
   "0110",
   "0110",
   "0000",
   "0000"
  ],
  [
   "0110",
   "0110",
   "0000",
   "0000"
  ],
  [
   "0110",
   "0110",
   "0000",
   "0000"
  ],
  [
   "0110",
   "0110",
   "0000",
   "0000"
  ]
 ],
 [
  [
   "0110",
   "1100",
   "0000",
   "0000"
  ],
  [
   "0100",
   "0110",
   "0010",
   "0000"
  ],
  [
   "0000",
   "0110",
   "1100",
   "0000"
  ],
  [
   "1000",
   "1100",
   "0100",
   "0000"
  ]
 ],
 [
  [
   "0100",
   "1110",
   "0000",
   "0000"
  ],
  [
   "0100",
   "0110",
   "0100",
   "0000"
  ],
  [
   "0000",
   "1110",
   "0100",
   "0000"
  ],
  [
   "0100",
   "1100",
   "0100",
   "0000"
  ]
 ],
 [
  [
   "1100",
   "0110",
   "0000",
   "0000"
  ],
  [
   "0010",
   "0110",
   "0100",
   "0000"
  ],
  [
   "0000",
   "1100",
   "0110",
   "0000"
  ],
  [
   "0100",
   "1100",
   "1000",
   "0000"
  ]
 ]
];
const song = [
 { n: 659, t: 400 }, // E5 (Quarter note)
 { n: 494, t: 200 }, // B4 (Eighth note)
 { n: 523, t: 200 }, // C5 (Eighth note)
 { n: 587, t: 400 }, // D5 (Quarter note)
 { n: 523, t: 200 }, // C5 (Eighth note)
 { n: 494, t: 200 }, // B4 (Eighth note)
 { n: 440, t: 390 }, // A4 (Quarter note)
 { n: 0,   t: 10  }, // PAUSE
 { n: 440, t: 200 }, // A4 (Eighth note)
 { n: 523, t: 200 }, // C5 (Eighth note)
 { n: 659, t: 400 }, // E5 (Quarter note)
 { n: 587, t: 200 }, // D5 (Eighth note)
 { n: 523, t: 200 }, // C5 (Eighth note)
 { n: 494, t: 600 }, // B4 (Dotted quarter note)
 { n: 523, t: 200 }, // C5 (Eighth note)
 { n: 587, t: 400 }, // D5 (Quarter note)
 { n: 659, t: 400 }, // E5 (Quarter note)
 { n: 523, t: 400 }, // C5 (Quarter note)
 { n: 440, t: 390 }, // A4 (Quarter note)
 { n: 0,   t: 10  }, // PAUSE
 { n: 440, t: 800 }, // A4 (Half note)
 { n: 587, t: 600 }, // D5 (Dotted quarter note)
 { n: 698, t: 200 }, // F5 (Eighth note)
 { n: 880, t: 400 }, // A5 (Quarter note)
 { n: 783, t: 200 }, // G5 (Eighth note)
 { n: 698, t: 200 }, // F5 (Eighth note)
 { n: 659, t: 600 }, // E5 (Dotted quarter note)
 { n: 523, t: 200 }, // C5 (Eighth note)
 { n: 659, t: 400 }, // E5 (Dotted quarter note)
 { n: 587, t: 200 }, // D5 (Quarter note)
 { n: 523, t: 200 }, // C5 (Quarter note)
 { n: 494, t: 600 }, // B4 (Dotted quarter note)
 { n: 523, t: 200 }, // C5 (Eighth note)
 { n: 587, t: 400 }, // D5 (Quarter note)
 { n: 659, t: 400 }, // E5 (Quarter note)
 { n: 523, t: 400 }, // C5 (Quarter note)
 { n: 440, t: 390 }, // A4 (Quarter note)
 { n: 0,   t: 10  }, // PAUSE
 { n: 440, t: 800 }, // A4 (Half note)
];
const sfx = [
 [
  { n: 523, t: 200 }
 ],
 [
  { n: 523, t: 100 },
  { n: 659, t: 200 }
 ],
 [
  { n: 523, t: 100 },
  { n: 659, t: 100 },
  { n: 783, t: 200 }
 ],
 [
  { n: 523, t: 100 },
  { n: 659, t: 100 },
  { n: 783, t: 100 },
  { n: 1046, t: 200 },
 ],
 [
  { n: 523, t: 100 }, // C5
  { n: 494, t: 100 }, // B4
  { n: 466, t: 100 }, // Bb4
  { n: 440, t: 100 }, // A4
  { n: 415, t: 100 }, // Ab4
  { n: 392, t: 100 }, // G4
  { n: 369, t: 100 }, // Gb4
  { n: 349, t: 100 }, // F4
  { n: 329, t: 100 }, // E4
  { n: 311, t: 100 }, // Eb4
  { n: 293, t: 100 }, // D4
  { n: 277, t: 100 }, // Db4
  { n: 262, t: 100 }, // C4
  { n: 247, t: 100 }, // B3
  { n: 233, t: 100 }, // Bb3
  { n: 220, t: 100 }, // A3
  { n: 208, t: 100 }, // Ab3
  { n: 196, t: 100 }, // G3
  { n: 185, t: 100 }, // Gb3
  //{ n: 175, t: 100 }, // F3
  //{ n: 165, t: 100 }, // E3
  //{ n: 156, t: 100 }, // Eb3
  //{ n: 147, t: 100 }, // D3
  //{ n: 139, t: 100 }, // Db3
  //{ n: 131, t: 100 }, // C3
  //{ n: 123, t: 100 }, // B2
  //{ n: 117, t: 100 }, // Bb2
  //{ n: 110, t: 100 }, // A2
  //{ n: 104, t: 100 }, // Ab2
  //{ n: 98,  t: 100 }, // G2
  //{ n: 92,  t: 100 }, // Gb2
  //{ n: 87,  t: 100 }, // F2
  //{ n: 82,  t: 100 }, // E2
  //{ n: 78,  t: 100 }, // Eb2
  //{ n: 73,  t: 100 }, // D2
  //{ n: 69,  t: 100 }, // Db2
  //{ n: 65,  t: 100 }, // C2
  //{ n: 62,  t: 100 }, // B1
  //{ n: 58,  t: 100 }, // Bb1
  //{ n: 55,  t: 100 }, // A1
  //{ n: 52,  t: 100 }, // Ab1
  //{ n: 49,  t: 100 }, // G1
  //{ n: 46,  t: 100 }, // Gb1
  //{ n: 44,  t: 100 }, // F1
  //{ n: 41,  t: 100 }, // E1
  //{ n: 39,  t: 100 }, // Eb1
  //{ n: 37,  t: 100 }, // D1
  //{ n: 35,  t: 100 }, // Db1
  //{ n: 33,  t: 100 }, // C1
  //{ n: 31,  t: 100 }, // B0
  //{ n: 29,  t: 100 }, // Bb0
  //{ n: 28,  t: 100 }, // A0
  //{ n: 0,   t: 100 }  // REST
 ]
]
var level = 0
var queue = []
var MAXMICRO = 32
var score = 0
var MICROTICKS = MAXMICRO
var microt = 0
var tile = {nextcolor:null,nexttype:null,type:null,rotation:0,color:null,pos:{x:null,y:null}}
var canvas = document.getElementById("gamecanvas");
var ctx = canvas.getContext("2d");
const TILE_SIZE = Math.round(canvas.height/20)-5;
const TILE_PADD = 0;
var keysPressed = [];
var already = []
var running = true
function draw() {
 ctx.clearRect(0,0,canvas.width,canvas.height);
 var x = (canvas.width/2)-(5*(TILE_SIZE+TILE_PADD));
 var y = 0;
 tileGrid.forEach(ln => {
  for (const tl of ln) {
   ctx.fillStyle = colors[tl];
   ctx.fillRect(x,y,TILE_SIZE,TILE_SIZE);
   x += TILE_SIZE+TILE_PADD;
  }
  y += TILE_SIZE+TILE_PADD;
  x = (canvas.width/2)-(5*(TILE_SIZE+TILE_PADD))
 })
 if (tile.type !== null) {
  var tx = 0
  var ty = 0
  tetrominoes[tile.type][tile.rotation].forEach(tln => {
   for (const ttl of tln) {
    if (ttl == "1") {
     ctx.fillStyle=colors[tile.color]
     px = ((tile.pos.x+tx)*(TILE_SIZE+TILE_PADD))+((canvas.width/2)-(5*(TILE_SIZE+TILE_PADD)));
     py = (tile.pos.y+ty)*(TILE_SIZE+TILE_PADD);
     ctx.fillRect(px,py,TILE_SIZE,TILE_SIZE);
    }
    tx ++;
   }
   ty ++
   tx = 0
  })
 }
 if (tile.nexttype !== null) {
  ctx.fillStyle = "#101010";
  ctx.fillRect(0,0,4*(TILE_SIZE+TILE_PADD+2),4*(TILE_SIZE+TILE_PADD+2))
  var tx = 0
  var ty = 0
  tetrominoes[tile.nexttype][0].forEach(tln => {
   for (const ttl of tln) {
    if (ttl == "1") {
     ctx.fillStyle=colors[tile.nextcolor]
     px = 4+((tx)*(TILE_SIZE+TILE_PADD));
     py = 4+((ty)*(TILE_SIZE+TILE_PADD));
     ctx.fillRect(px,py,TILE_SIZE,TILE_SIZE);
    }
    tx ++;
   }
   ty ++
   tx = 0
  })
 }
}
function gameloop() {
 microt++;
 if (microt >= MICROTICKS) {microt=0;tick()}
 if (score - level*500 > 500) {level ++;}
 if (level > 255) {
  tileGrid = [
   "0000000000",
   "0000000000",
   "0000000000",
   "0000000000",
   "0000000000",
   "0000000000",
   "0000000000",
   "0000000000",
   "0000000000",
   "0000000000",
   "0000000000",
   "0000000000",
   "0000000000",
   "0000000000",
   "0000000000",
   "0000000000",
   "0000000000",
   "0000000000",
   "0000000000",
   "0000000000"
  ];
  level = 0
  score = 0
  MAXMICRO = 32
 }
 MAXMICRO = 32 - (level/16); //256 levels hopefully
 //CONTROLS YAYY
 if (keysPressed.includes("ArrowLeft") && !already.includes("ArrowLeft")) {moveLeft();already.push("ArrowLeft")}
 if (keysPressed.includes("ArrowRight") && !already.includes("ArrowRight")) {moveRight();already.push("ArrowRight")}
 if (keysPressed.includes("z") && !already.includes("z")) {rotateLeft();already.push("z")}
 if (keysPressed.includes("x") && !already.includes("x")) {rotateRight();already.push("x")}
 tile.rotation = tile.rotation % 4
 if (keysPressed.includes("ArrowDown")) {MICROTICKS = MAXMICRO / 16} else {MICROTICKS = MAXMICRO}
 document.getElementById("score").textContent = "Your Score: "+score
 draw();
 if (running) { window.requestAnimationFrame(gameloop); }
}
function moveRight() {
 if (tile.type !== null) {
  var nope = false
  var tx = 0
  var ty = 0
  tetrominoes[tile.type][tile.rotation].forEach(tln => {
   for (const ttl of tln) {
    if (ttl == "1") {
     xpos = tx+tile.pos.x
     ypos = ty+tile.pos.y
     if (findCoords(xpos+1,ypos) !== "0") {nope = true}
    }
    tx ++;
   }
   ty ++
   tx = 0
  })
  if (!nope) {tile.pos.x++}
 }
}
function moveLeft() {
 if (tile.type !== null) {
  var nope = false
  var tx = 0
  var ty = 0
  tetrominoes[tile.type][tile.rotation].forEach(tln => {
   for (const ttl of tln) {
    if (ttl == "1") {
     xpos = tx+tile.pos.x
     ypos = ty+tile.pos.y
     if (findCoords(xpos-1,ypos) !== "0") {nope = true}
    }
    tx ++;
   }
   ty ++
   tx = 0
  })
  if (!nope) {tile.pos.x--}
 }
}
function rotateRight() {
 if (tile.type !== null) {
  tile.rotation++;
  tile.rotation = truemod(tile.rotation, 4)
  var nope = false
  var tx = 0
  var ty = 0
  tetrominoes[tile.type][tile.rotation].forEach(tln => {
   for (const ttl of tln) {
    if (ttl == "1") {
     xpos = tx+tile.pos.x
     ypos = ty+tile.pos.y
     if (findCoords(xpos,ypos) !== "0") {nope = true}
    }
    tx ++;
   }
   ty ++
   tx = 0
  })
  if (nope) {tile.rotation--;}
  tile.rotation = truemod(tile.rotation, 4)
 }
}
function rotateLeft() {
 if (tile.type !== null) {
  tile.rotation--;
  tile.rotation = truemod(tile.rotation, 4)
  var nope = false
  var tx = 0
  var ty = 0
  tetrominoes[tile.type][tile.rotation].forEach(tln => {
   for (const ttl of tln) {
    if (ttl == "1") {
     xpos = tx+tile.pos.x
     ypos = ty+tile.pos.y
     if (findCoords(xpos,ypos) !== "0") {nope = true}
    }
    tx ++;
   }
   ty ++
   tx = 0
  })
  if (nope) {tile.rotation++;}
  tile.rotation = truemod(tile.rotation, 4)
 }
}
function truemod(a, b) { return ((a % b) + b) % b; }
function tick() {
 if (tile.type !== null) {
  var setTile = false
  var tx = 0
  var ty = 0
  tetrominoes[tile.type][tile.rotation].forEach(tln => {
   for (const ttl of tln) {
    if (ttl == "1") {
     xpos = tx+tile.pos.x
     ypos = ty+tile.pos.y
     if (findCoords(xpos,ypos+1) !== "0") {setTile = true}
    }
    tx ++;
   }
   ty ++
   tx = 0
  })
  if (setTile) {
   score += 10
   tx = 0
   ty = 0
   tetrominoes[tile.type][tile.rotation].forEach(tln => {
    for (const ttl of tln) {
     if (ttl == "1") {
      xpos = tx+tile.pos.x
      ypos = ty+tile.pos.y
      tileGrid[ypos] = replaceAt(tileGrid[ypos],xpos,tile.color);
     }
     tx ++;
    }
    ty ++
    tx = 0
   })
   newTile()
  } else {
   tile.pos.y++;
  }
 }
 if (running) {
  checkLineClear();
 }
}
function newTile() {
 tile.color = tile.nextcolor;
 tile.type = tile.nexttype;
 randomtile();
 tile.pos.x = 4
 tile.pos.y = 0
 tile.rotation = 0
 tile.rotation--;
 tile.rotation = truemod(tile.rotation, 4)
 var nope = false
 var tx = 0
 var ty = 0
 tetrominoes[tile.type][tile.rotation].forEach(tln => {
  for (const ttl of tln) {
   if (ttl == "1") {
    xpos = tx+tile.pos.x
    ypos = ty+tile.pos.y
    if (findCoords(xpos,ypos) !== "0") {nope = true}
   }
   tx ++;
  }
  ty ++
  tx = 0
 })
 if (nope) {running=false;playend();storp();} 
}
var stidx = 0
function storp() {
 tile.type = null;
 if (stidx < tileGrid.length) {
  console.log("[LINE FILL]: FILLING LINE "+stidx+" WITH COLOR "+((stidx % 3)+3))
  if (stidx % 3 === 0) { tileGrid[stidx] = "3333333333"; }
  if (stidx % 3 === 1) { tileGrid[stidx] = "4444444444"; }
  if (stidx % 3 === 2) { tileGrid[stidx] = "5555555555"; }
  stidx++;
  draw();
  setTimeout(storp,100);
 }
}
function findCoords(x,y) {
 if (x >= tileGrid[0].length) {return "1";}
 if (x < 0) {return "1";}
 if (y >= tileGrid.length) {return "1";}
 return tileGrid[y].charAt(x)
}
function replaceAt(originalString, index, replacementChar) {
 if (index >= originalString.length || index < 0) {
  return originalString;
 }
 return originalString.substring(0, index) + replacementChar + originalString.substring(index + 1);
}
//MUSIC YAYY
let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let jnglaudioCtx = new (window.AudioContext || window.webkitAudioContext)();
var noteidx = 0
function playnote() {
 if (playing) {
  playn(song[noteidx].n,song[noteidx].t)
 }
 if (!noplayingallowed) {
  setTimeout(playnote,song[noteidx].t)
 }
 noteidx++;
 if (noteidx >= song.length) {
  noteidx=0
 }
}
var jnglidx = 0
var jnglnum = 0
function startjngl(sc) {
 jnglnum = sc
 jnglidx = 0
 playing = false
 playjngl()
}
noplayingallowed = false
function playend() {
 jnglidx = 0
 noplayingallowed = true
 endjngl()
}
var playing = true
function playjngl() {
 playn(sfx[jnglnum][jnglidx].n,sfx[jnglnum][jnglidx].t)
 if (jnglidx < sfx[jnglnum].length-1) {
  setTimeout(playjngl,sfx[jnglnum][jnglidx].t)
  jnglidx ++
 } else {
  playing = true
 }
}
function endjngl() {
 playn(sfx[4][jnglidx].n,sfx[4][jnglidx].t)
 if (jnglidx < sfx[4].length-1) {
  setTimeout(endjngl,sfx[4][jnglidx].t)
  jnglidx ++
 }
}
function playn(hz,ml) {
 console.log("[CHIPTUNE EMULATOR]: Playing note frequency: "+hz+" for "+ml+" milliseconds")
 const osc = audioCtx.createOscillator();
 const gain = audioCtx.createGain();
 osc.type = "square"
 osc.frequency.setValueAtTime(hz,audioCtx.currentTime)
 osc.connect(gain)
 gain.connect(audioCtx.destination)
 osc.start()
 osc.stop(audioCtx.currentTime + ml / 1000);
}
var firstClick = true
window.addEventListener("click",function(e) {if (firstClick) {window.requestAnimationFrame(gameloop);playnote();firstClick=false}});
window.addEventListener("keydown", function (e) {if (!keysPressed.includes(e.key)) {keysPressed.push(e.key);}});
window.addEventListener("keyup", function(e) {
 if (keysPressed.includes(e.key)) {keysPressed.splice(keysPressed.indexOf(e.key),1);}
 if (already.includes(e.key)) {already.splice(already.indexOf(e.key),1);}
});
function checkLineClear() {
 var idx = 0
 var clears = 0
 tileGrid.forEach(ln => {
  var lnclear = true
  for (const tl of ln) {
   if (tl === "0") {lnclear = false}
  }
  if (lnclear) {clearline(idx);clears++}
  idx++
 });
 if (clears === 1) {score += 40;console.log("[LINE CLEAR]: Single!");startjngl(0);}
 if (clears === 2) {score += 100;console.log("[LINE CLEAR]: Double!");startjngl(1);}
 if (clears === 3) {score += 300;console.log("[LINE CLEAR]: Triple!");startjngl(2);}
 if (clears === 4) {score += 1200;console.log("[LINE CLEAR]: Tetris!");startjngl(3);}
}
function clearline(index) {
 tileGrid.splice(index,1);
 tileGrid.unshift("0000000000");
}
function randomtile() {
 if (queue.length == 0) {
  var outarray = []
  for (var i=0;i<tetrominoes.length;i++) {outarray.push(i)}
  queue = shuffle(outarray)
 }
 tile.nextcolor = 1+Math.round(Math.random()*5)
 tile.nexttype = queue[0];
 queue.shift()
}
function shuffle(array) {
 let currentIndex = array.length, randomIndex;
 while (currentIndex !== 0) {
  randomIndex = Math.floor(Math.random() * currentIndex);
  currentIndex--;
  [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
 }
 return array;
}
randomtile()
newTile()