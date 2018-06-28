    var drawTableBorder = function(x,y,w,h,counter,cardsSelected){
        ctx.fillStyle="#000000";
        if(cardsSelected)
            ctx.lineWidth = counter;
        else
            ctx.lineWidth = 1;
        ctx.strokeRect(x,y,w,h);
        ctx.lineWidth = 1;
    }
    var drawTableCardBorder = function(counter){
            ctx.fillStyle="#000000";
            ctx.lineWidth = counter;
            if(varPadotTalak){
                for(var i=0; i<galds.length+1; i++){
                        ctx.strokeRect(10+i*cardOffsetX-3,tableCardY-3,lastCardWidth+6,100+6);
                }
            }
            else{
                for(var i=0; i<galds.length; i++){
                    if(galds2[i].zime==null)
                        ctx.strokeRect(10+i*cardOffsetX-3,tableCardY-3,lastCardWidth+6,100+6);
                }
            }
            ctx.lineWidth = 1;

    }
    var drawSpeletaji = function(){
        ctx.fillStyle="#000000";
        
        ctx.lineWidth = 1;
        for(var i=0; i<speletaji.length; i++){
            ctx.font='bold 12px Arial';
            ctx.fillText(speletaji[i][0], 10+i*120, 40);
            ctx.font='12px Arial';
            ctx.fillText(speletaji[i][1] + ' kartis', 10+i*120, 56);
            ctx.font='italic 12px Arial';
            if(speletaji[i][2]==0){
                ctx.fillText('Skatas', 10+i*120, 72);
            }
            else if(speletaji[i][2]==1){
                ctx.fillText('Iet', 10+i*120, 72);
            }
            else if(speletaji[i][2]==2){
                ctx.fillText('Kauj', 10+i*120, 72);
            }
            else{
                ctx.fillText('Beidzis speli', 10+i*120, 72);
            }
        }
    }
    var drawKava = function(x,y,w,h,r,kavasKarsuSkaits){
            ctx.font='14px Arial';
            ctx.fillStyle="#000000";
            ctx.fillText('Kartis: ' + kavasKarsuSkaits, x, y-32);
            ctx.fillText('Trumpis:', x, y-16);
            if(trumpjaZime=='Ercens'){
                ctx.fillStyle="#FF0000";
                ctx.fillText('♥', x+60, y-16);
            }
            else if(trumpjaZime=='Kreicis'){
                ctx.fillStyle="#000000";
                ctx.fillText('♣', x+60, y-16);
            }
            else if(trumpjaZime=='Karavs'){
                ctx.fillStyle="#FF0000";
                ctx.fillText('♦', x+60, y-16);
            }
            else if(trumpjaZime=='Pikis'){
                ctx.fillStyle="#000000";
                ctx.fillText('♠', x+60, y-16);
            }
            
        if(kavasKarsuSkaits==1){
            ctx.font='20px Arial';
            if(trumpjaZime=='Ercens'){
                ctx.fillStyle="#FF0000";
                ctx.fillText('♥', x+cardWidth/8, y+35);
            }
            else if(trumpjaZime=='Kreicis'){
                ctx.fillStyle="#000000";
                ctx.fillText('♣', x+cardWidth/8, y+35);
            }
            else if(trumpjaZime=='Karavs'){
                ctx.fillStyle="#FF0000";
                ctx.fillText('♦', x+cardWidth/8, y+35);
            }
            else if(trumpjaZime=='Pikis'){
                ctx.fillStyle="#000000";
                ctx.fillText('♠', x+cardWidth/8, y+35);
            }
            ctx.fillText(trumpjaVertiba, x+cardWidth/8, y+20);
            
            ctx.fillStyle="#000000";
            ctx.beginPath();
            ctx.arc(x+r,y+r,r,Math.PI,1.5*Math.PI);
            ctx.moveTo(x+r,y);
            ctx.lineTo(x+w-r,y);

            ctx.arc(x+w-r,y+r,r,1.5*Math.PI,2*Math.PI);
            ctx.moveTo(x+w,y+r);
            ctx.lineTo(x+w,y+h-r);

            ctx.arc(x+w-r,y+h-r,r,0,0.5*Math.PI);
            ctx.moveTo(x+w-r,y+h);
            ctx.lineTo(x+r,y+h); 

            ctx.arc(x+r,y+h-r,r,0.5*Math.PI,Math.PI);
            ctx.moveTo(x,y+h-r);
            ctx.lineTo(x,y+r); 

            ctx.lineWidth = 1;
            ctx.stroke();
        }
        else if(kavasKarsuSkaits>1){
            ctx.font='20px Arial';
            if(trumpjaZime=='Ercens'){
                ctx.fillStyle="#FF0000";
                ctx.fillText('♥', x+cardWidth/8, y+35);
            }
            else if(trumpjaZime=='Kreicis'){
                ctx.fillStyle="#000000";
                ctx.fillText('♣', x+cardWidth/8, y+35);
            }
            else if(trumpjaZime=='Karavs'){
                ctx.fillStyle="#FF0000";
                ctx.fillText('♦', x+cardWidth/8, y+35);
            }
            else if(trumpjaZime=='Pikis'){
                ctx.fillStyle="#000000";
                ctx.fillText('♠', x+cardWidth/8, y+35);
            }
            ctx.fillText(trumpjaVertiba, x+cardWidth/8, y+20);
            
            ctx.fillStyle="#000000";
            ctx.beginPath();
            ctx.arc(x+r,y+r,r,Math.PI,1.5*Math.PI);
            ctx.moveTo(x+r,y);
            ctx.lineTo(x+w-r,y);

        
            ctx.arc(x+w-r,y+r,r,1.5*Math.PI,2*Math.PI);
            ctx.moveTo(x+w,y+r);
            ctx.lineTo(x+w,y+h/2);

            ctx.moveTo(x,y+h/2);
            ctx.lineTo(x,y+r); 

            ctx.lineWidth = 1;
            ctx.stroke();
            
            ctx.beginPath();
            ctx.arc(x+w/2-h/2+r,y+h/2+r,r,Math.PI,1.5*Math.PI);
            ctx.moveTo(x+w/2-h/2+r,y+h/2);
            ctx.lineTo(x+w/2+h/2-r,y+h/2);
            
            ctx.arc(x+w/2+h/2-r,y+h/2+r,r,1.5*Math.PI,2*Math.PI);
            ctx.moveTo(x+w/2+h/2,y+h/2+r);
            ctx.lineTo(x+w/2+h/2,y+h/2+w-r);
            
            ctx.arc(x+w/2+h/2-r,y+h/2+w-r,r,0,0.5*Math.PI);
            ctx.moveTo(x+w/2+h/2-r,y+h/2+w);
            ctx.lineTo(x+w/2-h/2+r,y+h/2+w);
            
            ctx.arc(x+w/2-h/2+r,y+h/2+w-r,r,0.5*Math.PI,Math.PI);
            ctx.moveTo(x+w/2-h/2,y+h/2+w-r);
            ctx.lineTo(x+w/2-h/2,y+h/2+r); 
            
            ctx.lineWidth = 1;
            ctx.stroke();
        }
    }
    var drawCardOnTable = function(x,y,w,h,r, irKartsVirsu){
        if(irKartsVirsu){
            ctx.beginPath();
            ctx.arc(x+r,y+r,r,Math.PI,1.5*Math.PI);
            ctx.moveTo(x+r,y);
            ctx.lineTo(x+w-r,y);

        
            ctx.arc(x+w-r,y+r,r,1.5*Math.PI,2*Math.PI);
            ctx.moveTo(x+w,y+r);
            ctx.lineTo(x+w,y+table2offsetY);

            ctx.moveTo(x+table2offsetX,y+h);
            ctx.lineTo(x+r,y+h); 

            ctx.arc(x+r,y+h-r,r,0.5*Math.PI,Math.PI);
            ctx.moveTo(x,y+h-r);
            ctx.lineTo(x,y+r); 

            ctx.lineWidth = 1;
            ctx.stroke();
        }
        else{
            ctx.beginPath();
            ctx.arc(x+r,y+r,r,Math.PI,1.5*Math.PI);
            ctx.moveTo(x+r,y);
            ctx.lineTo(x+w-r,y);

            ctx.arc(x+w-r,y+r,r,1.5*Math.PI,2*Math.PI);
            ctx.moveTo(x+w,y+r);
            ctx.lineTo(x+w,y+h-r);

            ctx.arc(x+w-r,y+h-r,r,0,0.5*Math.PI);
            ctx.moveTo(x+w-r,y+h);
            ctx.lineTo(x+r,y+h); 

            ctx.arc(x+r,y+h-r,r,0.5*Math.PI,Math.PI);
            ctx.moveTo(x,y+h-r);
            ctx.lineTo(x,y+r); 

            ctx.lineWidth = 1;
            ctx.stroke();
        }

    }
    
    var drawCard = function(x,y,w,h,r, lineWidth, drawingCardNum){
        var cardOffsetY2=15;
        ctx.beginPath();
        if(drawingCardNum<kartis.length-1){//ja karts kuru zime nav pedejaa
            if(drawingCardNum != cardPointer && drawingCardNum != cardPointer-1){//ja karts nav zem peles
                    ctx.arc(x+r,y+r,r,Math.PI,1.5*Math.PI);
                    ctx.moveTo(x+r,y);
                    ctx.lineTo(x+w+r,y);

                    ctx.moveTo(x+w+r,y+h);
                    ctx.lineTo(x+r,y+h); 

                    ctx.arc(x+r,y+h-r,r,0.5*Math.PI,Math.PI);
                    ctx.moveTo(x,y+h-r);
                    ctx.lineTo(x,y+r); 

                    ctx.lineWidth = lineWidth;
                    ctx.stroke();
            }
            else if(drawingCardNum == cardPointer){
                    ctx.arc(x+r,y+r,r,Math.PI,1.5*Math.PI);
                    ctx.moveTo(x+r,y);
                    ctx.lineTo(x+lastCardWidth-r,y);

        
                    ctx.arc(x-r+lastCardWidth,y+r,r,1.5*Math.PI,2*Math.PI);
                    ctx.moveTo(x+lastCardWidth,y+r);
                    ctx.lineTo(x+lastCardWidth,y+cardOffsetY2);

                    ctx.moveTo(x+w,y+h);
                    ctx.lineTo(x+r,y+h); 

                    ctx.arc(x+r,y+h-r,r,0.5*Math.PI,Math.PI);
                    ctx.moveTo(x,y+h-r);
                    ctx.lineTo(x,y+r); 

                    ctx.lineWidth = lineWidth;
                    ctx.stroke();
            }
            else if(drawingCardNum == cardPointer-1){
                if(cardPointer!=kartis.length-1){
                    ctx.arc(x+r,y+r,r,Math.PI,1.5*Math.PI);
                    ctx.moveTo(x+r,y);
                    ctx.lineTo(x+w,y);

                    ctx.moveTo(x+w+w+r,y+h);
                    ctx.lineTo(x+r,y+h); 

                    ctx.arc(x+r,y+h-r,r,0.5*Math.PI,Math.PI);
                    ctx.moveTo(x,y+h-r);
                    ctx.lineTo(x,y+r); 

                    ctx.lineWidth = lineWidth;
                    ctx.stroke();
                }
                else{
                    ctx.arc(x+r,y+r,r,Math.PI,1.5*Math.PI);
                    ctx.moveTo(x+r,y);
                    ctx.lineTo(x+w,y);
        
                    ctx.moveTo(x+lastCardWidth,y+h-cardOffsetY2);
                    ctx.lineTo(x+lastCardWidth,y+h-r); 
                    
                    ctx.arc(x+lastCardWidth-r,y+h-r,r,0,0.5*Math.PI);
                    ctx.moveTo(x+lastCardWidth-r,y+h);
                    ctx.lineTo(x+r,y+h); 

                    ctx.arc(x+r,y+h-r,r,0.5*Math.PI,Math.PI);
                    ctx.moveTo(x,y+h-r);
                    ctx.lineTo(x,y+r); 

                    ctx.lineWidth = lineWidth;
                    ctx.stroke();
                }
            }

        }
        else{
                    ctx.arc(x+r,y+r,r,Math.PI,1.5*Math.PI);
                    ctx.moveTo(x+r,y);
                    ctx.lineTo(x+lastCardWidth-r,y);

                    ctx.arc(x+lastCardWidth-r,y+r,r,1.5*Math.PI,2*Math.PI);
                    ctx.moveTo(x+lastCardWidth,y+r);
                    ctx.lineTo(x+lastCardWidth,y+h-r);

                    ctx.arc(x+lastCardWidth-r,y+h-r,r,0,0.5*Math.PI);
                    ctx.moveTo(x+lastCardWidth-r,y+h);
                    ctx.lineTo(x+r,y+h);

                    ctx.arc(x+r,y+h-r,r,0.5*Math.PI,Math.PI);
                    ctx.moveTo(x,y+h-r);
                    ctx.lineTo(x,y+r); 

                    ctx.lineWidth = lineWidth;
                    ctx.stroke();
        }

    }
    
    var drawButton = function(x,y,w,h,buttonPointer,text){
        ctx.font='16px Arial';
        if(buttonPointer){
            ctx.fillStyle="#000000";
            ctx.lineWidth = 3;
            ctx.strokeRect(x,y,w,h);
            ctx.fillText(text, x+10, y+20);
        }
        else{
            ctx.fillStyle="#000000";
            ctx.lineWidth = 1;
            ctx.strokeRect(x,y,w,h);
            
            ctx.fillText(text, x+10, y+20);
        }
    }
    
    var drawTable = function(){
        
        for(var i=0; i<galds.length; i++){
            if(galds2[i].zime==null)
                drawCardOnTable(10+i*cardOffsetX,tableCardY,lastCardWidth,100,5,false);
            else
                drawCardOnTable(10+i*cardOffsetX,tableCardY,lastCardWidth,100,5,true);
            
            if(galds[i].zime=='Ercens'){
                ctx.fillStyle="#FF0000";
                ctx.fillText('♥', 10+i*cardOffsetX+cardWidth/8, tableCardY+35);
            }
            else if(galds[i].zime=='Kreicis'){
                ctx.fillStyle="#000000";
                ctx.fillText('♣', 10+i*cardOffsetX+cardWidth/8, tableCardY+35);
            }
            else if(galds[i].zime=='Karavs'){
                ctx.fillStyle="#FF0000";
                ctx.fillText('♦', 10+i*cardOffsetX+cardWidth/8, tableCardY+35);
            }
            else if(galds[i].zime=='Pikis'){
                ctx.fillStyle="#000000";
                ctx.fillText('♠', 10+i*cardOffsetX+cardWidth/8, tableCardY+35);
            }
            ctx.fillText(galds[i].vertiba, 10+i*cardOffsetX+cardWidth/8, tableCardY+20);
        }
    }
    
    var drawTable2 = function(){
        for(var i=0; i<6; i++){
            //console.log('i: ' + i);
            if(galds2[i].zime != null){
            drawCardOnTable(10+i*cardOffsetX+table2offsetX,tableCardY+table2offsetY,lastCardWidth,100,5,false);
            
            if(galds2[i].zime=='Ercens'){
                ctx.fillStyle="#FF0000";
                ctx.fillText('♥', 10+i*cardOffsetX+cardWidth/8+table2offsetX, tableCardY+35+table2offsetY);
            }
            else if(galds2[i].zime=='Kreicis'){
                ctx.fillStyle="#000000";
                ctx.fillText('♣', 10+i*cardOffsetX+cardWidth/8+table2offsetX, tableCardY+35+table2offsetY);
            }
            else if(galds2[i].zime=='Karavs'){
                ctx.fillStyle="#FF0000";
                ctx.fillText('♦', 10+i*cardOffsetX+cardWidth/8+table2offsetX, tableCardY+35+table2offsetY);
            }
            else if(galds2[i].zime=='Pikis'){
                ctx.fillStyle="#000000";
                ctx.fillText('♠', 10+i*cardOffsetX+cardWidth/8+table2offsetX, tableCardY+35+table2offsetY);
            }
            ctx.fillText(galds2[i].vertiba, 10+i*cardOffsetX+cardWidth/8+table2offsetX, tableCardY+20+table2offsetY);
            }
        }
    }
    
    var drawCards = function(){
        cardWidth=25;
        var lineWidth=1;
        
        ctx.font='20px Arial';
        for(var i=0; i<kartis.length; i++){
        
            if(i==cardPointer)
                cardOffsetY=15;
            else
                cardOffsetY=0;

            if(kartis[i].zime=='Ercens'){
                ctx.fillStyle="#FF0000";
                ctx.fillText('♥', 10+i*cardWidth+cardWidth/8, cardY+35-cardOffsetY);
            }
            else if(kartis[i].zime=='Kreicis'){
                ctx.fillStyle="#000000";
                ctx.fillText('♣', 10+i*cardWidth+cardWidth/8, cardY+35-cardOffsetY);
            }
            else if(kartis[i].zime=='Karavs'){
                ctx.fillStyle="#FF0000";
                ctx.fillText('♦', 10+i*cardWidth+cardWidth/8, cardY+35-cardOffsetY);
            }
            else if(kartis[i].zime=='Pikis'){
                ctx.fillStyle="#000000";
                ctx.fillText('♠', 10+i*cardWidth+cardWidth/8, cardY+35-cardOffsetY);
            }

            ctx.fillText(kartis[i].vertiba, 10+i*cardWidth+cardWidth/8, cardY+20-cardOffsetY);
            drawCard(10+i*cardWidth,/*(i*40)+*/cardY-cardOffsetY,cardWidth,100,5,lineWidth,i);
        }
    }
    