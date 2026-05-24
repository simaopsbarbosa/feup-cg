import { CGFappearance, CGFtexture } from '../../../lib/CGF.js';
import { MyBox } from '../../primitives/MyBox.js';
import { MyWheel } from './MyWheel.js';
import { MyWagonCover } from './MyWagonCover.js';

export class MyWagon {
   constructor(scene) {
      this.scene = scene;

      this.wheelRadius = 0.25;
      this.wheelThick = 0.06;
      this.bedW = 0.70;
      this.bedH = 0.12;
      this.bedD = 1.40;

      this.bedY = this.wheelRadius + 0.02;
      this.coverY = this.bedY + this.bedH;
      this.axleHalfW = this.bedW / 2 + this.wheelThick / 2 + 0.01;

      this.bed = new MyBox(scene, this.bedW, this.bedH, this.bedD);
      this.cover = new MyWagonCover(scene, this.bedW, this.bedD);
      this.wheel = new MyWheel(scene, this.wheelRadius, 8, this.wheelThick);

      this.axle = new MyBox(scene, this.axleHalfW * 2 + 0.02, 0.03, 0.03);

      this.tongue = new MyBox(scene, 0.04, 0.04, 0.60);

      this.initAppearances();
   }

   initAppearances() {
      let scene = this.scene;

      const amb = [0.4, 0.4, 0.4, 1.0];
      const diff = [0.85, 0.85, 0.85, 1.0];
      const spec = [0.05, 0.05, 0.05, 1.0];

      this.woodApp = new CGFappearance(scene);
      this.woodApp.setAmbient(...amb);
      this.woodApp.setDiffuse(...diff);
      this.woodApp.setSpecular(...spec);
      this.woodApp.setShininess(5);
      this.woodApp.setTexture(new CGFtexture(scene, 'images/barn/wood_plank.jpg'));
      this.woodApp.setTextureWrap('REPEAT', 'REPEAT');

      this.metalApp = new CGFappearance(scene);
      this.metalApp.setAmbient(0.2, 0.2, 0.2, 1.0);
      this.metalApp.setDiffuse(0.4, 0.4, 0.4, 1.0);
      this.metalApp.setSpecular(0.6, 0.6, 0.6, 1.0);
      this.metalApp.setShininess(40);

      this.clothApp = new CGFappearance(scene);
      this.clothApp.setAmbient(0.5, 0.48, 0.42, 1.0);
      this.clothApp.setDiffuse(0.9, 0.87, 0.78, 1.0);
      this.clothApp.setSpecular(0.02, 0.02, 0.02, 1.0);
      this.clothApp.setShininess(2);
   }

   _drawWheel(x, z) {
      let scene = this.scene;
      scene.pushMatrix();
      scene.translate(x, this.wheelRadius, z);
      scene.rotate(Math.PI / 2, 0, 1, 0);
      this.metalApp.apply();
      this.wheel.display();
      scene.popMatrix();
   }

   _drawAxle(z) {
      let scene = this.scene;
      scene.pushMatrix();
      scene.translate(-this.axleHalfW / 2, this.wheelRadius, z);
      this.woodApp.apply();
      this.axle.display();
      scene.popMatrix();
   }

   display() {
      let scene = this.scene;

      // Wagon bed
      scene.pushMatrix();
      scene.translate(0, this.bedY, 0);
      this.woodApp.apply();
      this.bed.display();
      scene.popMatrix();

      // Cloth cover
      scene.pushMatrix();
      scene.translate(0, this.coverY, 0);
      this.clothApp.apply();
      this.cover.display();
      scene.popMatrix();

      // Front axle and wheels
      let frontZ = this.bedD / 2 - 0.20;
      this._drawAxle(frontZ);
      this._drawWheel(-this.axleHalfW, frontZ);
      this._drawWheel(this.axleHalfW, frontZ);

      // Rear axle and wheels
      let rearZ = -this.bedD / 2 + 0.20;
      this._drawAxle(rearZ);
      this._drawWheel(-this.axleHalfW, rearZ);
      this._drawWheel(this.axleHalfW, rearZ);

      // Tonge
      scene.pushMatrix();
      scene.translate(0, this.wheelRadius, frontZ + this.bedD / 2 * 0.5 + 0.30);
      scene.rotate(0.15, 1, 0, 0);
      this.woodApp.apply();
      this.tongue.display();
      scene.popMatrix();
   }
}