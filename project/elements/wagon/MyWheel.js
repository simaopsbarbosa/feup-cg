import { CGFobject } from '../../lib/CGF.js';

export class MyWheel extends CGFobject {
   constructor(scene, radius = 0.25, spokes = 8, thickness = 0.06) {
      super(scene);
      this.R = radius;
      this.spokes = spokes;
      this.thickness = thickness;
      this.initBuffers();
   }

   initBuffers() {
      let R = this.R;
      let ri = R * 0.82; // inner rim radius
      let hr = R * 0.10; // hub radius
      let t = this.thickness;
      let N = 32; // rim smoothness

      this.vertices = [];
      this.normals = [];
      this.texCoords = [];
      this.indices = [];

      let push = (x, y, z, nx, ny, nz, u, v) => {
         this.vertices.push(x, y, z);
         this.normals.push(nx, ny, nz);
         this.texCoords.push(u, v);
      };

      for (let side = 0; side < 2; side++) {
         let z = side === 0 ? t / 2 : -t / 2;
         let nz = side === 0 ? 1 : -1;
         let base = this.vertices.length / 3;

         for (let i = 0; i <= N; i++) {
            let a = 2 * Math.PI * i / N;
            let cx = Math.cos(a);
            let cy = Math.sin(a);
            push(R * cx, R * cy, z, 0, 0, nz, 0.5 + 0.5 * cx, 0.5 + 0.5 * cy);
            push(ri * cx, ri * cy, z, 0, 0, nz, 0.5 + 0.5 * (ri / R) * cx, 0.5 + 0.5 * (ri / R) * cy);
         }
         for (let i = 0; i < N; i++) {
            let b = base + i * 2;
            if (nz > 0) this.indices.push(b, b + 1, b + 2, b + 1, b + 3, b + 2);
            else this.indices.push(b, b + 2, b + 1, b + 1, b + 2, b + 3);
         }
      }

      let outerBase = this.vertices.length / 3;
      for (let i = 0; i <= N; i++) {
         let a = 2 * Math.PI * i / N;
         let cx = Math.cos(a);
         let cy = Math.sin(a);
         push(R * cx, R * cy, t / 2, cx, cy, 0, i / N, 1);
         push(R * cx, R * cy, -t / 2, cx, cy, 0, i / N, 0);
      }
      for (let i = 0; i < N; i++) {
         let b = outerBase + i * 2;
         this.indices.push(b, b + 1, b + 2, b + 1, b + 3, b + 2);
      }

      let sw = R * 0.045; // spoke half-width
      for (let s = 0; s < this.spokes; s++) {
         let a = 2 * Math.PI * s / this.spokes;
         let ca = Math.cos(a);
         let sa = Math.sin(a);
         let px = -sa * sw;
         let py = ca * sw;

         for (let side = 0; side < 2; side++) {
            let z = side === 0 ? t / 2 : -t / 2;
            let nz = side === 0 ? 1 : -1;
            let base = this.vertices.length / 3;

            if (nz > 0) {
               push(hr * ca + px, hr * sa + py, z, 0, 0, nz, 0, 0);
               push(hr * ca - px, hr * sa - py, z, 0, 0, nz, 0, 1);
               push(ri * ca - px, ri * sa - py, z, 0, 0, nz, 1, 1);
               push(ri * ca + px, ri * sa + py, z, 0, 0, nz, 1, 0);
               this.indices.push(b, b + 1, b + 2, b, b + 2, b + 3);
            } else {
               push(hr * ca + px, hr * sa + py, z, 0, 0, nz, 0, 0);
               push(hr * ca + px, ri * sa + py, z, 0, 0, nz, 1, 0);
               push(hr * ca - px, ri * sa - py, z, 0, 0, nz, 1, 1);
               push(hr * ca - px, hr * sa - py, z, 0, 0, nz, 0, 1);
               this.indices.push(b, b + 1, b + 2, b, b + 2, b + 3);
            }
         }
      }

      let hubN = 16;
      for (let side = 0; side < 2; side++) {
         let z = side === 0 ? t / 2 : -t / 2;
         let nz = side === 0 ? 1 : -1;
         let c = this.vertices.length / 3;
         push(0, 0, z, 0, 0, nz, 0.5, 0.5);
         for (let i = 0; i <= hubN; i++) {
            let a = 2 * Math.PI * i / hubN;
            push(hr * Math.cos(a), hr * Math.sin(a), z, 0, 0, nz, 0.5 + 0.5 * Math.cos(a), 0.5 + 0.5 * Math.sin(a));
         }
         for (let i = 0; i < hubN; i++) {
            if (nz > 0) this.indices.push(c, c + i + 1, c + i + 2);
            else this.indices.push(c, c + i + 2, c + i + 1);
         }
      }

      this.primitiveType = this.scene.gl.TRIANGLES;

   }
}