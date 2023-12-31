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
  "This is the first message.",
  "This is the second message.",
  "This is the third message.",

];

let scribble;

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
  if(canvasSizeSelected){


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

  }
  
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

  if (keyCode === RIGHT_ARROW && messageIndex < messages.length - 1) {
    messageIndex++;
  } 
  else if (keyCode === LEFT_ARROW && messageIndex > 0) {

    messageIndex--;
  }
  
}



function newText(){
  console.log(input.value());
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
  strokeWeight(3);
  rect(xPosOfGraphics,height/100,(width - xPosOfGraphics * 2) * 0.9,height/8.5 );

  fill(0); // Set text color
  textSize(16);
  noStroke();
  let textX = (width - xPosOfGraphics * 2) * 0.9  ; 
  let textY = height / 100 + height / 8.5 ; 
  textAlign(LEFT,TOP);
  let message1 = messages[messageIndex]; 
  text(message1, width / 25, height / 36,textX,textY);

}
function clockTimer() {
  // Draw the circle
  
  stroke(0);
  fill(255);
  circle(xPosOfGraphics + (width - xPosOfGraphics * 2) * 0.9 + height / 12.75, height / 100 + height / 8.5 / 2, height / 8.5);



  
}


function updateClock() {
  let elapsedtime =  (millis() - stime)/1000;
  push();
  noStroke();
  let end = map(elapsedtime,0,60,-90,270);
  let color = map(end,-90,270,25,255);
  fill(0,0,255,color);
  arc(xPosOfGraphics + (width - xPosOfGraphics * 2) * 0.9 + height / 12.75, height / 100 + height / 8.5 / 2, height / 8.5 , height / 8.5 , -90, end,PIE);
  if (elapsedtime >= 59) {
    console.log("YOU LOSE");
    startClock();

  }
  pop();  
}
function startClock(){
  
  let startclock = millis();
  return startclock;
  

}
