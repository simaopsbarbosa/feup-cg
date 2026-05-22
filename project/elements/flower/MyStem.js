import { CGFobject } from '../../../lib/CGF.js';

export class MyStem extends CGFobject {
  constructor(scene, height = 1.0, radius = 0.04, slices = 8) {
    super(scene);
    this.height = height;
    this.radius = radius;
    this.slices = slices;
    this.initBuffers();
  }

  initBuffers() {
    this.vertices = [];
    this.normals = [];
    this.texCoords = [];
    this.indices = [];

    for (let i = 0; i <= this.slices; i++) {
      let angle = (2 * Math.PI * i) / this.slices;
      let nx = Math.cos(angle),
        nz = Math.sin(angle);

      this.vertices.push(this.radius * nx, 0, this.radius * nz);
      this.normals.push(nx, 0, nz);
      this.texCoords.push(i / this.slices, 0);

      this.vertices.push(this.radius * nx, this.height, this.radius * nz);
      this.normals.push(nx, 0, nz);
      this.texCoords.push(i / this.slices, 1);
    }

    for (let i = 0; i < this.slices * 2; i++) {
      this.indices.push(i, i + 1, i + 2);
    }

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  }
}
