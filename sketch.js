var warriorImg, warrior;
var land;
var ghost, ghostImg;
var gameSound;
var fireShot, fireImg, fireGroup;
var gameState = "start"
var score = 0;
//var missed = 0;
var palace,spear;
var arrow, spear; 
var edges;

function preload(){
  warriorImg = loadImage("knight.png");
  // rightImg = loadImage("Warrior-Right.png");
  // leftImg = loadImage("Warrior-Left.png");
  ghostImg1 = loadImage("zombie1.png");
  ghostImg2 = loadImage("zombie2.png");
  ghostImg3 = loadImage("zombie3.png");
  ghostImg4 = loadImage("zombie4.png");
  ghostImg5 = loadImage("zombie5.png");

  thunder1 = loadImage("1.png")
  thunder2 = loadImage("2.png")
  thunder3 = loadImage("3.png")
  thunder4 = loadImage("4.png")
  gameSound = loadSound("creepy-background.mp3");
  fireImg = loadImage("fires.png");
  palace = loadImage("Castle.png");
  spear = loadImage("spear.png");

}

function setup(){
  gameSound.loop();
  createCanvas(600,500);
  
  
  ghostGroup = new Group();
  fireGroup = new Group();
  arrowGroup = new Group();
  thunderGroup = new Group();
  lasersGroup = new Group();
  
  warrior = createSprite(400,400,50,50);
  warrior.scale = 0.15;
  warrior.addImage("rest",warriorImg);
  //warrior.debug=true;
  warrior.setCollider("circle",0,0,350);
  // warrior.addImage("rest",rightImg);
  // warrior.addImage("rest",leftImg);
  
  land = createSprite(300,470,600,10);
  land.visible=false;
}

function draw(){
  background(0);
  background(palace);
  
  
  if(gameState === "start"){
    text("There is Zombies and fire attack in your city", 150, 150);
    text("You have to kill the Zombies before reaching ground", 150,170);
    text("You have to press space to release arrows to kill them", 150, 190);
    text("Arrows must pass straight through their heart", 150, 210);
    text("You might even have to shoot some of them multiple times to kill", 150, 230);
    text("Press right and left arrow keys to move right and left")
    text("If Fire falls on you then you die", 150, 250);
    text("If Blades touch you then you die", 150, 270);
    text("If Zombies reach ground, they kill you!", 150, 290);
    
    textSize(15);
    fill("red");
    text("Press 'R' to start playing!", 200, 350);
     
    textSize(20)
    text("ZOMBIES IN CITY",200,80);
    
    if(keyDown("r")){
      gameState = "play";
    }
    
  }
  
  if (gameState === "play") {
    textSize(15)
    text("SCORE: "+score, 500, 50);
    spawnThunder()
    if(keyDown("left_arrow")){
       warrior.x = warrior.x - 3;
    }
    
    if(keyDown("right_arrow")){
       warrior.x = warrior.x + 3;
    }
    
    spawnGhost();
    spawnfires();
    spawnLasers();

    edges = createEdgeSprites();
    warrior.collide(edges);
    
    if(keyDown("space")){
      shootArrow();
      if(arrowGroup.isTouching(ghostGroup)){
        ghostGroup.destroyEach();
        arrowGroup.destroyEach();
        score = score+5;
      }
    }
  
    
    if(fireGroup.isTouching(warrior) || ghostGroup.isTouching(warrior) || ghostGroup.isTouching(land) || lasersGroup.isTouching(warrior)){
      gameState = "end";
    }
    
    drawSprites();
   }
  
  else if (gameState === "end"){
    stroke("yellow");
    fill("red");
    textSize(50);
    text("GAME OVER!!", 150,250)
  }

}

function spawnGhost() {
  if (frameCount % 340 === 0) {
    ghost = createSprite(200,0,50,50);
    
    var rand = Math.round(random(1,5));
    switch(rand) {
      case 1: ghost.addImage("ghost", ghostImg1);
              ghost.scale = 0.05
              //ghost.debug=true;
              break;
      case 2: ghost.addImage("ghost", ghostImg2);
              ghost.scale = 0.05
              //ghost.debug=true;
              break;
      case 3: ghost.addImage("ghost", ghostImg3);
              ghost.scale = 0.05
              //ghost.debug=true;
              break;
      case 4: ghost.addImage("ghost", ghostImg4);
              ghost.scale = 0.05
              //ghost.debug=true;
              break;
      case 5: ghost.addImage("ghost", ghostImg5);
              ghost.scale = 0.3
              //ghost.debug=true;
              break;
      default: break;
    }
    
    ghost.x = Math.round(random(100,500));
    ghost.velocityY = 1 +score/15;
   
    //assign lifetime to the variable
    ghost.lifetime = 800;

    
    //add each ghost to the group
    ghostGroup.add(ghost);
  }
}

function spawnfires() {
  //write code here to spawn the clouds
  if (frameCount % 150 === 0) {
    fireShot = createSprite(600,0,40,10);
    fireShot.x = Math.round(random(80,520));
    fireShot.addImage(fireImg);
    fireShot.scale = 0.01;
    fireShot.velocityY = (3+score/100);
    
     //assign lifetime to the variable
    fireShot.lifetime = 800;

    
    //adding cloud to the group
    fireGroup.add(fireShot);
    }
}

function shootArrow() {
  
  arrow= createSprite(400, 350);
  arrow.addImage(spear);
  arrow.scale = 0.03;
  //arrow.debug =true;
  arrow.setCollider("rectangle",0,0,10,300);
  arrow.x = warrior.x;
  arrow.velocityY = -6; 
  arrow.lifetime = 100;
  arrowGroup.add(arrow);
}

function spawnThunder(){
  if(frameCount%60===0){
    thunder = createSprite(Math.round(random(50,550)),50)
    var rand = Math.round(random(1,4))
    if(rand===1){
        thunder.addImage(thunder1)
    }
    else if(rand===2){
      thunder.addImage(thunder2)
    }
    else if(rand===3){
      thunder.addImage(thunder3)
    }
    else if(rand===4){
      thunder.addImage(thunder4)
    } 
    thunder.scale = 0.5
    thunder.lifetime = 20
    thunderGroup.add(thunder)
  }
 
}

function spawnLasers() {
  if (frameCount % 200 === 0) {
    var laser = createSprite(600,120,Math.round(random(5,20)),5);
    laser.height = laser.width
    laser.x = Math.round(random(20,580));
    
    laser.shapeColor = "yellow";

    laser.setVelocity(random(-5,5),random(2,5));
    laser.rotation;
    laser.rotationSpeed=50;
    laser.lifetime = 300;
    
    lasersGroup.add(laser);
  }
}
