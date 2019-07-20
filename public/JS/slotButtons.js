"use strict"

const canvasButtons = document.getElementById('buttons'),
  canvasScreen = document.getElementById('glassScreen'),
  ctxBtn = canvasButtons.getContext('2d'),
  ctxScreen = canvasScreen.getContext('2d');

ctxBtn.globalCompositionOperation = 'destination-over';
canvasBtnBG.style.top = ctxBtnTop+"px";
canvasBtnBG.style.zIndex = -10;
canvasButtons.style.top = canvasBtnBG.style.top;
canvasButtons.style.zIndex = 10;
canvasButtons.width = cWidth;
canvasButtons.height = ctxBtnHeight;

canvasScreen.style.zIndex = -10;
canvasScreen.style.top = canvasBtnBG.style.top;
canvasScreen.width = cWidth;
canvasScreen.height = ctxBtnHeight;

const mainButtonHeight = cWidth*130/800, mainButtonWidth = mainButtonHeight*2,
 greenOvalHeight = ctxBtnHeight/4, greenOvalWidth = cWidth/4,
 redOvalHeight = greenOvalHeight, redOvalWidth = greenOvalWidth,
 sideArrowDif = cWidth*125/800, sideArrowSize = cWidth*25/800;

const mainButtonXLoc = (cWidth-mainButtonWidth)/2, mainButtonYLoc = (ctxBtnHeight-mainButtonHeight)/2,
 ovalXLoc = cWidth*.7, greenOvalYLoc = greenOvalHeight*1.5, redOvalYLoc = (ctxBtnHeight-redOvalHeight)*.9,
 sideArrowXLoc =cWidth*(3/40),
 lineBetYLoc = cWidth*(35/800),
 NumLinesYLoc = cWidth*(11/80);

const textShiftY = cWidth*(20/800);

const imgList = {};
const  buttons = ['LeftArrowRed.png','RightArrowRed.png','RedSquare.png','BlueTriangleUpDown.png','RedOval.png','GreenOval.png'],
  imgLocs = [
    {name: 'LeftArrowRed', x: sideArrowXLoc, y:lineBetYLoc, w:sideArrowSize, h:sideArrowSize},//Line Bet
    {name: 'RightArrowRed', x: sideArrowXLoc+sideArrowDif, y:lineBetYLoc, w:sideArrowSize, h:sideArrowSize},
    {name: 'LeftArrowRed', x: sideArrowXLoc, y:NumLinesYLoc, w:sideArrowSize, h:sideArrowSize},//Num Lines
    {name: 'RightArrowRed', x: sideArrowXLoc+sideArrowDif, y:NumLinesYLoc, w:sideArrowSize, h:sideArrowSize},
    {name: 'LeftArrowRed', x: ovalXLoc, y:lineBetYLoc, w:sideArrowSize, h:sideArrowSize},//Auto Play Games
    {name: 'RightArrowRed', x: ovalXLoc+greenOvalWidth-sideArrowSize, y:lineBetYLoc, w:sideArrowSize, h:sideArrowSize},
    {name: 'RedSquare', x: mainButtonXLoc, y:mainButtonYLoc, w:mainButtonWidth, h:mainButtonHeight},
    {name: 'GreenOval', x: ovalXLoc, y:greenOvalYLoc, w:greenOvalWidth, h:greenOvalHeight},
    {name: 'RedOval', x: ovalXLoc, y:redOvalYLoc, w:redOvalWidth, h:redOvalHeight},
  ],
  clickLocs = [

  ]

  const btnImgsPromArr = returnPromiseImgArr(buttons,imgList,'./Pictures/button/');

  Promise.all(btnImgsPromArr).then(function(){
    drawButtons();
    writeText.writeHeaders();
  });

function getMousePos(canvas, evt){
  let rect = canvas.getBoundingClientRect();
  return{
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

function isInside(pos, rect){
    return pos.x > rect.x && pos.x < rect.x+rect.w && pos.y < rect.y+rect.h && pos.y > rect.y
}

function drawButtons(){
  let len = imgLocs.length;
  for(let i = 0; i<len; i++){
      ctxBtn.drawImage(imgList[imgLocs[i].name],imgLocs[i].x,imgLocs[i].y,imgLocs[i].w,imgLocs[i].h);
    }
}

const writeText = (function(){
  const fontSize = sideArrowSize-2;

  const lineBetDisplayX = sideArrowXLoc+(sideArrowSize+sideArrowDif)/2,
    lineBetTextY = imgLocs[0].y+fontSize+textShiftY,
    numLinesTextY1 = imgLocs[3].y+fontSize+textShiftY,
    numLinesTextY2 = imgLocs[3].y+2*fontSize+textShiftY,
    rightBtnTextX = ovalXLoc+greenOvalWidth/2,
    autoPlayTextY = greenOvalHeight*2,
    maxBetTextY = (ctxBtnHeight-redOvalHeight)+fontSize/2,
    spinBtnTextX = cWidth/2, spinBtnTextY = (ctxBtnHeight+fontSize)/2;

  ctxBtn.rect(0,0,cWidth, ctxBtnHeight);
  ctxBtn.textAlign = 'center';
  ctxBtn.fillStyle = 'white';
  ctxBtn.strokeStyle = "black";

  function fillAndStroke(text,xLoc,yLoc){
    ctxBtn.fillText(text,xLoc,yLoc);
    ctxBtn.strokeText(text,xLoc,yLoc);
  }

  function writeHeaders(){
    ctxBtn.font = fontSize+"px Chela";
    fillAndStroke("Line Bet",lineBetDisplayX,lineBetTextY);
    fillAndStroke("Number",lineBetDisplayX,numLinesTextY1);
    fillAndStroke("of Lines",lineBetDisplayX,numLinesTextY2);
    fillAndStroke("Auto Play",rightBtnTextX,autoPlayTextY);
    fillAndStroke("Max Bet",rightBtnTextX,maxBetTextY);
    ctxBtn.font = fontSize*2+"px Chela";
    fillAndStroke("Spin",spinBtnTextX,spinBtnTextY);

    displayNumLines();
    displayLineBet();
    displayAutoGames();
  }

  function displayNumLines(){
    ctxBtn.font = fontSize*2+"px Chela";
    ctxBtn.clearRect(lineBetDisplayX-fontSize,NumLinesYLoc-fontSize,2*fontSize,2*fontSize);
    fillAndStroke(numLines,lineBetDisplayX,NumLinesYLoc+fontSize*.75);
  }

  function displayLineBet(){
    ctxBtn.font = fontSize*2+"px Chela";
    ctxBtn.clearRect(lineBetDisplayX-1.5*fontSize,lineBetYLoc-fontSize,3*fontSize,2*fontSize);
    fillAndStroke(betPerLine,lineBetDisplayX,lineBetYLoc+fontSize*.75)
  }

  function displayAutoGames(){
    ctxBtn.font = fontSize*2+"px Chela";
    ctxBtn.clearRect(rightBtnTextX-fontSize,autoPlayTextY-3*fontSize,3*fontSize,1.5*fontSize);
    fillAndStroke(numAutoGames,rightBtnTextX,autoPlayTextY-fontSize*1.8)
  }

  return{
    writeHeaders: writeHeaders,
    displayNumLines: displayNumLines,
    displayLineBet: displayLineBet,
    displayAutoGames: displayAutoGames
  }

})();

canvasButtons.addEventListener('mousedown', function(evt){
  let mousePos = getMousePos(canvasButtons,evt);
  if(isInside(mousePos,imgLocs[0])){
    decLineBet();
    writeText.displayLineBet();
    displayBet();
  }else if(isInside(mousePos,imgLocs[1])){
    incLineBet()
    writeText.displayLineBet();
    displayBet();
  }else if(isInside(mousePos,imgLocs[2])){
    decNumLines();
    writeText.displayNumLines();
    displayBet();
  }else if(isInside(mousePos,imgLocs[3])){
    incNumLines();
    writeText.displayNumLines();
    displayBet();
  }else if(isInside(mousePos,imgLocs[4])){
    decNumAutoGames()
    writeText.displayAutoGames();
    displayBet();
  }else if(isInside(mousePos,imgLocs[5])){
    incNumAutoGames()
    writeText.displayAutoGames(numAutoGames);
    displayBet();
  }else if(isInside(mousePos,imgLocs[6])){
    spinSlots();
  }else if(isInside(mousePos,imgLocs[7])&&totalBet*numAutoGames<=balance){
    autoPlay();
  }else if(isInside(mousePos,imgLocs[8])){
    setMaxBet();
    writeText.displayNumLines();
    writeText.displayLineBet();
  }
},false);
