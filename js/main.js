var suit = [ "C", "D", "H", "S"];
var cardImg;
var iniMoney = 1000;
var wager;
var step = 0;
var times = 0;
var over = 0;
var hide = false;
var currentTurn = "player";
//結果次數
var wintime = 0;
var losetime = 0;
var pushtime = 0;
var blackjacktime = 0;
var winpercentage = 0;
var losepercentage = 0;
var pushpercentage = 0;
var blackjackpercentage = 0;
//player
var playerMoney = 1000;
var playerPoint = 0;
var playcard = new Array(5);
var playcardnumberarray = new Array(5);
var playcardnumber = 0;
var playerhaveA = false;
var playerdo = "start";
//player1
var playerPoint1 = 0;
var playcard1 = new Array(5);
var playcardnumber1 = 0;
var player1bust = false;
//player2
var playerPoint2 = 0;
var playcard2 = new Array(5);
var playcardnumber2 = 0;
var player2bust = false;
//dealer
var dealerPoint = 0;
var displayDealerPoint = 0;
var dealcard = new Array(5);
var dealcardnumber = 0;
var dealerhaveA = false;
//sleep
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))
var s = 1000;
//mode
var cheatmode = false;
var splitmode = false;



function start(){
    var dealButton = document.getElementById("deal");
    var hitButton = document.getElementById("hit");
    var standButton = document.getElementById("stand");
    var doubleButton = document.getElementById("double");
    var splitBotton = document.getElementById("split");
    var surrenderButton = document.getElementById("surrender");
    var exitButton = document.getElementById("exit");
    var beticon_50 = document.getElementById("chip50");
    var beticon_100 = document.getElementById("chip100");
    var beticon_200 = document.getElementById("chip200");
    dealButton.addEventListener("click", deal, false);
    hitButton.addEventListener("click", hit, false);
    standButton.addEventListener("click", stand, false);
    doubleButton.addEventListener("click", double, false);
    splitBotton.addEventListener("click", split, false);
    surrenderButton.addEventListener("click", surrender, false);
    exitButton.addEventListener("click", clickexit, false);
    beticon_50.addEventListener("click", setbet50, false);
    beticon_100.addEventListener("click", setbet100, false);
    beticon_200.addEventListener("click", setbet200, false);
    document.getElementById("scoreboard").innerHTML = scoreboard;
}

//設定賭注
function setbet50(){
    wager = 50;
    document.getElementById("wager").value = wager;
}
function setbet100(){
    wager = 100;
    document.getElementById("wager").value = wager;
}
function setbet200(){
    wager = 200;
    document.getElementById("wager").value = wager;
}
 //離開遊戲
function clickexit(){
    gameover();
}

//初始化
function inti(){
    playcardnumber = 0;
    dealcardnumber = 0;
    playerPoint = 0;
    dealerPoint = 0;
    playcardnumber1 = 0;
    playcardnumber2 = 0;
    playerPoint1 = 0;
    playerPoint2 = 0;
    player1bust = false;
    player2bust = false;
    splitmode = false;
}

window.addEventListener( "load", start, false );