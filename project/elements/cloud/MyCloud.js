import { CGFobject, CGFappearance } from '../../../lib/CGF.js';
import { MyQuad } from '../../primitives/MyQuad.js';

export class MyCloud extends CGFobject {
  constructor(scene, texturesArray) {
    super(scene);
    this.scene = scene;
    this.textures = texturesArray;

    this.quad = new MyQuad(scene);

    this.material = new CGFappearance(scene);
    this.material.setAmbient(0.4, 0.4, 0.4, 1);
    this.material.setDiffuse(0.4, 0.4, 0.4, 1);
    this.material.setSpecular(0, 0, 0, 1);
    this.material.setEmission(0.5, 0.5, 0.5, 1);

    this.reset();
  }

  isReady() {
    return this.material.texture && this.material.texture.texID !== -1;
  }

  reset() {
    this.radius = 59;
    this.theta = Math.random() * 2 * Math.PI;
    this.phi = Math.PI / 4 + Math.random() * (Math.PI / 4);

    this.speedTheta = 0.001 + Math.random() * 0.002;

    // pick random texture
    let randomIndex = Math.floor(Math.random() * this.textures.length);
    this.material.setTexture(this.textures[randomIndex]);
    this.material.setTextureWrap('REPEAT', 'REPEAT');
  }

  update(deltaTime) {
    this.theta += this.speedTheta * deltaTime;
  }

  display() {
    this.scene.pushMatrix();

    this.scene.rotate(this.theta, 0, 1, 0);
    this.scene.rotate(-this.phi, 1, 0, 0);
    this.scene.translate(0, 0, this.radius);

    this.scene.scale(10, 10, 1);

    this.material.apply();
    this.quad.display();

    this.scene.popMatrix();
  }
}
