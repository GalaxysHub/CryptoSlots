"use strict"

function spinSlots(){
  if(canSpin ==true){
    console.log("balance: " + balance);
    displayAllBetInfo();
    if(totalBet==0){console.log('Please make a bet');
  }else if(balance-totalBet<0){console.log("Insuffiecient funds");
    }else{playGame();}
  }
}

function playGame(){
  balance = finalBalance; //allows user to continue playing without waiting for balance to finish updating.
  if(bonus == false){payoutSum = 0;}
  ctxAnimate.clearRect(0,0,cWidth,cHeight);
  shrink = false;
  vPos = [0,0,0,0,0];
  currentLine = 0;
  canSpin = false;
  canvasScreen.style.zIndex = 99;
  if(auto==false){balance -= totalBet;}
  finalBalance = balance;
  console.log(balance);
  displayAllBetInfo();
  createOutcome();
  findWinners();
  casinoSound.play();
  slideTile();
}

var gameNum = 0;
function autoPlay(){
  //takes all money for auto games but free for bonus games
  if(auto==false&&bonus==false){
    balance-=totalBet*numAutoGames;
    finalBalance = balance;
    auto = true;
    displayAllBetInfo();
  }

  if(0<numAutoGames){
    if(canSpin==true){
      playGame();
      gameNum++;
      numAutoGames--;
      writeText.displayAutoGames();
      console.log("Game " +gameNum);
    }
    requestAnimationFrame(autoPlay);
  }else{
    auto = false;
    gameNum = 0;
    updateBalance();
  }
}

function findWinners(){
  tilesInLineArr = [];
  winningLines = [];
  winningReels =[];

  for(var lineNum = 0; lineNum<numLines; lineNum++){

    //looks for 5 in a row winners and works down
    for(var j=numReels;j>2;j--){
      var tilesInLine = [];

      for(var i= 0; i<j; i++){
        tilesInLine.push(parseInt(finalTiles[i][lines[lineNum][i]].split('e')[1]))
      }

      var set = new Set(tilesInLine);
      tilesInLine = [...set];
      tilesInLine.sort();
      //Needs new rule to find 3/4 wilds vs 4/5 of a kind
      if(tilesInLine.length==1){
        winningLines.push(lineNum);
        winningReels.push(j);
        console.log("Winner on line "+(lineNum+1));
        payout = payouts[j-3][tilesInLine[0]]*betPerLine;
        console.log("You won "+payout);
        break; //prevents double/triple counting of 4/3 in a row winners
      }else if(tilesInLine.length==2&&tilesInLine[0]==0){
        winningLines.push(lineNum);
        winningReels.push(j);
        console.log("Winner on line " + (lineNum+1)+" with wilds");
        payout = payouts[j-3][tilesInLine[1]]*betPerLine;
        console.log("You won "+payout);
        break;
      }
    }
  }
}

function returnFairRandTile(rand, reel){
  let n;
  for(n=0; n<numPics; n++){
    if(rand<validTileNums[reel][n]){
      return n;
    }
  }
}

function createOutcome(){
  finalOutcome = [];
  finalTiles = [];
  let i, j, p, tile;
  for(i =0; i<numReels;i++){
    let colFinTiles = [];
    let colFinTileKeys = [];
    for(j = 0; j<nTilesPerCol; j++){
      // p = Math.floor(Math.random()*numPics);
      p = Math.floor(Math.random()*validTileNums[i][numPics-1]);
      tile = returnFairRandTile(p,i);
      colFinTiles.push(loadedImages[Object.keys(loadedImages)[tile]]);
      colFinTileKeys.push(Object.keys(loadedImages)[tile]);
    }
    finalOutcome.push(colFinTiles);
    finalTiles.push(colFinTileKeys.reverse());
  }
}

//simplify with drawTiles function

function drawFinalReel(reelNum){
  let tileXPos = tileXPosArr[reelNum];
  let tileYPosArr = yPosArr[reelNum];
  let tileSize = tileSizeArr[reelNum];
  let finalTileReel = finalTiles[reelNum]
  for(let j = 0; j<nTilesPerCol; j++){
    ctx.drawImage(loadedImages[finalTileReel[j]],tileXPos,tileYPosArr[j]+slotFrames[j],tileSize,tileSize)
  }
}

function drawFinalOutcome(){
  ctx.clearRect(0,0,cWidth,cHeight);
  for(let i =0; i<numReels;i++){
    drawFinalReel(i);
  }
}

function slideTile(){
  // var time = Date.now();
  // if(!start) start = time;
  // var progress = time-start;

  let numTiles = [];
  let lastTilePos = [];
  let reelSpeed = [];

  for(let i = 0; i<numReels; i++){

    numTiles[i] = numTilesFirstReel+tileDif*i
    lastTilePos[i] = slotWidths[i]*(numTiles[i]+2)
    reelSpeed[i] = Math.floor(speed*slotWidths[i]/200)

    let tileXPos = tileXPosArr[i];
    let tileYPosArr = yPosArr[i];
    let tileSize = tileSizeArr[i];
    let endReelTile = numTiles[i];

    if(Math.floor(vPos[i])<lastTilePos[i]+reelSpeed[i]){
      ctx.clearRect(xPos[i],yPosArr[i][0],slotWidths[i],slotWidths[i]*nTilesPerCol)
      for(let n = -2; n<(endReelTile); n++){
        let yLoc = tileYPosArr[0]-slotWidths[i]*(n)+vPos[i]
        if(yLoc>tileYPosArr[0]-tileSize&&yLoc<tileYPosArr[2]+tileSize){
          let rand = Math.floor(Math.random()*numPics);
          ctx.drawImage(loadedImages[Object.keys(loadedImages)[rand]], tileXPos, yLoc,tileSize, tileSize);
        }
      }
      //Adds outcome tiles to the screen
      for(var c = 0; c<nTilesPerCol; c++){
        ctx.drawImage(finalOutcome[i][c],tileXPos ,tileYPosArr[0]+slotFrames[i]-slotWidths[i]*(endReelTile+c)+vPos[i],tileSize, tileSize);
      }
      vPos[i] += reelSpeed[i];
    }else{
      ctx.clearRect(xPos[i],yPosArr[i][0],slotWidths[i],slotWidths[i]*nTilesPerCol)
      drawFinalReel(i);
    }
  }

  if(vPos[numReels-1]<lastTilePos[numReels-1]){
    window.requestAnimationFrame(slideTile);
  }else{
    if(winningLines.length>0){
      // ctxAnimate.zindex = 99;
      lineWin.play();
      // drawWinningLines(winningLines[currentLine],winningReels[currentLine])
      growAndShrink(winningLines[currentLine],winningReels[currentLine]);
      drawWinnerBackground(winningLines[currentLine],winningReels[currentLine]);
    }else{
      //Find better place for this.
      finalBalance = balance;
      payoutSum = 0;
      drawFinalOutcome();
      setTimeout(function(){
        canSpin=true;
        canvasScreen.style.zIndex = -10;
      },500)
    }
  }

}
