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


//This function uploads all my assets
function preload(){
  //For the trashcan
  trashcan  = loadImage("assets/trashClosed.png");
  trashcanOpen = loadImage("assets/trashOpened.png");
  //For the skip arrow
  rightarrow = loadImage("assets/rightarrow.png");
  //Heart
  heart = loadImage("assets/Heart.png");
  //This font is used in the game
  font = loadFont("assets/Font.ttf");
  //This font is used in the start screen
  titleFont = loadFont("assets/titleFont.ttf");
  //This is the x used when player guesses wrong
  X = loadImage("assets/X.png");
  //The image maded by me for the background
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



//This function is active when the player presses the start game botton
function startGame(){
  //Getting all the buttons and text from my html
  const canvasSizeDropdown = document.querySelector("#canvasSize");
  const selectedSize = canvasSizeDropdown.value;
  const startButton = document.querySelector("#startButton");
  const canvasSizeLabel = document.querySelector("#canvasSizeLabel");
  const gameTitle = document.getElementById("gameTitle");
  const [widthStr, heightStr] = selectedSize.split("x");


  //Making teh canvas ratio based on what the player selected
  if (selectedSize === "windowWidthxwindowHeight") {
    // Set canvas size based on window's width and height
    canvasWidth = windowWidth;
    canvasHeight = windowHeight;
  }
  else{
    canvasWidth = Number(widthStr);
    canvasHeight = Number(heightStr);
  }
  //Removing all the buttons and text in the html
  canvasSizeDropdown.remove();
  canvasSizeLabel.remove();
  startButton.remove();
  gameTitle.remove();
  //Creating the canvas based on the selected ratio
  createCanvas(canvasWidth,canvasHeight);
  //Starting the game and setting the position and sizes of everything
  canvasSizeSelected = true;
  setPosAndSizes();
}

function setup() {
  //This is for the start Screen where the player can choose the game ratio and start the game
  createCanvas(windowWidth,windowHeight);
  image(backgroundImage,0,0,width,height);
  
  //Setting angle mode
  angleMode(DEGREES);
 
  //This is for my query in my html file to check when the player clicks on it to change color
  document.querySelector(".canvasSizeDropdown").addEventListener("click", function() {
    this.classList.toggle("active");
    
  });

}
// The main loop
function draw() {
  //All of this is where the player can see the screen to play
  //Where the player gusses and reads the questions
  if(canvasSizeSelected && !Transition){
    //Create the background and the graphics
    background(themeColors[2]);
    image(graphics,xPosOfGraphics,yPosOfGraphics);
    //Setting a random seed for the elements below it These elements will move (wiggle) 
    randomSeed();
    drawTextBox(); //This is to draw the text box with everything in it (text, border, color)
    borderForGraphicsAndInput(); //This is to draw a wiggly border around the graphics and input
    toggleSwitch.display(scribble,themeColors); //This is to display the toggle switch



    for (let i = 0; i < lines.length; i++) {
      
      stroke(lines[i].lineColor); 
      strokeWeight(lines[i].lineThickness);
      scribble.scribbleLine(lines[i].x1, lines[i].y1, lines[i].x2, lines[i].y2);
    }
    //Setting a seed that is not random (under this nothing that is created by scribble will wiggle)
    randomSeed(100);
    //This is to display the skip button 
    image(rightarrow,rightarrowX,rightarrowY,rightarrowWidth,rightarrowHeight);
    //display the amount of hearts the player has left
    drawingHearts();
    //This is to display the trash with animation
    displayAndAnimateTrash();
    //Changing cursor shape based on it's position
    cursorShape();
    //This is to show the clock on the screen
    displayClock();
    //Updating the timer of the clock and the arc that is filling it
    updateClock();
    //Displaying the circles for the player to change colors
    for(let circles of coloredCircles){
      circles.show(scribble);

    }
    
    //This code is to see if the player got the wrong answer (making sure that we do not detect if the player enters nothing)
    if(UserAnswer !== answers[GameRound] && UserAnswer!== undefined){
      //This code is to display the X for 0.5s
      //Start the clock for the X timer
      if(startTimerX){
        counterForX = startClock();
      }
      //Set it to false 
      startTimerX = false;
      //Creating the x image
      push();
      imageMode(CENTER);
      image(X,width/2,height/2,width/3, width/3* (X.height/X.width));
      pop();
      //Checking if the time ended
      if(millis() - counterForX > 500){
        UserAnswer = undefined; //Mkae the user answer undefined to get out of this if-statment
        startTimerX = true; //Set the timer to true to use it again
       
      }
    }
    //Checking wether the user got the answer, lost on time or skipped
    if(UserAnswer === answers[GameRound] || elapsedtime > 60 || skip){
      Transition = true; //Starting the loop for the transition screen
      startTransitionTimer(); //Start the timer for the transiton

      //This is here to make sure the X does not show up the next round
      UserAnswer = undefined; 
      //If the user went to the next round becuase he skipped I remove a skip
      if(skip){
        numSkips -= 1;
      }
    }

  }

  //This is where the elements are drawn for the transition
  if(Transition ){
    //The transition should last for 5 seconds
    if(millis() - transitionStartTime < transitionDuration){
      //Remove the input that was displayed
      input.style("display", "none");
      //Display the transition screen
      drawTransitionScreen();
    }
    //To check when the timer ends for the transition
    else{
      //Clear the graphics 
      clearLines();
      //Change the round number
      changeRound();
      //Reset the clock
      stime = startClock();
      //Getting out of this loop
      Transition = false;
      //Making sure that if the player skipped to set it back to false
      skip = false;
      //displaying the input again
      input.style("display", "block");
    }

  }
  
}

//This function is only to draw a scribbly border for the Graphic Screen and input
function borderForGraphicsAndInput(){

  noFill();
  strokeWeight(5);
  //Setting color and rect for the border of the graphcis
  stroke(themeColors[3]);
  scribble.scribbleRect(xPosOfGraphics + graphics.width/2,yPosOfGraphics + graphics.height/2,graphics.width,graphics.height);

  //Setting color and rect for the border of the input
  stroke(themeColors[4]);
  scribble.scribbleRect(input.x + input.width/2,input.y + input.height/2,input.width,input.height);
}

//Function to display and change images of the trahcan
function displayAndAnimateTrash(){
  //Setting the width,height,x,y for the trashcan
  trashcanWidth = width/50;
  trashcanHeight = trashcanWidth * (trashcan.height/trashcan.width);
  trashcanX = graphics.width;
  trashcanY = yPosOfGraphics + trashcanWidth/2;
  //Checking if the mouse hovers over the trash to display the opened trashcan
  if(collidePointRect(mouseX,mouseY,trashcanX,trashcanY,trashcanWidth,trashcanHeight)){
    image(trashcanOpen,trashcanX,trashcanY,trashcanWidth,trashcanHeight);
  }
  //If not display the closed trashcan
  else{
    image(trashcan,trashcanX,trashcanY,trashcanWidth,trashcanHeight);
  }
}

//Function to draw the hearts
function drawingHearts(){
  //Drawing the number of hearts based on how many skips the player has 
  if(numSkips === 3){
    for(let i = 4; i>=2; i-- ){
      image(heart,rightarrowX - heartWidth * i,rightarrowY + heartWidth/4,heartWidth,rightarrowHeight/1.5);
    }
  }
  else if(numSkips === 2){

    image(heart,rightarrowX - heartWidth * 4,rightarrowY + heartWidth/4,heartWidth,rightarrowHeight/1.5);
    image(heart,rightarrowX - heartWidth * 3,rightarrowY + heartWidth/4,heartWidth,rightarrowHeight/1.5);

  }
  else if(numSkips === 1){
    image(heart,rightarrowX - heartWidth * 4,rightarrowY + heartWidth/4,heartWidth,rightarrowHeight/1.5);

  }
}

//This is only to change round of the game
function changeRound(){
  //Set back the message index to 0 so the text goes back to the first message for the next round
  messageIndex = 0;
  GameRound++; //increase the round number
}

//Function to display the elements for the transition screen
function drawTransitionScreen(){
  text("HI",width/2,height/2);
  push();
  //Giving it a nice animation for the transiton screen entering
  tint(255,millis()%120 * 0.25);
  image(backgroundImage,0,0,width,height); //displaying the background for the game
  pop();
  
  
}
//This function is only to start the transiton timer
function startTransitionTimer(){
  transitionStartTime = millis();

}
//function to change the cursor shape based on the position of the mouse
function cursorShape(){

  //if the mouse is insided the drawing area
  if(mouseX>=xPosOfGraphics && mouseX <= xPosOfGraphics + graphics.width && mouseY >= yPosOfGraphics && mouseY <= yPosOfGraphics + graphics.height){
    noCursor();
    noStroke();
    fill(colorstate);  
    circle(mouseX,mouseY,strokeThickValue);
  }
  //If the curson is not inside the drawing area
  else{
    cursor(CROSS);
  }
}



//This function is to check if the player is drawing(dragging the mouse)
function mouseDragged(){
  //To check if the player did not set the scribble mode then draw a normal line
  if(!toggleSwitch.on){
    //Determine the color and the strokeThickness of the line
    graphics.stroke(colorstate);
    graphics.strokeWeight(strokeThickValue);
    push();
    //Creating the line based on the mouseX and mouseY positions
    graphics.line(mouseX - xPosOfGraphics,mouseY - yPosOfGraphics,pmouseX - xPosOfGraphics,pmouseY - yPosOfGraphics);
    pop();
  }
  else{
    //Constrain the mouse postiion to only be inside the graphics border
    let halfThickness = strokeThickValue/2;
    let mousex = constrain(mouseX, xPosOfGraphics + halfThickness, xPosOfGraphics + graphics.width - halfThickness);
    let mousey = constrain(mouseY, yPosOfGraphics + halfThickness, yPosOfGraphics + graphics.height - halfThickness);
    let pmousex = constrain(pmouseX, xPosOfGraphics + halfThickness, xPosOfGraphics + graphics.width - halfThickness);
    let pmousey = constrain(pmouseY, yPosOfGraphics + halfThickness, yPosOfGraphics + graphics.height - halfThickness);
    //Give the information for the lines that are going to be created
    //(x1,y1,x2,y2) based on the mouse position
    lines.push({
      
      x1: mousex,
      y1: mousey,
      x2: pmousex,
      y2: pmousey,
      //Set the color and thickness of the lines
      lineColor: colorstate,
      lineThickness: strokeThickValue
    });
  }


}




//Function to increase or decrease the line thickness if the mouseWheel is moved
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

//Function to check the if the keyboard is pressed
function keyPressed(){
  //If space is pressed then clear the canvas
  if(key === " "){
    clearLines();

  }
  //If the right arrow is pressed then increaes the message index to display the next message
  //Unless it is already the last message
  if (keyCode === RIGHT_ARROW && messageIndex < messages[GameRound].length - 1) {
    messageIndex++;
  } 
  //If the left arrow is pressed then decrease the message index to display the message befor
  //Unless it is already the first message
  else if (keyCode === LEFT_ARROW && messageIndex > 0) {

    messageIndex--;
  }
  
}


//This is to get the user's input 
function newText(){
  //Getting the value of the answer and making it all upper case
  UserAnswer = input.value().toUpperCase();
  //Making the input empty again
  input.value("");
}
//This function is to clear all the lines
function clearLines(){
  //Clear all the lines created by scribble
  lines = [];
  //Clear all the lines created in the normal way
  graphics.background(255);
}

//To detect if the mouse was pressed
function mousePressed(){
  //To check if the mouse was hovering and pressed on one of the colored Circles
  for(let circles of coloredCircles){
    if(collidePointCircle(mouseX,mouseY,circles.pos.x,circles.pos.y, circles.diameter)){
      colorstate = circles.color; //Change the color that is used to the same color that the circle had
    }
  }
  //Check if the Player clicked on the skip arrow
  if(collidePointRect(mouseX,mouseY,rightarrowX,rightarrowY + rightarrowHeight/3,rightarrowWidth,rightarrowHeight/4) && numSkips>0){
    skip = true;
  }
  //Check if the player clicked on the trashcan
  if(collidePointRect(mouseX,mouseY,trashcanX,trashcanY,trashcanWidth,trashcanHeight)){
    clearLines(); //Clear all lines

  }
  //Checking if the player clicked on the toggleswitch
  if(collidePointRect(mouseX,mouseY,toggleSwitchX - toggleSwitchWidth/2,toggleSwitchY - toggleSwitchHeight/2,toggleSwitchWidth,toggleSwitchHeight)){
    toggleSwitch.on = !toggleSwitch.on; //If it is on make it off and vise versa

  }

}
//This function is to draw everything That has to do with the text box
function drawTextBox(){

  //Setting the boxes x,y,width, and height
  let textBoxWidth = (width - xPosOfGraphics * 2) * 0.9;
  let textBoxHeight = height/8.5;
  let textBoxX = xPosOfGraphics +textBoxWidth/2;
  let textBoxY = height/100 + textBoxHeight/2;

  //This is to create the scribble rect border 
  strokeWeight(5);
  stroke(themeColors[0]);
  scribble.scribbleRect(textBoxX,textBoxY,textBoxWidth,textBoxHeight);

  //This is to create the lines that are inside the rectangle that are like a circle 
  let XcordsFilling = [textBoxX];
  let YcordsFilling = [textBoxY];
  //Getting all the points for the lines to be created in a shape of a circle
  for(let i = 0; i< 360; i+= 1){
    let x = textBoxX + textBoxWidth / 2 * cos(i);
    let y = textBoxY + textBoxHeight / 2 * sin(i);
    XcordsFilling.push(x);
    YcordsFilling.push(y);
  }
  //Set the stroke Thickness
  strokeWeight(7);
  //Make The lines based on the (x,y,gap between the lines, angle of the lines );
  scribble.scribbleFilling(XcordsFilling,YcordsFilling,20,210);

  //This is the filling for the text box as scribbleRect does not have a filling I created a rect to look like it's filled
  rectMode(CENTER);
  fill(255,100);
  noStroke();
  rect(textBoxX,textBoxY,textBoxWidth,textBoxHeight);
  rectMode(CORNER);




  //Set the color for the text and thickness of the stroke
  fill(themeColors[2]); 
  stroke(themeColors[3]);
  strokeWeight(10);
  //Set the x,y positions
  let textX = (width - xPosOfGraphics * 2) * 0.9  ; 
  let textY = height / 100 + height / 8.5 ; 
  //Align the text, Set the font and size
  textAlign(LEFT,TOP);
  textFont(font,32);
  //Setting what message of the text it should say
  let message1 = messages[GameRound][messageIndex];
  textLeading(50); //Setting the height difference between the text

  //Displaying the text and setting it's range where the text is displayed
  //Text will go to the next line if it reaches the limit
  text(message1, width / 25, height / 36 - 10,textX,textY );
  

}

//Function to show the clock
function displayClock() {
  //Set it's color and stroke
  stroke(themeColors[4]);
  strokeWeight(5);
  fill(255,200);
  //Create the scribbled circle
  scribble.buildEllipse(xPosOfGraphics + (width - xPosOfGraphics * 2) * 0.9 + height / 12.75, height / 100 + height / 8.5 / 2, height / 17,height/17,width/750,0);
  
}

//Function to update the timer and the arc
function updateClock() {
  //Figure out how much seconds have passed
  elapsedtime =  (millis() - stime)/1000;
  push();
  noStroke();
  //map the end of the arc based on the elapsedtime
  let end = map(elapsedtime,0,60,-90,270);
  //map the alpha for the arc to start bright and end dark
  let color = map(end,-90,270,25,255);
  //Fill the arc with the color and set the alpha that is mapped
  fill(121, 135, 119,color);   
  //Create the arc for the timer
  arc(xPosOfGraphics + (width - xPosOfGraphics * 2) * 0.9 + height / 12.75, height / 100 + height / 8.5 / 2, height / 8.5 - 5 , height / 8.5 -5 , -90, end,PIE);

  pop();  
}

function startClock(){
  let startclock = millis();
  return startclock;
}



