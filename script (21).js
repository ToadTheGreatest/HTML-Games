// POWDER SIM v1.0
// By: Ryan Jacob
// 3/11/2026

// INIT VARS
var canvas = document.getElementById("canv");
var ctx = canvas.getContext("2d");
const TILESIZE = 10;
var board = [];
var mousex = 0;
var mousey = 0;
var currentmaterial = "0";
var clicking = false;
var paused = true;

// FUNCS
function makeBoard() {
 canvas.width = window.innerWidth-25;
 canvas.height = window.innerHeight-100;
 var width = Math.floor(canvas.width/TILESIZE);
 var height = Math.floor(canvas.height/TILESIZE);
 for (var y=0;y<height;y++) {
  var output = "";
  for (var x=0;x<width;x++) { output += "0"; }
  board.push(output);
 }
}

function replaceAt(originalString, index, replacement) {
 if (index < 0 || index >= originalString.length) {
  return originalString;
 } 
 return originalString.slice(0, index) + replacement + originalString.slice(index + replacement.length);
}

function logic() {
 var indx = 0;
 for (var indy = board.length-1;indy >= 0;indy--) {
  for (const x of board[indy]) {
   if (isOpen(indx,indy+1)||isOpen(indx-1,indy+1)||isOpen(indx+1,indy+1)||isOpen(indx-1,indy)||isOpen(indx+1,indy)) {
    if (x==="M") { // METAL SWITCH STATEMENT
     //none
    }
    if (x==="R") { // ROCK SWITCH STATEMENT
     if (isOpen(indx,indy+1)) {
      board[indy] = replaceAt(board[indy],indx,"0")
      board[indy+1] = replaceAt(board[indy+1],indx,"R")
     }
    }
    if (x==="S") { // SAND SWITCH STATEMENT
     if (isOpen(indx,indy+1)) {
      board[indy] = replaceAt(board[indy],indx,"0")
      board[indy+1] = replaceAt(board[indy+1],indx,"S")
     } else if (isOpen(indx-1,indy+1)) {
      board[indy] = replaceAt(board[indy],indx,"0")
      board[indy+1] = replaceAt(board[indy+1],indx-1,"S")
     } else if (isOpen(indx+1,indy+1)) {
      board[indy] = replaceAt(board[indy],indx,"0")
      board[indy+1] = replaceAt(board[indy+1],indx+1,"S")
     }
    }
    if (x==="W") { // WATER SWITCH STATEMENT
     if (isOpen(indx,indy+1)) {
      board[indy] = replaceAt(board[indy],indx,"0")
      board[indy+1] = replaceAt(board[indy+1],indx,"W")
     } else if (isOpen(indx-1,indy+1)) {
      board[indy] = replaceAt(board[indy],indx,"0")
      board[indy+1] = replaceAt(board[indy+1],indx-1,"W")
     } else if (isOpen(indx+1,indy+1)) {
      board[indy] = replaceAt(board[indy],indx,"0")
      board[indy+1] = replaceAt(board[indy+1],indx+1,"W")
     } else if (isOpen(indx-1,indy)) {
      board[indy] = replaceAt(board[indy],indx,"0")
      board[indy] = replaceAt(board[indy],indx-1,"W")
     } else if (isOpen(indx+1,indy)) {
      board[indy] = replaceAt(board[indy],indx,"0")
      board[indy] = replaceAt(board[indy],indx+1,"W")
     }
    }
    if (x==="L") { // LAVA SWITCH STATEMENT
     if (isOpen(indx,indy+1)) {
      board[indy] = replaceAt(board[indy],indx,"0")
      board[indy+1] = replaceAt(board[indy+1],indx,"L")
     } else if (isOpen(indx-1,indy+1)) {
      board[indy] = replaceAt(board[indy],indx,"0")
      board[indy+1] = replaceAt(board[indy+1],indx-1,"L")
     } else if (isOpen(indx+1,indy+1)) {
      board[indy] = replaceAt(board[indy],indx,"0")
      board[indy+1] = replaceAt(board[indy+1],indx+1,"L")
     } else if (isOpen(indx-1,indy)) {
      board[indy] = replaceAt(board[indy],indx,"0")
      board[indy] = replaceAt(board[indy],indx-1,"L")
     } else if (isOpen(indx+1,indy)) {
      board[indy] = replaceAt(board[indy],indx,"0")
      board[indy] = replaceAt(board[indy],indx+1,"L")
     }
    }
    if (x==="C") { // ACID SWITCH STATEMENT
     if (isOpen(indx,indy+1)) {
      board[indy] = replaceAt(board[indy],indx,"0")
      board[indy+1] = replaceAt(board[indy+1],indx,"C")
     } else if (isOpen(indx-1,indy+1)) {
      board[indy] = replaceAt(board[indy],indx,"0")
      board[indy+1] = replaceAt(board[indy+1],indx-1,"C")
     } else if (isOpen(indx+1,indy+1)) {
      board[indy] = replaceAt(board[indy],indx,"0")
      board[indy+1] = replaceAt(board[indy+1],indx+1,"C")
     } else if (isOpen(indx-1,indy)) {
      board[indy] = replaceAt(board[indy],indx,"0")
      board[indy] = replaceAt(board[indy],indx-1,"C")
     } else if (isOpen(indx+1,indy)) {
      board[indy] = replaceAt(board[indy],indx,"0")
      board[indy] = replaceAt(board[indy],indx+1,"C")
     }
    }
   }
   if (x==="G") { // GLASS SWITCH STATEMENT
    if (indy-1>=0) { if (!["G","L"].includes(board[indy-1].charAt(indx)) && !isOpen(indx,indy-1)) {board[indy] = replaceAt(board[indy],indx,"0")} }
   }
   if (x==="F") { // FIRE SWITCH STATEMENT
    if (isOpen(indx,indy+1)) { board[indy] = replaceAt(board[indy],indx,"0") }
    if (indy+1 < board.length) { if (board[indy+1].charAt(indx)==="F") { board[indy] = replaceAt(board[indy],indx,"0") } }
     if (Math.round(Math.random()*49)===0) {
     if (indy+1 < board.length) {
      if (!isOpen(indx,indy+1)) { board[indy+1] = replaceAt(board[indy+1],indx,"0") }
     }
    }
   }
   if (x==="B") { // BOMB SWITCH STATEMENT
    if (isOpen(indx,indy+1)) {
     board[indy] = replaceAt(board[indy],indx,"0")
     board[indy+1] = replaceAt(board[indy+1],indx,"B")
    } else {
     // EXPLODE!
     for (var idx=indx-3;idx<indx+3;idx++) {
      for (var idy=indy-3;idy<indy+3;idy++) {
       if (!(idx<0||idx>=board[0].length||idy<0||idy>=board.length)) {
        board[idy] = replaceAt(board[idy],idx,"A")
       }
      }
     }
    }
   }
   if (x==="A") {
    if (Math.round(Math.random()*9)===0) {
     if (Math.round(Math.random()*4)===0) {
      board[indy] = replaceAt(board[indy],indx,"F")
     } else {
      board[indy] = replaceAt(board[indy],indx,"0")
     }
    }
   }
   if (x==="N") { // NUKE SWITCH STATEMENT
    if (isOpen(indx,indy+1)) {
     board[indy] = replaceAt(board[indy],indx,"0")
     board[indy+1] = replaceAt(board[indy+1],indx,"N")
    } else {
     // EXPLODE!
     for (var idx=0;idx<board[0].length;idx++) {
      for (var idy=0;idy<board.length;idy++) {
       if (!(idx<0||idx>=board[0].length||idy<0||idy>=board.length)) {
        if (board[idy].charAt(idx) !== "U") {
         board[idy] = replaceAt(board[idy],idx,"H")
        }
       }
      }
     }
    }
   }
   if (x==="H") { // NUKE ASH SWITCH STATEMENT
    if (Math.round(Math.random()*9)===0) {
     if (Math.round(Math.random()*7)===0) {
      board[indy] = replaceAt(board[indy],indx,"U")
     } else {
      board[indy] = replaceAt(board[indy],indx,"0")
     }
    }
   }
   if (x==="V") { // FIRE CHARGE SWITCH STATEMENT
    if (isOpen(indx,indy+1)) {
     board[indy] = replaceAt(board[indy],indx,"0")
     board[indy+1] = replaceAt(board[indy+1],indx,"V")
    } else {
     // EXPLODE!
     board[indy] = replaceAt(board[indy],indx,"0")
     for (var idx=indx-3;idx<indx+3;idx++) {
      for (var idy=indy-3;idy<indy+3;idy++) {
       if (!(idx<0||idx>=board[0].length||idy<0||idy>=board.length)) {
        if (board[idy].charAt(idx)==="0") {
         board[idy] = replaceAt(board[idy],idx,"F")
        }
       }
      }
     }
    }
   }
   if (x==="L") {
    if (indy-1>=0) { if (board[indy-1].charAt(indx)==="W") {board[indy-1] = replaceAt(board[indy-1],indx,"R")} }
    if (indy+1<board.length) { if (board[indy+1].charAt(indx)==="W") {board[indy+1] = replaceAt(board[indy+1],indx,"R")} }
    if (indx-1>=0) { if (board[indy].charAt(indx-1)==="W") {board[indy] = replaceAt(board[indy],indx-1,"R")} }
    if (indx+1<board[0].length) { if (board[indy].charAt(indx+1)==="W") {board[indy] = replaceAt(board[indy],indx+1,"R")} }

    if (indy-1>=0) { if (board[indy-1].charAt(indx)==="S") {board[indy-1] = replaceAt(board[indy-1],indx,"G")} }
    if (indy+1<board.length) { if (board[indy+1].charAt(indx)==="S") {board[indy+1] = replaceAt(board[indy+1],indx,"G")} }
    if (indx-1>=0) { if (board[indy].charAt(indx-1)==="S") {board[indy] = replaceAt(board[indy],indx-1,"G")} }
    if (indx+1<board[0].length) { if (board[indy].charAt(indx+1)==="S") {board[indy] = replaceAt(board[indy],indx+1,"G")} }

    if (indy-1>=0) { if (board[indy-1].charAt(indx)==="M") {board[indy-1] = replaceAt(board[indy-1],indx,"L")} }
    if (indy+1<board.length) { if (board[indy+1].charAt(indx)==="M") {board[indy+1] = replaceAt(board[indy+1],indx,"L")} }
    if (indx-1>=0) { if (board[indy].charAt(indx-1)==="M") {board[indy] = replaceAt(board[indy],indx-1,"L")} }
    if (indx+1<board[0].length) { if (board[indy].charAt(indx+1)==="M") {board[indy] = replaceAt(board[indy],indx+1,"L")} }
   }
   if (x==="W") {
    if (indy-1>=0) { if (board[indy-1].charAt(indx)==="F") {board[indy-1] = replaceAt(board[indy-1],indx,"0")} }
    if (indy+1<board.length) { if (board[indy+1].charAt(indx)==="F") {board[indy+1] = replaceAt(board[indy+1],indx,"0")} }
    if (indx-1>=0) { if (board[indy].charAt(indx-1)==="F") {board[indy] = replaceAt(board[indy],indx-1,"0")} }
    if (indx+1<board[0].length) { if (board[indy].charAt(indx+1)==="F") {board[indy] = replaceAt(board[indy],indx+1,"0")} }

    if (indy-1>=0) { if (board[indy-1].charAt(indx)==="A") {board[indy-1] = replaceAt(board[indy-1],indx,"0")} }
    if (indy+1<board.length) { if (board[indy+1].charAt(indx)==="A") {board[indy+1] = replaceAt(board[indy+1],indx,"0")} }
    if (indx-1>=0) { if (board[indy].charAt(indx-1)==="A") {board[indy] = replaceAt(board[indy],indx-1,"0")} }
    if (indx+1<board[0].length) { if (board[indy].charAt(indx+1)==="A") {board[indy] = replaceAt(board[indy],indx+1,"0")} }
   }
   if (x==="C") {
    if (indy-1>=0) { if (board[indy-1].charAt(indx)!=="C") {board[indy-1] = replaceAt(board[indy-1],indx,"0")} }
    if (indy+1<board.length) { if (board[indy+1].charAt(indx)!=="C") {board[indy+1] = replaceAt(board[indy+1],indx,"0")} }
    if (indx-1>=0) { if (board[indy].charAt(indx-1)!=="C") {board[indy] = replaceAt(board[indy],indx-1,"0")} }
    if (indx+1<board[0].length) { if (board[indy].charAt(indx+1)!=="C") {board[indy] = replaceAt(board[indy],indx+1,"0")} }
   }

   indx++;
  }
  indx=0;
 }
}

function isOpen(x,y) {
 if ( y < 0 ) { return false; }
 if ( x < 0 ) { return false; }
 if ( y >= board.length ) { return false; }
 if ( x >= board[0].length ) { return false; }
 if ( board[y].charAt(x) === "0" ) { return true; } else { return false; }
}

function draw() {
 var xpos = 0
 var ypos = 0
 var indx = 0
 var indy = 0
 for (var y of board) {
  for (var x of y) {
   if (x === "0") {ctx.fillStyle = "#000000"}
   if (x === "M") {ctx.fillStyle = "#202020"}
   if (x === "R") {ctx.fillStyle = "#505050"}
   if (x === "S") {ctx.fillStyle = "#EDC9AF"}
   if (x === "W") {ctx.fillStyle = "#0000FF"}
   if (x === "L") {ctx.fillStyle = "#FFAA00"}
   if (x === "G") {ctx.fillStyle = "#AAAAAA"}
   if (x === "F") {ctx.fillStyle = "#FF5500"}
   if (x === "B") {ctx.fillStyle = "#FF0000"}
   if (x === "A") {ctx.fillStyle = "#888888"}
   if (x === "N") {ctx.fillStyle = "#00FF00"}
   if (x === "U") {ctx.fillStyle = "#AAFFAA"}
   if (x === "H") {ctx.fillStyle = "#88FF88"}
   if (x === "C") {ctx.fillStyle = "#AAFF00"}
   if (x === "V") {ctx.fillStyle = "#FFFF00"}
   if (indy === mousey && indx === mousex) {ctx.fillStyle = "#FFFFFF"}
   ctx.fillRect(xpos,ypos,TILESIZE,TILESIZE)
   xpos += TILESIZE;
   indx ++
  }
  ypos += TILESIZE;
  indy ++
  indx = 0
  xpos = 0
 }
}

function loop() {
 if (!paused) {
  logic();
 }
 draw();
 if (mousex>=0&&mousex<board[0].length&&mousey>=0&&mousey<board.length&&clicking) {
  board[mousey] = replaceAt(board[mousey],mousex,currentmaterial)
 }
 window.requestAnimationFrame(loop);
}

function playpause() {
 paused = !paused
 if (paused) {
  document.getElementById("play").textContent = "Play";
 } else {
  document.getElementById("play").textContent = "Pause";
 }
}

window.addEventListener("mousemove", function (event) {
 mousex = Math.floor(event.pageX/TILESIZE)-1;
 mousey = Math.floor(event.pageY/TILESIZE)-1;
});

window.addEventListener("mousedown", function (event) {
 if (event.button === 0) {
  clicking = true;
 } else if (event.button === 2) {
  if (mousex>=0&&mousex<board[0].length&&mousey>=0&&mousey<board.length) {
   board[mousey] = replaceAt(board[mousey],mousex,currentmaterial)
  }
 }
});

window.addEventListener("contextmenu", function (event) {
 event.preventDefault();
});

window.addEventListener("mouseup", function (event) {
 clicking = false;
});

window.addEventListener("keydown", function (event) {
 if (event.key.toLowerCase() === "p") {playpause();}
 if (event.key === "ArrowDown") { mousey++ }
 if (event.key === "ArrowUp") { mousey-- }
 if (event.key === "ArrowRight") { mousex++ }
 if (event.key === "ArrowLeft") { mousex-- }
});

//INIT
makeBoard();
window.requestAnimationFrame(loop);
