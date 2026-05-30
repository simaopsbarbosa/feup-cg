import { CGFappearance, CGFtexture } from '../../../lib/CGF.js';
import { MyBox } from '../../primitives/MyBox.js';

export class MyHayBale {
  constructor(scene,primitive,material,x,z) {
    this.scene = scene;
    this.box = primitive;
    this.material=material;
    this.x=x;
    this.z=z;
    this.collected=false;
    
  }

  display() {
    this.scene.pushMatrix();
    this.scene.translate(this.x,1.5,this.z);
    this.scene.scale(3,1,3);
    this.material.apply();
    this.box.display();
    this.scene.popMatrix();
  }
}
