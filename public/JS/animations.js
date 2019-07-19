"use strict"
const lWidth = cWidth/100;
var canvasPopOutAnimations = document.getElementById('popOutAnimations');

if(canvasPopOutAnimations.getContext){
    canvasPopOutAnimations.width = cWidth;
    canvasPopOutAnimations.height = cHeight;
    var ctxAnimate = canvasPopOutAnimations.getContext('2d');
}

function drawAllLines(numLines){
  ctxAnimate.clearRect(0,0,cWidth,cHeight);
  for(let i = 0; i<numLines; i++){
    drawLine(i);
  }
}

function drawWinningLines(lineNum){
  let numWins = winningLines.length-1
  drawLine(lineNum);
  payoutSum+=payout;
  displayPayout();

  if(currentLine<numWins){
    currentLine++;
    //Needs works
    setTimeout(function(){
      lineWin.play();
      shrink = false;
      drawWinnerBackground(winningLines[currentLine],winningReels[currentLine])
      growAndShrink(winningLines[currentLine],winningReels[currentLine]);
    },500);
  }else{
    console.log("payout sum: "+payoutSum);
    finalBalance = balance+payoutSum;
    console.log("finalBalance: "+finalBalance);
    drawFinalOutcome();
    setTimeout(function(){
      ctxAnimate.clearRect(0,0,cWidth,cHeight);
      updateBalance();
      canSpin=true;
      canvasScreen.style.zIndex = -10;
    },500);
  }
}

function drawLine(lineNum){
  ctxAnimate.lineWidth = lWidth;
  var pointsArr = [];

  pointsArr[0] = [xPos[0],yPosArr[0][lines[lineNum][0]]+slotWidths[0]/2];
  for(var i = 1; i<numReels+1; i++){
    var point = [xPos[i-1]+slotWidths[i-1]/2,yPosArr[i-1][lines[lineNum][i-1]]+slotWidths[i-1]/2];
    pointsArr[i]=point;
  }
  pointsArr[numReels+1] = [xPos[numReels-1]+slotWidths[numReels-1],yPosArr[numReels-1][lines[lineNum][numReels-1]]+slotWidths[numReels-1]/2];

  ctxAnimate.beginPath();
  ctxAnimate.moveTo(pointsArr[0][0],pointsArr[0][1]);
  for(var i = 1; i<pointsArr.length; i++){
    ctxAnimate.lineTo(pointsArr[i][0],pointsArr[i][1]);
  }
  ctxAnimate.strokeStyle = lineColors[lineNum];
  ctxAnimate.stroke();
}

var t = 0;
const inc = 2;
const target = 26;

function growAndShrink(lineNum, lastWinningReel=numReels){

  let line = lines[lineNum];
  var time = Date.now();

  ctxAnimate.clearRect(0,0,cWidth,cHeight);
  //Animates the tiles for the winnning line
  for(let x=0; x<lastWinningReel; x++){
    let c = line[x];
    ctxAnimate.drawImage(loadedImages[finalTiles[x][c]],tileXPosArr[x]-inc*t/2,yPosArr[x][c]+slotFrames[x]-inc*t/2,tileSizeArr[x]+inc*t, tileSizeArr[x]+inc*t);
  }

    if(t<target&&shrink==false){
      t++;
      if(t==target){shrink = true;}
      window.requestAnimationFrame(function(time){
        growAndShrink(lineNum, lastWinningReel);
      });
    }
    if(t>0&&shrink==true){
      t--;
      window.requestAnimationFrame(function(time){
        growAndShrink(lineNum, lastWinningReel);
      });
      if(t==0){
        window.requestAnimationFrame(function(time){
          drawWinningLines(lineNum);
        });
      }
    }

}
