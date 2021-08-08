var trex, trex_running, edges;
var groundImage;
var pisoinvisible;
var Clouds;
var CloudImage;
var obstacule1;
var obstacule2;
var obstacule3;
var obstacule4;
var obstacule5;
var PLAY=1;
var END=0;
var ESTADODEJUEGO=PLAY;
var score=0;
var gameover;
var gameoverimagen;
var restart;
var restartimagen;
var sonido1;
var sonido2;
var sonido3;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  groundImage = loadImage("ground2.png");
  CloudImage=loadImage("Cloud.png");
  obstacule1=loadImage("Obstacle1.png");
  obstacule2=loadImage("Obstacle2 (1).png");
  obstacule3=loadImage("Obstacle3.png");
  obstacule4=loadImage("Obstacle4.png");
  obstacule5=loadImage("Obstacle5.png");
  gameoverimagen=loadImage("GameOver (1).png");
  restartimagen=loadImage("restart.png");
  sonido1=loadSound("checkPoint.mp3.mp3");
  sonido2=loadSound("die.mp3.mp3");
  sonido3=loadSound("jump.mp3.mp3");
  
}

function setup(){
  createCanvas(600,200);
  
  //crea el Trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided" ,trex_collided);
  edges = createEdgeSprites();
  
  //añade escala y posición al Trex
  trex.scale = 0.5;
  trex.x = 50;
  
  suelo=createSprite(200, 180, 400, 20);
  suelo.addImage("suelo", groundImage );
  suelo.x=suelo.width/2;
  
  pisoinvisible=createSprite(200,190,400,10);
  pisoinvisible.visible=false;
  
  grupodecaptus=new Group();
  grupodenubes=new Group();
  score=0;
  
  trex.setCollider("circle",0,0,40);
  trex.debug=true;
  
  gameover=createSprite(300,100);
  restart=createSprite(300,140);
  
  gameover.addImage(gameoverimagen);
  restart.addImage(restartimagen);
  
  gameover.scale=0.5;
  restart.scale=0.5;
  
  var mensaje="prueba1";
  
}


function draw(){
  //establece un color de fondo 
  background("pink");
  text("Score: "+ score, 500,50);
 if(ESTADODEJUEGO===PLAY){
   gameover.visible=false;
    restart.visible=false;
   trex.changeAnimation("running", trex_running);
   suelo.velocityX=-(2+3*score/100);
   score=score+Math.round(frameCount/60);
   if (score>0 && score%100===0){
       sonido1.play();
       }
 if (suelo.x<0){
   suelo.x=200;
    suelo.x=suelo.width/2;
       
      } 
   if(keyDown("space")&& trex.y>=161){
    trex.velocityY = -10;
     sonido3.play();
  }
    trex.velocityY = trex.velocityY + 0.5;
   spawnClouds();
   spawnobstaculos();
   
   if(grupodecaptus.isTouching(trex)){
      ESTADODEJUEGO=END;
     sonido2.play();
      }
 }
    else if(ESTADODEJUEGO===END){
      gameover.visible=true;
      restart.visible=true;
      if (mousePressedOver(restart)){
          reiniciar();
          }
      suelo.velocityX=0;
      
      //detener el suelo
    suelo.velocityX=0;
    trex.velocityY=0;
    
    //cambiar animación
    trex.changeAnimation("collided", trex_collided);
      
      
    grupodecaptus.setLifetimeEach(-1);
    grupodenubes.setLifetimeEach(-1);
      
     grupodecaptus.setVelocityXEach(0);
      grupodenubes.setVelocityXEach(0);
            }

  //evita que el Trex caiga
  trex.collide(pisoinvisible);
  drawSprites();
  
}

function spawnClouds(){
  if(frameCount%60===0){
    Clouds=createSprite(600,100,40,10);
    Clouds.addImage(CloudImage);
    Clouds.y=Math.round(random(10,60));
    Clouds.scale=0.4;
    Clouds.velocityX=-3;   
    
    Clouds.lifetime=200;
    
    //console.log(trex.depth);
    //console.log(cloud.depth);
    
    Clouds.depth=trex.depth;
    trex.depth=trex.depth+1;
    
    //añade cada nube al grupo
    grupodenubes.add(Clouds);
     }
  
}

function spawnobstaculos(){
 if(frameCount%60===0){
 var obstaculo=createSprite(600, 165, 10, 40);
 obstaculo.velocityX=-(6+score/100);
   var rand= Math.round(random(1,5));
  switch(rand){
 case 1:obstaculo.addImage(obstacule1);
        break;
  case 2:obstaculo.addImage(obstacule2);
        break;
  case 3:obstaculo.addImage(obstacule3);
        break;
  case 4:obstaculo.addImage(obstacule4);
        break;
  case 5:obstaculo.addImage(obstacule5);
        break;
        
         }
  obstaculo.scale=0.5;
   grupodecaptus.add(obstaculo);
         } 
   
  }
function reiniciar(){
    ESTADODEJUEGO=PLAY;
  grupodecaptus.destroyEach();
  grupodenubes.destroyEach();
  trex.changeAnimation("running", trex_running);
  score=0;
  }