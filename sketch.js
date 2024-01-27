// Scribble Drawing Game
// Omar Al-Omari
// 2024 January 25

// Extra for Experts:
// - describe what you did to take this project "above and beyond"

//Set the game round
let GameRound = 0;
let numOfGameRounds = 9;
let canvasSizeSelected = false;
//Global scribble library
let scribble = new Scribble();

let strokeThickValue= 10; //How thick the line is 

let graphics; //For the graphics
let colorState = "black"; //start with the color
let input; //For the input 
let messageIndex = 0 ; //Start at first message
let UserAnswer; //Store the input from user

//For the window demensions
let canvasWidth;
let canvasHeight;
//x,y for the graphics
let xPosOfGraphics;
let yPosOfGraphics;

//lists for my colored circles,lines,circleColors,and answers
let coloredCircles = [];
let lines = []; // For the scribble lines
let normalLines = [];
let circleColors = ["red", "orange", "yellow", "lime", "blue", "fuchsia", "black", "white" ];
let answers = ["WINDOW","PACMAN","MASK","PENCIL","CAT","ICECREAM","BUS","81","CANADA","ROCKET"];

let roundTimeDuration = 180; //Druation of each round
let elapsedtime; // To see how much time has passed
//For the colored circles
let coloredCircleslesDiameter;

//For my clock
let clockX;
let clockY;
let clockRadius;
let clockTimer;

//For my transition screen 
let transitionStartTime;
let transitionDuration = 5000; // The duration
let Transition = false;
let transitionImages = [];
//For my heart's asset
let heart;
let heartWidth;

//For my arrow asset
let rightArrow;
let rightArrowX, rightArrowY,rightArrowWidth,rightArrowHeight;
//For my skip button
let skip = false;
let numSkips = 3;

let startTimerX = true; //Start the timer

//For my X when the player guesses wrong
let X;
let counterForX;

//For my trashcan asset
let trashcan;
let trashcanOpen;
let trashcanX, trashcanY, trashcanWidth, trashcanHeight;
let toggleSwitch, toggleSwitchX, toggleSwitchY, toggleSwitchWidth, toggleSwitchHeight;

//For my background asset
let backgroundImage;

//For my font assets
let titleFont;
let font;

//For the text size/spacing
let textSze;
let textSpacing;

//For my theme colors
let themeColors = ["#F8EDE3", "#BDD2B6", "#A2B29F", "#798777","#FFD4D4"];
//For bakcgroundMusic
let backgroundMusic;
//Volume slider
let volumeSlider;

//This function uploads all my assets
function preload(){
  //For the trashcan
  trashcan  = loadImage("assets/trashClosed.png");
  trashcanOpen = loadImage("assets/trashOpened.png");
  //For the skip arrow
  rightArrow = loadImage("assets/rightArrow.png");
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
  //load the transiton images
  for(let i = 0; i< messages.length ; i++){
    transitionImages[i] = loadImage("assets/transitionImage0"+[i]+".png");
  }


}

//To customzie the the input
function customizeInput(){
  input.class("custom-input");
  input.size(graphics.width / 3,graphics.height/20);
  input.position(graphics.width/2 - input.width/2 + xPosOfGraphics, (yPosOfGraphics + graphics.height + height) / 2 - input.height/2);
  input.style("font-size", "1.5vw");
  input.style("text-transform", "uppercase");
  input.attribute("placeholder", "GUESS HERE");
  input.style("text-align", "center"); //Display the text inside the input
  input.style("border", "1px solid #FFD4D4");
  input.style("font-family", "font");
  //Get the text and make it empty again
  input.changed(newText);
}

function setPosAndSizes(){
  //Setting the x,y pos for the graphics
  xPosOfGraphics = width/30;
  yPosOfGraphics = height/7.5;

  textSze = width/60;
  textSpacing = width/40;
  
  //Creating the input
  input = createInput();

  //creating the graphics (where the player draws)
  graphics = createGraphics(width - xPosOfGraphics * 2,height/1.25);
  graphics.background(255);

  //Set the circles Diameter
  coloredCircleslesDiameter = sqrt(width*height)/30;

  //costomizing the input
  customizeInput();

  //Start the time for the clock
  clockTimer = startClock();

  //Creating the colored circles
  for(let i = 0; i < 8; i++){
    coloredCircles[i] = new ColoredCircles(xPosOfGraphics + coloredCircleslesDiameter * i* 1.25 + coloredCircleslesDiameter , circleColors[i]); 

  }

  //Setting the clock's x,y, and radius
  clockX = xPosOfGraphics + (width - xPosOfGraphics * 2) * 0.9 + height / 12.75;
  clockY = height / 100 + height / 8.5 / 2;
  clockRadius = height / 17;
  
  // Arrow image Setting the x,y,width,height
  rightArrowWidth = width/30;
  rightArrowHeight = rightArrowWidth *(rightArrow.height/rightArrow.width);
  rightArrowX = graphics.width;
  rightArrowY = height -rightArrowHeight;
  
  //Setting the heart's width
  heartWidth = rightArrowHeight/1.5 * (heart.width/heart.height);
  
  //Setting the toggle's width,height,x,y
  toggleSwitchWidth = width/25;
  toggleSwitchHeight = toggleSwitchWidth/2;
  toggleSwitchX =   input.width+ input.x +( rightArrowX - heartWidth * 4 - (input.width + input.x ))/2;
  toggleSwitchY = input.y + toggleSwitchWidth/4;
  //Creating the toggle switch
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
  const volumeText = document.getElementById("volume");
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
  volumeText.remove();
  //Creating the canvas based on the selected ratio
  createCanvas(canvasWidth,canvasHeight);
  //Starting the game and setting the position and sizes of everything
  canvasSizeSelected = true;
  setPosAndSizes();

  //Remove the slider for volume
  volumeSlider.remove();
  
}


function setup() {
  //This is for the start Screen where the player can choose the game ratio and start the game
  createCanvas(windowWidth,windowHeight);
  //Set background music
  backgroundMusic = loadSound("assets/backgroundmusic.mp3",loaded);
  //Make a volume slider
  volumeSlider = createSlider(0, 1, 0.25,0.01); // Min, max, initial value
  volumeSlider.size(width/10, height/100);
  volumeSlider.position(width/2 - volumeSlider.width/2, height - volumeSlider.height*4); // Adjust the position of the slider
  //Get the input of the volume 
  volumeSlider.input(updateVolume);
  image(backgroundImage,0,0,width,height);

  //Setting angle mode
  angleMode(DEGREES);

  //This is for my query in my html file to check when the player clicks on it to change color
  document.querySelector(".canvasSizeDropdown").addEventListener("click", function() {
    this.classList.toggle("active");
    
  });



}


//Play the music
function loaded(){
  backgroundMusic.loop();

}
// Update volume based on the slider value
function updateVolume() {
  let volume = volumeSlider.value();
  backgroundMusic.setVolume(volume);
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


    //Creating the scribble lines
    for (let i = 0; i < lines.length; i++) {
      stroke(lines[i].lineColor); 
      strokeWeight(lines[i].lineThickness);

   
      scribble.scribbleLine(lines[i].x1, lines[i].y1, lines[i].x2, lines[i].y2);
      
    }

    //Setting a seed that is not random (under this nothing that is created by scribble will wiggle)
    randomSeed(100);
    //This is to display the skip button 
    image(rightArrow,rightArrowX,rightArrowY,rightArrowWidth,rightArrowHeight);
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
    if(UserAnswer === answers[GameRound] || elapsedtime > roundTimeDuration || skip){
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
      //Stopping the game when we reach the ned
      if(GameRound === numOfGameRounds){
        noLoop();
      }
      //Clear the graphics 
      clearLines();
      //Change the round number
      changeRound();
      //Reset the clock
      clockTimer = startClock();
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
      image(heart,rightArrowX - heartWidth * i,rightArrowY + heartWidth/4,heartWidth,rightArrowHeight/1.5);
    }
  }
  else if(numSkips === 2){

    image(heart,rightArrowX - heartWidth * 4,rightArrowY + heartWidth/4,heartWidth,rightArrowHeight/1.5);
    image(heart,rightArrowX - heartWidth * 3,rightArrowY + heartWidth/4,heartWidth,rightArrowHeight/1.5);

  }
  else if(numSkips === 1){
    image(heart,rightArrowX - heartWidth * 4,rightArrowY + heartWidth/4,heartWidth,rightArrowHeight/1.5);

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
  //Displaying the text

  textAlign(CENTER,CENTER);
  textSize(textSze * 2);
  stroke(0);
  fill(255);
  text("The Answer Is: ",width*0.75,height*0.4);
  text(answers[GameRound],width*0.75,height*0.5);  
  
  //Displaying a thank you when the game ends
  if(GameRound === numOfGameRounds){
    textSize(textSze * 3);
    text("THANK YOU",width/2,height/7);
    text("FOR PLAYING",width/2,height/7 + textSze*3);
  }
   
  push();
  //Giving it a nice animation for the transiton screen entering
  tint(255,millis()%120 * 0.25);
  image(backgroundImage,0,0,width,height); //displaying the background for the game
  imageMode(CENTER);
  //Display the image of the answer
  let sizeOfImage = min(width,height) / 1.5;
  image(transitionImages[GameRound],sizeOfImage/2,height/2,sizeOfImage,sizeOfImage);
  console.log(GameRound);
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
    stroke(127,100);
    strokeWeight(strokeThickValue/10);
    fill(colorState);  
    circle(mouseX,mouseY,strokeThickValue);
  }
  //If the curson is not inside the drawing area
  else{
    cursor(CROSS);
  }
}


//This function is to check if the player is drawing(dragging the mouse)
function mouseDragged(){
  
  if(canvasSizeSelected && !Transition){
    //Constrain the mouse postiion to only be inside the graphics border
    let halfThickness = strokeThickValue/2;
    let mousex = constrain(mouseX, xPosOfGraphics + halfThickness, xPosOfGraphics + graphics.width - halfThickness);
    let mousey = constrain(mouseY, yPosOfGraphics + halfThickness, yPosOfGraphics + graphics.height - halfThickness);
    let pmousex = constrain(pmouseX, xPosOfGraphics + halfThickness, xPosOfGraphics + graphics.width - halfThickness);
    let pmousey = constrain(pmouseY, yPosOfGraphics + halfThickness, yPosOfGraphics + graphics.height - halfThickness);
    //To check if the player did not set the scribble mode then draw a normal line
    if(!toggleSwitch.on){
      //Determine the color and the strokeThickness of the line
      graphics.stroke(colorState);
      graphics.strokeWeight(strokeThickValue);

      //Creating the line based on the mouseX and mouseY positions
      graphics.line(mousex - xPosOfGraphics,mousey - yPosOfGraphics,pmousex - xPosOfGraphics,pmousey - yPosOfGraphics);

    }
    else{
      
      //Give the information for the lines that are going to be created
      //(x1,y1,x2,y2) based on the mouse position
      lines.push({
        
        x1: mousex,
        y1: mousey,
        x2: pmousex,
        y2: pmousey,
        //Set the color and thickness of the lines
        lineColor: colorState,
        lineThickness: strokeThickValue
      });
    }
  }

}


//Function to increase or decrease the line thickness if the mouseWheel is moved
function mouseWheel(event) {
  // Making sure that when decreasing the size, it is not negative and putting a limit of 10 to the size
  if (event.delta < 0) {
    if (strokeThickValue + event.delta / 10 > 1) {  // Limiting the stroke thickness to a minimum of 1
      strokeThickValue -= Math.abs(event.delta / 10);
    }
  } 
  else {
    // Limiting the stroke thickness to a maximum of, let's say, 50 (you can adjust this limit as needed)
    if (strokeThickValue + event.delta / 10 < 100) {
      strokeThickValue += event.delta / 10;
    }
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
      colorState = circles.color; //Change the color that is used to the same color that the circle had
    }
  }
  //Check if the Player clicked on the skip arrow
  if(collidePointRect(mouseX,mouseY,rightArrowX,rightArrowY + rightArrowHeight/3,rightArrowWidth,rightArrowHeight/4) && numSkips>0){
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
  textFont(font,textSze);
  //Setting what message of the text it should say
  let messageDisplayed = messages[GameRound][messageIndex];
  textLeading(textSpacing); //Setting the height difference between the text

  //Displaying the text and setting it's range where the text is displayed
  //Text will go to the next line if it reaches the limit
  text(messageDisplayed, width / 25, height / 36 - 10,textX,textY );
  

}


//Function to show the clock
function displayClock() {
  //Set it's color and stroke
  stroke(themeColors[4]);
  strokeWeight(5);
  fill(255,200);
  //Create the scribbled circle
  scribble.buildEllipse(clockX,clockY, clockRadius,clockRadius,width/750,0);
}


//Function to update the timer and the arc
function updateClock() {
  //Figure out how much seconds have passed
  elapsedtime =  (millis() - clockTimer)/1000;
  push();
  noStroke();
  //map the end of the arc based on the elapsedtime
  let end = map(elapsedtime,0,roundTimeDuration,-90,270);
  //map the alpha for the arc to start bright and end dark
  let color = map(end,-90,270,25,255);
  //Fill the arc with the color and set the alpha that is mapped
  fill(121, 135, 119,color);   
  //Create the arc for the timer
  arc(clockX, clockY, 2*clockRadius-5 , 2*clockRadius-5 , -90, end,PIE);

  pop();  
}


//This function is used to reset the main clock for the game
function startClock(){
  let startclock = millis();
  return startclock;
}



