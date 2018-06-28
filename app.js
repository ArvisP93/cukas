var express = require('express');
var app = express();
var serv = require('http').Server(app);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/client/index.html');
});
app.use('/client', express.static(__dirname + '/client'));

serv.listen(2000);
console.log("Server started.");

var SOCKET_LIST = {};
var PLAYER = function (id, name){
    var self = {
        id:id,
        vards:name,
        kartis:[],
        beigtGajienu:false,
        saktaSpele:false
    }
    return self;
}
var GAME = function (speletajuSkaits){
    var self = {
        zimes:['Pikis', 'Kreicis', 'Ercens', 'Karavs'],
        vertibas:['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'],
        kava:[],
        galds:[],
        galds2:[],
        speletaji:[],
        speletajuSkaits:speletajuSkaits,
        speleSakta:false,
        speletajaGajiens:0,
        speletajsKauj:1,
        uzvaretaji:[],
        trumpjaZime:null,
        trumpjaVertiba:null
    }
    self.getVertiba = function(vertiba){
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
    self.izveidotKavu = function () {
        for(var z in self.zimes){
            for(var v in self.vertibas){
                //self.kava.push([self.zimes[z],self.vertibas[v]]);
                self.kava.push({
                    zime:self.zimes[z],
                    vertiba:self.vertibas[v]
                });
            }
        }

    }
    self.nodotTrumpi = function () {
        self.trumpjaZime=self.kava[0].zime;
        self.trumpjaVertiba=self.kava[0].vertiba;
        console.log("Trumpis: " + self.trumpjaZime);
        for(var i=0; i<self.speletaji.length; i++){
            io.to(self.speletaji[i].id).emit('trumpis', {zime:self.trumpjaZime, vertiba:self.trumpjaVertiba});
        }
    }
    self.izveidotGaldu2 = function () {
        for(var i=0; i<6; i++){
            self.galds2.push({
                zime:null,
                vertiba:null
            });
        }
    }
    self.iegutBlakusSpeletaju = function (num) {
        tmp_num=num+1;
        if(tmp_num == self.speletaji.length){
            tmp_num=0;
        }
        for(var i=0; i<self.uzvaretaji; i++){//parbauda vai blakus speletajs jau nav uzvarejis
            if(tmp_num==self.uzvaretaji[i]){
                self.iegutBlakusSpeletaju(tmp_num);
            }
        }
        return tmp_num;
    }
    self.resetGaldi = function (){
        self.galds=[];
        for(var i=0; i<self.galds2.length; i++){
            if(self.galds2[i].zime!=null){
                self.galds2[i].zime=null;
                self.galds2[i].vertiba=null;
            }
        }
    }
    self.resetBeigtGajienu = function(){
        for(var i=0; i<self.speletaji.length; i++){
            self.speletaji[i].beigtGajienu=false;
        }
    }
    self.parbauditUzvaru = function(){
        var sutitUzvaru;
        for(var i=0; i<self.speletaji.length; i++){
            sutitUzvaru=true;
            for(var u=0;u<self.uzvaretaji.length;u++){
                if(i==self.uzvaretaji[u]){
                    sutitUzvaru=false;
                    break;
                }
            }
            if(sutitUzvaru && self.speletaji[i].kartis.length==0){
                self.uzvaretaji.push(i);
                io.to(self.speletaji[i].id).emit('uzvara', {num:i, vieta:self.uzvaretaji.length});
                
            }
        }
    }
    self.ietTalak = function(){
        
        self.resetGaldi();
        self.resetBeigtGajienu();
        self.paceltKartisNoKavas();
        self.speletajaGajiens=self.iegutBlakusSpeletaju(self.speletajaGajiens);
        self.speletajsKauj=self.iegutBlakusSpeletaju(self.speletajsKauj);
        //self.speletajaGajiens+=1;
        //self.speletajsKauj+=1;
        //if(self.speletajaGajiens==self.speletaji.length)
        //    self.speletajaGajiens=0;
        //else if(self.speletajsKauj==self.speletaji.length)
        //    self.speletajsKauj=0;
        
        for(var i=0; i<self.speletaji.length; i++){
            if(i==self.speletajaGajiens){
                io.to(self.speletaji[i].id).emit('gajiens');
            }
            else{
                io.to(self.speletaji[i].id).emit('skatities');
                io.to(self.speletaji[i].id).emit('btnChangeState', {state:false});
            }
        }
        self.nodotGaldu();
        self.nodotGaldu2();
    }
    self.paceltKartis = function (){
        for(var i=0; i<self.galds.length; i++){
            self.speletaji[self.speletajsKauj].kartis.push(self.galds[i]);
        }
        for(var i=0; i<self.galds2.length; i++){
            if(self.galds2[i].zime != null){
                console.log("GALDS2: " + self.galds2[i].zime + " " + self.galds2[i].vertiba);
                self.speletaji[self.speletajsKauj].kartis.push(self.galds2[i]);
            }
        }
        
        console.log("galds2: speletaja sanemtas kartis");
        for(var i=0; i<self.speletaji[self.speletajsKauj].kartis.length; i++){
            console.log(self.speletaji[self.speletajsKauj].kartis[i]);
        }
        
        //io.to(self.speletaji[self.speletajsKauj].id).emit('sanemKartis', self.speletaji[self.speletajsKauj].kartis);
        
        ///spele.atnemtKartis(spele.atrastSpeletaju(socket.id), [data.speletajaKarts]);
        
        //self.resetBeigtGajienu();
        
        self.speletajaGajiens=self.iegutBlakusSpeletaju(self.speletajaGajiens);
        self.speletajsKauj=self.iegutBlakusSpeletaju(self.speletajsKauj);
        self.speletajaGajiens=self.iegutBlakusSpeletaju(self.speletajaGajiens);
        self.speletajsKauj=self.iegutBlakusSpeletaju(self.speletajsKauj);
        /*
        self.speletajaGajiens+=1;
        self.speletajsKauj+=1;
        if(self.speletajaGajiens==self.speletaji.length)
            self.speletajaGajiens=0;
        else if(self.speletajsKauj==self.speletaji.length)
            self.speletajsKauj=0;
        
        self.speletajaGajiens+=1;
        self.speletajsKauj+=1;
        if(self.speletajaGajiens==self.speletaji.length)
            self.speletajaGajiens=0;
        else if(self.speletajsKauj==self.speletaji.length)
            self.speletajsKauj=0;
        */
        for(var i=0; i<self.speletaji.length; i++){
            if(i==self.speletajaGajiens){
                io.to(self.speletaji[i].id).emit('gajiens');
            }
            else{
                io.to(self.speletaji[i].id).emit('skatities');
                io.to(self.speletaji[i].id).emit('btnChangeState', {state:false});
            }
        }
        
        console.log("galds2: speletaja sanemtas kartis");
        for(var p=0; p<self.speletaji.length; p++){
            for(var i=0; i<self.speletaji[p].kartis.length; i++){
                console.log(self.speletaji[p].kartis[i]);
            }
        }
                            //nodod visiem kartis
        //for(var i=0; i<self.speletaji.length; i++){
        //    io.to(self.speletaji[i].id).emit('sanemKartis', self.speletaji[i].kartis);
        //}
        self.paceltKartisNoKavas();//pacelj kartis no kavas un pie reizes aizsuta gaajienaa paceltaas kaartis
        self.resetGaldi();
        self.nodotGaldu();
        self.nodotGaldu2();
        
        self.sutitKarsuSkaitu();
        self.sutitSpeletajuRezimus();
    }
    self.padotTalakGajienu = function(kartisKurasPadod){
        var speletajsKuramPadod=self.speletajsKauj+1;
        if(speletajsKuramPadod==self.speletaji.length)
            speletajsKuramPadod=0;
        
        if(self.speletaji[speletajsKuramPadod].kartis.length >= self.galds.length + kartisKurasPadod.length){//ja nakamajam speletajam ir pietiekami kartis prieksh padoshanas
            
            self.atnemtKartis(spele.speletajsKauj, kartisKurasPadod);//Atnem tas kartis ar kuraam padeva
            
            self.speletajaGajiens=self.iegutBlakusSpeletaju(self.speletajaGajiens);
            self.speletajsKauj=self.iegutBlakusSpeletaju(self.speletajsKauj);
            /*
            self.speletajaGajiens+=1;
            self.speletajsKauj+=1;
            if(self.speletajaGajiens==self.speletaji.length)
                self.speletajaGajiens=0;
            if(self.speletajsKauj==self.speletaji.length)
                self.speletajsKauj=0;
            */
            for(var i=0; i<kartisKurasPadod.length; i++){//pievieno galdam kartis ar kuram padeva talak
                spele.galds.push(kartisKurasPadod[i]);
            }
            
            for(var i=0; i<self.speletaji.length; i++){
                if(i==self.speletajsKauj){
                    io.to(self.speletaji[i].id).emit('kauj');
                }
                else{
                    io.to(self.speletaji[i].id).emit('piemet');
                    io.to(self.speletaji[i].id).emit('btnChangeState', {state:false});
                }
            }
            self.varPadot();
            self.nodotGaldu();
                                //nodod visiem kartis
            for(var i=0; i<self.speletaji.length; i++){
                io.to(self.speletaji[i].id).emit('sanemKartis', self.speletaji[i].kartis);
            }
            self.sutitKarsuSkaitu();
            self.sutitSpeletajuRezimus();

        }
        else{
            console.log("** Nakamajam speletajam nepietiek kartis lai varetu padot **");
        }
    }
    self.paceltKartisNoKavas = function(){
        var karsuDaudzums=6;
        //pirmais celj tas kursh gaja
        karsuDaudzums=self.speletaji[self.speletajaGajiens].kartis.length;
        console.log("KarsuDaudzums tam kas gaaja: " + karsuDaudzums);
        for(var k=0; k<6-karsuDaudzums; k++){
            if(self.kava.length>0){
                self.speletaji[self.speletajaGajiens].kartis.push(self.kava.pop());
            }
            else{
                self.parbauditUzvaru();
                break;
            }
        }
        //citi pacelj
        for(var i=0;i<self.speletaji.length; i++){
            if(i!=self.speletajaGajiens && i!=self.speletajsKauj){
                if(self.speletaji[i].kartis.length<6){
                    karsuDaudzums=self.speletaji[i].kartis.length;
                    console.log("KarsuDaudzums citiem: " + karsuDaudzums);
                    for(var k=0; k<6-karsuDaudzums; k++){
                        if(self.kava.length>0){
                            self.speletaji[i].kartis.push(self.kava.pop());
                        }
                        else{
                            self.parbauditUzvaru();
                            break;
                        }
                    }
                }
            }
        }
        //pedejais - tas kursh kava
        karsuDaudzums=self.speletaji[self.speletajsKauj].kartis.length;
        console.log("KarsuDaudzums tam kas kaava: " + karsuDaudzums);
        for(var k=0; k<6-karsuDaudzums; k++){
            if(self.kava.length>0){
                self.speletaji[self.speletajsKauj].kartis.push(self.kava.pop());
            }
            else{
                self.parbauditUzvaru();
                break;
            }
        }
        //nodod visiem kartis
        for(var i=0; i<self.speletaji.length; i++){
            io.to(self.speletaji[i].id).emit('sanemKartis', self.speletaji[i].kartis);
            io.to(self.speletaji[i].id).emit('sanemKavu', {skaits:self.kava.length});
        }

    }
    self.parbauditVaiVissNokauts = function(){
        var tmp=0;
        for(var i=0; i<self.galds2.length; i++){
            if(self.galds2[i].zime != null){
                tmp+=1;
            }
        }
        if(self.galds.length == tmp)
            return true;
        else
            return false;
    }
    self.izvaditKartis = function () {
        console.log('......................');
        console.log(self.kava.length);
        console.log('......................');
        for(var i in self.kava){
            console.log(self.kava[i]);
        }
    }
    self.atnemtKartis = function (speletajaNr, kartisKoAtnem) {
        
        console.log('KARTIS KO ATNEM: ');
        for(var i=0; i<kartisKoAtnem.length; i++){
            console.log(kartisKoAtnem);
        }

        var kartis_tmp=[];
        
        for(var i=0; i<self.speletaji[speletajaNr].kartis.length; i++){
            var pievienot=true;
            for(var j=0; j<kartisKoAtnem.length; j++){
                if(self.speletaji[speletajaNr].kartis[i].zime == kartisKoAtnem[j].zime && self.speletaji[speletajaNr].kartis[i].vertiba == kartisKoAtnem[j].vertiba){
                    //console.log(self.speletaji[speletajaNr].kartis[i]);
                    pievienot=false;
                    break;
                }
            }
            if(pievienot)
                kartis_tmp.push(self.speletaji[speletajaNr].kartis[i]);
            
        }
        //atdod jaunas kartis
        self.speletaji[speletajaNr].kartis=kartis_tmp;
        io.to(self.speletaji[speletajaNr].id).emit('sanemKartis', self.speletaji[speletajaNr].kartis);
    }

    self.atrastSpeletaju = function (id){
        for(var i=0; i<self.speletaji.length; i++){
            if(self.speletaji[i].id==id){
                return i;
            }
        }
        return -1;
    }
    self.samaisitKartis = function () {
        for(var i=0; i<1000; i++){
            var karts1 = Math.floor(Math.random() * self.kava.length);
            var karts2 = Math.floor(Math.random() * self.kava.length);
            var tmp = self.kava[karts1];
            self.kava[karts1]=self.kava[karts2];
            self.kava[karts2]=tmp;
        }
        console.log(self.kava.length + ' kartis kavaa');
    }
    self.pievienotSpeletaju = function (id, vards) {
        var pievienot=true;
        for(var s in self.speletaji){
            if(self.speletaji[s].id==id){
                console.log('KLUDA: Speletajs ar ID ' + id + 'jau eksiste.');
                pievienot=false;
                break;
            }
        }
        if(pievienot){
            var speletajs = PLAYER(id, vards);
            self.speletaji.push(speletajs);
            console.log('Speletajs ar vardu ' + vards + ', ID ' + id + ' pievienots spelei.');
        }
    }

    self.izvaditSpeletajus = function () {
        console.log('***************************');
        for(var i in self.speletaji){
            //console.log('ID: ' + self.speletaji[i].id + ', NAME: ' + self.speletaji[i].vards);
            console.log(self.speletaji[i]);
        }
    }
    self.izdalitKartis = function () {
        console.log('Izdala kartis...');
        for(var i in self.speletaji){
            for(var x=0; x<6; x++){
                self.speletaji[i].kartis.push(self.kava.pop());
            }
        }
    }
    self.varPadot = function () {
        //parbauda vai atlaut padot kartis talak
        var i=self.speletajsKauj;
        if(i+1<self.speletaji.length){
            if(self.speletaji[i+1].kartis.length>self.galds.length+1 && self.galds.length < 4){//vai nakamajam speletajam ir pietiekami kartis
                io.to(self.speletaji[i].id).emit('padotChangeState', {state:true});
            }
        }
        else{
            if(self.speletaji[0].kartis.length>self.galds.length+1 && self.galds.length < 4){
                io.to(self.speletaji[i].id).emit('padotChangeState', {state:true});
            }
        }
        //<<<
    }
    self.saktSpeli = function () {
        
        self.izdalitKartis();
        self.izvaditSpeletajus();
        console.log('SPELE SAKAS');
        speleSakta=true;
        self.saktGajienu();
    }
    self.sutitSpeletajuVardus = function (){
        var tmp=[];
        for(var i=0; i<self.speletaji.length; i++){
            tmp.push({vards:self.speletaji[i].vards});
        }
        for(var i=0; i<self.speletaji.length; i++){
            io.to(self.speletaji[i].id).emit('sanemVardus', tmp);
        }
    }
    self.sutitSpeletajuRezimus = function (){
        var tmp=[];
        var sutitRezimu;
        for(var i=0; i<self.speletaji.length; i++){
            sutitRezimu=true;
            for(var u=0; u<self.uzvaretaji; u++){
                if(i==self.uzvaretaji[u]){
                    sutitRezimu=false;
                    break;
                }
            }
            if(sutitRezimu){
                if(i==self.speletajaGajiens)
                    tmp.push({rezims:1});
                else if(i==self.speletajsKauj)
                    tmp.push({rezims:2});
                else
                    tmp.push({rezims:0});
            }
        }
        for(var i=0; i<self.speletaji.length; i++){
            io.to(self.speletaji[i].id).emit('sanemRezimus', tmp);
        }
    }
    self.sutitKarsuSkaitu = function(){
        var tmp=[];
        for(var i=0; i<self.speletaji.length; i++){
            tmp.push({karsuSkaits:self.speletaji[i].kartis.length});
        }
        for(var i=0; i<self.speletaji.length; i++){
            io.to(self.speletaji[i].id).emit('sanemKarsuSkaitu', tmp);
        }
    }
    self.sutitZinu = function () {
        for(var i in self.speletaji){
            //io.to(self.speletaji[i].id).emit('serverMsg',{msg:self.speletaji[i].id});
            console.log('notiek');
            //io.to(self.speletaji[i].id).emit(self.speletaji[i].id);
            //neiet

        }
    }
    self.nodotGaldu = function (){
        for(var i=0; i<self.speletaji.length; i++){
            io.to(self.speletaji[i].id).emit('sanemKartisUzGalda', self.galds);
        }
    }
    self.nodotGaldu2 = function (){
        for(var i=0; i<self.speletaji.length; i++){
            io.to(self.speletaji[i].id).emit('sanemKartisUzGalda2', self.galds2);
        }
    }
    self.saktGajienu = function(){
        console.log(self.speletaji[self.speletajaGajiens].id);
        console.log('kartis sk:' + self.speletaji[self.speletajaGajiens].kartis.length);
        
        
        //nodod kartis katram speletajam
        for(var i=0; i<self.speletaji.length; i++){
            if(self.speletaji[i].saktaSpele==false){
                self.speletaji[i].saktaSpele=true;
                io.to(self.speletaji[i].id).emit('sakt', {state:true});
            }
            io.to(self.speletaji[i].id).emit('sanemKartis', self.speletaji[i].kartis);
            
            if(i==self.speletajaGajiens){
                io.to(self.speletaji[i].id).emit('gajiens');
            }
            //else if(i==self.speletajsKauj){
            //    io.to(self.speletaji[i].id).emit('kauj');
            //}
            else{
                io.to(self.speletaji[i].id).emit('skatities');
            }
            
        }
        

        //console.log("paka");
        //console.log(pack);
        
    }
    return self;
}


var spele = GAME(3);
spele.izveidotKavu();
spele.izvaditKartis();
spele.samaisitKartis();
spele.izvaditKartis();

spele.izveidotGaldu2();

var io = require('socket.io')(serv,{});
io.sockets.on('connection', function(socket){
    //socket.id = Math.random();
    //io.to(socket.id).emit('serverMsg2');
    
   // socket.broadcast.to(socket.id).emit('serverMsg2');

    //socket.emit('serverMsg2');
    //socket.emit('gajiens');
    
    SOCKET_LIST[socket.id] = socket;

    //spele.izdalitKartis();
    //var player = Player(socket.id);
    //PLAYER_LIST[socket.id] = player;
    //spele.izvaditSpeletajus();
    
    socket.on('disconnect', function(){
        delete SOCKET_LIST[socket.id];
        //delete PLAYER_LIST[socket.id];
    });
    
    /*socket.on('keyPress', function(data){
        if(data.inputId === 'left')
            player.pressingLeft = data.state;
        else if(data.inputId === 'right')
            player.pressingRight = data.state;
        else if(data.inputId === 'up')
            player.pressingUp = data.state;
        else if(data.inputId === 'down')
            player.pressingDown = data.state;
    });*/
        
    console.log('socket connection');
    
    socket.on('joinGame', function(data){
        
        console.log('vards: ' + data.vards);
        spele.pievienotSpeletaju(socket.id, data.vards);
        
        
        console.log(spele.speletaji.length);
        
        if(spele.speletaji.length === spele.speletajuSkaits){
            spele.saktSpeli();
            spele.nodotTrumpi();
            spele.sutitSpeletajuVardus();
            spele.sutitSpeletajuRezimus();
            //spele.nodotGaldu2();
            //////////////
        }
    });
    
    socket.on('piemestKartis', function(data){
        for(var i=0; i<data.length; i++){
            var galdaGarums=spele.galds.length;
            for(var j=0; j<galdaGarums;j++){
                if(data[i].vertiba==spele.galds[j].vertiba || data[i].vertiba==spele.galds2[j].vertiba){
                    spele.galds.push(data[i]);
                    break;
                }
            }
        }
        spele.nodotGaldu();
        spele.atnemtKartis(spele.atrastSpeletaju(socket.id), data);
    });
    
    socket.on('gajiens', function(data){
       console.log('** Sanemtas kartis uz galda **');
       spele.galds=data;
       console.log(spele.galds)
       for(var i=0; i<spele.speletaji.length; i++){
            if(i!=spele.speletajsKauj)
                io.to(spele.speletaji[i].id).emit('piemet');
            else
                io.to(spele.speletaji[i].id).emit('kauj');
       }
       //io.to(socket.id).emit('piemet');
       
       
       spele.atnemtKartis(spele.atrastSpeletaju(socket.id), data);
       spele.nodotGaldu();
       spele.varPadot();

       spele.sutitKarsuSkaitu();
       spele.sutitSpeletajuRezimus();
       
    });
    socket.on('paceltKartis', function(){
        spele.paceltKartis();
    });
    socket.on('kautKarti', function(data){//////////////
        for(var i=0; i<spele.galds.length; i++){//iet cauri galda kartim un mekle vai ir tada ka speletajs atsutija
            if(data.galdaKarts.zime == spele.galds[i].zime && data.galdaKarts.vertiba == spele.galds[i].vertiba){//vai atrod speletaja atsutito galda karti uz servera galda
                //**********************
                if(data.speletajaKarts.zime==data.galdaKarts.zime){//ja speletaja karts zime ir vienada ar galda karts zimi
                    if(spele.getVertiba(data.speletajaKarts.vertiba) > spele.getVertiba(data.galdaKarts.vertiba)){//parbauda vai var kaut
                        spele.galds2[i].zime=data.speletajaKarts.zime;
                        spele.galds2[i].vertiba=data.speletajaKarts.vertiba;
                    
                        console.log(data.speletajaKarts);
                        console.log(data.galdaKarts);
                        
                        spele.atnemtKartis(spele.atrastSpeletaju(socket.id), [data.speletajaKarts]);
                        spele.nodotGaldu2();
                    
                        io.to(spele.speletaji[spele.speletajsKauj].id).emit('padotChangeState', {state:false});//speletajs kursh kauj vairs nevar padot karti
                    
                        if(spele.parbauditVaiVissNokauts()){//ja visas kartis nokautas
                            for(var p in spele.speletaji){
                                if(p != spele.speletajsKauj){
                                    io.to(spele.speletaji[p].id).emit('btnChangeState', {state:true});//visiem speletajiem iznemot tam kursh kauj iesledz pogu "kauts"
                                }
                            }
                            //socket.emit('btnChangeState',{state:true});
                        
                            spele.sutitKarsuSkaitu();
                            spele.sutitSpeletajuRezimus();
                        }
                        break;
                    }
                }
                else{//ja zimes atskiras
                    if(data.speletajaKarts.zime==spele.trumpjaZime){
                        spele.galds2[i].zime=data.speletajaKarts.zime;
                        spele.galds2[i].vertiba=data.speletajaKarts.vertiba;
                    
                        console.log(data.speletajaKarts);
                        console.log(data.galdaKarts);
                    
                        spele.atnemtKartis(spele.atrastSpeletaju(socket.id), [data.speletajaKarts]);
                        spele.nodotGaldu2();
                    
                        io.to(spele.speletaji[spele.speletajsKauj].id).emit('padotChangeState', {state:false});//speletajs kursh kauj vairs nevar padot karti
                    
                        if(spele.parbauditVaiVissNokauts()){//ja visas kartis nokautas
                            for(var p in spele.speletaji){
                                if(p != spele.speletajsKauj){
                                    io.to(spele.speletaji[p].id).emit('btnChangeState', {state:true});//visiem speletajiem iznemot tam kursh kauj iesledz pogu "kauts"
                                }
                            }
                            //socket.emit('btnChangeState',{state:true});
                            spele.sutitKarsuSkaitu();
                            spele.sutitSpeletajuRezimus();
                        }
                        break;
                    }
                    else{
                        console.log("** Nevar kaut ar shadu karti **");
                    }
                    
                }
                //**********************

            }
        }
    });
    socket.on('padotTalak', function(data){
        console.log("Sanjemtas " + data.length + " kartis padoshanai");
        var turpinat = true;
        for(var i=0; i<spele.galds.length; i++){//parbauda vai var veikt padoshanu
            for(var j=0; j<data.length; j++){
                if(spele.galds[i].vertiba != data[j].vertiba){
                    turpinat=false;
                    break;
                }
            }
        }
        if(turpinat){//ja var padot
            spele.padotTalakGajienu(data);
            
        }
        else{
            console.log("** Nevar padot ar shadam kartim **");
        }
    });
    socket.on('beigtGajienu', function(){
       spele.speletaji[spele.atrastSpeletaju(socket.id)].beigtGajienu=true;
       
       
       //parbauda vai var veikt nakamo gajienu
       var nakamaisGajiens=true;
       for(var i=0; i<spele.speletaji.length; i++){
            if(i != spele.speletajsKauj){
                if(spele.speletaji[i].beigtGajienu == false){
                    nakamaisGajiens=false;
                    break;
                }
            }
       }
       if(nakamaisGajiens){
            spele.ietTalak();
            spele.sutitKarsuSkaitu();
            spele.sutitSpeletajuRezimus();
       }
       
    });
    
    socket.on('happy2', function(data){
       console.log('happy because ' + data.reason); 
    });
    
    socket.emit('serverMsg',{
        msg:'hello'
    });
    
        
});



setInterval(function(){
    
    /*var pack = [];
    for(var i in PLAYER_LIST){
        var player = PLAYER_LIST[i];
        //player.x++;
        //player.y++;
        player.updatePosition();
        
        pack.push({
            x:player.x,
            y:player.y,
            number:player.number
        });
    }
    for(var i in SOCKET_LIST){
        var socket = SOCKET_LIST[i];
        socket.emit('newPositions', pack);
    }*/
}, 1000/25);