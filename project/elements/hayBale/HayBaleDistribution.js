import { CGFappearance, CGFtexture } from '../../../lib/CGF.js';
import { MyBox } from '../../primitives/MyBox.js';
import { simpleDistribution } from '../../utils/SimpleDistribution.js';
import { MyHayBale } from './MyHayBale.js';

export class HayBaleDistribution {
  constructor(scene,amount,occupied) {
    this.scene = scene;
    this.box = new MyBox(scene, 0.5, 0.4, 0.35);
    
    this.app = new CGFappearance(this.scene);
    this.app.setAmbient(0.5, 0.45, 0.3, 1.0);
    this.app.setDiffuse(0.9, 0.82, 0.55, 1.0);
    this.app.setSpecular(0.05, 0.05, 0.02, 1.0);
    this.app.setShininess(3);
    this.app.setTexture(new CGFtexture(this.scene, 'images/hayBale/hay.jpg'));
    this.app.setTextureWrap('REPEAT', 'REPEAT');


    this.distribution=new simpleDistribution(40,2,amount,occupied);
    this.points=this.distribution.points;
    this.bales=[];
    for(let p of this.points){
        let currentMatrix = mat4.create();
        mat4.translate(currentMatrix,currentMatrix, [p[0],1.5,p[1]]);
        mat4.scale(currentMatrix, currentMatrix, [2 ,1, 2]);
        this.bales.push([new MyHayBale(scene,this.box,this.app),currentMatrix]);
    }
    
  }

 

  display() {
     for (let baleInfo of this.bales) {
        let bale = baleInfo[0];
        let matrix = baleInfo[1];
        this.scene.pushMatrix();
        this.scene.multMatrix(matrix); 
        bale.display();             
        this.scene.popMatrix();
    }
    
  }
}
