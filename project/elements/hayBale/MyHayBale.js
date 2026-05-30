import { CGFappearance, CGFtexture } from '../../../lib/CGF.js';
import { MyBox } from '../../primitives/MyBox.js';

export class MyHayBale {
  constructor(scene,primitive,material) {
    this.scene = scene;
    this.box = primitive;
    this.material=material;
    
  }

  display() {
    this.material.apply();
    this.box.display();
  }
}
