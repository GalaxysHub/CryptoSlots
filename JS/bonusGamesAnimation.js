"use strict"
var canvasPopOutAnimations = document.getElementById('popOutAnimations');

var bonusAnimationPics = ['fork.png','sock-puppet.jpg','trashcan.png'];
var bonusCutSceneImgs = {};

var numBonusTiles = 5;
var bonusTilesPics1 = [];
var bonusTilesImg1 = {};
var bonusTilesPics2 = [];
var bonusTilesImg2 = {};
const bonusTilesLoc1 = './Pictures/bonus1/';
const bonusCutSceneLoc = './Pictures/bonusCutScene/';

for(let i = 0; i<numBonusTiles; i++){
  bonusTilesPics1[i] = 'bonusTile'+i+'.png';
  bonusTilesPics2[i] = 'bonusTile'+i+'.png';
}

if(canvasPopOutAnimations.getContext){
  canvasPopOutAnimations.width = cWidth;
  canvasPopOutAnimations.height = cHeight;

  // var ctxScreen = canvasScreen.getContext('2d');
  var ctxAnimate = canvasPopOutAnimations.getContext('2d');
  // ctxScreen.globalCompositionOperation = 'source-over';
  ctxAnimate.globalCompositionOperation = 'source-over';

  var cutScenePicsArr = returnPromiseImgArr(bonusAnimationPics,bonusCutSceneImgs,bonusCutSceneLoc);
  var bonusImgsPromArr = returnPromiseImgArr(bonusTilesPics1,bonusTilesImg1,bonusTilesLoc1);

  Promise.all([cutScenePicsArr,bonusImgsPromArr].map(Promise.all, Promise)).then(console.log('bonus images loaded'));

}

canvasPopOutAnimations.style.zIndex = 1;
function bonusGameAnimation(){
  var sockW = cWidth*.3;
  var sockH = cHeight*.6;
  var sockXLoc = cWidth*.5;
  var sockYLoc = cHeight*.5-sockH/2;

  var forkW = cWidth*.3;
  var forkH = forkW*.2
  var forkXLoc = cWidth*.5;
  var forkYLoc = cHeight*.66;

  var trashW = cWidth*.2;
  var trashH = trashW*1.8;
  var trashXLoc = cWidth*.1;
  var trashYLoc = cHeight*.5-trashH/2;

  tileTest = new tile(bonusTilesImg1['bonusTile1'],50,50,50,50);

  ctxAnimate.save();
  ctxAnimate.translate(forkXLoc+forkW/2,forkYLoc+forkH/2);
  ctxAnimate.rotate(Math.PI*9/8);
  ctxAnimate.drawImage(bonusCutSceneImgs['fork'],0,0,forkW,forkH);
  ctxAnimate.restore();
  // canvasPopOutAnimations.style.zIndex = -1;
  ctxAnimate.drawImage(bonusCutSceneImgs['sock-puppet'],sockXLoc,sockYLoc,sockW,sockH);

  ctxAnimate.drawImage(bonusCutSceneImgs['trashcan'],trashXLoc,trashYLoc,trashW,trashH);
  ctxAnimate.drawImage(bonusTilesImg1['bonusTile1'],trashXLoc,trashYLoc,trashW/2,trashH/2);
}

function tile(image,x,y,len,height){
  this.img = image;
  this.length = len;
  this.height = height;
  this.x = x;
  this.y = y;
  this.draw = function(){
    ctxAnimate.drawImage(this.img,this.x,this.y,this.length,this.height);
  }
}

var bonus = false;
var cachedImages, cachedPicLen;
function startBonusGame(){
  // canvasScreen.style.zIndex = 99;
  gameNum = 0;
  bonus = true;
  cachedImages = loadedImages;
  cachedPicLen = numPics;
  loadedImages = bonusTilesImg1;
  numPics = bonusTilesPics1.length;
  autoPlay();
}

function endBonusGame(){
  // canvasScreen.style.zIndex = -10;
  bonus = false;
  numPics = cachedPicLen;
  loadedImages = cachedImages;
  createOutcome();
  drawFinalOutcome();
}

function bonusGame(){
  numAutoGames = 2;
  startBonusGame();
}
