
class CustomSwitch {
  constructor(x, y, switchWidth = 60, switchHeight = 30) {
    this.x = x;
    this.y = y;
    this.switchWidth = switchWidth;
    this.switchHeight = switchHeight;
    this.on = false;
    this.cornerRadius = this.switchHeight / 2;
    this.circleRadius = this.switchHeight * 0.7;

  }

  display() {
    push();
    translate(this.x, this.y);
    let buttonX = this.on ? this.switchWidth / 4 : -this.switchWidth / 4;
    // Switch body
    if (this.on) {
      stroke(255);
      scribble.scribbleRoundedRect(0, 0, this.switchWidth, this.switchHeight, this.cornerRadius);
      fill(100);
      stroke(30);
      scribble.scribbleEllipse(buttonX, 0, this.circleRadius, this.circleRadius);
    } 
    else {
      fill(200);
   
      rectMode(CENTER);
      stroke(255, 0, 0);
      strokeWeight(3);
      rect(0, 0, this.switchWidth, this.switchHeight, this.cornerRadius);
      ellipse(buttonX, 0, this.circleRadius, this.circleRadius);
    }

    
    

    pop();


  }
}