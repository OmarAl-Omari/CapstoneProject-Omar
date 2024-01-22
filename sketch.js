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
  ["Draw a square then I triangle above it asfasdf asdf sadf asdf asdf asdf asdf asdf asdf adsfasdf asd fadf asdf sadf adf asdf sdf ",
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

let toggleSwitch, toggleSwitchX, toggleSwitchY, toggleSwitchWidth, toggleSwitchHeight;

let themeColors = ["#F8EDE3", "#BDD2B6", "#A2B29F", "#798777","#FFD4D4"];
let backgroundImage;
let titleFont;

function preload(){
  trashcan  = loadImage("assets/trashClosed.png");
  trashcanOpen = loadImage("assets/trashOpened.png");
  rightarrow = loadImage("assets/rightarrow.png");
  heart = loadImage("assets/Heart.png");
  font = loadFont("assets/Font.ttf");
  titleFont = loadFont("assets/titleFont.ttf");
  X = loadImage("assets/X.png");
  backgroundImage = loadImage("assets/background.jpeg");
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
  input.style("font-size", "1.5vw");
  input.style("text-transform", "uppercase");
  input.attribute("placeholder", "GUESS HERE");
  input.style("text-align", "center");

  input.style("border", "1px solid #FFD4D4");

  input.style("font-family", "font");
  
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
  

  toggleSwitchWidth = width/25;
  toggleSwitchHeight = toggleSwitchWidth/2;

  toggleSwitchX =   input.width+ input.x +( rightarrowX - heartWidth * 4 - (input.width + input.x ))/2;
  toggleSwitchY = input.y + toggleSwitchWidth/4;

  toggleSwitch =  new CustomSwitch(toggleSwitchX, toggleSwitchY,toggleSwitchWidth,toggleSwitchHeight);

 

}




function startGame(){
  
  const canvasSizeDropdown = document.querySelector("#canvasSize");
  const selectedSize = canvasSizeDropdown.value;
  const startButton = document.querySelector("#startButton");
  const canvasSizeLabel = document.querySelector("#canvasSizeLabel");
  const gameTitle = document.getElementById("gameTitle");
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
  gameTitle.remove();
  createCanvas(canvasWidth,canvasHeight);


  canvasSizeSelected = true;
  setPosAndSizes();

}

function setup() {
  createCanvas(windowWidth,windowHeight);
  image(backgroundImage,0,0,width,height);
  
 
  angleMode(DEGREES);
 
  document.querySelector(".canvasSizeDropdown").addEventListener("click", function() {
    this.classList.toggle("active");

   
    
  });
  
  
  // Remove the 'active' class when the mouse is released

  

}

function draw() {

  // Display a message or instructions until a canvas size is selected
  if(canvasSizeSelected && !Transition){

    background(themeColors[2]);

    image(graphics,xPosOfGraphics,yPosOfGraphics);

    randomSeed();
    drawTextBox();
    borderForGraphicsAndInput();
    toggleSwitch.display();

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
      
      UserAnswer = undefined;
      if(skip){
        numSkips -= 1;
      }
    }



  }

  if(Transition ){
    if(millis() - transitionStartTime < transitionDuration){
      
      stime = startClock();
      input.style("display", "none");
      
      drawTransitionScreen();
    }
    else{
      clearLines();
      changeRound();
      
      Transition = false;
      skip = false;
      
      input.style("display", "block");
    }

  }
  
}

function borderForGraphicsAndInput(){
  noFill();
  strokeWeight(5);
  stroke(themeColors[3]);
  //rect(xPosOfGraphics,yPosOfGraphics,graphics.width,graphics.height);
  scribble.scribbleRect(xPosOfGraphics + graphics.width/2,yPosOfGraphics + graphics.height/2,graphics.width,graphics.height);

  strokeWeight(5);
  stroke(themeColors[4]);
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
  push();
  tint(255,millis()%120 * 0.25);
  image(backgroundImage,0,0,width,height);
  pop();
  
  
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
    
    circle(mouseX,mouseY,strokeThickValue);
    
 
    
  }
  else{
    cursor(CROSS);
  }
}




function mouseDragged(){
 

  
  if(!toggleSwitch.on){
    graphics.stroke(colorstate);
    graphics.strokeWeight(strokeThickValue);
    push();
    
  
    graphics.line(mouseX - xPosOfGraphics,mouseY - yPosOfGraphics,pmouseX - xPosOfGraphics,pmouseY - yPosOfGraphics);
    pop();
  }
  else{
    let halfThickness = strokeThickValue/2;

    let mousex = constrain(mouseX, xPosOfGraphics + halfThickness, xPosOfGraphics + graphics.width - halfThickness);
    let mousey = constrain(mouseY, yPosOfGraphics + halfThickness, yPosOfGraphics + graphics.height - halfThickness);
    let pmousex = constrain(pmouseX, xPosOfGraphics + halfThickness, xPosOfGraphics + graphics.width - halfThickness);
    let pmousey = constrain(pmouseY, yPosOfGraphics + halfThickness, yPosOfGraphics + graphics.height - halfThickness);
  
    lines.push({
        
      x1: mousex,
      y1: mousey,
      x2: pmousex,
      y2: pmousey,
      lineColor: colorstate,
      lineThickness: strokeThickValue
    });
  }


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
  graphics.background(255);
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
  if(collidePointRect(mouseX,mouseY,toggleSwitchX - toggleSwitchWidth/2,toggleSwitchY - toggleSwitchHeight/2,toggleSwitchWidth,toggleSwitchHeight)){
    toggleSwitch.on = !toggleSwitch.on;

  }

}

function drawTextBox(){
 
  
 
  strokeWeight(5);
  stroke(themeColors[0]);
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
  stroke(themeColors[0]);
  strokeWeight(7);
  scribble.scribbleFilling(XcordsFilling,YcordsFilling,20,210);

  rectMode(CENTER);
  fill(255,100);
  noStroke();
  rect(textBoxX,textBoxY,textBoxWidth,textBoxHeight);
  rectMode(CORNER);


  fill(themeColors[2]); 
  stroke(themeColors[3]);
  strokeWeight(10);
 
  let textX = (width - xPosOfGraphics * 2) * 0.9  ; 
  let textY = height / 100 + height / 8.5 ; 
  textAlign(LEFT,TOP);
  textSize(32);
  textFont(font);


  

  let message1 = messages[GameRound][messageIndex];
  textLeading(50);
  text(message1, width / 25, height / 36 - 10,textX,textY );
  
  
  


}
function clockTimer() {
  // Draw the circle
  
  stroke(themeColors[4]);
  strokeWeight(5);
  fill(255,200);
  //circle(xPosOfGraphics + (width - xPosOfGraphics * 2) * 0.9 + height / 12.75, height / 100 + height / 8.5 / 2, height / 8.5);

  scribble.buildEllipse(xPosOfGraphics + (width - xPosOfGraphics * 2) * 0.9 + height / 12.75, height / 100 + height / 8.5 / 2, height / 17,height/17,width/750,0);



  
}


function updateClock() {
  elapsedtime =  (millis() - stime)/1000;
  push();
  noStroke();
  let end = map(elapsedtime,0,60,-90,270);
  let color = map(end,-90,270,25,255);
  fill(121, 135, 119,color);   
  arc(xPosOfGraphics + (width - xPosOfGraphics * 2) * 0.9 + height / 12.75, height / 100 + height / 8.5 / 2, height / 8.5 - 5 , height / 8.5 -5 , -90, end,PIE);
  if (elapsedtime >= 59) {
    startClock();

  }
  pop();  
}
function startClock(){
  
  let startclock = millis();
  return startclock;
}



