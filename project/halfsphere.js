import { CGFobject, CGFappearance, CGFtexture } from '../lib/CGF.js';
/**
 * MyTHalfSphere
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyHalfSphere extends CGFobject {
  constructor(scene, radius, stacks) {
    super(scene);
    this.stacks = stacks;
    this.radius = radius;
    this.gl = scene.gl;
    this.texture = new CGFtexture(this, 'images/sky.png');
    this.appearance = new CGFappearance(scene);
    this.appearance.setAmbient(0.1, 0.1, 0.1, 1);
    this.appearance.setDiffuse(0.9, 0.9, 0.9, 1);
    this.appearance.setSpecular(0.1, 0.1, 0.1, 1);
    this.appearance.setShininess(10.0);
    this.initBuffers();
  }
  applyTexture() {
    this.appearance.setTexture(this.texture);
    this.appearance.setTextureWrap('REPEAT', 'REPEAT');
    this.appearance.apply();
    const filter = this.scene.textureFiltering
      ? this.scene.gl.NEAREST
      : this.scene.gl.LINEAR;
    this.scene.gl.texParameteri(
      this.scene.gl.TEXTURE_2D,
      this.scene.gl.TEXTURE_MAG_FILTER,
      filter
    );
  }

  initBuffers() {
    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];
    //while in the circle theses are equal in the half sphere the long needs to increment in gretear increments than the lattitude
    const longStep = Math.PI / this.stacks;
    const latStep = Math.PI / 2 / this.stacks;
    let latitude = Math.PI / 2;
    var sliceVertCount = this.stacks * 2;
    //this goes by stack and completes the entire band
    for (var i = 0; i <= this.stacks; i++) {
      let longitude = 0;
      for (let j = 0; j <= sliceVertCount; j++) {
        let x = this.radius * Math.cos(latitude) * Math.cos(longitude);
        let y = this.radius * Math.sin(latitude);
        let z = this.radius * Math.cos(latitude) * Math.sin(longitude);
        let u = j / sliceVertCount;
        let v = i / this.stacks;
        this.vertices.push(x, y, z);
        this.normals.push(-x, -y, -z);
        this.texCoords.push(u, v);
        longitude += longStep;
      }
      latitude += latStep;
    }

    for (let i = 0; i < this.stacks; i++) {
      for (let j = 0; j < sliceVertCount; j++) {
        let first = i * (sliceVertCount + 1) + j;
        let second = first + sliceVertCount + 1;
        this.indices.push(first, second, first + 1);
        this.indices.push(second, second + 1, first + 1);
        this.indices.push(first + 1, second, first);
        this.indices.push(first + 1, second + 1, second);
      }
    }

    this.primitiveType = this.scene.gl.TRIANGLES;

    this.initGLBuffers();
  }

  display() {
    this.applyTexture();
    super.display();
  }
}
