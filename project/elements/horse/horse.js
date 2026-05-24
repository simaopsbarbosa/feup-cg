import { CGFobject,CGFappearance,CGFtexture } from '../../../lib/CGF.js';
import { CGFobjModel } from "../../../lib/extra/CGFobjModel.js";

/**
 * horse
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class horse extends CGFobject {
  constructor(
    scene
  ) {
    super(scene);
    this.scene=scene;
    this.horse = new CGFobjModel(this.scene, "models/cavalo.obj");
    this.material=new CGFappearance(this.scene)
    this.material.setAmbient(1.0, 1.0, 1.0, 1.0); 
    this.material.setDiffuse(0.8, 0.8, 0.8, 1.0); 
    this.material.setSpecular(0.5, 0.5, 0.5, 1.0); 
    this.material.setShininess(360.0);
    this.horseTex = new CGFtexture(this.scene, 'images/horse/horse1.jpeg');
    this.material.setTexture(this.horseTex);
  }

display() {
    this.scene.pushMatrix();
      this.scene.translate(14,1.05,0);
      this.scene.scale(8, 8, 8);
      
      
      this.material.apply();
      
      this.horse.display();
    this.scene.popMatrix();
  }
}
