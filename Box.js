class Box extends BaseClass {
  constructor(x, y, width, height){
    super(x,y,width,height);
    this.body.density=0.2;
    this.image = loadImage("sprites/wood1.png");
  }

};
