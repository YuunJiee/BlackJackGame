/*加牌-------------------------*/
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

/*計算點數------------------------*/
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

/*檢查是否超過21點-------------------------*/
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

/*比大小-----------------------------*/
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

/*-----------------------------------*/
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