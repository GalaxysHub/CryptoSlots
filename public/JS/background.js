"use strict";

const canvasDisplayBG = document.getElementById('displayBG');
const canvasBG = document.getElementById('background');
const canvasBtnBG = document.getElementById('buttonsBG');

const ctxBtnTop = cDisplayHeight+cHeight, ctxBtnHeight = cHeight*2/5;
// canvasBtnBG.style.opacity = "0.8";
// canvasBG.style.opacity = "0.85"

if(canvasDisplayBG.getContext&&canvasBG.getContext&&canvasBtnBG.getContext){

  canvasDisplayBG.width = cWidth;
  canvasDisplayBG.height = cDisplayHeight;

  canvasBG.width = cWidth;
  canvasBG.height = cHeight;

  canvasBtnBG.style.top = ctxBtnTop+"px";
  canvasBtnBG.style.zIndex = -99;
  canvasBtnBG.height = ctxBtnHeight;
  canvasBtnBG.width = cWidth;

  var ctxDisBG = canvasDisplayBG.getContext('2d');
  var ctxBG = background.getContext('2d');
  var ctxBtnBG = buttonsBG.getContext('2d');
  ctxBG.globalCompositionOperation = 'destination-over';
  ctxBtnBG.globalCompositionOperation = 'source-over';

  var BGImages = [];
  var backgroundPics = ['background.jpg','background2.jpg','background5.jpg','background7.jpg','backgroundSlot.jpg','backgroundSlotHD.jpg'];
  var loc1 = './public/Pictures/backgrounds/'

  var promiseArray1 = returnPromiseImgArr(backgroundPics,BGImages,loc1);
  Promise.all(promiseArray1).then(drawBG);

}

function drawBG(){
  ctxDisBG.drawImage(BGImages["background5"],0,0,cWidth,cDisplayHeight);
  ctxBG.drawImage(BGImages["background"],0,0,cWidth,cHeight);
  ctxBtnBG.drawImage(BGImages["background7"],0,0,cWidth,ctxBtnHeight);
  for(let i =0; i<xPos.length;i++){
    ctxBG.drawImage(BGImages["backgroundSlotHD"],xPos[i],yPosArr[i][0],slotWidths[i],slotWidths[i]*nTilesPerCol);
  }
}

function slotOutline(){
  for(let i = 0; i<numReels; i++){
    ctxBG.rect(xPos[i],yPosArr[i][0],slotWidths[i],slotWidths[i]*nTilesPerCol)
    ctxBG.strokeStyle = 'rgb(0,0,0)';
    ctxBG.stroke();
  }
}

//only drawn when there's a winning line
function drawWinnerBackground(lineNum, lastWinningReel=numReels){
  let line = lines[lineNum];
  //redraws background and all final outcome tiles except winning line
  ctx.clearRect(0,0,cWidth,cHeight);

  for(let x=0; x<numReels; x++){
    let tileXPos = tileXPosArr[x];
    let tileYPosArr = yPosArr[x];
    let tileSize = tileSizeArr[x];
    let finalTileReel = finalTiles[x]
    let tileWinner;
    if(x<lastWinningReel){
      tileWinner = line[x];
    }

    for(let y=0; y<nTilesPerCol; y++){
      if(y!==tileWinner){
        ctx.drawImage(loadedImages[finalTileReel[y]],tileXPos,tileYPosArr[y]+slotFrames[y],tileSize,tileSize);
      }
    }
  }

}
