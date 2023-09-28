/*deal--------------------*/
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

/*hit-----------------------*/
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

/*stand-------------------------*/
function stand(){
   playerdo = "stand";
   hide = false;
   while(dealerPoint < 17){
      var dealerArea = document.getElementById("dealerArea");
      addcard(dealerArea);
   }
   bigger();
}

/*double-----------------------*/
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

/*surrender---------------------*/
function surrender(){
   playerdo = "surrender";
   wager /= 2;
   losetime++;
   playerMoney -= parseInt(wager);
   updateStepTable();
   result("<p>Surrender！</p>");
}

/*Split------------------------*/
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

