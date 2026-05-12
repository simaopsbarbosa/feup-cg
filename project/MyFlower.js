import { CGFappearance } from "../lib/CGF";
import { MyStem } from "./MyStem";
import { MyPetal } from "./MyPetal";
import { MyLeaf } from "./MyLeaf";

const STEM_HEIGHT_MIN = 0.4, STEM_HEIGHT_MAX = 1.8;
const PETAL_COUNT_MIN = 5, PETAL_COUNT_MAX = 12;
const LEAF_COUNT_MIN = 1, LEAF_COUNT_MAX = 4;
const PETAL_SIZE_MIN = 0.6, PETAL_SIZE_MAX = 1.4;

const PETAL_PALLETTE = [
   [1.0, 0.95, 0.2],
   [1.0, 0.4, 0.6],
   [1.0, 1.0, 1.0],
   [0.7, 0.3, 0.9],
   [1.0, 0.5, 0.1],
];

export class MyFlower {
   constructor(scene, seed) {
      this.scene = scene;
      this.seed = seed !== undefined ? seed : Math.random() * 9999;

      this.initParams();
      this.initParts();
      this.initAppearance();
   }

   rand(i) {
      let x = Math.sin(i * 9.3 + this.seed) * 43758.5453;
      return x - Math.floor(x);
   }

   initParams() {
      this.stemHeight = STEM_HEIGHT_MIN + this.rand(0) * (STEM_HEIGHT_MAX - STEM_HEIGHT_MIN);
      this.petalCount = PETAL_COUNT_MIN + Math.floor(this.rand(1) * (PETAL_COUNT_MAX - PETAL_COUNT_MIN + 1));
      this.leafCount = LEAF_COUNT_MIN + Math.floor(this.rand(2) * (LEAF_COUNT_MAX - LEAF_COUNT_MIN + 1));
      this.petalSize = PETAL_SIZE_MIN + this.rand(3) * (PETAL_SIZE_MAX - PETAL_SIZE_MIN);

      let paletteIdx = Math.floor(this.rand(4) * PETAL_PALLETTE.length);
      let base = PETAL_PALLETTE[paletteIdx];
      let shift = 0.08;
      this.petalColor = base.map((c, i) =>
         Math.min(1, Math.max(0, c + (this.rand(5 + i) - 0.5) * shift * 2))
      );

      this.leafHeights = [];
      for (let i = 0; i < this.leafCount; i++) {
         this.leafHeights.push(0.1 + this.rand(10 + i) * 0.6);
      }
   }

   initParts() {
      this.stem = new MyStem(this.scene, this.stemHeight);
      this.petal = new MyPetal(this.scene);
      this.leaf = new MyLeaf(this.scene);
   }

   initAppearance() {
      // Stem - green
      this.stemApp = new CGFappearance(this.scene);
      this.stemApp.setAmbient(0.1, 0.3, 0.1, 1);
      this.stemApp.setDiffuse(0.2, 0.6, 0.2, 1);
      this.stemApp.setSpecular(0.05, 0.1, 0.05, 1);
      this.stemApp.setShininess(5);

      // Petal - procedural color
      this.petalApp = new CGFappearance(this.scene);
      let [r, g, b] = this.petalColor;
      this.petalApp.setAmbient(r * 0.4, g * 0.4, b * 0.4, 1);
      this.petalApp.setDiffuse(r, g, b, 1);
      this.petalApp.setSpecular(0.1, 0.1, 0.1, 1);
      this.petalApp.setShininess(10);

      // Center
      this.centerApp = new CGFappearance(this.scene);
      this.centerApp.setAmbient(0.4, 0.3, 0.0, 1);
      this.centerApp.setDiffuse(0.9, 0.7, 0.0, 1);
      this.centerApp.setSpecular(0.1, 0.1, 0.0, 1);
      this.centerApp.setShininess(5);

      // Leaf - dark green
      this.leafApp = new CGFappearance(this.scene);
      this.leafApp.setAmbient(0.05, 0.25, 0.05, 1);
      this.leafApp.setDiffuse(0.15, 0.5, 0.15, 1);
      this.leafApp.setSpecular(0.02, 0.08, 0.02, 1);
      this.leafApp.setShininess(3);
   }

   display() {
      let scene = this.scene;

      // Stem
      this.stemApp.apply();
      this.stem.display();

      // Leaves
      this.leafApp.apply();
      for (let i = 0; i < this.leafCount; i++) {
         let h = this.leafHeights[i] * this.stemHeight;
         let side = i % 2 === 0 ? 1 : -1;
         let angle = this.rand(20 + i) * Math.PI * 2;

         scene.pushMatrix();
         scene.translate(0, h, 0);
         scene.rotate(angle, 0, 1, 0);
         scene.rotate(side * 0.4, 0, 0, 1);
         scene.scale(0.8, 0.8, 0.8);
         this.leaf.display();
         scene.popMatrix();
      }

      // Petals
      this.petalApp.apply();
      for (let i = 0; i < this.petalCount; i++) {
         let angle = (2 * Math.PI * i) / this.petalCount;

         scene.pushMatrix();
         scene.translate(0, this.stemHeight, 0);
         scene.rotate(angle, 0, 1, 0);
         scene.rotate(-Math.PI / 6, 1, 0, 0);
         scene.scale(this.petalSize, this.petalSize, this.petalSize);
         this.petal.display();
         scene.popMatrix();
      }

      // Center disc
      this.centerApp.apply();
      scene.pushMatrix();
      scene.translate(0, this.stemHeight, 0);
      scene.scale(0.15, 0.08, 0.15);
      this.petal.display();
      scene.popMatrix();
   }
}