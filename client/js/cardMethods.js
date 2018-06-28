    var kautKarti = function(galdaKarts, speletajaKarts){
        socket.emit('kautKarti',{
            galdaKarts:galdaKarts,
            speletajaKarts:speletajaKarts
        });
    }
    var padotTalak = function(kartis){
        socket.emit('padotTalak',kartis);
    }
    var paceltKartis = function(){
        socket.emit('paceltKartis');
    }
    izveidotGaldu2 = function () {
        for(var i=0; i<6; i++){
            galds2.push({
                zime:null,
                vertiba:null
            });
        }
    }
    izveidotGaldu2();
    
    var joinGame = function(){
        var name=document.getElementById("vards").value;
        if(name.length>0){
            if(name.length<=16){
                socket.emit('joinGame',{
                    vards:name
                });
            }
            else{
                alert("Ievaditais vards ir par garu (max 16 rakstzimes)");
            }
        }
        else{
            alert("Pirms pievienojies spelei, ievadi savu vardu");
        }
    }
    var selCards = function(){
        console.log('Izveletas kartis: ' + selectedCards.length);
    }
    var piemest = function(){
        var kartis_tmp=[];
        
        for(var i=0; i<selectedCards.length; i++){
            for(var j=0; j<galds.length;j++){
                if(kartis[selectedCards[i]].vertiba==galds[j].vertiba || kartis[selectedCards[i]].vertiba==galds2[j].vertiba){
                    kartis_tmp.push(kartis[selectedCards[i]]);
                    break;
                }
            }
        }
        selectedCards=[];
        socket.emit('piemestKartis',kartis_tmp);
    }
    var go = function(){
        galds=[];
        var kartis_tmp=[];
        for(var i=0; i<selectedCards.length; i++){
            galds.push(kartis[selectedCards[i]]);
        }
        socket.emit('gajiens',galds);
        selectedCards=[];

    }
    

    var getVertiba = function(vertiba){
        var tmp;
        switch (vertiba) {
        case '2':
            tmp=2;
            break;
        case '3':
            tmp=3;
            break;
        case '4':
            tmp=4;
            break;
        case '5':
            tmp=5;
            break;
        case '6':
            tmp=6;
            break;
        case '7':
            tmp=7;
            break;
        case '8':
            tmp=8;
            break;
        case '9':
            tmp=9;
            break;
        case '10':
            tmp=10;
            break;
        case 'J':
            tmp=11;
            break;
        case 'Q':
            tmp=12;
            break;
        case 'K':
            tmp=13;
            break;
        case 'A':
            tmp=14;
            break;
        default:
            tmp=-1;
            break;
        }
        return tmp;
    }