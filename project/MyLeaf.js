import { CGFobject } from '../lib/CGF.js';

export class MyLeaf extends CGFobject {
   constructor(scene) {
      super(scene);
      this.initBuffers();
   }

   initBuffers() {
      this.vertices = [
         0.0, 0.0, 0.0,
         0.25, 0.3, 0.0,
         0.0, 0.6, 0.0,
         -0.25, 0.3, 0.0
      ];
      this.normals = [
         0, 0, 1,
         0, 0, 1,
         0, 0, 1,
         0, 0, 1
      ]
      this.texCoords = [
         0.5, 0.0,
         1.0, 0.5,
         0.5, 1.0,
         0.0, 0.5
      ];
      this.indices = [
         0, 1, 2,
         0, 2, 3
      ];

      this.primitiveType = this.scene.gl.TRIANGLES;
      this.initGLBuffers();
   }
}