"use strict";

// const cWidth = 800,
//   cHeight = 500,
//   cDisplayHeight = 150,
//   frameThickness = 5;

const cWidth = Math.floor(800),
  cHeight = Math.floor(cWidth*5/8),
  cDisplayHeight = Math.floor(cWidth*3/16),
  frameThickness = Math.floor(cWidth*1/160);

let numPics = 8;

const slotWidths = [Math.floor(cWidth/6),Math.floor(cWidth/7),Math.floor(cWidth/5),Math.floor(cWidth/7),Math.floor(cWidth/6)]
const slotFrames = slotWidths.map(width=>Math.floor(width*frameThickness/100));
const tileSizeArr = slotWidths.map(width=>Math.floor(width*(1-frameThickness/50)));
const nTilesPerCol = 3;
const numReels = slotWidths.length;

let balance = 50000;
let betPerLine = 50;
let numLines = 5;
let totalBet = betPerLine*numLines;

let numAutoGames = 0;
let auto = false;

let payoutSum = 0;
let payout = 0;

let finalBalance = balance+payoutSum;

//Slot properties
const numTilesFirstReel = 6;
const tileDif =6;
const speed = 50;
const a = 0.9;
const lines = [
  [1,1,1,1,1],
  [0,0,0,0,0],
  [2,2,2,2,2],
  [0,1,2,1,0],
  [2,1,0,1,2],
  [1,0,0,0,1],
  [1,2,2,2,1],
  [0,0,1,2,2],
  [2,2,1,0,0],
  [1,2,1,0,1],

  [1,0,1,2,1],
  [0,1,1,1,0],
  [2,1,1,1,2],
  [0,1,0,1,0],
  [2,1,2,1,2],
  [1,1,0,1,1],
  [1,1,2,1,1],
  [0,0,2,0,0],
  [2,2,0,2,2],
  [0,2,2,2,0],

  [2,0,0,0,2],
  [1,2,0,2,1],
  [1,0,2,0,1],
  [0,2,0,2,0],
  [2,0,2,0,2],
  [0,2,1,0,2],
  [2,0,1,2,0],
  [1,0,2,1,2],
  [0,2,1,2,0],
  [2,1,0,0,1],

  [0,1,2,2,1],
  [1,0,1,0,1],
  [1,2,1,2,1],
  [0,1,0,1,2],
  [2,1,2,0,0],
  [2,0,0,1,2],
  [1,2,2,0,0],
  [0,0,1,1,2],
  [2,2,0,1,0],
  [0,0,2,2,2],

  [2,2,0,0,0],
  [1,2,0,1,2],
  [1,0,2,1,0],
  [0,1,2,1,1],
  [2,1,0,2,1],
  [1,2,1,0,0],
  [1,0,1,2,2],
  [2,2,1,2,2],
  [0,0,1,0,0],
  [2,1,2,0,1],
];
const lineColors = [
  `rgb(255,0,0,${a})`,
  `rgb(0,255,0,${a})`,
  `rgb(0,0,255,${a})`,
  `rgb(255,255,0,${a})`,
  `rgb(255,0,255,${a})`,
  `rgb(0,255,255,${a})`,

  `rgb(255,155,0,${a})`,
  `rgb(155,255,0,${a})`,
  `rgb(155,0,255,${a})`,
  `rgb(255,255,155,${a})`,
  `rgb(255,155,255,${a})`,
  `rgb(155,255,255,${a})`,

  `rgb(255,0,155,${a})`,
  `rgb(0,255,155,${a})`,
  `rgb(0,155,255,${a})`,
  `rgb(255,155,155,${a})`,
  `rgb(155,255,155,${a})`,
  `rgb(155,155,255,${a})`,

  `rgb(255,155,200,${a})`,
  `rgb(155,255,200,${a})`,
  `rgb(155,200,255,${a})`,
  `rgb(255,200,155,${a})`,
  `rgb(200,255,155,${a})`,
  `rgb(200,155,255,${a})`,

  `rgb(55,0,155,${a})`,
  `rgb(0,55,155,${a})`,
  `rgb(0,155,55,${a})`,
  `rgb(55,155,155,${a})`,
  `rgb(155,55,155,${a})`,
  `rgb(155,155,55,${a})`,

  `rgb(255,0,0,${a})`,
  `rgb(0,255,0,${a})`,
  `rgb(0,0,255,${a})`,
  `rgb(255,255,0,${a})`,
  `rgb(255,0,255,${a})`,
  `rgb(0,255,255,${a})`,

  `rgb(255,155,0,${a})`,
  `rgb(155,255,0,${a})`,
  `rgb(155,0,255,${a})`,
  `rgb(255,255,155,${a})`,
  `rgb(255,155,255,${a})`,
  `rgb(155,255,255,${a})`,

  `rgb(255,0,155,${a})`,
  `rgb(0,255,155,${a})`,
  `rgb(0,155,255,${a})`,
  `rgb(255,155,155,${a})`,
  `rgb(155,255,155,${a})`,
  `rgb(155,155,255,${a})`,

  `rgb(255,155,200,${a})`,
  `rgb(155,255,200,${a})`,

];

const payouts = [
  [250,100,50,12,5,3,1,1],//Three in a row
  [500,250,120,50,25,10,5,2],
  [1000,500,250,100,50,25,10,4,2] //Five in a row
];

const tileProbs= [
  // [0,0,0,0,0],
  [10,30,30,30,10],
  [2,2,2,2,2],
  [10,10,10,10,10],
  [15,15,15,15,15],
  [20,20,20,20,20],
  [30,30,30,30,30],
  [40,40,40,40,40],
  [20,20,20,20,20],
  [10,10,10,20,30],
  [30,30,30,30,30]
];

let validTileNums = [];

//fills validTileNums to be used when randomly selecting outcome tiles
for(let i = 0; i<numReels; i++){
  validTileNums.push([tileProbs[0][i]]);
}
for(let i = 1; i<numPics; i++){
  for(let j = 0; j<numReels; j++){
    validTileNums[j].push(tileProbs[i][j]+validTileNums[j][i-1]);
  }
}
