"use strict"

const canvasSlots = document.getElementById('slots');

const casinoSound = new sound("./public/Sounds/casinoSound.wav");
const slotStop = new sound("./public/Sounds/slotStop2.wav");
const lineWin = new sound("./public/Sounds/Swoosh.wav");

let currentLine;
let winningLines = [];
let tilesInLineArr = [];
let winningReels = [];

let shrink;
let canSpin=true;

let xPos = [];
let tileXPosArr = [];
let yPosArr = [];
let vPos = [];

let finalOutcome = [];
let finalTiles = [];

let pics = [];
let loadedImages = {};
let ctx;

if(canvasSlots.getContext){
  canvasSlots.width = cWidth;
  canvasSlots.height = cHeight;

  ctx = canvasSlots.getContext('2d');
  ctx.globalCompositionOperation = 'destination-over';

  pics = [];
  loadedImages = {};

  for(let i=0; i<numPics;i++){pics[i] = `tile${i}.png`;}

  finalOutcome = [];
  finalTiles = [];

  //Tiles Horizontal Postions
  let sumBack = 0;
  //find first horizontal position for tiles
  for(let i = 0; i<Math.floor(numReels/2); i++){
    sumBack += slotWidths[i];
  }
  if(numReels%2==1){sumBack+=0.5*slotWidths[Math.floor(numReels/2)];}
  let xStart = cWidth/2-sumBack;
  xPos[0] = xStart;
  tileXPosArr[0]=xStart+slotFrames[0];
  //fill tiles horizontal positions array
  for(let i = 1; i<numReels; i++){
    xPos[i]=xPos[i-1]+slotWidths[i-1];
    tileXPosArr[i] = xPos[i]+slotFrames[i];
  }

  //fill tiles vertical positions array
  let yPos
  let yStart;
  for(let i = 0; i<numReels; i++){
    yPos = [];
    yStart = Math.floor(cHeight/2-nTilesPerCol/2*slotWidths[i]);
    for(let j =0;j<nTilesPerCol;j++){
      yPos.push(yStart+slotWidths[i]*j);
    }
    yPosArr.push(yPos)
  }


  drawSlotFrame()
  const loc2 = './public/Pictures/MainTiles/';
  let promiseArray2 = returnPromiseImgArr(pics,loadedImages,loc2);
  Promise.all(promiseArray2).then(function(){
    createOutcome();
    drawFinalOutcome();
  });
}


function drawSlotFrame(){
  ctx.lineWidth = cWidth/800;
  ctx.strokeStyle = "black";
  ctx.clearRect(0,0,cWidth,cHeight);
  for(let i = 0; i<numReels; i++){
    ctx.rect(xPos[i],yPosArr[i][0],slotWidths[i],slotWidths[i]*nTilesPerCol);
  }
  ctx.stroke();
  ctx.clip();
}
