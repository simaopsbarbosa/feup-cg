import { horse } from '../horse/horse.js';
import { MyWagon } from '../wagon/MyWagon.js';

export class MyPlayer {
  constructor(scene) {
    this.scene = scene;
    this.horse=new horse(this.scene);
    this.wagon = new MyWagon(this.scene);
    //Player Position
    this.position=[-5,1.5,0];
    //Player physics
    this.speed=0;
    this.wheelAngle=0;
    this.rollAngle=0;
    this.rotationDelta = this.speed / 0.25; 
    this.orientationAngle = 0; 

    // Horse Animation Frames
    this.totalFrames = 11;   
    
    //Vector
    this.directionVector=[0,0,0];



  }
  move(direction) {
    switch(direction) {
      case 'W': 
        this.speed=Math.min(this.speed+0.1,3);
        break;
      case 'S': 
        this.speed=Math.max(this.speed-0.1,0);
        break;
      case 'A': 
        this.wheelAngle = Math.min(Math.PI / 10, this.wheelAngle + Math.PI / 10);
        break;
      case 'D': 
        this.wheelAngle = Math.max(-Math.PI / 10, this.wheelAngle - Math.PI / 10);
        break;
      case 'DS': 
        this.speed=Math.max(this.speed-0.05,0);
        break;
      default:
        this.wheelAngle=0;
        break;
   
    }
    
  }
  update(deltaTime){
      if(this.speed!=0){
        this.orientationAngle += this.wheelAngle * this.speed * deltaTime;
        this.horse.currentFrame = (this.horse.currentFrame + 1) % this.totalFrames;
      }
      this.directionVector=[this.speed * Math.sin(this.orientationAngle),0,this.speed * Math.cos(this.orientationAngle)];
      this.position[0] += this.directionVector[0] *  deltaTime;
      this.position[1] += this.directionVector[1] *  deltaTime;
      this.position[2] += this.directionVector[2] *  deltaTime;
      this.rotationDelta = this.speed / 0.5;
      this.rollAngle += this.rotationDelta * deltaTime;
      
  }

  display(){
    
    this.scene.pushMatrix();
    
    this.scene.translate(this.position[0],this.position[1],this.position[2]);
    this.scene.rotate(this.orientationAngle, 0, 1, 0);

    // Wagon
    this.scene.pushMatrix();
    this.scene.scale(3, 3, 3);
    this.wagon.display(this.wheelAngle,this.rollAngle);
    this.scene.popMatrix();

    //horse 
    this.scene.pushMatrix();
    this.scene.translate(0,0,4);
    this.scene.rotate(this.wheelAngle,0,1,0);
    this.horse.display();
    this.scene.popMatrix();
    this.scene.popMatrix();

  }
}
