import {
  CGFscene,
  CGFcamera,
  CGFaxis,
  CGFappearance,
  CGFtexture,
  CGFshader,
} from '../../lib/CGF.js';
import { MyHalfSphere } from '../primitives/MyHalfSphere.js';
import { MyPlane } from '../primitives/MyPlane.js';
import { MyCloud } from '../elements/cloud/MyCloud.js';
import { ScatterManager } from '../elements/scatter/ScatterManager.js';
import { MyPlayer } from '../elements/player/MyPlayer.js';
import { MyFlower } from '../elements/flower/MyFlower.js';

/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
  constructor() {
    super();
  }

  init(application) {
    super.init(application);
    this.initCameras();
    this.initLights();

    //Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);
    this.enableTextures(true);

    this.setUpdatePeriod(16);

    // populate cloud textures array
    this.cloudTextures = [];
    for (let i = 1; i <= 20; i++) {
      this.cloudTextures.push(new CGFtexture(this, `images/clouds/${i}.png`));
    }

    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.plane = new MyPlane(this, 80);
    this.flowers = [];
    for (let i = 0; i < 50; i++) {
      this.flowers.push({
        flower: new MyFlower(this, i * 53.7),
        x: (Math.random() - 0.5) * 80,
        z: (Math.random() - 0.5) * 80,
        rotation: Math.random() * Math.PI * 2,
        scale: 0.2 + Math.random() * 0.4,
      });
    }

    // Shaders
    this.heightmapBakeQuad = new MyPlane(this, 1);
    // Different terrain every run
    this.u_random1 = [10.0 + Math.random() * 10.0, 70.0 + Math.random() * 20.0];
    this.u_random2 = 40000.0 + Math.random() * 20000.0;

    //scatter Manager
    this.ScatterManager = new ScatterManager(this);

    //player
    this.player = new MyPlayer(this, this.camera, this.terrainHeight, 160);

    //-------Objects connected to MyInterface
    this.displayAxis = true;
    this.displaySky = true;
    this.textureFiltering = false;
    this.scaleFactor = 5;
    this.selectedTexture = -1;
    this.wrapS = 0;
    this.wrapT = 0;

    this.clouds = [];
    let numberOfClouds = 50;
    for (let i = 0; i < numberOfClouds; i++) {
      let cloud = new MyCloud(this, this.cloudTextures);
      this.clouds.push(cloud);
    }

    this.lastTime = 0;

    this.sunDirection = [-1.0, 0.7, 0.3];

    this.sphere = new MyHalfSphere(this, 6, 100);
    this.sphere.appearance.setEmission(1.0, 1.0, 1.0, 1.0);
  }
  generateHeightmapTexture(resolution = 512) {
    const gl = this.gl;

    const fb = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, fb);

    const heightmapTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, heightmapTexture);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      resolution,
      resolution,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      null
    );

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    gl.framebufferTexture2D(
      gl.FRAMEBUFFER,
      gl.COLOR_ATTACHMENT0,
      gl.TEXTURE_2D,
      heightmapTexture,
      0
    );

    const genShader = new CGFshader(
      gl,
      'shaders/heightmap.vert',
      'shaders/heightmap.frag'
    );

    this.setActiveShader(genShader);
    genShader.setUniformsValues({
      u_random1: this.u_random1,
      u_random2: this.u_random2,
    });
    gl.viewport(0, 0, resolution, resolution);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    this.heightmapBakeQuad.display();
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    this.setActiveShader(this.defaultShader);

    const cgfTex = new CGFtexture(this);
    cgfTex.texID = heightmapTexture;
    return cgfTex;
  }

  initLights() {
    // Don't change this because of the default material for the sky
    this.lights[0].setAmbient(0.1, 0.1, 0.1, 1.0);
    // Can stay like this but test new values for a better effect
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].setSpecular(0.8, 0.8, 0.7, 1.0);
    this.lights[0].enable();
  }

  updateLights() {
    // Directional light
    this.lights[0].setPosition(
      this.sunDirection[0],
      this.sunDirection[1],
      this.sunDirection[2],
      0.0
    );
    this.lights[0].update();
  }

  initCameras() {
    this.camera = new CGFcamera(
      0.7,
      0.1,
      500,
      vec3.fromValues(15, 15, 15),
      vec3.fromValues(0, 0, 0)
    );
  }

  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }

  update(t) {
    if (this.lastTime == 0) this.lastTime = t;
    let deltaTime = t - this.lastTime;
    this.lastTime = t;

    let timeScale = 0.005;

    for (let i = 0; i < this.clouds.length; i++) {
      this.clouds[i].update(deltaTime * timeScale);
    }
    if (this.gui.activeKeys) {
      this.player.update(this.gui.activeKeys);
    }
  }

  display() {
    // ---- BEGIN Background, camera and axis setup
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();
    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    this.updateLights();

    // Draw axis
    if (this.displayAxis) this.axis.display();

    this.setDefaultAppearance();

    // ---- BEGIN Primitive drawing section
    if (this.displaySky) {
      this.pushMatrix();
      this.scale(
        this.scaleFactor * 2,
        this.scaleFactor * 2,
        this.scaleFactor * 2
      );
      // Sphere
      this.gl.disable(this.gl.CULL_FACE);
      this.sphere.display();
      this.gl.enable(this.gl.CULL_FACE);
      this.popMatrix();
    }

    // Clouds
    if (this.displaySky) {
      this.gl.disable(this.gl.CULL_FACE);
      this.gl.enable(this.gl.BLEND);
      this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
      this.gl.depthMask(false);
      this.gl.disable(this.gl.DEPTH_TEST);

      for (let i = 0; i < this.clouds.length; i++) {
        if (this.clouds[i].isReady()) {
          this.clouds[i].display();
        }
      }

      this.gl.enable(this.gl.DEPTH_TEST);
      this.gl.depthMask(true);
      this.gl.disable(this.gl.BLEND);
      this.gl.enable(this.gl.CULL_FACE);
    }

    // Plane
    let camera = this.camera.position;
    this.ScatterManager.display(camera);
    this.plane.display();

    // Flowers
    for (let f of this.flowers) {
      this.pushMatrix();
      this.translate(f.x, 1.3, f.z);
      this.rotate(f.rotation, 0, 1, 0);
      this.scale(f.scale, f.scale, f.scale);
      f.flower.display();
      this.popMatrix();
    }
    // ---- END Primitive drawing section
  }
}
