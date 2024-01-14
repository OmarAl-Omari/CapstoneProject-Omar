class ColoredCircles{
  constructor(x,color){
    this.diameter = sqrt(width*height)/30;
    this.pos = createVector(x ,(height/7.5 + height/ 1.25 + height) / 2);

    this.color = color;



  }
  show(s){
    
    let ellipsePointsX = [this.pos.x];
    let ellipsePointsY = [this.pos.y];
  

    for (let angle = 0; angle <= 360; angle += 1) {
      let x = this.pos.x + this.diameter / 2 * cos((angle));
      let y = this.pos.y + this.diameter / 2 * sin((angle));
      ellipsePointsX.push(x);
      ellipsePointsY.push(y);
    }
   
    strokeWeight(5);
    fill(255);
    stroke(this.color);
    s.buildEllipse(this.pos.x,this.pos.y,this.diameter/2,this.diameter/2,width/1000,1);
    s.scribbleFilling(ellipsePointsX, ellipsePointsY,random(9,12),random(0,360));
  }
}