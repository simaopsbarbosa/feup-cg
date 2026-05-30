import { CGFobject } from '../../../lib/CGF.js';

export class MyGrassField extends CGFobject {
  constructor(scene, nrBlades = 15000, radius = 40) {
    super(scene);
    this.nrBlades = nrBlades;
    this.radius = radius;
    this.initBuffers();
  }

  initBuffers() {
    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];

    let vertexIndex = 0;

    // prevent grass from spawning inside the barn
    const barnMinX = -2.5;
    const barnMaxX = 8.5;
    const barnMinZ = -1.1;
    const barnMaxZ = 7.1;

    for (let i = 0; i < this.nrBlades; i++) {
      let angle = Math.random() * Math.PI * 2;
      let r = Math.random() * this.radius;
      let x = r * Math.cos(angle);
      let z = r * Math.sin(angle);

      if (x >= barnMinX && x <= barnMaxX && z >= barnMinZ && z <= barnMaxZ) {
        continue;
      }

      let h = 0.3 + Math.random() * 0.45;
      let w = 0.03 + Math.random() * 0.04;
      let rot = Math.random() * Math.PI * 2;

      let cos = Math.cos(rot);
      let sin = Math.sin(rot);

      let rx1 = (-w / 2) * cos;
      let rz1 = (-w / 2) * sin;
      let rx2 = (w / 2) * cos;
      let rz2 = (w / 2) * sin;

      // Anchor all vertices to the pivot position so they can be displaced as a whole on the GPU
      this.vertices.push(x, 0.0, z, x, 0.0, z, x, 0.0, z);

      // Pack the actual shape offset values in the normal attribute since we don't need traditional lighting
      this.normals.push(rx1, 0.0, rz1, rx2, 0.0, rz2, 0.0, h, 0.0);

      // Map V texture coordinate to height ratio (0 at base, 1 at tip) for wind weight scaling
      this.texCoords.push(0.0, 0.0, 1.0, 0.0, 0.5, 1.0);

      this.indices.push(vertexIndex, vertexIndex + 1, vertexIndex + 2);

      vertexIndex += 3;
    }

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  }
}
