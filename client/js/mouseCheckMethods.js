    var checkMouseForCards = function(x, y){
        cardPointer=-1;
        for(var i=10; i<cardWidth*kartis.length+10; i+=cardWidth){
            if(i==cardWidth*(kartis.length-1)+10){
                if(x>=i && x<i+lastCardWidth && y>=cardY && y<cardY+100){
                    cardPointer=Math.floor((i-10)/cardWidth);
                }
            }
            else{
                if(x>=i && x<i+cardWidth && y>=cardY && y<cardY+100){
                    cardPointer=Math.floor((i-10)/cardWidth);
                }
            }
        }

    }
    
    var checkMouseForTableCards = function(x, y){
        cardPointerTable=-1;
        if(kauj){
            if(varPadotTalak){
                for(var i=10; i<cardOffsetX*(galds.length+1)+10; i+=cardOffsetX){
                        if(x>=i && x<i+lastCardWidth && y>=tableCardY && y<tableCardY+100){
                            cardPointerTable=Math.floor((i-10)/cardOffsetX);
                        }
                }
            }
            else{
                for(var i=10; i<cardOffsetX*galds.length+10; i+=cardOffsetX){
                        if(x>=i && x<i+lastCardWidth && y>=tableCardY && y<tableCardY+100){
                            cardPointerTable=Math.floor((i-10)/cardOffsetX);
                        }
                }
            }
        }
    }
    
    var checkMouseForTable = function(x, y){
        tablePointer=false;
        if(x>=tableX && x<tableX+tableW && y>=tableY && y<tableY+tableH)
            tablePointer=true;
    }
    
    var checkMouseForButton = function(x, y){
        buttonPointer=false;
        if(x>=btnX && x<btnX+btnW && y>=btnY && y<btnY+btnH)
            buttonPointer=true;
    }
    
    var checkClick = function(){
        if(gajiens){
            if(cardPointer != -1){//ja karts ir izveleta
                var addSelectedCard=true;
                
                //Parbauda vai vienu karti neizvelas divreiz
                for(var i=0; i<selectedCards.length; i++){
                    if(selectedCards[i]==cardPointer){
                        console.log('** Card ' + selectedCards[i] + ' already selected **')
                        addSelectedCard=false;
                        break;
                    }
                }
                //parbauda vai tadu karti var dot (vai vertiba ir tada pasha ka iepriekshejai izveletajai)
                if(selectedCards.length>0 && addSelectedCard){
                    if(kartis[selectedCards[selectedCards.length-1]].vertiba != kartis[cardPointer].vertiba){
                        addSelectedCard=false;
                        console.log('** Cant go with card which has different value **');
                    }
                }
                
                if(addSelectedCard)
                    selectedCards.push(cardPointer);
                //console.log(selectedCards);
            }
            else if(tablePointer){
                go();
            }
        }
        else if(kauj){
            if(cardPointer != -1){//ja karts ir izveleta
                var addSelectedCard=true;
                
                //Parbauda vai vienu karti neizvelas divreiz
                for(var i=0; i<selectedCards.length; i++){
                    if(selectedCards[i]==cardPointer){
                        console.log('** Card ' + selectedCards[i] + ' already selected **')
                        addSelectedCard=false;
                        break;
                    }
                }
                //parbauda vai tadu karti var dot (vai vertiba ir tada pasha ka iepriekshejai izveletajai)
                if(selectedCards.length>0 && addSelectedCard){
                    if(kartis[selectedCards[selectedCards.length-1]].vertiba != kartis[cardPointer].vertiba){
                        addSelectedCard=false;
                        console.log('** Cant go with card which has different value **');
                    }
                }
                if(addSelectedCard)
                    selectedCards.push(cardPointer);
            }
            else if(cardPointerTable != -1){//ja uzspiezh kartij uz galda
                
                //ja zime vienada tad parbauda vai kavas karts vertiba ir lielaka
                //ja zime nav vienada tad parbauda vai kavas karts zime ir trumpis
                if(selectedCards.length==1){
                    if(cardPointerTable<galds.length){
                            if(galds[cardPointerTable].zime == kartis[selectedCards[0]].zime){//ja kartim ir vienadas zimes
                                if(getVertiba(kartis[selectedCards[0]].vertiba) > getVertiba(galds[cardPointerTable].vertiba)){
                                    kautKarti(galds[cardPointerTable], kartis[selectedCards[0]]);
                                    selectedCards=[];
                                }
                                else{
                                    console.log("** Nevar kaut ar mazakas vertibas karti **");
                                    selectedCards=[];
                                }
                            }
                            else{//ja kartim nav vienadas zimes
                                if(kartis[selectedCards[0]].zime == trumpjaZime){//parbauda vai kauj ar trumpi
                                    kautKarti(galds[cardPointerTable], kartis[selectedCards[0]]);
                                    selectedCards=[];
                                }
                                else{
                                    console.log("** Nevar kaut ar shadu karti **");
                                    selectedCards=[];
                                }
                            }

                    }
                    else{
                        //ja karti ieliek padoshanas ailee
                        var turpinat=true;
                        for(var i=0; i<galds.length; i++){//parbauda vai visas kartis uz galda ir ar tadu pashu vertibu ka kartij ar kuru padod talak
                            if(galds[i].vertiba != kartis[selectedCards[0]].vertiba){
                                turpinat=false;
                                break;
                            }
                        }
                        if(turpinat){
                            //console.log("TAGAD PADOD TALAK");
                            padotTalak([kartis[selectedCards[0]]]);
                            selectedCards=[];
                            

                        }
                        else{
                            console.log("** Nevar padot talak ar shadu karti **");
                            selectedCards=[];
                        }
                        
                    }

                }
                else{//ja izveletas vairakas kartis
                    if(cardPointerTable<galds.length){
                        console.log("** Nevar kaut ar vairakam kartim vienlaicigi **");
                        selectedCards=[];
                    }
                    else{//ja padoshanas ailee ieliek vairakas kartis vienalaicigi
                    
                        var turpinat=true;
                        for(var i=0; i<galds.length; i++){//parbauda vai visas kartis uz galda ir ar tadu pashu vertibu ka kartis ar kuraam padod talak
                            for(var j=0; j<selectedCards.length; j++){
                                if(galds[i].vertiba != kartis[selectedCards[j]].vertiba){
                                    turpinat=false;
                                    break;
                                }
                            }
                        }
                        if(turpinat){
                            var kartis_tmp=[];
                            for(var i=0; i<selectedCards.length; i++){
                                kartis_tmp.push(kartis[selectedCards[i]]);
                            }
                            padotTalak(kartis_tmp);
                            selectedCards=[];
                        }
                        else{
                            console.log("** Nevar padot talak ar shadam kartim **");
                            selectedCards=[];
                        }
                    
                    }
                }
            }
            else if(buttonPointer){
                //Ja pacelj kartis
                paceltKartis();
            }
        
        }
        else if(piemet){//ja piemeshanas (skatishanaas) rezhiimaa
            if(cardPointer != -1){//ja karts ir izveleta
                var addSelectedCard=true;
                
                //Parbauda vai vienu karti neizvelas divreiz
                for(var i=0; i<selectedCards.length; i++){
                    if(selectedCards[i]==cardPointer){
                        console.log('** Card ' + selectedCards[i] + ' already selected **')
                        addSelectedCard=false;
                        break;
                    }
                }
                //parbauda vai tadu karti var dot (vai vertiba ir tada pasha ka iepriekshejai izveletajai)
                if(selectedCards.length>0 && addSelectedCard){
                    if(kartis[selectedCards[selectedCards.length-1]].vertiba != kartis[cardPointer].vertiba){
                        addSelectedCard=false;
                        console.log('** Cant go with card which has different value **');
                    }
                }
                
                if(addSelectedCard)
                    selectedCards.push(cardPointer);
            }
            else if(tablePointer){
                piemest();
            }
            else if(buttonPointer){
                //ja vairs nemet kartis
                socket.emit('beigtGajienu');
            }
        }
    }
    
    function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }

    canvas.addEventListener('mousemove', function(evt) {
        var mousePos = getMousePos(canvas, evt);
        //var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
        checkMouseForCards(mousePos.x, mousePos.y);
        checkMouseForTableCards(mousePos.x, mousePos.y);
        checkMouseForTable(mousePos.x, mousePos.y);
        checkMouseForButton(mousePos.x, mousePos.y);

    }, false);
        
    canvas.addEventListener('click', function(evt) {
        //console.log('mouse clicked');
        checkClick();
    }, false);