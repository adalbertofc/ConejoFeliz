
var HelloWorldLayer = cc.Layer.extend({
    sprFondo:null,
    sprConejo:null,
    zanahorias: [],
    bombas : [],
    score:0,
    vidas:4,
    posiciones: [318,399,480,561,649],
    random: function getRandomInt(min, max) {
    	return Math.floor(Math.random() * (max - min + 1)) + min;
	},
    
    
    moverConejo: function(location, event){
		cc.log("Mover conejo");
        var size = cc.winSize;
		var juego = event.getCurrentTarget();
		var ubicacion = location.getLocation();
        if(ubicacion.x>275 && ubicacion.x<685)
		  juego.sprConejo.setPosition(ubicacion.x,size.height * 0.15);
        
    },
    creaZanahoria: function(){
		var size = cc.winSize;
		var zanahoria = new cc.Sprite(res.zanahoria_png);
        zanahoria.setPosition(this.posiciones[this.random(0,4)], size.height );
        this.addChild(zanahoria, 1);
		var moveto = cc.moveTo(this.random(1,9), zanahoria.getPositionX(), -50);
		zanahoria.runAction(moveto);
		this.zanahorias.push(zanahoria);	
        cc.log("zanahorias en camino");
    },
    
    creaBomba: function(){
		var size = cc.winSize;
		var bomba = new cc.Sprite(res.bomba_png);
        bomba.setPosition(this.posiciones[this.random(0,4)], size.height );
        this.addChild(bomba, 1);
		var moveto = cc.moveTo(this.random(1,9), bomba.getPositionX(), -50);
		bomba.runAction(moveto);
		this.bombas.push(bomba);	
        cc.log("bombas fuera");
    },
    
    comer: function(){
		for(var bomb of this.bombas){
            var rectBomb = bomb.getBoundingBox();
            var rectBunny = this.sprConejo.getBoundingBox();
            
            if(cc.rectIntersectsRect(rectBomb, rectBunny)){
                bomb.setVisible(false);
                this.vidas--;
            }
        }
        for(var zana of this.zanahorias){
            var rectZana = zana.getBoundingBox();
            var rectBunny = this.sprConejo.getBoundingBox();
            
            if(cc.rectIntersectsRect(rectZana,rectBunny)){
                zana.setVisible(false);
                this.score+=100;
            }
        }
        if(this.vidas<=0){
            alert("GAME OVER MANITO!!, score:"+ this.score);
            this.score=0;
            this.vidas=3;
            this.zanahorias=[];
            this.bombas=[];
        }
	},
        
    ctor:function () {
        this._super();
        //Obteniendo el tamaño de la pantalla
        var size = cc.winSize;

        //posicionando la imagen de fondo
        this.sprFondo = new cc.Sprite(res.fondo_png);
        this.sprFondo.setPosition(size.width / 2,size.height / 2);
        this.addChild(this.sprFondo, 0);
        
        //posicionando la imagen de fondo
        this.sprConejo = new cc.Sprite(res.conejo_png);
        this.sprConejo.setPosition(size.width / 2,size.height * 0.15);
        this.addChild(this.sprConejo, 1);
        this.schedule(this.creaZanahoria,this.random(2,5));
        this.schedule(this.creaBomba,this.random(2,5));
        this.schedule(this.comer,0.1);
        
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: function(touch, event) {
                cc.log(event.getCurrentTarget());
                return true;
            },
			onTouchMoved: this.moverConejo,
			
		}, this);
                
            

        return true;
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

