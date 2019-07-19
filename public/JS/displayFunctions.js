"use strict";

function setDisplay(ele, value){document.getElementById(ele).innerHTML = value;}

function displayBalance(){setDisplay('balance',balance);}
function displayUpdatingBalance(){setDisplay('balanceUpdating',balUpdating);}
function displayBet(){totalBet = numLines*betPerLine;setDisplay('betAmount', totalBet);}
function displayPayout(){setDisplay('payout',payoutSum);}

function displayAllBetInfo(){
  displayBalance();
  displayBet();
  displayPayout();
}

function setMaxBet(){
  betPerLine = 100;
  if(balance>5000){
    numLines = 50;
  }else if(balance>100){
    numLines = Math.floor(balance/betPerLine);
  }else if(balance>50){
    betPerLine=Math.floor(balance/numLines);
  }else{
   betPerLine = 1;
   numLines = balance;
  }
  totalBet = numLines*betPerLine;
  drawAllLines(numLines);
  displayAllBetInfo();
}

function incLineBet(){if(betPerLine<100){betPerLine+=1;}}
function decLineBet(){if(betPerLine>0){betPerLine-=1;}}

function incNumLines(){if(numLines<50){numLines+=1;drawAllLines(numLines);}}
function decNumLines(){if(numLines>1){numLines-=1;drawAllLines(numLines);}}

function setNumLines(num){
  numLines = num;
  totalBet = numLines*betPerLine
  displayAllBetInfo();
}

function incNumAutoGames(){
  if((numAutoGames+1)*totalBet<=balance){numAutoGames++;}
  else{console.log('not enough credit');}
}

function decNumAutoGames(){if(numAutoGames>0){numAutoGames--;}}

function updateBalance(){
  let rate = 8;
  var time = Date.now();
  payoutSum-=rate;
  balance+=rate;
  displayAllBetInfo();
  if(payoutSum>0){
    window.requestAnimationFrame(function(time){
      updateBalance();
    });
  }else{
    payoutSum = 0;
    balance = finalBalance;
    displayAllBetInfo();
  }
}
