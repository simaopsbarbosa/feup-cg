import { CGFappearance, CGFtexture } from '../../../lib/CGF.js';
import { MyBox } from '../../primitives/MyBox.js';
import { simpleDistribution } from '../../utils/SimpleDistribution.js';
import { MyHayBale } from './MyHayBale.js';

export class HayBaleDistribution {
  constructor(scene, amount, occupied) {
    this.scene = scene;
    this.box = new MyBox(scene, 0.5, 0.4, 0.35);
    this.occupied = occupied;
    this.app = new CGFappearance(this.scene);
    this.app.setAmbient(0.5, 0.45, 0.3, 1.0);
    this.app.setDiffuse(0.9, 0.82, 0.55, 1.0);
    this.app.setSpecular(0.05, 0.05, 0.02, 1.0);
    this.app.setShininess(3);
    this.app.setTexture(new CGFtexture(this.scene, 'images/hayBale/hay.jpg'));
    this.app.setTextureWrap('REPEAT', 'REPEAT');
    this.updatePositions(amount);
  }

  updatePositions(amount) {
    this.distribution = new simpleDistribution(40, 2, amount, this.occupied);
    this.points = this.distribution.points;
    this.bales = [];
    for (let p of this.points) {
      this.bales.push(
        new MyHayBale(this.scene, this.box, this.app, p[0], p[1])
      );
    }
    this.bales.forEach((bale, index) => {
      this.scene.collisionManager.register(
        `haybale_${index}`,
        bale,
        () => ({ x: bale.x, z: bale.z }),
        1.5,
        (obj) => {
          if (!obj.collected && !this.scene.player.nearbyBales.includes(obj)) {
            this.scene.player.nearbyBales.push(obj);
          }
        },
        (obj) => {
          this.scene.player.nearbyBales = this.scene.player.nearbyBales.filter(
            (baleItem) => baleItem !== obj
          );
        },
        'sphere'
      );
    });
    
  }

  display() {
    let player = this.scene.player;
    let px = player ? player.position[0] : 0;
    let pz = player ? player.position[2] : 0;
    let isWagonFilled = player
      ? player.hayBalesHeld >= player.maxHayBales
      : false;

    const baleViewDist = 20.0;
    const arrowViewDist = 260.0;
    const baleViewSq = baleViewDist * baleViewDist;
    const arrowViewSq = arrowViewDist * arrowViewDist;

    for (let bale of this.bales) {
      if (!bale.collected) {
        let dx = bale.x - px;
        let dz = bale.z - pz;
        let distSq = dx * dx + dz * dz;

        if (distSq <= baleViewSq) {
          bale.display();
        }
        if (!isWagonFilled && distSq <= arrowViewSq) {
          this.scene.displayArrow(bale.x, 3.2, bale.z, 0.85);
        }
      }
    }

    if (isWagonFilled) {
      this.scene.displayArrow(-7.2, 4.0, 2.9, 1.5);
    }
  }
}
