import { CGFappearance, CGFtexture } from "../lib/CGF";
import { MyBox } from "./MyBox.js";
import { MyRoof } from "./MyRoof.js";

export class MyBarn {
   constructor(scene) {
      this.scene = scene;

      this.box = new MyBox(scene, 1.0, 0.7, 1.4);
      this.roof = new MyRoof(scene, 1.0, 0.4, 1.4);

      this.initAppearances();
   }

   initAppearances() {
      let scene = this.scene;

      // Wall appearance
      this.wallApp = new CGFappearance(scene);
      this.wallApp.setAmbient(0.3, 0.05, 0.05, 1);
      this.wallApp.setDiffuse(0.7, 0.1, 0.1, 1);
      this.wallApp.setSpecular(0.05, 0.0, 0.0, 1);
      this.wallApp.setShininess(5);
      // TODO: change to a texture

      // Front wall (with door)
      this.frontApp = new CGFappearance(scene);
      this.frontApp.setAmbient(0.3, 0.05, 0.05, 1);
      this.frontApp.setDiffuse(0.7, 0.1, 0.1, 1);
      this.frontApp.setSpecular(0.05, 0.0, 0.0, 1);
      this.frontApp.setShininess(5);
      // TODO: change to a texture with a door

      // Roof appearance
      this.roofApp = new CGFappearance(scene);
      this.roofApp.setAmbient(0.15, 0.15, 0.15, 1);
      this.roofApp.setDiffuse(0.35, 0.35, 0.35, 1);
      this.roofApp.setSpecular(0.1, 0.1, 0.1, 1);
      this.roofApp.setShininess(20);
      // TODO: change to a texture
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
      scene.translate(0, 0.7, 0);

      // Roof surfaces
      this.roofApp.apply();
      this.roof.displayRoofSurfaces();

      // Roof front and back
      this.wallApp.apply();
      this.roof.displayFrontBack();

      scene.popMatrix();
   }
}