import { CGFappearance, CGFtexture, CGFshader } from '../../../lib/CGF.js';
import { MyBox } from '../../primitives/MyBox.js';
import { MyWheel } from './MyWheel.js';
import { MyWagonCover } from './MyWagonCover.js';

export class MyWagon {
  constructor(scene) {
    this.scene = scene;

    this.wheelRadius = 0.25;
    this.wheelThick = 0.06;
    this.bedW = 0.7;
    this.bedH = 0.12;
    this.bedD = 1.4;

    this.bedY = this.wheelRadius + 0.02;
    this.coverY = this.bedY + this.bedH / 2;
    this.axleHalfW = this.bedW / 2 + this.wheelThick / 2 + 0.01;

    this.bed = new MyBox(scene, this.bedW, this.bedH, this.bedD);
    this.cover = new MyWagonCover(scene, this.bedW, this.bedD / 1.5);
    this.wheel = new MyWheel(scene, this.wheelRadius, 8, this.wheelThick);

    this.axle = new MyBox(scene, this.axleHalfW * 2 + 0.02, 0.03, 0.03);

    this.tongue = new MyBox(scene, 0.04, 0.04, 0.6);

    this.initAppearances();
    this.initShaders();
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
    this.woodApp.setTexture(
      new CGFtexture(scene, 'images/barn/wood_plank.jpg')
    );
    this.woodApp.setTextureWrap('REPEAT', 'REPEAT');

    this.coverApp = new CGFappearance(scene);
    this.coverApp.setAmbient(0.5, 0.5, 0.5, 1.0);
    this.coverApp.setDiffuse(0.9, 0.9, 0.9, 1.0);
    this.coverApp.setSpecular(0.05, 0.05, 0.05, 1.0);
    this.coverApp.setShininess(5);
    this.coverApp.setTexture(
      new CGFtexture(scene, 'images/wagon/cloth_texture.jpg')
    );
    this.coverApp.setTextureWrap('REPEAT', 'REPEAT');

    this.metalApp = new CGFappearance(scene);
    this.metalApp.setAmbient(0.2, 0.2, 0.2, 1.0);
    this.metalApp.setDiffuse(0.4, 0.4, 0.4, 1.0);
    this.metalApp.setSpecular(0.6, 0.6, 0.6, 1.0);
    this.metalApp.setShininess(40);
  }

  initShaders() {
    this.coverShader = new CGFshader(
      this.scene.gl,
      'shaders/wagonCover.vert',
      'shaders/wagonCover.frag'
    );
    this.coverShader.setUniformsValues({
      uSampler: 0,
      uBaseColor: [0.99, 0.84, 0.72],
      uWeaveScale: 18.0,
      uLightDir: [-1.0, 0.7, 0.3],
    });
  }

   _drawWheel(x, z,rotation,rollAngle) {
      let scene = this.scene;
      scene.pushMatrix();
      scene.translate(x, this.wheelRadius, z);
      scene.rotate(Math.PI / 2, 0, 1, 0);
      scene.rotate(rotation,0,1,0);
      scene.rotate(rollAngle,0,0,1);
      this.metalApp.apply();
      this.wheel.display();
      scene.popMatrix();
   }

  _drawAxle(z,rotation) {
    let scene = this.scene;
    scene.pushMatrix();
    scene.translate(-this.axleHalfW / 2, this.wheelRadius, z);
    scene.rotate(rotation,0,1,0);
    this.woodApp.apply();
    this.axle.display();
    scene.popMatrix();
  }

   display(wheelAngle=0,rollAngle=0) {
      let scene = this.scene;

    // Wagon bed
    scene.pushMatrix();
    scene.translate(0, this.bedY, 0);
    this.woodApp.apply();
    this.bed.display();
    scene.popMatrix();

    // Cloth cover
    scene.pushMatrix();
    scene.translate(0, this.coverY, -this.bedD / 6);
    scene.gl.disable(scene.gl.CULL_FACE);
    this.coverApp.apply();
    scene.setActiveShader(this.coverShader);
    this.cover.display();
    scene.setActiveShader(scene.defaultShader);
    scene.gl.enable(scene.gl.CULL_FACE);
    scene.popMatrix();

      // Front axle and wheels
      let frontZ = this.bedD / 2 - 0.20;
      this._drawAxle(frontZ,wheelAngle);
      this._drawWheel(-this.axleHalfW, frontZ,wheelAngle,rollAngle);
      this._drawWheel(this.axleHalfW, frontZ,wheelAngle,rollAngle);

      // Rear axle and wheels
      let rearZ = -this.bedD / 2 + 0.20;
      this._drawAxle(rearZ,0);
      this._drawWheel(-this.axleHalfW, rearZ,0,rollAngle);
      this._drawWheel(this.axleHalfW, rearZ,0,rollAngle);

    // Tonge
    scene.pushMatrix();
    scene.translate(0, this.wheelRadius, frontZ + (this.bedD / 2) * 0.5);
    scene.rotate(0.15, 1, 0, 0);
    this.woodApp.apply();
    this.tongue.display();
    scene.popMatrix();
  }
}
