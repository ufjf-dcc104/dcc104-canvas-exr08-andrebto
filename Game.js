var canvas;
var ctx;
var map;
var pc;
var pc2;
var dt;
var images;
var images_bomb;
var anterior = 0;
var frame = 0;
var running = true;
var minas = 0;
var tesouro = 0;
var time = 4000;
var timeexplode = 300;
function init(){
  canvas = document.getElementsByTagName('canvas')[0];
  canvas.width = 520;
  canvas.height = 480;
  ctx = canvas.getContext("2d");
  images = new ImageLoader();
  images_bomb = new ImageLoader();
  images.load("pc","pc.png");
  images_bomb.load("bomb","bomb.png");
  map = new Map(Math.floor(canvas.height/40), Math.floor(canvas.width/40));
  map.images = images;
  map.setCells([
    [1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,2,2,0,0,0,0,0,0,0,0,0,1],
    [1,2,1,0,1,0,1,0,1,0,1,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,1,0,1,0,1,0,1,0,1,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,1,0,1,0,1,0,1,0,1,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,1,0,1,0,1,0,1,0,1,5,1],
    [1,0,0,0,0,0,0,0,0,0,2,2,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1],
  ]);
  pc = new Sprite();
  pc.x = 50;
  pc.y = 50;
  pc2 = new Sprite();
  pc2.x = 365;
  pc2.y = 335;
  pc2.pose = 2;
  time_bar = new Sprite();
  pc.images = images;
  pc2.images = images;
  initControls();
  requestAnimationFrame(passo);
}


function passo(t){
	if(running){
		dt = (t-anterior)/1000;
		requestAnimationFrame(passo);
	  //ctx.save();
	  //ctx.translate(250,0);
	  //ctx.scale(1,0.5);
	  //ctx.rotate(Math.PI/4);
		ctx.clearRect(0,0, canvas.width, canvas.height);
		if((!pc.alive) || (!pc2.alive))
			running = false;
		pc.mover(map, dt);
		pc2.mover(map, dt);
		map.mover(dt);
		map.desenhar(ctx);
		pc.desenhar(ctx);
		pc2.desenhar(ctx);
		anterior = t;
	}
	else{
		ctx.clearRect(0,0, canvas.width, canvas.height);
		ctx.font = "15px Arial";
		map.desenhar(ctx);
		ctx.fillStyle = "black";
		if(pc.alive)
			ctx.fillText("O player 1 ganhou",150,200);
		else
			ctx.fillText("O player 2 ganhou",150,200);
	}
}


function initControls(){
  addEventListener('keydown', function(e){
    switch (e.keyCode) {
      case 37:
	pc.vy = 0;
        pc.vx = -100;
        pc.pose = 2;
        e.preventDefault();
        break;
      case 38:
	pc.vx = 0;
        pc.vy = -100;
        pc.pose = 3;
        e.preventDefault();
        break;
      case 39:
	pc.vy = 0;
        pc.vx = 100;
        pc.pose = 0;
        e.preventDefault();
        break;
      case 40:
	pc.vx = 0;
        pc.vy = 100;
        pc.pose = 1;
        e.preventDefault();
        break;
	  case 32:
		var bomb = new Sprite();
		bomb.x = pc.x;
		bomb.y = pc.y;
		bomb.time = 2*timeexplode;
		bomb.power = pc.power;
		map.bombs.push(bomb);
		break;
	  case 16:
		var bomb = new Sprite();
		bomb.x = pc2.x;
		bomb.y = pc2.y;
		bomb.time = 2*timeexplode;
		bomb.power = pc2.power;
		map.bombs.push(bomb);
		break;
	  case 65:
		pc2.vy = 0;
        pc2.vx = -100;
        pc2.pose = 2;
        e.preventDefault();
        break;
	  case 68:
		pc2.vy = 0;
        pc2.vx = 100;
        pc2.pose = 0;
        e.preventDefault();
        break;
	  case 87:
		pc2.vx = 0;
        pc2.vy = -100;
        pc2.pose = 3;
        e.preventDefault();
        break;
	  case 83:
		pc2.vx = 0;
        pc2.vy = 100;
        pc2.pose = 1;
        e.preventDefault();
        break;
      default:

    }
  });
  addEventListener('keyup', function(e){ 
    switch (e.keyCode) {
      case 37:
      case 39:
        pc.vx = 0;
        pc.pose = 4;
        break;
      case 38:
      case 40:
        pc.vy = 0;
        break;
	  case 65:
      case 68:
        pc2.vx = 0;
        pc2.pose = 4;
        break;
      case 83:
      case 87:
        pc2.vy = 0;
        break;
      default:

    }
  });
}
