import { horse } from '../horse/horse.js';
import { MyWagon } from '../wagon/MyWagon.js';
import { horse } from '../horse/horse.js';
import { MyWagon } from '../wagon/MyWagon.js';
export class MyPlayer {
  constructor(scene) {
  constructor(scene) {
    this.scene = scene;
    this.horse=new horse(this.scene);
    this.wagon = new MyWagon(this.scene);
    this.x=-5;
    this.y=1.5;
    this.z=0;
    this.speed=0.2;
    this.wheelAngle=0;
    this.rollAngle=0
    this.rotationDelta = this.speed / 0.25;       
    this.totalFrames = 11;      
  }
  move(direction) {
    switch(direction) {
      case 'W': 
        this.x += this.speed * Math.sin(this.wheelAngle);
        this.z += this.speed * Math.cos(this.wheelAngle);
        this.rollAngle += this.rotationDelta;
        this.horse.currentFrame = (this.horse.currentFrame + 1) % this.totalFrames;
        break;
      case 'S': 
        this.x -= this.speed * Math.sin(this.wheelAngle);
        this.z -= this.speed * Math.cos(this.wheelAngle);
        this.rollAngle -= this.rotationDelta;
        this.horse.currentFrame = (this.horse.currentFrame -1+  this.totalFrames) % this.totalFrames;
        break;
      case 'A': 
        this.wheelAngle = Math.min(Math.PI / 10, this.wheelAngle + Math.PI / 10);
        break;
      case 'D': 
        this.wheelAngle = Math.max(-Math.PI / 10, this.wheelAngle - Math.PI / 10);
        break;
    
    }
  
  }

  display(){
    this.scene.pushMatrix();
    this.scene.translate(this.x,this.y,this.z);
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
