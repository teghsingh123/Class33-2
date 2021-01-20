const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;

var engine, world;
var backgroundImg;
var gameState = "onSling";

var score = 0;

function preload() {
    getBackgroundImg();
}

function setup(){
    createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    pig1 = new Pig(810, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    pig3 = new Pig(810, 220);
    log2 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    log3 = new Log(760,120,150, PI/7);
    log4 = new Log(870,120,150, -PI/7);

    bird = new Bird(200,50);

    slingshot = new SlingShot(bird.body,{x:200, y:50});
}

function draw(){
    if(backgroundImg){
        background(backgroundImg);
    }
        textSize(25)
        fill(146,42,42)
        text("Score: " + score, width-150, 50)
    
    Engine.update(engine);
    ground.display();

    box1.display();
    box2.display();
    pig1.display();
    pig1.score();
    log1.display();

    box3.display();
    box4.display();
    pig3.display();
    pig3.score();
    log2.display();

    box5.display();
    log3.display();
    log4.display();

    bird.display();
    platform.display(); 
    slingshot.display();  
    

}

function mouseDragged(){
    if(mouseX >= 0 && mouseX < 200 && gameState!== "launched"){
        Body.setPosition(bird.body, {x: mouseX , y: mouseY});
    }
}


function mouseReleased(){
    slingshot.fly();
    gameState = "launched";
}

function keyPressed(){
    if(keyCode === 32 && gameState === "launched"){
        Body.setPosition(bird.body,{x:200,y:50});
        slingshot.attach(bird.body);
        gameState="onSling";
    }
}

async function getBackgroundImg(){
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var responseJSON = await response.json();

    var datetime = responseJSON.datetime;
    var hour = datetime.slice(11,13);
    
    if(hour>=06 && hour<=19){
        bg = "sprites/bg1.png";
    }
    else{
        bg = "sprites/bg2.jpg";
    }

    backgroundImg = loadImage(bg);
}
