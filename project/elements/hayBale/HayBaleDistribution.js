import { CGFappearance, CGFtexture } from '../../../lib/CGF.js';
import { MyBox } from '../../primitives/MyBox.js';
import { simpleDistribution } from '../../utils/SimpleDistribution.js';

export class HayBaleDistribution {
  constructor(scene,amount,occupied) {
    this.scene = scene;
    this.box = new MyBox(scene, 0.5, 0.4, 0.35);
    this.initAppearance();
    this.points=new simpleDistribution(40,2,amount,occupied);
    console.log(this.points.points.length);
    console.log(this.points.points);
  }

  initAppearance() {
    this.app = new CGFappearance(this.scene);
    this.app.setAmbient(0.5, 0.45, 0.3, 1.0);
    this.app.setDiffuse(0.9, 0.82, 0.55, 1.0);
    this.app.setSpecular(0.05, 0.05, 0.02, 1.0);
    this.app.setShininess(3);
    this.app.setTexture(new CGFtexture(this.scene, 'images/hayBale/hay.jpg'));
    this.app.setTextureWrap('REPEAT', 'REPEAT');
  }

  display() {
   
    for (let p of this.points.points){
        this.scene.pushMatrix();
        this.scene.translate(p[0],1.5,p[1]);
        this.scene.scale(2,1,2);
        this.app.apply();
        this.box.display();
        this.scene.popMatrix();
    }
  }
}
