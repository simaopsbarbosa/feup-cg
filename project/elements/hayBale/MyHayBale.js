import { CGFappearance, CGFtexture } from '../../../lib/CGF.js';
import { MyBox } from '../../primitives/MyBox.js';

export class MyHayBale {
   constructor(scene) {
      this.scene = scene;
      this.box = new MyBox(scene, 0.5, 0.4, 0.35);
      this.initAppearance();
   }

   initAppearance() {
      this.app = new CGFappearance(this.scene);
      this.app.setAmbient(0.5, 0.45, 0.3, 1.0);
      this.app.setDiffuse(0.9, 0.82, 0.55, 1.0);
      this.app.setSpecular(0.05, 0.05, 0.02, 1.0);
      this.app.setShininess(3);
      this.app.setTexture(new CGFtexture(this.scene, 'images/hayBale/hay.jpg'));
      this.app.setTextureWrap('REPEAT', 'REPEAT');
   }

   display() {
      this.app.apply();
      this.box.display();
   }
}