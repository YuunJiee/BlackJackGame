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
//result
var ending_1 = [  "<p>You Bust</p>", 
                  "<p>You Win</p>",
                  "<p>BlackJack!</p>",
                  "<p>Push!</p>",
                  "<p>You Lose</p>",
                  "<p>One Bust<br>You can hit/stant to another</p>",
                  "<p>One Win</p>",
                  "<p>One Push,one Lose</p>",
                  "<p>You Win<br>Dealer Bust</p>"
                  ]
//本局勝率紀錄
var scoreboard = "<table><thead><th>Result</th><th>Times</th><th>Percentage</th></thead>"+
                  "<tbody><tr><td>Win</td><td>"+wintime+"</td><td>"+winpercentage+"</td></tr>"+
                  "<tr><td>Lose</td><td>"+losetime+"</td><td>"+losepercentage+"</td></tr>"+
                  "<tr><td>Push</td><td>"+pushtime+"</td><td>"+pushpercentage+"</td></tr>"+
                  "<tr><td>BlackJcak</td><td>"+blackjacktime+"</td><td>"+blackjackpercentage+"</td></tr></tbody>"
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

//開局,給玩家與莊家各2張牌
function deal(){
   playerdo = "deal";
   times++;
   document.getElementById("playerArea").innerHTML = "";
   document.getElementById("dealerArea").innerHTML = "";
   document.getElementById("result").innerHTML = "";
   var beticon_50 = document.getElementById("chip50");
   var beticon_100 = document.getElementById("chip100");
   var beticon_200 = document.getElementById("chip200");
   beticon_50.style.opacity = 0;
   beticon_100.style.opacity = 0;
   beticon_200.style.opacity = 0;
   if(times == 1){
      var cheat = document.getElementById("Mode-switch");
      if(cheat.checked){
         cheatmode = true;
      }
      cheat.disabled = true;
   }
   var wagerinput = document.getElementById("wager");
   wager = wagerinput.value;
   //檢查是否為剛開局
   if(times > 1 && wager <= playerMoney){
      clear();
   }
   var playerArea = document.getElementById("playerArea");
   var dealerArea = document.getElementById("dealerArea");
   document.getElementById("result").innerHTML = "";
   if(wager > playerMoney){
      times--;
      result("<p>Bet can't exceed your cash</p>");
   }else{
      var dealButton = document.getElementById("deal");
      var hitButton = document.getElementById("hit");
      var standButton = document.getElementById("stand");
      var doubleButton = document.getElementById("double");
      var surrenderButton = document.getElementById("surrender");
      inti();
      document.getElementById("dealerPoint").innerHTML = dealerPoint;
      document.getElementById("playerPoint").innerHTML = playerPoint;
      dealButton.disabled = true;
      
      const dealanimation = async () => {
         addcard(playerArea);
         await sleep(s)
         addcard(dealerArea);
         await sleep(s)
         addcard(playerArea);
         hide = true;
         await sleep(s)
         addcard(dealerArea);
         await sleep(s+300);
         if(playerPoint != 21){
            hitButton.disabled = false;
            standButton.disabled = false;
            surrenderButton.disabled = false;
            doubleButton.disabled = false;
            if(playcardnumberarray[0] == playcardnumberarray[1] && step <=3){
               var splitBotton = document.getElementById("split");
               splitBotton.disabled = false;
            }
            if(wager*2 > playerMoney){
               var splitBotton = document.getElementById("split");
               doubleButton.disabled = true;
               splitBotton.disabled = true;
            }
         }
         updateStepTable();
      }
      dealanimation();
   }
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

//hit
function hit(){
   playerdo = "hit";
   var splitButton = document.getElementById("split");
   var doubleButton = document.getElementById("double");
   splitButton.disabled = true;
   doubleButton.disabled = true;
   if(splitmode == true && player1bust == false && player2bust == false){
      var playerArea1 = document.getElementById("playerArea1");
      addcard(playerArea1);
      var playerArea2 = document.getElementById("playerArea2");
      addcard(playerArea2);
      updateStepTable();
   }else if(splitmode == true && player1bust == true && player2bust == false){
      var playerArea2 = document.getElementById("playerArea2");
      addcard(playerArea2);
      updateStepTable();
   }else if(splitmode == true && player2bust == true && player1bust == false){
      var playerArea1 = document.getElementById("playerArea1");
      addcard(playerArea1);
      updateStepTable();
   }else{
      var playerArea = document.getElementById("playerArea");
      addcard(playerArea);
      updateStepTable();
   }
}

//stand
function stand(){
   playerdo = "stand";
   hide = false;
   while(dealerPoint < 17){
      var dealerArea = document.getElementById("dealerArea");
      addcard(dealerArea);
   }
   bigger();
}

//double
function double(){
   playerdo = "double";
   wager *= 2;
   document.getElementById("wager").value = wager;
   var playerArea = document.getElementById("playerArea");
   addcard(playerArea);
   var doubleButton = document.getElementById("double");
   doubleButton.disabled = true;
   updateStepTable();
}

//surrender
function surrender(){
   playerdo = "surrender";
   wager /= 2;
   losetime++;
   playerMoney -= parseInt(wager);
   updateStepTable();
   result("<p>Surrender！</p>");
}
//Split
function split(){
   playerdo = "split";
   splitmode = true;
   var playerArea = document.getElementById("playerArea");
   playerArea.innerHTML="<div id='playerArea1'></div><div id='playerArea2'></div>";
   var playerArea1 = document.getElementById("playerArea1");
   var playerArea2 = document.getElementById("playerArea2");
   playcard[0].setAttribute("class","card card1");
   playerArea1.appendChild(playcard[0]);
   playcard1[playcardnumber1] = playcard[0];
   playcard[1].setAttribute("class","card card2");
   playcard[1].setAttribute("id","playercard0");
   playerArea2.appendChild(playcard[1]);
   playcard2[playcardnumber2] = playcard[1];
   playcardnumber1 = playcardnumber2 = 1;
   var playerPointArea = document.getElementById("playerPoint");
   playerPointArea.innerHTML="<div id='playerPoint1'></div><div id='playerPoint2'></div>";
   var playerPoint1Area = document.getElementById("playerPoint1");
   var playerPoint2Area = document.getElementById("playerPoint2");
   if(playerPoint == 12){
      playerPoint1 = playerPoint2 = 11;
   }else{
      playerPoint1 = playerPoint/2;
      playerPoint2 = playerPoint/2;
   }
   playerPoint1Area.innerHTML = playerPoint1;
   playerPoint2Area.innerHTML = playerPoint2;
   wager *= 2;
   document.getElementById("wager").value = wager;
   var splitBotton = document.getElementById("split");
   var doubleBotton = document.getElementById("double");
   splitBotton.disabled = true;
   doubleBotton.disabled = true;
   addcard(playerArea1);
   addcard(playerArea2);
   updateStepTable();
}

//加牌
function addcard(Area){
   var numberindex;
   function setnumber(){
      numberindex = Math.floor(1 + Math.random()*13);
   }
   setnumber();
   if(cheatmode == true){
      if(Area == document.getElementById("playerArea")){
         while(numberindex+playerPoint == 21 || numberindex==1){
            setnumber();
         }
         if(dealcardnumber == 2){
            while(numberindex+playerPoint > dealerPoint && numberindex+playerPoint < 21){
               setnumber();
            }
         }
      }else{
         while(numberindex != 1 && (numberindex+dealerPoint <= playerPoint || numberindex+dealerPoint > 21)){
            setnumber();
         }
         if(dealerPoint == 10){
            numberindex = 1;
         }
         if(dealerPoint == 11){
            numberindex = Math.floor(10 + Math.random()*3);
         }
      }
   }
   /*測試split*/
   /*if(step < 3){
      numberindex = 10;
   }*/
   var suitindex = Math.floor(Math.random()*4);
   var card = document.createElement("img");
   var backcard = document.createElement("img");
   backcard.setAttribute("src", "cards/back.png");
   backcard.setAttribute("alt", "cardImage");
   backcard.setAttribute("id", "backcard");
   card.setAttribute("src", "cards/" + suit[suitindex] + numberindex + ".png");
   card.setAttribute("alt", "cardImage");
   card.setAttribute("class", "card");
   //將卡片存入陣列中
   if(Area == document.getElementById("playerArea")){
      playcard[playcardnumber] = card;
      playcardnumberarray[playcardnumber] = numberindex;
      card.setAttribute("id", "playercard"+playcardnumber);
      playcardnumber++;
   }else if(Area == document.getElementById("dealerArea")){
      dealcard[dealcardnumber] = card;
      card.setAttribute("id", "dealercard"+dealcardnumber);
      dealcardnumber++;
   }else if(Area == document.getElementById("playerArea1")){
      card.setAttribute("class", "card card1");
      card.setAttribute("id", "playercard"+playcardnumber1);
      playcard1[playcardnumber1] = card;
      playcardnumber1++;
   }else if(Area == document.getElementById("playerArea2")){
      card.setAttribute("class", "card card2");
      card.setAttribute("id", "playercard"+playcardnumber2);
      playcard2[playcardnumber2] = card;
      playcardnumber2++;
   }
   //判斷是否要隱藏卡片
   if(Area == document.getElementById("dealerArea") && hide == true){
      Area.appendChild(card);
      Area.appendChild(backcard);
   }else{
      Area.appendChild(card);
   }
   //若為J、Q、K，點數設為10
   if(numberindex > 10){
      numberindex = 10;
   }
   //計算點數
   countPoint(Area, numberindex);
}

//計算點數
function countPoint(Area, point){
   if(Area == document.getElementById("playerArea")){
      if(point == 1 && 11+playerPoint <= 21){
         playerPoint += 11;
      }else{
         playerPoint += point;
      }
      document.getElementById("playerPoint").innerHTML = playerPoint;
      step++;
   }else if(Area == document.getElementById("dealerArea")){
      if(point == 1 && 11+dealerPoint <= 21){
         dealerPoint += 11;
      }else{
         dealerPoint += point;
      }
      document.getElementById("dealerPoint").innerHTML = dealerPoint;
      if(hide == true){
         displayDealerPoint = dealerPoint - point;
         if(point == 1 && displayDealerPoint != 11){
            displayDealerPoint -= 10;
         }
         document.getElementById("dealerPoint").innerHTML = displayDealerPoint;
      }
      step++;
   }else if(Area == document.getElementById("playerArea1")){
      if(point == 1 && 11+playerPoint1 <= 21){
         playerPoint1 += 11;
      }else{
         playerPoint1 += point;
      }
      document.getElementById("playerPoint1").innerHTML = playerPoint1;
      step++;
   }else if(Area == document.getElementById("playerArea2")){
      if(point == 1 && 11+playerPoint2 <= 21){
         playerPoint2 += 11;
      }else{
         playerPoint2 += point;
      }
      document.getElementById("playerPoint2").innerHTML = playerPoint2;
      step++;
   }
   checkPoint();
}

//檢查是否超過21點
function checkPoint(){
   
   if(splitmode == true){
      if(playerPoint1 > 21 && playerPoint2 > 21){
         playerMoney -= parseInt(wager);
         losetime++;
         result(ending_1[0]);
      }else if((playerPoint1 > 21 && playerPoint2 <= 21) || (playerPoint2 > 21 && playerPoint1 <= 21)){
         playerMoney -= parseInt(wager/2);
         losetime++
         result(ending_1[5]);
      }else if((playerPoint1 == 21 && playcardnumber1 == 2 && playerPoint2 == 21 && playcardnumber2 == 2)||
               (playerPoint1 == 21 && playcardnumber1 == 2 && playerPoint2 < 21)||
               (playerPoint2 == 21 && playcardnumber2 == 2 && playerPoint1 < 21)){
         playerMoney += parseInt((wager/2)*1.5);
         blackjacktime++;
         result(ending_1[2]);
      }
   }else {
      if(playerPoint > 21){
         playerMoney -= parseInt(wager);
         losetime++;
         result(ending_1[0]);
      }else if(playerPoint == 21 && dealcardnumber == 21 && playcardnumber == 2 && dealcardnumber == 2){
         pushtime++;
         result(ending_1[3]);
      }else if(playerPoint == 21 && playcardnumber == 2 && dealcardnumber == 2){
         blackjacktime++
         playerMoney += parseInt(wager*1.5);
         result(ending_1[2]);
      }else if(playerPoint <= 21 && playcardnumber == 5){
         wintime++
         playerMoney += parseInt(wager*3);
         result(ending_1[1]);
      }else if(dealerPoint > 21){
         wintime++
         playerMoney += parseInt(wager);
         result(ending_1[8]);
      }
   }
}

//比大小
function bigger(){
   displayDealerPoint = dealerPoint;
   updateStepTable();
   if(splitmode == true){
      if((playerPoint1 < dealerPoint && playerPoint2 < dealerPoint && dealerPoint <= 21) ||
         (playerPoint1 > 21 && playerPoint2 < dealerPoint && dealerPoint <= 21) ||
         (playerPoint2 > 21 && playerPoint1 < dealerPoint && dealerPoint <= 21)) {
         playerMoney -= parseInt(wager);
         losetime++;
         result(ending_1[4]);
      }else if((playerPoint1 > dealerPoint && playerPoint2 <= dealerPoint && playerPoint1 <= 21) ||
               (playerPoint2 > dealerPoint && playerPoint1 <= dealerPoint && playerPoint2 <= 21)){
         playerMoney -= parseInt(wager/2);
         result(ending_1[6]);
      }else if((playerPoint1 == dealerPoint && playerPoint2 < dealerPoint && dealerPoint <= 21)||
               (playerPoint1 < dealerPoint && playerPoint2 == dealerPoint && dealerPoint <= 21)){
         playerMoney -= parseInt(wager/2);
         losetime++;
         result(ending_1[7]);
      }else if(playerPoint1 > dealerPoint && playerPoint2 > dealerPoint){
         wintime++
         result(ending_1[1]);
      }else if(playerPoint1 == dealerPoint && playerPoint2 == dealerPoint){
         pushtime++;
         result(ending_1[3]);
      }else if(dealerPoint > 21){
         wintime++;
         playerMoney += parseInt(wager);
         result(ending_1[8]);
      }else if((playerPoint1 > dealerPoint && playerPoint2 > 21 && playerPoint1 <= 21)||
               (playerPoint2 > dealerPoint && playerPoint1 > 21 && playerPoint2 <= 21)){
         playerMoney -= parseInt(wager/2);
         result(ending_1[6]);
      }
   }else{
      if(playerPoint < dealerPoint && dealerPoint <= 21){
         losetime++;
         playerMoney -= parseInt(wager);
         result(ending_1[4]);
      }
      if(playerPoint > dealerPoint){
         wintime++;
         playerMoney += parseInt(wager);
         result(ending_1[1]);
      }
      if(playerPoint == dealerPoint){
         pushtime++;
         result(ending_1[3]);
      }
   }
}

//翻牌
function opencard(){
   displayDealerPoint = dealerPoint;
   document.getElementById("dealerPoint").innerHTML = displayDealerPoint;
   var backcard = document.getElementById("backcard");
   var area = document.getElementById("dealerArea");
   if(document.getElementById("backcard")){
      area.removeChild(backcard);
   }
   var dealcard = document.getElementById("dealercard1");
   if(document.getElementById("dealercard1")){
      dealcard.style.opacity = 1;
   }
   
}
//結果顯示
function result(Winner){
   var result = document.getElementById("result");
   result.innerHTML = Winner;
   if(splitmode == true){
      if((Winner == ending_1[5] && playerPoint1 > 21)){
         player1bust = true;
         var el = document.querySelectorAll(".card1");
         for(var i=0; i<el.length; i++){
            el[i].setAttribute('class', 'card cardcannotuse');
         }
      }else if(Winner == ending_1[5] && playerPoint2 > 21){
         player2bust = true;
         var el = document.querySelectorAll(".card2");
         for(var i=0; i<el.length; i++){
            el[i].setAttribute('class', 'card cardcannotuse');
         }
      }else{
         player2bust = true;
         player2bust = true;
         var el = document.querySelectorAll(".cardcannotuse");
         for(var i=0; i<el.length; i++){
            el[i].setAttribute('class', 'card');
         }
         opencard();
         roundover();
         if(checkMoney() == 1){
            var gameoverButton = document.getElementById("gameover");
            gameoverButton.addEventListener("click", gameover, true);
            var dealButton = document.getElementById("deal");
            dealButton.disabled = true;
            var sideswitch = document.getElementById("side-switch");
            sideswitch.checked = true;
         }
      }
   }else{
      opencard();
      roundover();
      if(checkMoney() == 1){
         var gameoverButton = document.getElementById("gameover");
         gameoverButton.addEventListener("click", gameover, true);
         var dealButton = document.getElementById("deal");
         dealButton.disabled = true;
         var sideswitch = document.getElementById("side-switch");
         sideswitch.checked = true;
      }
   }
}

//這局結束
function roundover(){
   closebtn();
   updatescoreboard();
   document.getElementById("mymoney").innerHTML = playerMoney;
   hide = false;
   splitmode = false;
   var beticon_50 = document.getElementById("chip50");
   var beticon_100 = document.getElementById("chip100");
   var beticon_200 = document.getElementById("chip200");
   beticon_50.style.opacity = 1;
   beticon_100.style.opacity = 1;
   beticon_200.style.opacity = 1;
}

//關閉按鈕
function closebtn(){
   var dealButton = document.getElementById("deal");
   var hitButton = document.getElementById("hit");
   var standButton = document.getElementById("stand");
   var doubleButton = document.getElementById("double");
   var splitBotton = document.getElementById("split");
   var surrenderButton = document.getElementById("surrender");
   dealButton.disabled = false;
   hitButton.disabled = true;
   standButton.disabled = true;
   doubleButton.disabled = true;
   splitBotton.disabled = true;
   surrenderButton.disabled = true;
}

//清空桌面與分數
function clear(){
   playerPoint = 0;
   dealerPoint = 0;
   step = 0;
   table += "</table><table><caption>Round-"+times+"</caption>" +
         "<thead><th>Step</th><th>Player</th><th>Dealer</th></thead>";
   document.getElementById("playerArea").innerHTML = "";
   document.getElementById("dealerArea").innerHTML = "";
   document.getElementById("result").innerHTML = "";
}

//檢查是否還有錢
function checkMoney(){
   if(playerMoney <= 25){
      document.body.style.backgroundColor = "#728d81";
      document.getElementById("result").innerHTML = "<button id='gameover' class='btn'>Game Over</button>";
      return 1;
   }
   return 0;
}

//結束這次遊戲
function gameover(){
   location.reload();
}

//更新步驟表格
var table = "<table><caption>Round-1</caption>" + 
            "<thead><th>Step</th><th>Player</th><th>Dealer</th></thead>";
function updateStepTable(){
   if(splitmode == true || playerPoint1 != 0 || playerPoint2 != 0){
      table += "<tr><td>" + playerdo + "</td><td>" + playerPoint1+"/"+ playerPoint2 + "</td><td>" + displayDealerPoint + "</td></tr>";
   }else{
      table += "<tr><td>" + playerdo + "</td><td>" + playerPoint + "</td><td>" + displayDealerPoint + "</td></tr>";
   }
   document.getElementById("steptable").innerHTML = table+"</table>";
}
//更新勝率
function updatescoreboard(){
   winpercentage = ((wintime/times)*100).toFixed(2);
   losepercentage = ((losetime/times)*100).toFixed(2);
   pushpercentage = ((pushtime/times)*100).toFixed(2);
   blackjackpercentage = ((blackjacktime/times)*100).toFixed(2);
   var scoreboard = "<table><thead><th>Result</th><th>Times</th><th>Percentage</th></thead>"+
                  "<tbody><tr><td>Win</td><td>"+wintime+"</td><td>"+winpercentage+"</td></tr>"+
                  "<tr><td>Lose</td><td>"+losetime+"</td><td>"+losepercentage+"</td></tr>"+
                  "<tr><td>Push</td><td>"+pushtime+"</td><td>"+pushpercentage+"</td></tr>"+
                  "<tr><td>BlackJcak</td><td>"+blackjacktime+"</td><td>"+blackjackpercentage+"</td></tr></tbody>"
   document.getElementById("scoreboard").innerHTML = scoreboard;
}

window.addEventListener( "load", start, false );