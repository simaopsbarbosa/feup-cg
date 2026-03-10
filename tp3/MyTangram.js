import { CGFobject } from '../lib/CGF.js';
import { CGFappearance } from '../lib/CGF.js';

import { MyDiamond } from './MyDiamond.js';
import { MyTriangle } from './MyTriangle.js';
import { MyParallelogram } from './MyParallelogram.js';
import { MyTriangleSmall } from './MyTriangleSmall.js';
import { MyTriangleBig } from './MyTriangleBig.js';
/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangram extends CGFobject {
   constructor(scene) {
      super(scene);

      this.diamond = new MyDiamond(scene);
      this.triangle = new MyTriangle(scene);
      this.parallelogram = new MyParallelogram(scene);
      this.triangleSmall = new MyTriangleSmall(scene);
      this.triangleBig = new MyTriangleBig(scene);

      this.initMaterials();
   }

   initMaterials() {
      this.orangeMaterial = new CGFappearance(this.scene);
      this.orangeMaterial.setAmbient(1.0, 0.5, 0.0, 1.0);
      this.orangeMaterial.setDiffuse(1.0, 0.5, 0.0, 1.0);
      this.orangeMaterial.setSpecular(1.0, 1.0, 1.0, 1.0);
      this.orangeMaterial.setShininess(10.0);

      this.blueMaterial = new CGFappearance(this.scene);
      this.blueMaterial.setAmbient(0.0, 0.0, 1.0, 1.0);
      this.blueMaterial.setDiffuse(0.0, 0.0, 1.0, 1.0);
      this.blueMaterial.setSpecular(1.0, 1.0, 1.0, 1.0);
      this.blueMaterial.setShininess(10.0);

      this.pinkMaterial = new CGFappearance(this.scene);
      this.pinkMaterial.setAmbient(1.0, 0.0, 1.0, 1.0);
      this.pinkMaterial.setDiffuse(1.0, 0.0, 1.0, 1.0);
      this.pinkMaterial.setSpecular(1.0, 1.0, 1.0, 1.0);
      this.pinkMaterial.setShininess(10.0);

      this.yellowMaterial = new CGFappearance(this.scene);
      this.yellowMaterial.setAmbient(1.0, 1.0, 0.0, 1.0);
      this.yellowMaterial.setDiffuse(1.0, 1.0, 0.0, 1.0);
      this.yellowMaterial.setSpecular(1.0, 1.0, 1.0, 1.0);
      this.yellowMaterial.setShininess(10.0);

      this.greenMaterial = new CGFappearance(this.scene);
      this.greenMaterial.setAmbient(0.0, 1.0, 0.0, 1.0);
      this.greenMaterial.setDiffuse(0.0, 1.0, 0.0, 1.0);
      this.greenMaterial.setSpecular(1.0, 1.0, 1.0, 1.0);
      this.greenMaterial.setShininess(10.0);

      this.purpleMaterial = new CGFappearance(this.scene);
      this.purpleMaterial.setAmbient(0.5, 0.0, 0.5, 1.0);
      this.purpleMaterial.setDiffuse(0.5, 0.0, 0.5, 1.0);
      this.purpleMaterial.setSpecular(1.0, 1.0, 1.0, 1.0);
      this.purpleMaterial.setShininess(10.0);

      this.redMaterial = new CGFappearance(this.scene);
      this.redMaterial.setAmbient(1.0, 0.0, 0.0, 1.0);
      this.redMaterial.setDiffuse(1.0, 0.0, 0.0, 1.0);
      this.redMaterial.setSpecular(0.99, 0.99, 0.99, 1.0);
      this.redMaterial.setShininess(10.0);
   }

   display() {
      // Green rectangle (diamond)
      // Translate matrix
      var translateMatrixDiamond = [
         1, 0, 0, 0, // column 0
         0, 1, 0, 0, // column 1
         0, 0, 1, 0, // column 2
         -1, -2, 0, 1 // column 3
      ];

      // Rotation matrix
      var c = Math.cos(Math.PI / 4);
      var s = Math.sin(Math.PI / 4);
      var rotateMatrixDiamond = [
         c, s, 0, 0, // column 0
         -s, c, 0, 0, // column 1
         0, 0, 1, 0, // column 2
         0, 0, 0, 1  // column 3
      ];

      this.scene.pushMatrix();
      this.scene.multMatrix(translateMatrixDiamond);
      this.scene.multMatrix(rotateMatrixDiamond);
      this.greenMaterial.apply();
      this.diamond.display();
      this.scene.popMatrix();

      // Pink triangle (triangle)
      this.scene.pushMatrix();
      this.scene.translate(-0.71, -0.3, 0);
      this.scene.rotate(Math.PI / 2, 0, 0, 1);
      this.pinkMaterial.apply();
      this.triangle.display();
      this.scene.popMatrix();

      // Blue triangle (big triangle)
      this.scene.pushMatrix();
      this.scene.translate(-1.7, 0.7, 0);
      this.scene.rotate(3 * Math.PI / 2, 0, 0, 1);
      this.blueMaterial.apply();
      this.triangleBig.display();
      this.scene.popMatrix();

      // Orange triangle (big triangle)
      this.scene.pushMatrix();
      this.scene.translate(0.3, 2.7, 0);
      this.scene.rotate(Math.PI / 2, 0, 0, 1);
      this.orangeMaterial.apply();
      this.triangleBig.display();
      this.scene.popMatrix();

      // Yellow parallelogram (parallelogram) 
      this.scene.pushMatrix();
      this.scene.translate(1.7, -2.7, 0);
      this.scene.rotate(Math.PI, 0, 1, 0);
      this.scene.rotate(Math.PI / 4, 0, 0, 1);
      this.yellowMaterial.apply();
      this.parallelogram.display();
      this.scene.popMatrix();

      // Purple triangle (small triangle)
      this.scene.pushMatrix();
      this.scene.translate(2.4, -2, 0);
      this.scene.rotate(3 * Math.PI / 4, 0, 0, 1);
      this.purpleMaterial.apply();
      this.triangleSmall.display();
      this.scene.popMatrix();

      // Red triangle (small triangle)
      this.scene.pushMatrix();
      this.scene.translate(3.1, -1.7, 0);
      this.scene.rotate(Math.PI, 0, 0, 1);
      this.redMaterial.apply();
      this.triangleSmall.display();
      this.scene.popMatrix();
   }

   enableNormalViz() {
      this.diamond.enableNormalViz();
      this.triangle.enableNormalViz();
      this.parallelogram.enableNormalViz();
      this.triangleSmall.enableNormalViz();
      this.triangleBig.enableNormalViz();
   }

   disableNormalViz() {
      this.diamond.disableNormalViz();
      this.triangle.disableNormalViz();
      this.parallelogram.disableNormalViz();
      this.triangleSmall.disableNormalViz();
      this.triangleBig.disableNormalViz();
   }
}