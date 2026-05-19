import { CGFobject, CGFappearance } from '../../lib/CGF.js';

export class Tree extends CGFobject {
  constructor(
    scene,
    maxDepth,
    baseHeight,
    baseRadius,
    x,
    z,
    trunkTexture,
    leafMaterial,
    terrainHeightMap,
    trunkprimitive,
    leafprimitive
  ) {
    super(scene);
    this.scene = scene;
    this.x = x;
    this.z = z;
    this.baseHeight = baseHeight || 2.0;
    this.baseRadius = baseRadius || 0.3;
    this.leafcopula = baseRadius + 0.5;
    this.terrainHeightMap = terrainHeightMap;
    this.trunkPrimitive = trunkprimitive;
    this.leafPrimitive = leafprimitive;
    this.trunkTexture = trunkTexture;
    this.leafMaterial = leafMaterial;
  }

  display() {
    this.scene.pushMatrix();
    this.scene.translate(this.x, 0, this.z);
    this.scene.pushMatrix();
    this.trunkTexture.bind();
    this.scene.translate(0, this.baseHeight / 2, 0);
    this.scene.rotate(-Math.PI / 2, 1, 0, 0);
    this.scene.scale(this.baseRadius, this.baseRadius, this.baseHeight);
    this.trunkPrimitive.display();
    this.scene.popMatrix();
    this.scene.pushMatrix();
    this.leafMaterial.apply();
    this.scene.translate(0, this.baseHeight + this.baseHeight / 2, 0);
    this.scene.scale(this.leafcopula, this.leafcopula, this.leafcopula);
    this.leafPrimitive.display();
    this.scene.popMatrix();
    this.scene.popMatrix();
  }
}
