
var HelloWorldLayer = cc.Layer.extend({
    sprFondo:null,
    sprConejo:null,
    
    moverConejo: function(location, event){
		cc.log("Mover conejo");
        var size = cc.winSize;
		var  juego = event.getCurrentTarget();
		var ubicacion = location.getLocation();
        if(ubicacion.x>275 && ubicacion.x<685)
		  juego.sprConejo.setPosition(ubicacion.x,size.height * 0.15)
        
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
        
        cc.eventManager.addListener({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: function(touch, event) {
                cc.log(event.getCurrentTarget());
                return true;
            },
			onTouchMoved: this.moverConejo
			
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

