import { CGFobject, CGFappearance, CGFtexture } from '../../../lib/CGF.js';
import { CGFobjModel } from '../../../lib/extra/CGFobjModel.js';

/**
 * horse
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class horse extends CGFobject {
  constructor(scene) {
    super(scene);
    this.scene = scene;

    this.horseAnimation = [];
    this.currentFrame = 0;
    this.material = new CGFappearance(this.scene);
    this.material.setAmbient(1.0, 1.0, 1.0, 1.0);
    this.material.setDiffuse(0.8, 0.8, 0.8, 1.0);
    this.material.setSpecular(0.5, 0.5, 0.5, 1.0);
    this.material.setShininess(360.0);
    this.horseTex = new CGFtexture(
      this.scene,
      'images/horse/Horse1Shape_baseColor.jpeg'
    );
    this.material.setTexture(this.horseTex);
    this.horse_Steps();
  }
  horse_Steps() {
    for (let i = 1; i < 22; i += 2) {
      const filename = `models/horse_trot/horse_trot${i}.obj`;
      this.horseAnimation.push(new CGFobjModel(this.scene, filename));
    }
  }

  display() {
    this.scene.pushMatrix();
    this.scene.scale(0.1, 0.1, 0.1);
    this.material.apply();
    this.horseAnimation[this.currentFrame].display();
    this.scene.popMatrix();
  }
}
