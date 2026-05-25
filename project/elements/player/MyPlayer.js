import { horse } from '../horse/horse.js';
import { MyWagon } from '../wagon/MyWagon.js';
export class MyPlayer {
  constructor(scene) {
    this.scene = scene;
    this.horse=new horse(this.scene);
    this.wagon = new MyWagon(this.scene);

  }

  display(){
    this.scene.pushMatrix();
    this.scene.translate(-5,1,0);
    // Wagon
    this.scene.pushMatrix();
    this.scene.scale(3, 3, 3);
    this.wagon.display();
    this.scene.popMatrix();
    //horse 
    this.scene.pushMatrix();
    this.scene.translate(0,0,4);
    this.horse.display();
    this.scene.popMatrix();

    this.scene.popMatrix();
  }
}
