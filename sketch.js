var gameState = 0;
var player,playerI;
var obs,obs1,obs2,obs3,obs4,obs5,obsG;
var obsI,obs2I,obs3I,obs4I,obs5I;
var backgroundI;
var restartButton,restartButtonI;
var gameOverButton,gameOverI;
var carS,crashS;
var score;

function preload(){

  playerI = loadImage("images/player.png");
  backgroundI = loadImage("images/road1.jpg");

  obsI = loadImage("images/obstacle.png");
  obs2I = loadImage("images/obstacle2.png");
  obs3I = loadImage("images/obstacle3.png")
  obs4I = loadImage("images/obstacle4.png");

  restartButtonI = loadImage("images/restartButton.png");
  gameOverI = loadImage("images/gameOverImg.jpg");

  crashS = loadSound("sounds/crash.mp3");
  carS = loadSound("sounds/carsound.mp3");
}

function setup() {
  var canvas = createCanvas(windowWidth,windowHeight);

  backGround = createSprite(width/2,height/2+100,10,10);
  backGround.addImage(backgroundI);
  backGround.scale = 3.1;

  player = createSprite(width/2,height-400,30,30);
  player.addImage(playerI);
  player.scale = 2;

  restartButton = createSprite(width/2,height-750,50,50);
  restartButton.addImage(restartButtonI);
  restartButton.scale = 0.6;

  gameOverButton = createSprite (width/2,height-600,50,50);
  gameOverButton.addImage(gameOverI);
  gameOverButton.scale = 0.5;

  edges = createEdgeSprites();

  obsG = new Group();

  score = 0;
  
  carS.play();

}

function draw() {
  background(255); 
  
  
  if (gameState === 0) {

    restartButton.visible = false;
    gameOverButton.visible = false;

    obsG.depth = restartButton.depth;
    restartButton.depth = restartButton.depth + 1;
    obsG.depth = gameOverButton.depth;
    gameOverButton.depth = gameOverButton.depth + 1;

    backGround.velocityY = (8 +3* score/150);

    score = score + Math.round(getFrameRate()/60);


    if (backGround.y > height-350) {
      backGround.y = height/2;
    }
  
    if(keyDown(RIGHT_ARROW)) {
      player.x = player.x+25;
    }
  
    if(keyDown(LEFT_ARROW)) {
      player.x = player.x-25;
    }
    spawnObstacles();

    for(var i = 0; i < obsG.length; i++) {
      if (obsG.get(i).isTouching(player)) {
        gameState = 1;
        obsG.get(i).velocityY = 0;
        carS.pause();
        crashS.play();
      }
    }
  }

  
  if (gameState === 1) {
    backGround.velocityY = 0;
    restartButton.visible = true;
    gameOverButton.visible = true;
    

    if (mousePressedOver(restartButton)) {
      console.log("RESTART");
      obsG.destroyEach();
      score = 0;
      player.x = width/2;
      restartG();
    }
  }
  //console.log(player.x);
  drawSprites();

  strokeWeight(5);
  stroke("black");
  fill("white");
  textSize(45);
  text("Score: "+ score,10,40);

  strokeWeight(5);
  stroke("black");
  fill("white");
  textSize(30);
  text("Press Left or Right arrow keys to move!",700,30);
}

function spawnObstacles(){
  if(frameCount%100 === 0){
    var obs = createSprite(100,height-100,30,30);
    obs.x = Math.round(random(width-1500,width-500));
    obs.velocityY = -(6 + score/100);
    obsG.add(obs);
    obsG.lifetime = 150;
    console.log(obs.velocityY);
    
    var rand = Math.round(random(1,4));
     switch(rand) {
       case 1: obs.addImage(obsI);
       obs.scale = 0.5;
               break;
       case 2: obs.addImage(obs2I);
       obs.scale = 0.28;
               break;
       case 3: obs.addImage(obs3I);
       obs.scale = 0.3;
               break;        
       case 4: obs.addImage(obs4I);
       obs.scale = 0.5;
               break;
       case 5: obs = createSprite(1350,100,30,30);
               break;
       default: break;
     }
     console.log(rand);
  }
}

function restartG(){

  gameState = 0;

}