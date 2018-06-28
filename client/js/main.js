    var canvas = document.getElementById("ctx");
    var ctx = canvas.getContext("2d");
    //ctx.font = '30 px Arial';
    var socket = io();
    var random = Math.random();
    
    var selectedCards=[];
    var speletaji=[];
    var kartis=[];
    var galds=[];
    var galds2=[];
    var cardPointer=-1;
    var cardPointerTable=-1;
    var cardOffsetY=15;
    var cardOffsetX = ((800-20)-150)/6;
    var cardY=450;
    var tableCardY=250;
    var counter1=2;
    var counterAdder1=1;
    var varPadotTalak=false;
    var speleSakta=false;
    
    var cardWidth=20;
    var lastCardWidth=70;
    
    var tableX=5;
    var tableY=200;
    var tableW=790;
    var tableH=180;
    var table2offsetX=25;
    var table2offsetY=20;
    var tablePointer=false;
    var kavasKartis=52-6*3;
    
    var buttonPointer=false;
    var btnEnabled=false;
    var btnX=20;
    var btnY=390;
    var btnW=120;
    var btnH=30;
    
    var buttonPointer2=false;
    var btn2X=150;
    var btn2Y=390;
    var btn2W=120;
    var btn2H=30;
    //rezhimi
    var skatas=true;
    var gajiens=false;
    var piemet=false;
    var kauj=false;
    
    var trumpjaZime;
    var trumpjaVertiba;

    socket.on('btnChangeState', function(data){
        btnEnabled=data.state;
    });
    
    socket.on('sanemKartis', function(data){
        console.log("Sanjemtas " + data.length + " kartis: ");
        for(var i=0; i<data.length; i++)
            console.log(data[i]);
        kartis=data;
        
    });
    socket.on('trumpis', function(data){
        trumpjaZime=data.zime;
        trumpjaVertiba=data.vertiba;
        console.log("** TRUMPIS - " + trumpjaZime + " **");
        
    });
    socket.on('sanemKartisUzGalda', function(data){
        console.log('dati sanjemti (1): ' + data);
        galds=data;
    });
    socket.on('sanemKartisUzGalda2', function(data){
        console.log('dati sanjemti (2): ' + data);
        galds2=data;
    });
    socket.on('skatities', function(){
        gajiens=false;
        kauj=false;
        piemet=false;
        skatas=true;
    });
    socket.on('sanemKavu', function(data){
        kavasKartis=data.skaits;
    });

    socket.on('gajiens', function(){
        console.log('** Tagad ir tavs gajiens **');
        skatas=false;
        kauj=false;
        piemet=false;
        gajiens=true;

    });
    socket.on('kauj', function(){
        gajiens=false;
        skatas=false;
        piemet=false;
        kauj=true;
    });
    socket.on('piemet', function(){
        gajiens=false;
        skatas=false;
        kauj=false;
        piemet=true;
        
    });
    socket.on('padotChangeState', function(data){
        varPadotTalak=data.state;
    });
    socket.on('uzvara', function(data){
        speletaji[data.num][2]=3;
        if(data.vieta<3)
            alert("Apsveicam! Tu esi ieguvis " + data.vieta + ". vietu");
        else
            alert("Tu esi ieguvis " + data.vieta + ". vietu (cuuka)");
    });
    socket.on('sanemVardus', function(data){
        for(var i=0; i<data.length; i++){
            speletaji.push([data[i].vards, 6, 0]);//vards, karshu skaits, rezhims (0 - skatas, 1 - gajiens, 2 - kauj, 3 - uzvarejis)
        }
    });
    socket.on('sanemRezimus', function(data){
        for(var i=0; i<data.length; i++){
            speletaji[i][2]=data[i].rezims;
        }
    });
    socket.on('sanemKarsuSkaitu', function(data){
        for(var i=0; i<data.length; i++){
            speletaji[i][1]=data[i].karsuSkaits;
        }
    });
    socket.on('sakt', function(data){
        speleSakta=data.state;
    });
    
    
    setInterval(function(){
        ctx.clearRect(0,0,800,600);
        
        if(gajiens || piemet){
            if(selectedCards.length>0)
                drawTableBorder(tableX,tableY,tableW,tableH,Math.floor(counter1/4),true);
            else
                drawTableBorder(tableX,tableY,tableW,tableH,1,false);
        }
        else if(kauj){
            if(selectedCards.length>0){
                drawTableCardBorder(Math.floor(counter1/4));
                drawTableBorder(tableX,tableY,tableW,tableH,1,false);
            }
            else
                drawTableBorder(tableX,tableY,tableW,tableH,1,false);
        }
        else if(skatas){
            drawTableBorder(tableX,tableY,tableW,tableH,1,false);
        }
           
        
        ctx.font='16px Arial';
        ctx.fillStyle="#000000";
        if(gajiens)
            ctx.fillText('Tagad ir tavs gajiens.', 10, 20);
        else if(skatas)
            ctx.fillText('Uzgaidi...', 10, 20);
        else if(kauj)
            ctx.fillText('Tagad tev ir jakauj kartis.', 10, 20);
        else if(piemet)
            ctx.fillText('Tu vari piemest kartis.', 10, 20);
                
        if(speleSakta){
            drawCards();
            drawTable();
            drawTable2();
            drawSpeletaji();
            drawKava(705,tableCardY,lastCardWidth,100, 5, kavasKartis);
            if(btnEnabled)
                drawButton(btnX,btnY,btnW,btnH,buttonPointer, 'Kauts');
            if(kauj)
                drawButton(btnX,btnY,btnW,btnH,buttonPointer, 'Pacelt kartis');
        }
        
        counter1+=counterAdder1;
        if(counter1==12 || counter1==1)
            counterAdder1*=-1;
    }, 1000/25);