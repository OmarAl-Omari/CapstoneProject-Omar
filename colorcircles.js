class ColoredCircles{
  constructor(x,color){
    //Set the diamter based on the canvas size
    this.diameter = sqrt(width*height)/30;
    //Set the x position based on what is given but a fixed y position
    this.pos = createVector(x ,(height/7.5 + height/ 1.25 + height) / 2);
    //Set the color for each circle
    this.color = color;
  }
  //Display my circles
  show(s){
    //This is to create a filling for my ellipse giving it the each circles outer x, and y positions
    let ellipsePointsX = [this.pos.x];
    let ellipsePointsY = [this.pos.y];
    for (let angle = 0; angle <= 360; angle += 1) {
      let x = this.pos.x + this.diameter / 2 * cos(angle);
      let y = this.pos.y + this.diameter / 2 * sin(angle);
      ellipsePointsX.push(x);
      ellipsePointsY.push(y);
    }
    //Set the color and stroke
    strokeWeight(5);
    fill(255);
    stroke(this.color);
    //Build the scribbly circle with an offset and an overlap
    s.buildEllipse(this.pos.x,this.pos.y,this.diameter/2,this.diameter/2,width/1000,1);
    //Fill the circle based on the points with lines given(x,y, gap between lines, Angle of Lines create)
    s.scribbleFilling(ellipsePointsX, ellipsePointsY,random(9,12),random(0,360));
  }
}