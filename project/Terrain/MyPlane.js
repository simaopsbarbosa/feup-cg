import { CGFobject,CGFshader,CGFtexture } from '../../lib/CGF.js';
/**
 * MyPlane
 * @constructor
 * @param scene - Reference to MyScene object
 * @param nDivs - number of divisions in both directions of the surface
 * @param minS - minimum texture coordinate in S
 * @param maxS - maximum texture coordinate in S
 * @param minT - minimum texture coordinate in T
 * @param maxT - maximum texture coordinate in T
 */
export class MyPlane extends CGFobject {
  constructor(scene, nrDivs, minS, maxS, minT, maxT) {
    super(scene);
    this.scene=scene;
    // nrDivs = 1 if not provided
    nrDivs = typeof nrDivs !== 'undefined' ? nrDivs : 1;
    this.nrDivs = nrDivs;
    this.patchLength = 1.0 / nrDivs;
    this.minS = minS || 0;
    this.maxS = maxS || 1;
    this.minT = minT || 0;
    this.maxT = maxT || 1;
    this.q = (this.maxS - this.minS) / this.nrDivs;
    this.w = (this.maxT - this.minT) / this.nrDivs;
    this.initBuffers();
    this.terrainShader = new CGFshader(
        scene.gl,
        'shaders/terrain.vert',
        'shaders/terrain.frag'
    );
      this.grassTexture = new CGFtexture(this, 'images/ground/grass.jpg');
      this.rockTexture = new CGFtexture(this, 'images/ground/rock.jpg');
      this.pathTexture = new CGFtexture(this, 'images/ground/path.jpg');
      this.dirtTexture = new CGFtexture(this, 'images/ground/dirt.jpg');
      this.terrainShader.setUniformsValues({
        uSamplerGrass: 0,
        uSamplerRock: 1,
        uSamplerPath: 2,
        uSamplerDirt: 3,
        u_random1: this.u_random1,
        u_random2: this.u_random2,
      });  
  }
  initBuffers() {
    // Generate vertices, normals, and texCoords
    this.vertices = [];
    this.normals = [];
    this.texCoords = [];
    var yCoord = 0.5;
    for (var j = 0; j <= this.nrDivs; j++) {
      var xCoord = -0.5;
      for (var i = 0; i <= this.nrDivs; i++) {
        this.vertices.push(xCoord, yCoord, 0);
        this.normals.push(0, 0, 1);
        this.texCoords.push(this.minS + i * this.q, this.minT + j * this.w);
        xCoord += this.patchLength;
      }
      yCoord -= this.patchLength;
    }
    // Generating indices
    this.indices = [];

    var ind = 0;
    for (var j = 0; j < this.nrDivs; j++) {
      for (var i = 0; i <= this.nrDivs; i++) {
        this.indices.push(ind);
        this.indices.push(ind + this.nrDivs + 1);
        ind++;
      }
      if (j + 1 < this.nrDivs) {
        this.indices.push(ind + this.nrDivs);
        this.indices.push(ind);
      }
    }
    this.primitiveType = this.scene.gl.TRIANGLE_STRIP;
    this.initGLBuffers();
  }

  setFillMode() {
    this.primitiveType = this.scene.gl.TRIANGLE_STRIP;
  }

  setLineMode() {
    this.primitiveType = this.scene.gl.LINES;
  }
  display(){
    this.scene.pushMatrix();
    this.scene.scale(160, 160, 160);
    this.scene.rotate(-Math.PI / 2, 1, 0, 0);
    this.scene.setActiveShader(this.terrainShader);
    this.grassTexture.bind(0);
    this.rockTexture.bind(1);
    this.pathTexture.bind(2);
    this.dirtTexture.bind(3);
    super.display();
    this.scene.setActiveShader(this.scene.defaultShader);
    this.scene.popMatrix(); 
  }
}
