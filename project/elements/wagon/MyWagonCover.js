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
    let R = this.R,
      d = this.length / 2,
      N = this.segments;
    let heightFactor = 1.4;
    let Z_SEG = 30;

    this.vertices = [];
    this.normals = [];
    this.texCoords = [];
    this.indices = [];

    for (let j = 0; j <= Z_SEG; j++) {
      let v = j / Z_SEG;
      let z = d - v * this.length;

      for (let i = 0; i <= N; i++) {
        let u = i / N;
        let angle = (Math.PI * i) / N;

        let x = R * Math.cos(angle);
        let y = R * Math.sin(angle) * heightFactor;

        let nx = Math.cos(angle);
        let ny = Math.sin(angle) / heightFactor;
        let nLen = Math.sqrt(nx * nx + ny * ny);
        nx /= nLen;
        ny /= nLen;

        this.vertices.push(x, y, z);
        this.normals.push(nx, ny, 0);
        this.texCoords.push(u, v);
      }
    }

    for (let j = 0; j < Z_SEG; j++) {
      for (let i = 0; i < N; i++) {
        let p1 = j * (N + 1) + i;
        let p2 = p1 + 1;
        let p3 = (j + 1) * (N + 1) + i;
        let p4 = p3 + 1;

        this.indices.push(p1, p3, p2, p2, p3, p4);
      }
    }

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  }
}
