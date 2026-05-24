import { CGFobject } from '../../../lib/CGF.js';

export class MyWagonCover extends CGFobject {
   constructor(scene, width = 0.7, length = 1.4, segments = 20) {
      super(scene);
      this.R = width / 2;
      this.length = length;
      this.segments = segments;
      this.initBuffers();
   }

   initBuffers() {
      let R = this.R, d = this.length / 2, N = this.segments;

      this.vertices = [];
      this.normals = [];
      this.texCoords = [];
      this.indices = [];

      for (let i = 0; i <= N; i++) {
         let angle = Math.PI * i / N;
         let x = R * Math.cos(angle);
         let y = R * Math.sin(angle);
         let nx = Math.cos(angle);
         let ny = Math.sin(angle);
         let u = i / N;

         this.vertices.push(x, y, d);
         this.normals.push(nx, ny, 0);
         this.texCoords.push(u, 1);
      }

      for (let i = 0; i < N; i++) {
         let b = i * 2;
         this.indices.push(b, b + 1, b + 2, b + 1, b + 3, b + 2);
      }

      let capFront = this.vertices.length / 3;
      this.vertices.push(0, 0, d);
      this.normals.push(0, 0, 1);
      this.texCoords.push(0.5, 0.5);
      for (let i = 0; i <= N; i++) {
         let angle = Math.PI * i / N;
         this.vertices.push(R * Math.cos(angle), R * Math.sin(angle), d);
         this.normals.push(0, 0, 1);
         this.texCoords.push(0.5 + 0.5 * Math.cos(angle), 0.5 + 0.5 * Math.sin(angle));
      }
      for (let i = 0; i < N; i++) {
         this.indices.push(capFront, capFront + i + 1, capFront + i + 2);
      }

      let capBack = this.vertices.length / 3;
      this.vertices.push(0, 0, -d);
      this.normals.push(0, 0, -1);
      this.texCoords.push(0.5, 0.5);
      for (let i = 0; i <= N; i++) {
         let angle = Math.PI * i / N;
         this.vertices.push(R * Math.cos(angle), R * Math.sin(angle), -d);
         this.normals.push(0, 0, -1);
         this.texCoords.push(0.5 + 0.5 * Math.cos(angle), 0.5 + 0.5 * Math.sin(angle));
      }
      for (let i = 0; i < N; i++) {
         this.indices.push(capBack, capBack + i + 2, capBack + i + 1);
      }

      this.primitiveType = this.scene.gl.TRIANGLES;
      this.initGLBuffers();
   }
}