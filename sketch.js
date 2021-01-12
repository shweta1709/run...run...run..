var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;
var gameover,gameoverImg;
//Game States
var PLAY=1;
var END=0;
var gameState=1;
var car,carImg;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("Runner-1.png","Runner-2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  gameoverImg =loadAnimation("gameOver.png");
  carImg = loadAnimation("Car.png");
}

function setup(){
  
  createCanvas(windowWidth,windowHeight);
  
  
// Moving background
  

path=createSprite(width/2,200);
path.addImage(pathImg);
path.velocityY = 10;


//creating boy running
boy = createSprite(width/2,height-60,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.08;
  
 gameover = createSprite(width/2,height/2);
 gameover.addAnimation("gameOver.png",gameoverImg);
 gameover.scale = 0.9; 
  
  boy.setCollider("rectangle",0,0,width-20,height/2);
  boy.debug = false
  
  
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();
carG = new Group();

}

function draw() {

  if(gameState===PLAY){
  background(0);
  boy.x = World.mouseX;
  
  gameover.visible=false;
  edges= createEdgeSprites();
  boy.collide(edges);
 
  
  //code to reset the background
  if(path.y > height ){
    path.y = height/2;
  }
   
  
    createCash();
    createDiamonds();
    createJwellery();
    createSword();
    createCar();

   
    
    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection=treasureCollection+50;
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection=treasureCollection+100;
      
    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection= treasureCollection + 150;
      
       
      
    }else{
      if(carG.isTouching(boy)) {
        gameState=END;
        
       
        boy.visible = false;
       gameover.visible=true;

        
        cashG.destroyEach();
        diamondsG.destroyEach();
        jwelleryG.destroyEach();
        swordGroup.destroyEach();
        carG.destroyEach();
        
        cashG.setVelocityYEach(0);
        carG.setVelocityYEach(0);
        diamondsG.setVelocityYEach(0);
        jwelleryG.setVelocityYEach(0);
        swordGroup.setVelocityYEach(0);
     
    }else if (swordGroup.isTouching(boy)) {
     gameover.visible = true;
         cashG.destroyEach();
        diamondsG.destroyEach();
        jwelleryG.destroyEach();
        swordGroup.destroyEach();
        carG.destroyEach();
        cashG.setVelocityYEach(0);
        diamondsG.setVelocityYEach(0);
        jwelleryG.setVelocityYEach(0);
        swordGroup.setVelocityYEach(0);
     
         
       
    }
       
  }
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,width-150,height/30);
  }

}

function createCash() {
  if (World.frameCount % 200 == 0) {
  var cash = createSprite(Math.round(random(50, width-50),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 8;
  cash.lifetime = 800;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 320 == 0) {
  var diamonds = createSprite(Math.round(random(50,width-50),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 12;
  diamonds.lifetime =800;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 410 == 0) {
  var jwellery = createSprite(Math.round(random(50, width-50),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY =9;
  jwellery.lifetime = 800;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 530 == 0) {
  var sword = createSprite(Math.round(random(50, width-50),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 7;
  sword.lifetime = 800;
  swordGroup.add(sword);
  }
}

function createCar(){
  if(World.frameCount % 200 == 0){
    var car = createSprite(Math.round(random(50,width-50),40,10,10));
  car.addAnimation("Car.png",carImg);
  car.scale = 0.5;
  car.velocityY = 8;
  carG.add(car);
    car.lifeTime = 800;
  
  }
}