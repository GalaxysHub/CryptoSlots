"use strict"

const canvasSlots = document.getElementById('slots');

const casinoSound = new sound("./Sounds/casinoSound.wav");
const slotStop = new sound("./Sounds/slotStop2.wav");
const lineWin = new sound("./Sounds/Swoosh.wav");

var currentLine;
var winningLines = [];
var tilesInLineArr = [];
var winningReels = [];

var shrink;
var canSpin=true;

var xPos = [];
var tileXPosArr = [];
var yPosArr = [];
var vPos = [];

if(canvasSlots.getContext){
  canvasSlots.width = cWidth;
  canvasSlots.height = cHeight;

  var ctx = canvasSlots.getContext('2d');
  ctx.globalCompositionOperation = 'destination-over';

  var pics = [];
  var loadedImages = {};

  for(let i=0; i<numPics;i++){pics[i] = `tile${i}.png`;}

  var finalOutcome = [];
  var finalTiles = [];



  //Tiles Horizontal Postions
  var sumBack = 0;
  //find first horizontal position for tiles
  for(let i = 0; i<Math.floor(numReels/2); i++){
    sumBack += slotWidths[i];
  }
  if(numReels%2==1){sumBack+=0.5*slotWidths[Math.floor(numReels/2)];}
  var xStart = cWidth/2-sumBack;
  xPos[0] = xStart;
  tileXPosArr[0]=xStart+slotFrames[0];
  //fill tiles horizontal positions array
  for(let i = 1; i<numReels; i++){
    xPos[i]=xPos[i-1]+slotWidths[i-1];
    tileXPosArr[i] = xPos[i]+slotFrames[i];
  }

  //fill tiles vertical positions array
  var yPos
  var yStart;
  for(let i = 0; i<numReels; i++){
    yPos = [];
    yStart = Math.floor(cHeight/2-nTilesPerCol/2*slotWidths[i]);
    for(j =0;j<nTilesPerCol;j++){
      yPos.push(yStart+slotWidths[i]*j);
    }
    yPosArr.push(yPos)
  }


  drawSlotFrame()
  const loc2 = './Pictures/MainTiles/';
  var promiseArray2 = returnPromiseImgArr(pics,loadedImages,loc2);
  Promise.all(promiseArray2).then(function(){
    createOutcome();
    drawFinalOutcome();
  });
}


function drawSlotFrame(){
  ctx.lineWidth = 1;
  ctx.strokeStyle = "black";
  ctx.clearRect(0,0,cWidth,cHeight);
  for(let i = 0; i<numReels; i++){
    ctx.rect(xPos[i],yPosArr[i][0],slotWidths[i],slotWidths[i]*nTilesPerCol);
  }
  ctx.stroke();
  ctx.clip();
}
