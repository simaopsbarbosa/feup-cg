import { CGFobject, CGFappearance } from '../lib/CGF.js';
import { MyCylinder } from './MyCylinder.js'; 
import { MySphere } from './MySphere.js';

export class Tree extends CGFobject {
  constructor(scene, maxDepth, baseHeight, baseRadius, x, z, trunkTexture, leafTexture,terrainHeightMap,treeShader) {
    super(scene);
    this.scene = scene;
    this.x = x;
    this.z = z;
    this.baseHeight = baseHeight || 2.0;
    this.baseRadius = baseRadius || 0.3;
    this.leafcopula=baseRadius+0.5;
    
    this.treeShader = treeShader;
    this.terrainHeightMap = terrainHeightMap;
    
    this.trunkPrimitive = new MyCylinder(this.scene, 12, 1); 
    this.leafPrimitive = new MySphere(this.scene,1,8); 
    
  
    this.woodMaterial = new CGFappearance(this.scene);
    this.woodMaterial.setAmbient(0.3, 0.2, 0.1, 1.0);
    this.woodMaterial.setDiffuse(0.6, 0.4, 0.2, 1.0);
    this.woodMaterial.setSpecular(0.1, 0.1, 0.1, 1.0);
    this.woodMaterial.setShininess(5.0);
    this.woodMaterial.setTexture(trunkTexture);
    
    this.leafMaterial = new CGFappearance(this.scene);
    this.leafMaterial.setAmbient(0.3, 0.4, 0.3, 1.0);
    this.leafMaterial.setDiffuse(0.5, 0.8, 0.5, 1.0);
    this.leafMaterial.setSpecular(0.1, 0.1, 0.1, 1.0);
    this.leafMaterial.setShininess(2.0);
    this.leafMaterial.setTexture(leafTexture);

    
  }

  


  display() {
    this.scene.setActiveShader(this.treeShader);

    
    this.terrainHeightMap.bind(1); 
    this.treeShader.setUniformsValues({
      uTerrainHeightMap: 1,
      uTerrainSize: 6.0,       
      uTerrainScale: 10.0,       
      uTreePos: [this.x, this.z]
    });
    this.scene.pushMatrix();
      this.scene.translate(this.x, 0, this.z);
      this.scene.pushMatrix();
        this.woodMaterial.apply();
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.scene.scale(this.baseRadius, this.baseRadius, this.baseHeight);
        this.trunkPrimitive.display();
      this.scene.popMatrix();
      this.scene.pushMatrix();
        this.leafMaterial.apply();
        this.scene.translate(0, this.baseHeight, 0);
        this.scene.scale(this.leafcopula, this.leafcopula, this.leafcopula);
        this.leafPrimitive.display();
      this.scene.popMatrix();
    this.scene.popMatrix();
  }

  
}