import { CGFobject } from "../../lib/CGF";

export class MyWagonBed extends CGFobject {
   constructor(scene, width = 1, height = 0.3, depth = 0.5) {
      super(scene);
      this.width = width;
      this.height = height;
      this.depth = depth;
      this.initBuffers();
   }

   initBuffers() {
      let w = this.width / 2;
      let h = this.height / 2;
      let d = this.depth / 2;

      this.vertices = [
         // Front face
         -w, 0, d,
         w, 0, d,
         w, h, d,
         -w, h, d,

         // Back face
         w, 0, -d,
         -w, 0, -d,
         -w, h, -d,
         w, h, -d,

         // Left face
         -w, 0, -d,
         -w, 0, d,
         -w, h, d,
         -w, h, -d,

         // Right face
         w, 0, d,
         w, 0, -d,
         w, h, -d,
         w, h, d,

         // Top face
         -w, h, d,
         w, h, d,
         w, h, -d,
         -w, h, -d,

         // Bottom face
         -w, 0, -d,
         w, 0, -d,
         w, 0, d,
         -w, 0, d
      ];

      this.normals = [
         // Front
         0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,

         // Back
         0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1,

         // Left
         -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0,

         // Right
         1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,

         // Top
         0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0,

         // Bottom
         0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0,
      ];

      this.texCoords = [
         // Front face
         0, 0, 1, 0, 1, 1, 0, 1,

         // Back face
         0, 0, 1, 0, 1, 1, 0, 1,

         // Left face
         0, 0, 1, 0, 1, 1, 0, 1,

         // Right face
         0, 0, 1, 0, 1, 1, 0, 1,

         // Top face
         0, 0, 1, 0, 1, 1, 0, 1,

         // Bottom face
         0, 0, 1, 0, 1, 1, 0, 1,
      ];

      this.indices = [];
      for (let f = 0; f < 6; f++) {
         let b = f * 4;
         this.indices.push(b, b + 1, b + 2, b, b + 2, b + 3);
      }

      this.primitiveType = this.scene.gl.TRIANGLES;
      this.initGLBuffers();
   }

}