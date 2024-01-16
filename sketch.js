// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let strokeThickValue= 10;

let graphics;
let colorstate = "black";
let input;
let circlesD;
let circleY;
let messageIndex = 0 ;
let clockAngle;
let totalTime = 60;

let startSecond;
let stime;

let canvasSizeSelected = false;
let canvasWidth;
let canvasHeight;

let xPosOfGraphics;
let yPosOfGraphics;
let coloredCircles = [];
let circleColors = ["red", "orange", "yellow", "lime", "blue", "fuchsia", "black", "white" ];
let messages = [
  ["Draw a square then I triangle above it",
    "Do not forget to put square eyes",
    "and a lengthy mouth"],
  ["This is the second round",
    "hello"
  ],
  ["This is the third round"],
  ["This is the fourth round"],
  ["This is the fifth round"],
  ["This is the sixth round"],
  ["This is the seventh round"],
  ["This is the eigthth round"],
  ["This is the nineth round"],
  ["This is the tenth round"],
];
let answers = ["HOUSE","2","3","4","5","6","7","8","9","10"];

let GameRound = 0;

let scribble = new Scribble();

let UserAnswer;
let elapsedtime;


let transitionStartTime;
let transitionDuration = 5000;
let Transition = false;
let skip = false;
let numSkips = 3;


let trashcan;
let trashcanOpen;
let heart;
let heartWidth;
let rightarrow;
let rightarrowX;
let rightarrowY;
let rightarrowWidth;
let rightarrowHeight;
let trashcanX, trashcanY, trashcanWidth, trashcanHeight;

let font;

let X;
let counterForX;
let startTimerX = true;
let lines = [];

function preload(){
  trashcan  = loadImage("assets/trashClosed.png");
  trashcanOpen = loadImage("assets/trashOpened.png")
  rightarrow = loadImage("assets/rightarrow.png");
  heart = loadImage("assets/Heart.png");
  font = loadFont("assets/Font.ttf");
  X = loadImage("assets/X.png");
}




function setPosAndSizes(){
  xPosOfGraphics = width/30;
  yPosOfGraphics = height/7.5;

  input = createInput();
  
  graphics = createGraphics(width - xPosOfGraphics * 2,height/1.25);
  graphics.background(255);
  circlesD = sqrt(width*height)/30;

  
  input.class("custom-input");
  input.size(graphics.width / 3,graphics.height/20);
  input.position(graphics.width/2 - input.width/2 + xPosOfGraphics, (yPosOfGraphics + graphics.height + height) / 2 - input.height/2);
  input.style("font-size", "22px");
  input.style("text-transform", "uppercase");
  input.attribute("placeholder", "GUESS HERE");
  input.style("text-align", "center");
  input.style("::placeholder", "text-shadow: 0 0 5px #000");
  input.style("font-weight", "bold");
  
  input.changed(newText);
  
  clockAngle = - 90;

  stime = startClock();

  for(let i = 0; i < 8; i++){
    coloredCircles[i] = new ColoredCircles(xPosOfGraphics + circlesD * i* 1.25 + circlesD , circleColors[i]); 


  }

  // Arrow image
  rightarrowWidth = width/30;
  rightarrowHeight = rightarrowWidth *(rightarrow.height/rightarrow.width);

  rightarrowX = graphics.width;
  rightarrowY = height -rightarrowHeight;
  
  heartWidth = rightarrowHeight/1.5 * (heart.width/heart.height);
  
  

 

}




function startGame(){
  
  const canvasSizeDropdown = document.querySelector("#canvasSize");
  const selectedSize = canvasSizeDropdown.value;
  const startButton = document.querySelector("#startButton");
  const canvasSizeLabel = document.querySelector("#canvasSizeLabel");
  const [widthStr, heightStr] = selectedSize.split("x");


  if (selectedSize === "windowWidthxwindowHeight") {
    // Set canvas size based on window's width and height
    canvasWidth = window.innerWidth;
    canvasHeight = window.innerHeight;
  }
  else{
    canvasWidth = Number(widthStr);
    canvasHeight = Number(heightStr);
  }

  canvasSizeDropdown.remove();
  canvasSizeLabel.remove();
  startButton.remove();
  createCanvas(canvasWidth,canvasHeight);


  canvasSizeSelected = true;
  setPosAndSizes();

}

function setup() {
  createCanvas(windowWidth,windowHeight);
  background(127);
  
 
  angleMode(DEGREES);
 

  

}

function draw() {

  // Display a message or instructions until a canvas size is selected
  if(canvasSizeSelected && !Transition){

    background(74,165,255);

    image(graphics,xPosOfGraphics,yPosOfGraphics);

    randomSeed();
    drawTextBox();
    borderForGraphicsAndInput();

    for (let i = 0; i < lines.length; i++) {
      stroke(lines[i].lineColor); 
      strokeWeight(lines[i].lineThickness);
      scribble.scribbleLine(lines[i].x1, lines[i].y1, lines[i].x2, lines[i].y2);
    }
    randomSeed(100);
    image(rightarrow,rightarrowX,rightarrowY,rightarrowWidth,rightarrowHeight);
    drawingHearts();
   
    
    

    
    
    displayAndAnimateTrash();

    cursorShape();
 
    strokeWeight(4);
    
    clockTimer();
    

    for(let circles of coloredCircles){
      circles.show(scribble);

    }
    
    

    
 
    
    updateClock();
    if(UserAnswer !== answers[GameRound] && UserAnswer!== undefined){
      if(startTimerX){
        counterForX = startClock();
      }
      startTimerX = false;
      push();
      imageMode(CENTER);
      image(X,width/2,height/2,width/3, width/3* (X.height/X.width));
      pop();
      if(millis() - counterForX > 500){
        UserAnswer = undefined;
        startTimerX = true;
       
      }
    }

    if(UserAnswer === answers[GameRound] || elapsedtime > 60 || skip){
      Transition = true;
      startTransition();
      UserAnswer = undefined
      if(skip){
        numSkips -= 1;
      }
    }



  }

  if(Transition ){
    if(millis() - transitionStartTime < transitionDuration){
      
      stime = startClock();
      input.style("display", "none");
      background(0,millis()%60 * 0.5);
      drawTransitionScreen();
    }
    else{
      changeRound();
      graphics.background(255);
      Transition = false;
      skip = false;
      
      input.style("display", "block");
    }

  }
  
}

function borderForGraphicsAndInput(){
  noFill();
  strokeWeight(5);
  stroke(0);
  //rect(xPosOfGraphics,yPosOfGraphics,graphics.width,graphics.height);
  scribble.scribbleRect(xPosOfGraphics + graphics.width/2,yPosOfGraphics + graphics.height/2,graphics.width,graphics.height);

  strokeWeight(5);
  stroke(0);
  scribble.scribbleRect(input.x + input.width/2,input.y + input.height/2,input.width,input.height);

}
function displayAndAnimateTrash(){
  trashcanWidth = width/50;
  trashcanHeight = trashcanWidth * (trashcan.height/trashcan.width);
  trashcanX = graphics.width;
  trashcanY = yPosOfGraphics + trashcanWidth/2;
  if(collidePointRect(mouseX,mouseY,trashcanX,trashcanY,trashcanWidth,trashcanHeight)){
    image(trashcanOpen,trashcanX,trashcanY,trashcanWidth,trashcanHeight);
  }
  else{
    image(trashcan,trashcanX,trashcanY,trashcanWidth,trashcanHeight);
  }
}

function drawingHearts(){
  if(numSkips === 3){
    image(heart,rightarrowX - heartWidth * 4,rightarrowY + heartWidth/4,heartWidth,rightarrowHeight/1.5);
    image(heart,rightarrowX - heartWidth * 3,rightarrowY + heartWidth/4,heartWidth,rightarrowHeight/1.5);
    image(heart,rightarrowX - heartWidth * 2,rightarrowY + heartWidth/4,heartWidth,rightarrowHeight/1.5);

  }
  else if(numSkips === 2){

    image(heart,rightarrowX - heartWidth * 4,rightarrowY + heartWidth/4,heartWidth,rightarrowHeight/1.5);
    image(heart,rightarrowX - heartWidth * 3,rightarrowY + heartWidth/4,heartWidth,rightarrowHeight/1.5);

  }
  else if(numSkips === 1){
    image(heart,rightarrowX - heartWidth * 4,rightarrowY + heartWidth/4,heartWidth,rightarrowHeight/1.5);

  }
}
function changeRound(){
  messageIndex = 0;
  GameRound++;
}
function drawTransitionScreen(){
  text("HI",width/2,height/2);
}
function startTransition(){
  transitionStartTime = millis();

}

function cursorShape(){
  if(Transition){
    cursor(WAIT);
  }
  else if(mouseX>=xPosOfGraphics && mouseX <= xPosOfGraphics + graphics.width && mouseY >= yPosOfGraphics && mouseY <= yPosOfGraphics + graphics.height){
    noCursor();
   
    noStroke();


    fill(colorstate);
    circle(mouseX,mouseY,strokeThickValue,strokeThickValue);
 
    
  }
  else{
    cursor(CROSS);
  }
}




function mouseDragged(){
  
  //graphics.stroke(colorstate);
  //graphics.strokeWeight(strokeW);


  
  lines.push({
    x1: mouseX,
    y1: mouseY,
    x2: pmouseX,
    y2: pmouseY,
    lineColor: colorstate,
    lineThickness: strokeThickValue
  });


}







function mouseWheel(event) {
  //Making sure that when decreasing the size it is not negative and putting a limit of 10 to  the size
  if (strokeThickValue+ event.delta < 0){
    if (strokeThickValue>10){
      strokeThickValue-= Math.abs(event.delta/10);
    }
  }
  else{
    strokeThickValue+= event.delta/10;
  }
}






function keyPressed(){
  if(key === " "){
    clearLines();

  }

  if (keyCode === RIGHT_ARROW && messageIndex < messages[GameRound].length - 1) {
    messageIndex++;
  } 
  else if (keyCode === LEFT_ARROW && messageIndex > 0) {

    messageIndex--;
  }
  
}



function newText(){
  
  UserAnswer = input.value().toUpperCase();
  input.value("");

}

function clearLines(){
  lines = [];
}

function mousePressed(){
  for(let circles of coloredCircles){
    if(collidePointCircle(mouseX,mouseY,circles.pos.x,circles.pos.y, circles.diameter)){
      colorstate = circles.color;
    }
  }

  if(collidePointRect(mouseX,mouseY,rightarrowX,rightarrowY + rightarrowHeight/3,rightarrowWidth,rightarrowHeight/4) && numSkips>0){
    
    skip = true;
  }
  if(collidePointRect(mouseX,mouseY,trashcanX,trashcanY,trashcanWidth,trashcanHeight)){
    clearLines();

  }

}

function drawTextBox(){
 
  
  fill(255);
  strokeWeight(5);
  stroke(255);
  let textBoxWidth = (width - xPosOfGraphics * 2) * 0.9;
  let textBoxHeight = height/8.5;
  let textBoxX = xPosOfGraphics +textBoxWidth/2;
  let textBoxY = height/100 + textBoxHeight/2;
  let XcordsFilling = [textBoxX];
  let YcordsFilling = [textBoxY];

  for(let i = 0; i< 360; i+= 1){
    let x = textBoxX + textBoxWidth / 2 * cos((i));
    let y = textBoxY + textBoxHeight / 2 * sin((i));
    XcordsFilling.push(x);
    YcordsFilling.push(y);
  }
  scribble.scribbleRect(textBoxX,textBoxY,textBoxWidth,textBoxHeight);
  stroke(255);
  strokeWeight(7);
  scribble.scribbleFilling(XcordsFilling,YcordsFilling,20,210);

  rectMode(CENTER);
  fill(255,100);
  noStroke();
  rect(textBoxX,textBoxY,textBoxWidth,textBoxHeight);
  rectMode(CORNER);


  fill(255,0,0); 
  stroke(0);
  let textX = (width - xPosOfGraphics * 2) * 0.9  ; 
  let textY = height / 100 + height / 8.5 ; 
  textAlign(LEFT,TOP);
  textFont(BOLD,32);
  let message1 = messages[GameRound][messageIndex]; 
  text(message1, width / 25, height / 36,textX,textY);
  
  
  


}
function clockTimer() {
  // Draw the circle
  
  stroke(0);
  strokeWeight(5);
  fill(255);
  //circle(xPosOfGraphics + (width - xPosOfGraphics * 2) * 0.9 + height / 12.75, height / 100 + height / 8.5 / 2, height / 8.5);

  scribble.buildEllipse(xPosOfGraphics + (width - xPosOfGraphics * 2) * 0.9 + height / 12.75, height / 100 + height / 8.5 / 2, height / 17,height/17,width/750,0);



  
}


function updateClock() {
  elapsedtime =  (millis() - stime)/1000;
  push();
  noStroke();
  let end = map(elapsedtime,0,60,-90,270);
  let color = map(end,-90,270,255,25);
  fill(0,0,255,color);
  arc(xPosOfGraphics + (width - xPosOfGraphics * 2) * 0.9 + height / 12.75, height / 100 + height / 8.5 / 2, height / 8.5 , height / 8.5 , -90, end,PIE);
  if (elapsedtime >= 59) {
    startClock();

  }
  pop();  
}
function startClock(){
  
  let startclock = millis();
  return startclock;
}


function TransitionScreen(){
  text("hello",0,0);
}


