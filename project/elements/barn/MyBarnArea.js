import { CGFobject, CGFappearance } from "../../../lib/CGF.js";

const AREA_COLORS = [
   [1.0, 1.0, 0.0],
   [1.0, 0.38, 0.14],
]

export class MyBarnArea extends CGFobject {
   constructor(scene, radius = 10) {
      super(scene);
      this.radius = radius;
      this.innerRatio = 0.9;
      this.segments = 72;
      this.initBuffers();
      this.initAppearance();
   }

   initBuffers() {
      this.vertices = [];
      this.indices = [];
      this.normals = [];
      this.texCoords = [];
      const segs = this.segments;
      const innerR = this.radius * this.innerRatio;

      for (let i = 0; i <= segs; i++) {
         const theta = i * 2 * Math.PI / segs;
         const c = Math.cos(theta);
         const s = Math.sin(theta);

         this.vertices.push(c * this.radius, s * this.radius, 0);
         this.vertices.push(c * innerR, s * innerR, 0);

         this.normals.push(0, 0, 1, 0, 0, 1);

         this.texCoords.push(i / segs, 0, i / segs, 1);

         const base = i * 2;
         this.indices.push(base, base + 1);
      }

      this.primitiveType = this.scene.gl.TRIANGLE_STRIP;
      this.initGLBuffers();
   }

   initAppearance() {
      this.app = new CGFappearance(this.scene);
      this.app.setSpecular(0.0, 0.0, 0.0, 1.0);
      this.app.setShininess(1.0);
      this._applyColor(0);
   }

   _applyColor(index) {
      let [r, g, b] = AREA_COLORS[index];
      this.app.setAmbient(r, g, b, 1.0);
      this.app.setDiffuse(r, g, b, 1.0);
      this.app.setEmission(r * 0.7, g * 0.7, b * 0.7, 1.0);
   }

   display() {
      this.app.apply();
      super.display();
   }
}