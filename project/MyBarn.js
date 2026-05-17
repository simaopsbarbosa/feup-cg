import { CGFappearance, CGFtexture } from '../lib/CGF.js';
import { MyBox } from './MyBox.js';
import { MyRoof } from './MyRoof.js';

export class MyBarn {
  constructor(scene) {
    this.scene = scene;

    this.box = new MyBox(scene, 1.0, 0.7, 1.4);
    this.roof = new MyRoof(scene, 1.0, 0.4, 1.4);

    this.initAppearances();
  }

  initAppearances() {
    let scene = this.scene;

    this.wallTex = new CGFtexture(scene, 'images/barn/wood_plank.jpeg');
    this.frontTex = new CGFtexture(scene, 'images/barn/front_door.jpeg');
    this.roofTex = new CGFtexture(scene, 'images/barn/wood_roof.jpeg');

    // A stronger ambient term keeps the side away from the sun readable.
    const ambientBoost = [0.45, 0.45, 0.45, 1.0];
    const diffuseBoost = [0.9, 0.9, 0.9, 1.0];
    const specularBoost = [0.08, 0.08, 0.08, 1.0];

    // Wall appearance
    this.wallApp = new CGFappearance(scene);
    this.wallApp.setAmbient(...ambientBoost);
    this.wallApp.setDiffuse(...diffuseBoost);
    this.wallApp.setSpecular(...specularBoost);
    this.wallApp.setShininess(8);
    this.wallApp.setTexture(this.wallTex);
    this.wallApp.setTextureWrap('REPEAT', 'REPEAT');

    // Front wall (with door)
    this.frontApp = new CGFappearance(scene);
    this.frontApp.setAmbient(...ambientBoost);
    this.frontApp.setDiffuse(...diffuseBoost);
    this.frontApp.setSpecular(...specularBoost);
    this.frontApp.setShininess(8);
    this.frontApp.setTexture(this.frontTex);
    this.frontApp.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

    // Roof appearance
    this.roofApp = new CGFappearance(scene);
    this.roofApp.setAmbient(0.35, 0.35, 0.35, 1.0);
    this.roofApp.setDiffuse(0.8, 0.8, 0.8, 1.0);
    this.roofApp.setSpecular(0.06, 0.06, 0.06, 1.0);
    this.roofApp.setShininess(12);
    this.roofApp.setTexture(this.roofTex);
    this.roofApp.setTextureWrap('REPEAT', 'REPEAT');
  }

  display() {
    let scene = this.scene;

    // Box walls
    this.wallApp.apply();
    this.box.displaySides();
    this.box.displayBack();

    // Front wall
    this.frontApp.apply();
    this.box.displayFront();

    // Roof
    scene.pushMatrix();
    scene.translate(0, 0.35, 0);

    // Roof surfaces
    this.roofApp.apply();
    this.roof.displayRoofSurfaces();

    // Roof front and back
    this.wallApp.apply();
    this.roof.displayFrontBack();

    scene.popMatrix();
  }
}
