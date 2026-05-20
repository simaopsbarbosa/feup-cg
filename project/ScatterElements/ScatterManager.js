import { CGFtexture, CGFshader, CGFappearance } from '../../lib/CGF.js';
import { MyRock } from './MyRocks.js';
import { PoissonDiskSampling } from '../Noise/PoissonDiskSampling.js';
import { Tree } from './Tree.js';
import { MyCylinder } from './MyCylinder.js';
import { MySphere } from './MySphere.js';

export class ScatterManager {
  constructor(scene, terrainSize = 80) {
    this.terrainSize = terrainSize;
    this.scene = scene;
    this.rockShader = new CGFshader(
      scene.gl,
      'shaders/rock.vert',
      'shaders/rock.frag'
    );

    this.rockTextures = [
      new CGFtexture(scene, 'images/rock/rockTex.jpg'),
      new CGFtexture(scene, 'images/rock/rockTex1.jpg'),
      new CGFtexture(scene, 'images/rock/rockTex2.jpg'),
    ];
    this.rockHeightMap = new CGFtexture(scene, 'images/rock/rockmap.jpg');
    this.treeBarkTexture = [
      new CGFtexture(scene, 'images/tree/trunk1.jpg'),
      new CGFtexture(scene, 'images/tree/trunk2.jpg'),
    ];
    this.rockShape = new MySphere(scene, 1, 5);
    this.trunkMaterial = new CGFappearance(scene);
    this.trunkMaterial.setAmbient(0.4, 0.2, 0.1, 1.0);
    this.trunkMaterial.setDiffuse(0.5, 0.3, 0.15, 1.0);
    this.trunkMaterial.setSpecular(0.05, 0.05, 0.05, 1.0);
    this.trunkMaterial.setShininess(2.0);
    this.trunkPrimitive = new MyCylinder(scene, 12, 1);

    this.leafPrimitive = new MySphere(scene, 1, 8);
    this.leafTex = new CGFtexture(scene, 'images/tree/cluster.jpg');
    this.leafMaterial = new CGFappearance(scene);
    this.leafMaterial.setAmbient(0.3, 0.4, 0.3, 1.0);
    this.leafMaterial.setDiffuse(0.5, 0.8, 0.5, 1.0);
    this.leafMaterial.setSpecular(0.1, 0.1, 0.1, 1.0);
    this.leafMaterial.setShininess(2.0);
    this.leafMaterial.setTexture(this.leafTex);

    // this creates the positions for the rocks
    const poissonSampler = new PoissonDiskSampling(40, 6);
    this.viewDistSq = 200 * 200;
    this.rocks = [];
    this.trees = [];
    let element;
    for (let i = 0; i < poissonSampler.points.length; i++) {
      let x = poissonSampler.points[i][0];
      let z = poissonSampler.points[i][1];
      let spawnChoice = Math.random();
      if (spawnChoice < 0.4) {
        const treeMaxDepth = 4;
        const baseHeight = 2.0 + Math.random() * 1.0; // Add variation thresholds
        const baseRadius = 0.2 + Math.random() * 0.1;
        element = new Tree(
          scene,
          treeMaxDepth,
          baseHeight,
          baseRadius,
          x,
          z,
          this.treeBarkTexture[i % this.treeBarkTexture.length],
          this.leafMaterial,
          this.terrainHeightMap,
          this.trunkPrimitive,
          (this.leafPrimitive = this.leafPrimitive),
          this.trunkMaterial
        );

        this.trees.push(element);
      } else {
        let radius = Math.random() * 0.25 + 0.25;
        element = new MyRock(
          scene,
          radius,
          this.rockShape,
          x,
          z,
          this.rockTextures[i % this.rockTextures.length],
          this.rockHeightMap,
          this.terrainHeightMap,
          this.rockShader
        );
        this.rocks.push(element);
      }
    }
  }

  display(camera) {
    const camX = camera[0];
    const camZ = camera[2];
    const viewDistSq = this.viewDistSq;
    for (let i = 0; i < this.rocks.length - 1; i = i + 2) {
      const rock = this.rocks[i];
      const dx = rock.x - camX;
      const dz = rock.z - camZ;
      if (dx * dx + dz * dz < viewDistSq) {
        this.scene.setActiveShader(this.rockShader);
        rock.display();
      }
    }
    this.scene.setActiveShader(this.scene.defaultShader);
    for (let i = 0; i < this.trees.length; i++) {
      const tree = this.trees[i];
      const dx = tree.x - camX;
      const dz = tree.z - camZ;
      if (dx * dx + dz * dz < viewDistSq) {
        tree.display();
      }
    }
  }
}
