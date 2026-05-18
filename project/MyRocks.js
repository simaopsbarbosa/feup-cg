import { CGFobject } from '../lib/CGF.js';
import { MySphere } from './MySphere.js';
/**
 * MyTHalfSphere
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyRock extends CGFobject {
  constructor(
    scene,
    radius,
    stacks,
    x,
    z,
    rockShader,
    rockTexture,
    rockHeightMap,
    terrainHeightMap
  ) {
    super(scene);
    this.shape = new MySphere(scene, radius, stacks);
    this.radius = radius;
    this.shader = rockShader;
    this.rockTexture = rockTexture;
    this.rockHeightMap = rockHeightMap;
    this.x = x;
    this.z = z;
    this.initBuffers();
    this.terrainHeightMap=terrainHeightMap;
  }

  display() {
    this.scene.setActiveShader(this.shader);
    this.rockTexture.bind(0);
    this.rockHeightMap.bind(1);
    this.terrainHeightMap.bind(2);
    this.shader.setUniformsValues({
      uSampler: 0,
      uSamplerRockHeight: 1,
      uSamplerTerrainHeight: 2,
      u_rockRadius: this.radius,
      u_rockWorldPos: [this.x, 0.0, this.z],
      uCameraPos: [
        this.scene.camera.position[0],
        this.scene.camera.position[1],
        this.scene.camera.position[2],
      ],
    });
    this.scene.pushMatrix();
    this.scene.translate(this.x, this.radius, this.z);
    this.shape.display();
    this.scene.popMatrix();
    this.scene.setActiveShader(this.scene.defaultShader);
  }
}
