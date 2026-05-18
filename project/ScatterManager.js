import { CGFtexture, CGFshader } from '../lib/CGF.js';
import { MyRock } from './MyRocks.js';
import { PoissonDiskSampling } from './Noise/PoissonDiskSampling.js';
import { Tree } from './Tree.js';

export class ScatterManager {
  constructor(scene,terrainHeightMap,terrainSize = 80) {
    this.terrainSize = terrainSize;
    this.rockShader = new CGFshader(
      scene.gl,
      'shaders/rock.vert',
      'shaders/rock.frag'
    );
    this.treeShader=new CGFshader(
      scene.gl,
      'shaders/tree.vert',
      'shaders/tree.frag'
    );
    this.terrainHeightMap=terrainHeightMap;
    this.rockTextures = [
      new CGFtexture(scene, 'images/rock/rockTex.jpg'),
      new CGFtexture(scene, 'images/rock/rockTex1.jpg'),
      new CGFtexture(scene, 'images/rock/rockTex2.jpg'),
    ];
    this.rockHeightMap = new CGFtexture(scene, 'images/rock/rockmap.jpg');
    this.treeBarkTexture= [
      new CGFtexture(scene, 'images/tree/trunk1.jpg'),
      new CGFtexture(scene, 'images/tree/trunk2.jpg')
    ];
    this.leafTex=new CGFtexture(scene, 'images/tree/cluster.jpg');
    const poissonSampler = new PoissonDiskSampling(40, 6);
    this.GRID_OFFSET = 160;
    this.gridSize = 60;
    this.grid = new Map();
    this.viewDistSq = 200 * 200;
    for (let i = 0; i < poissonSampler.points.length; i++) {
      let x = poissonSampler.points[i][0];
      let z = poissonSampler.points[i][1];
      let spawnChoice = Math.random();
      if (spawnChoice < 0.40) {
        const treeMaxDepth = 4;
        const baseHeight = 2.0 + Math.random() * 1.0; // Add variation thresholds
        const baseRadius = 0.2 + Math.random() * 0.1;
        const tree = new Tree(
          scene, 
          treeMaxDepth, 
          baseHeight, 
          baseRadius, 
          x, 
          z, 
          this.treeBarkTexture[i % this.treeBarkTexture.length],
          this.leafTex,
          this.terrainHeightMap,
          this.treeShader
        );
        
        this.addElementToGrid(tree);
      } 
      else {
        let radius = Math.random() * 0.05 + 0.05;
        const rock = new MyRock(
          scene,
          radius,
          5,
          x,
          z,
          this.rockShader,
          this.rockTextures[i % this.rockTextures.length],
          this.rockHeightMap,
          this.terrainHeightMap,
        );

        this.addElementToGrid(rock);
      }
    }
  }
  

  addElementToGrid(rock) {
    const gridX = Math.floor((rock.x + this.GRID_OFFSET) / this.gridSize);
    const gridZ = Math.floor((rock.z + this.GRID_OFFSET) / this.gridSize);
    const key = `${gridX},${gridZ}`;

    if (!this.grid.has(key)) {
      this.grid.set(key, []);
    }
    this.grid.get(key).push(rock);
  }

  display(camera) {
    const camX = camera[0];
    const camZ = camera[2];

    const gridX = Math.floor((camX + this.GRID_OFFSET) / this.gridSize);
    const gridZ = Math.floor((camZ + this.GRID_OFFSET) / this.gridSize);
    const viewDistSq = this.viewDistSq;

    for (let x = gridX - 1; x <= gridX + 1; x++) {
      for (let z = gridZ - 1; z <= gridZ + 1; z++) {
        const key = `${x},${z}`;
        const rocksInCell = this.grid.get(key);
        if (rocksInCell) {
          for (let i = 0; i < rocksInCell.length; i++) {
            const rock = rocksInCell[i];
            const dx = rock.x - camX;
            const dz = rock.z - camZ;
            if (dx * dx + dz * dz < viewDistSq) {
              rock.display();
            }
          }
        }
      }
    }
  }
}
