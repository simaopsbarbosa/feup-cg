import { CGFobject } from '../../lib/CGF.js';

export class MyPetal extends CGFobject {
  constructor(scene, slices = 12) {
    super(scene);
    this.slices = slices;
    this.initBuffers();
  }

  initBuffers() {
    this.vertices = [];
    this.normals = [];
    this.texCoords = [];
    this.indices = [];

    this.vertices.push(0, 0, 0);
    this.normals.push(0, 1, 0);
    this.texCoords.push(0.5, 0);

    for (let i = 0; i <= this.slices; i++) {
      let t = i / this.slices;
      let angle = (Math.PI * i) / this.slices;
      let width = Math.sin(angle) * 0.3;
      let z = -t;

      this.vertices.push(width, 0, z);
      this.vertices.push(-width, 0, z);
      this.normals.push(0, 1, 0);
      this.normals.push(0, 1, 0);
      this.texCoords.push(t, 0.0);
      this.texCoords.push(t, 1.0);
    }

    for (let i = 0; i < this.slices; i++) {
      let base = 1 + i * 2;
      this.indices.push(0, base, base + 2); // right side
      this.indices.push(0, base + 3, base + 1); // left side
    }

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  }
}
