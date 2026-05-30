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
import { MyBarn } from '../elements/barn/MyBarn.js';
import { MyPlayer } from '../elements/player/MyPlayer.js';
import { MyGrassField } from '../elements/grass/MyGrassField.js';
import { MyBarnArea } from '../elements/barn/MyBarnArea.js';
import { CollisionManager } from '../elements/collisions/CollisionManager.js';
import { HayBaleDistribution } from '../elements/hayBale/HayBaleDistribution.js';

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
    this.barn = new MyBarn(this);
    this.barnArea = new MyBarnArea(this, 3.5);

    // Shaders
    this.heightmapBakeQuad = new MyPlane(this, 1);
    // Different terrain every run
    this.u_random1 = [10.0 + Math.random() * 10.0, 70.0 + Math.random() * 20.0];
    this.u_random2 = 40000.0 + Math.random() * 20000.0;

    // Grass Field
    this.grassField = new MyGrassField(this, 160000, 50);
    this.grassShader = new CGFshader(
      this.gl,
      'shaders/grass.vert',
      'shaders/grass.frag'
    );
    this.timeSeconds = 0.0;

    //scatter Manager
    this.ScatterManager = new ScatterManager(this);

    //player
    this.player = new MyPlayer(this);

    // Collision manager
    this.collisionManager = new CollisionManager();

    this.collisionManager.register(
      'barnArea',
      this.barnArea,
      () => ({ x: -7.2, z: 2.9 }),
      3.5,
      (obj) =>{ if(this.player.hayBalesCollected>0){this.player.resetBales();}
        obj._applyColor(1); 
      },
      (obj) => obj._applyColor(0),
      'ring'
    );

    //-------Objects connected to MyInterface
    this.displayAxis = false;
    this.displaySky = true;
    this.displayGrass = true;
    this.textureFiltering = false;
    this.scaleFactor = 5;
    this.selectedTexture = -1;
    this.wrapS = 0;
    this.wrapT = 0;
    this.hayBalesAmount=20;

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


    //MyBaleHay Distribution
    this.hayBales=new HayBaleDistribution(this,this.hayBalesAmount,this.ScatterManager.poissonSampler.points);
    this.hayBales.bales.forEach((bale, index) => {
      this.collisionManager.register(
        `haybale_${index}`,
        bale,
        () => ({ x: bale.x, z: bale.z }),
        1.5,
        (obj) => { if (this.player.addBale()) {
          obj.collected = true;
        } }, 
        null,
        'sphere'
      );
    });
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
      vec3.fromValues(-20, 10, 20),
      vec3.fromValues(0, 0, 0)
    );
  }

  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }

  playerMoves() {
    let key = this.gui.activeKeys;
    if (key['KeyW']) {
      this.player.move('W');
    } else if (key['KeyS']) {
      this.player.move('S');
    } else {
      this.player.move('DS');
    }

    if (key['KeyA']) {
      this.player.move('A');
    } else if (key['KeyD']) {
      this.player.move('D');
    } else {
      this.player.move('RW');
    }
  }

  update(t) {
    if (this.lastTime == 0) this.lastTime = t;
    let deltaTime = t - this.lastTime;
    this.lastTime = t;
    this.timeSeconds += deltaTime / 1000.0;

    for (let i = 0; i < this.clouds.length; i++) {
      this.clouds[i].update(deltaTime * 0.005);
    }

    if (this.gui.activeKeys) this.playerMoves();

    this.player.update(deltaTime / 1000.0);

    this.collisionManager.update(
      this.player.position[0],
      this.player.position[2],
      2.7
    );
  }
  updateHayBales(newAmount) {
    this.hayBales.updatePositions(newAmount);
  }

  displaySkyAndClouds() {
    this.pushMatrix();
    this.scale(
      this.scaleFactor * 2,
      this.scaleFactor * 2,
      this.scaleFactor * 2
    );
    this.gl.disable(this.gl.CULL_FACE);
    this.sphere.display();
    this.gl.enable(this.gl.CULL_FACE);
    this.popMatrix();

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

  displayPlane() {
    let camera = this.camera.position;
    this.ScatterManager.display(camera);
    this.plane.display();
  }

  displayGrassField() {
    this.pushMatrix();
    this.gl.disable(this.gl.CULL_FACE); // render both sides of the blade
    this.setActiveShader(this.grassShader);

    this.plane.grassTexture.bind(0);

    let currentTime = performance.now() / 1000.0;

    this.grassShader.setUniformsValues({
      u_random1: this.plane.u_random1,
      u_random2: this.plane.u_random2,
      u_time: currentTime,
    });
    this.grassField.display();
    this.setActiveShader(this.defaultShader);
    this.gl.enable(this.gl.CULL_FACE); // Restore backface culling for the rest of the scene
    this.popMatrix();
  }

  displayBarn() {
    this.pushMatrix();
    this.translate(3, 1.0, 3);
    this.rotate(Math.PI / 2, 0, -1, 0);
    this.scale(9, 9, 9);
    this.barn.display();
    this.popMatrix();
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
    if (this.displayAxis) {
      this.axis.display();
    }

    this.setDefaultAppearance();

    // ---- BEGIN Primitive drawing section
    if (this.displaySky) {
      this.displaySkyAndClouds();
    }

    this.displayPlane();

    if (this.displayGrass) {
      this.displayGrassField();
    }

    this.displayBarn();

    this.player.display();

    this.hayBales.display();

    // Barn Area
    this.pushMatrix();
    this.translate(-7.2, 1.7, 2.9);
    this.rotate(Math.PI / 2, 1, 0, 0);
    this.barnArea.display();
    this.popMatrix();

    // ---- END Primitive drawing section
  }
}
