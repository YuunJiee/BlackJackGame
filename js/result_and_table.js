//結果種類
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

/*結果顯示-----------------------------*/
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

/*這局結束--------------------------*/
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

/*關閉按鈕----------------------------*/
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

/*清空桌面與分數---------------------------*/
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

/*檢查是否還有錢------------------------*/
function checkMoney(){
   if(playerMoney <= 25){
      document.body.style.backgroundColor = "#728d81";
      document.getElementById("result").innerHTML = "<button id='gameover' class='btn'>Game Over</button>";
      return 1;
   }
   return 0;
}

/*結束這次遊戲-----------------------*/
function gameover(){
   location.reload();
}

/*更新步驟表格----------------------*/
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
/*更新勝率-------------------------*/
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