// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let strokeW = 10;
let trashcan;
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

let scribble;

let UserAnswer;
let elapsedtime;


let transitionStartTime;
let transitionDuration = 5000;
let Transition = false;
function preload(){
  trashcan  = loadImage("assets/trash-bin.png");
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
  input.style("border", "2px solid #000");
  input.changed(newText);
  
  clockAngle = - 90;

  stime = startClock();

  for(let i = 0; i < 8; i++){
    coloredCircles[i] = new ColoredCircles(xPosOfGraphics + circlesD * i* 1.25 + circlesD , circleColors[i]); 
  }

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
  scribble = new Scribble();
  angleMode(DEGREES);


  

}

function draw() {

  // Display a message or instructions until a canvas size is selected
  if(canvasSizeSelected && !Transition){

    
    randomSeed(100);

    background(74,165,255);
    
    image(graphics,xPosOfGraphics,yPosOfGraphics);
    cursorShape();
    //image(trashcan,width - width/12.5,height/12.5 * 2,trashcan.width/10,trashcan.height/10);
    strokeWeight(4);
    drawTextBox();
    clockTimer();
    

    for(let circles of coloredCircles){
      circles.show(scribble);
    }
    

    
 
    
    updateClock();
    if(UserAnswer === answers[GameRound] || elapsedtime > 60 ){
      Transition = true;
      startTransition();
      UserAnswer = "";
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
      input.style("display", "block");
    }

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
  if(mouseX>=xPosOfGraphics && mouseX <= xPosOfGraphics + graphics.width && mouseY >= yPosOfGraphics && mouseY <= yPosOfGraphics + graphics.height){
    noCursor();
    push();
    stroke(0);
    rectMode(CENTER);
    fill(colorstate);
    rect(mouseX,mouseY,strokeW,strokeW,50);
    pop();
    
  }
  else{
    cursor(CROSS);
  }
}




function mouseDragged(){
  
  graphics.stroke(colorstate);
  graphics.strokeWeight(strokeW);
  graphics.line(mouseX-xPosOfGraphics,mouseY-yPosOfGraphics,pmouseX-xPosOfGraphics,pmouseY-yPosOfGraphics);

}




function mouseWheel(event) {
  //Making sure that when decreasing the size it is not negative and putting a limit of 10 to  the size
  if (strokeW+ event.delta < 0){
    if (strokeW >10){
      strokeW -= Math.abs(event.delta/10);
    }
  }
  else{
    strokeW += event.delta/10;
  }
}


function collideCirclePoint (x, y, c, d) {
  if( dist(x,y,c.x,c.y) <= d/2 ){
    return true;
  }
  return false;
}



function keyPressed(){
  if(key === " "){
    graphics.background(255);

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



function mousePressed(){
  for(let circles of coloredCircles){
    if(collideCirclePoint(mouseX,mouseY,circles.pos, circles.diameter)){
      colorstate = circles.color;
    }
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
  fill(0); // Set text color
  textSize(16);
  noStroke();
  let textX = (width - xPosOfGraphics * 2) * 0.9  ; 
  let textY = height / 100 + height / 8.5 ; 
  textAlign(LEFT,TOP);
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


