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
let sc;
let startSecond;


let messages = [
  "This is the first message.",
  "This is the second message.",
  "This is the third message.",

];
function preload(){
  trashcan  = loadImage("assets/trash-bin.png");
}
function setup() {
  angleMode(DEGREES);
  createCanvas(windowWidth , windowHeight);
  input = createInput();
  circleY = (height/7.5 + height/ 1.25 + height) / 2;

  
  graphics = createGraphics(width - width/30 * 2,height/1.25);
  graphics.background(255);
  circlesD = sqrt(width*height)/30;


  input.class("custom-input");
  input.size(graphics.width / 3,graphics.height/20);
  input.position(graphics.width/2 - input.width/2 + width/30, (height/7.5 + height/ 1.25 + height) / 2 - input.height/2);
  input.style("font-size", "22px");
  input.style("text-transform", "uppercase");
  input.attribute("placeholder", "GUESS HERE");
  input.style("text-align", "center");
  input.style("::placeholder", "text-shadow: 0 0 5px #000");
  input.style("font-weight", "bold");
  input.style("border", "2px solid #000");
  input.changed(newText);
  
  clockAngle = - 90;


}

function draw() {
  background(74,165,255);
  
  image(graphics,width/30,height/7.5);
  cursorShape();
  image(trashcan,width - width/12.5,height/12.5 * 2,trashcan.width/10,trashcan.height/10);
  strokeWeight(4);
  drawTextBox();
  clockTimer();
  


  

  
  drawCircles();
  
  updateClock();
  
}


function cursorShape(){
  if(mouseX>=width/30 && mouseX <= width/30 + graphics.width && mouseY >= height/7.5 && mouseY <= height/7.5 + graphics.height){
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


function drawCircles(){
  strokeWeight(2);
  for(let i = 0 ; i<8; i++){

    fill(0);
    if(i ===0 ){
      fill(255,0,0);
      
    }
    else if(i ===1 ){
      fill(255,128,0);
    }
    else if(i ===2 ){
      fill(255,255,0);
    }
    else if(i ===3 ){
      fill(0,255,0);
    }
    else if(i ===4 ){
      fill(0,0,255);
    }
    else if(i ===5 ){
      fill(255,0,255);
    }
    else if(i ===7 ){
      fill(255);
    }
    
    circle(width/30 + circlesD * i* 1.25 + circlesD ,circleY,circlesD);
  }
}
function mouseDragged(){
  
  graphics.stroke(colorstate);
  graphics.strokeWeight(strokeW);
  graphics.line(mouseX-width/30,mouseY-height/7.5,pmouseX-width/30,pmouseY-height/7.5);

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


function collideCirclePoint (x, y, cx, cy, d) {
  if( dist(x,y,cx,cy) <= d/2 ){
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
  
  if(collideCirclePoint(mouseX,mouseY,width/30 + circlesD * 0* 1.25 + circlesD,circleY,circlesD) ){
    colorstate = "red";

  }
  else if(collideCirclePoint(mouseX,mouseY,width/30 + circlesD * 1* 1.25 + circlesD,circleY,circlesD) ){
    colorstate = "orange";
  }
  else if(collideCirclePoint(mouseX,mouseY,width/30 + circlesD * 2* 1.25 + circlesD,circleY,circlesD) ){
    colorstate = "yellow";
  }
  else if(collideCirclePoint(mouseX,mouseY,width/30 + circlesD * 3* 1.25 + circlesD,circleY,circlesD) ){
    colorstate = "lime";
  }
  else if(collideCirclePoint(mouseX,mouseY,width/30 + circlesD * 4* 1.25 + circlesD,circleY,circlesD) ){
    colorstate = "blue";
  }
  else if(collideCirclePoint(mouseX,mouseY,width/30 + circlesD * 5* 1.25 + circlesD,circleY,circlesD) ){
    colorstate = "fuchsia";
  }
  else if(collideCirclePoint(mouseX,mouseY,width/30 + circlesD * 6* 1.25 + circlesD,circleY,circlesD)){
    colorstate = "black";
  }
  else if(collideCirclePoint(mouseX,mouseY,width/30 + circlesD * 7* 1.25 + circlesD,circleY,circlesD) ){
    colorstate = "white";
  }
  if(collideCirclePoint(mouseX,mouseY,width - width/12.5,height/12.5 * 2,100)){
    graphics.background(255);
    console.log("H");
  }
}

function drawTextBox(){
  fill(255);
  rect(width/30,height/100,(width - width/30 * 2) * 0.9,height/8.5);
  fill(0); // Set text color
  textSize(16);
  noStroke();
  let textX = (width - width / 30 * 2) * 0.9  ; 
  let textY = height / 100 + height / 8.5 ; 
  textAlign(LEFT,TOP);
  let message1 = messages[messageIndex]; 
  text(message1, width / 25, height / 36,textX,textY);

}
function clockTimer() {
  // Draw the circle
  
  stroke(0);
  fill(255);
  circle(width / 30 + (width - width / 30 * 2) * 0.9 + height / 12.75, height / 100 + height / 8.5 / 2, height / 8.5);



  
}


function updateClock() {

  sc = second() ;
  noStroke();
  let end = map(sc,0,60,-90,270);
  let color = map(end,-90,270,25,255);
  fill(0,0,255,color);
  arc(width / 30 + (width - width / 30 * 2) * 0.9 + height / 12.75, height / 100 + height / 8.5 / 2, height / 8.5 , height / 8.5 , -90, end,PIE);
  if (sc >= 59) {
    console.log("YOU LOSE");
  }
}

