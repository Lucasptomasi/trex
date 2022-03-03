
var trex ,trex_running;
var ground, ground_image;
var invisible;
var cloud, cloud_image;
var obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var score = 0;
var gamestate = 1;
var gameover ,restart,restartbutton;
var final
var gp_Cacto;
var gp_nuven;
var dead_rex;
var die,jump,checkpoint;
var contador = 0;


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  ground_image = loadImage("ground2.png");
  cloud_image = loadImage("cloud.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  final = loadImage("gameOver.png");
  dead_rex = loadAnimation("trex_collided.png");
  restartbutton = loadImage("restart.png");
  die = loadSound("die.mp3");
  checkpoint = loadSound("checkpoint.mp3");
  jump = loadSound("jump.mp3");

  
}

function setup(){
  createCanvas(windowWidth,windowHeight)

  gp_Cacto = createGroup();
  gp_nuven = createGroup();

  
  gameover = createSprite(windowWidth/2,windowHeight/2.5,10,10);
  gameover.addImage("game over",final);
  
  restart = createSprite(windowWidth/2,windowHeight/2.8,10,10);
  restart.addImage(restartbutton);
  restart.scale = 0.5;

  //create a trex sprite
  trex= createSprite(windowWidth/15,windowHeight/2,20,20);
  trex.addAnimation("trex",trex_running);
  trex.addAnimation("morrido",dead_rex);
  trex.scale = 0.5;
  
  //chao
  ground= createSprite(windowWidth/2,windowHeight/2,50,10);
  ground.addImage("ground",ground_image);
  ground.velocityX = -(6 + 3* score/100);
  invisible= createSprite(windowWidth/9,windowHeight/1.9,400,20);
  invisible.visible= false;

  
 
  

}

function draw(){
  background("white")
  
  console.log(ground.velocityX);
  
  contador++;
  if(gamestate == 1){

    gerarnuvens();
    gerarcactos();

    restart.visible= false;
    gameover.visible= false;

    score = score + round(contador/200);
    if (ground.x < windowWidth/2){
      ground.x = ground.width/2;
    }

    if (keyDown("space") && trex.y >windowHeight/2.1||touches.length > 0){
      trex.velocityY = -9;
      touches = [];
      jump.play();
      
    }

    if(trex.isTouching(gp_Cacto)){
      gamestate = gamestate + 1;
      die.play();
    }
  }

  if(gamestate == 2){
  gameover.visible= true;
  restart.visible= true;
   gp_nuven.setVelocityXEach(0)
   gp_Cacto.setVelocityXEach(0)
   ground.velocityX = 0;
   gp_Cacto.setLifetimeEach(-1);
   trex.changeAnimation("morrido");
   if(mousePressedOver(restart)){
    gp_Cacto.destroyEach();
    gp_nuven.destroyEach();
    gamestate = gamestate - 1;
    ground.velocityX = -5;
    trex.changeAnimation("trex",trex_running);
    score = 0;
    contador = 0;
   }
  }

  text("pontos:" + score,windowWidth/1.1,windowHeight/9);
  
  

  trex.velocityY = trex.velocityY +0.5;
  trex.collide(invisible);

  
  drawSprites();

  
  
  
}

function gerarnuvens(){
  
  if(frameCount % 50 == 0){
    var r = random(windowHeight/3,windowHeight/4);
   cloud = createSprite(windowWidth/1,r,60,10);
   cloud.addImage("cloud",cloud_image);
   cloud.velocityX = -(5 + score/100);
   gp_nuven.add(cloud);
  }
  
  
}

function gerarcactos(){
  
  if(score < 1000){;
  
  
  if(frameCount % 50 == 0){
    var cacto = createSprite(windowWidth/1,windowHeight/2.03,10,40);
    cacto.velocityX = -(6 + score/100);

    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: cacto.addImage(obstacle1);
      break;
      case 2: cacto.addImage(obstacle2);
      break;   
      case 3: cacto.addImage(obstacle3);
      break; 
      case 4: cacto.addImage(obstacle4);
      break;
      case 5: cacto.addImage(obstacle5);
      break;
      case 6: cacto.addImage(obstacle6);
      break;
      default: break;
    }


    cacto.scale = 0.5;
    cacto.lifetime = 300;
    gp_Cacto.add(cacto);
  }
  else
  if(frameCount % 50 == 0){
    var cacto = createSprite(600,160,10,40);
    cacto.velocityX = -(6 + score/100);

    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: cacto.addImage(obstacle1);
      break;
      case 2: cacto.addImage(obstacle2);
      break;   
      case 3: cacto.addImage(obstacle3);
      break; 
      case 4: cacto.addImage(obstacle4);
      break;
      case 5: cacto.addImage(obstacle5);
      break;
      case 6: cacto.addImage(obstacle6);
      break;
      default: break;
    }


    cacto.scale = 0.5;
    cacto.lifetime = 300;
    gp_Cacto.add(cacto);
  }
  


 }


}
