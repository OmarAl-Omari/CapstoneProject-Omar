
class CustomSwitch {
  constructor(x, y, switchWidth, switchHeight ) {
    //Setting the x,y,width,height for switch includeing the rect and circle
    this.x = x;
    this.y = y;
    this.switchWidth = switchWidth;
    this.switchHeight = switchHeight;
    //Setting the button off
    this.on = false;
    this.cornerRadius = this.switchHeight / 2;
    this.circleRadius = this.switchHeight * 0.7;

  }

  display(s,themeColors) {
    push();
    translate(this.x, this.y);
    //moving the x position if it is on or off
    let buttonX = this.on ? this.switchWidth / 4 : -this.switchWidth / 4;

    //Checking if the swith is on
    if (this.on) {
      //Draw the scribbly shapes
      stroke(255);
      s.scribbleRoundedRect(0, 0, this.switchWidth, this.switchHeight, this.cornerRadius);
      fill(100);
      stroke(30);
      s.scribbleEllipse(buttonX, 0, this.circleRadius, this.circleRadius);
    } 
    else {
      //If off draw the normal shapes
      fill(themeColors[3]);
   
      rectMode(CENTER);
      stroke(themeColors[1]);
      strokeWeight(3);
      rect(0, 0, this.switchWidth, this.switchHeight, this.cornerRadius);
      fill(themeColors[1]);
      stroke(themeColors[2]);
      ellipse(buttonX, 0, this.circleRadius, this.circleRadius);
    }

    
    

    pop();


  }
}