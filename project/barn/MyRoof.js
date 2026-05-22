import { CGFobject } from '../../lib/CGF.js';

export class MyRoof extends CGFobject {
  constructor(scene, width = 1, height = 1, depth = 1) {
    super(scene);
    this.width = width;
    this.height = height;
    this.depth = depth;
    this.initBuffers();
  }

  initBuffers() {
    let w = this.width / 2;
    let h = this.height;
    let d = this.depth / 2;

    this.vertices = [
      // Left
      -w,
      0,
      -d,
      -w,
      0,
      d,
      0,
      h,
      d,
      0,
      h,
      -d,

      // Right
      w,
      0,
      d,
      w,
      0,
      -d,
      0,
      h,
      -d,
      0,
      h,
      d,

      // Front
      -w,
      0,
      d,
      w,
      0,
      d,
      0,
      h,
      d,

      // Back
      w,
      0,
      -d,
      -w,
      0,
      -d,
      0,
      h,
      -d,
    ];

    let lx = -h,
      ly = w;
    let len = Math.sqrt(lx * lx + ly * ly);
    let lnx = lx / len,
      lny = ly / len;

    this.normals = [
      // Left
      lnx,
      lny,
      0,
      lnx,
      lny,
      0,
      lnx,
      lny,
      0,
      lnx,
      lny,
      0,

      // Right
      -lnx,
      lny,
      0,
      -lnx,
      lny,
      0,
      -lnx,
      lny,
      0,
      -lnx,
      lny,
      0,

      // Front
      0,
      0,
      1,
      0,
      0,
      1,
      0,
      0,
      1,

      // Back
      0,
      0,
      -1,
      0,
      0,
      -1,
      0,
      0,
      -1,
    ];

    this.texCoords = [
      // Left
      0, 1, 1, 1, 1, 0, 0, 0,

      // Right
      0, 1, 1, 1, 1, 0, 0, 0,

      // Front
      0, 1, 1, 1, 0.5, 0,

      // Back
      0, 1, 1, 1, 0.5, 0,
    ];

    this.indices = [
      // Left
      0, 1, 2, 0, 2, 3,

      // Right
      4, 5, 6, 4, 6, 7,

      // Front
      8, 9, 10,

      // Back
      11, 12, 13,
    ];

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  }

  displayRoofSurfaces() {
    let saved = this.indices;
    this.indices = [0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7];
    this.initGLBuffers();
    super.display();
    this.indices = saved;
    this.initGLBuffers();
  }

  displayFrontBack() {
    let saved = this.indices;
    this.indices = [8, 9, 10, 11, 12, 13];
    this.initGLBuffers();
    super.display();
    this.indices = saved;
    this.initGLBuffers();
  }
}
