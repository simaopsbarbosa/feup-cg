import { CGFtexture, CGFshader } from '../lib/CGF.js';
import { MyRock } from './MyRocks.js';
import { PoissonDiskSampling } from './Noise/PoissonDiskSampling.js';

export class ScatterManager {
  constructor(scene, height) {
    this.height = height;
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

    const poissonSampler = new PoissonDiskSampling(6, 3);
    this.GRID_OFFSET = 80;
    this.gridSize = 30;
    this.grid = new Map();
    this.viewDistSq = 100 * 100;

    for (let i = 0; i < poissonSampler.points.length; i++) {
      let x = poissonSampler.points[i][0];
      let z = poissonSampler.points[i][1];
      let radius = Math.random() * 0.05 + 0.05;
      let groundY = this.height.getGroundHeight(x, z, 80);
      const rock = new MyRock(
        scene,
        radius,
        groundY,
        5,
        x,
        z,
        this.rockShader,
        this.rockTextures[i % this.rockTextures.length],
        this.rockHeightMap
      );
      this.addRockToGrid(rock);
    }
  }

  addRockToGrid(rock) {
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
