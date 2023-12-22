class ColoredCircles{
  constructor(x,color){
    this.diameter = sqrt(width*height)/30;
    this.pos = createVector(x ,(height/7.5 + height/ 1.25 + height) / 2);

    this.color = color;



  }
  show(s){
    strokeWeight(2);
    fill(this.color);
    s.scribbleEllipse(this.pos.x,this.pos.y,this.diameter,this.diameter);
  }
}