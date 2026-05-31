import { CGFobject } from '../../../lib/CGF.js';

export class MyTree extends CGFobject {
  constructor(
    scene,
    maxDepth,
    baseHeight,
    baseRadius,
    x,
    z,
    trunkTexture,
    leafMaterial,
    trunkprimitive,
    leafprimitive,
    trunkMaterial
  ) {
    super(scene);
    this.scene = scene;
    this.x = x;
    this.z = z;
    this.baseHeight = baseHeight || 2.0;
    this.baseRadius = baseRadius || 0.3;

    this.trunkPrimitive = trunkprimitive;
    this.leafPrimitive = leafprimitive;
    this.trunkMaterial = trunkMaterial;
    this.leafMaterial = leafMaterial;

    this.trunkMaterial.setTexture(trunkTexture);

    this.branches = [];
    this.leaves = [];

    let identityMatrix = mat4.create();

    this.generateTree(
      maxDepth,
      this.baseRadius,
      this.baseHeight,
      identityMatrix
    );
  }
  x;

  generateTree(depth, radius, height, currentMatrix) {
    if (Math.floor(depth) == 0) {
      let leafMat = mat4.create();
      mat4.copy(leafMat, currentMatrix);
      mat4.scale(leafMat, leafMat, [radius * 15, radius * 15, radius * 15]);

      this.leaves.push({
        matrix: leafMat,
      });
      return;
    }

    let trunkMat = mat4.create();
    mat4.copy(trunkMat, currentMatrix);
    mat4.rotate(trunkMat, trunkMat, -Math.PI / 2, [1, 0, 0]);
    mat4.scale(trunkMat, trunkMat, [radius, radius, height]);

    this.branches.push({
      matrix: trunkMat,
    });

    let nextOriginMatrix = mat4.create();
    mat4.copy(nextOriginMatrix, currentMatrix);
    mat4.translate(nextOriginMatrix, nextOriginMatrix, [0, height, 0]);

    const nextRadius = radius * 0.65;
    const nextHeight = height * 0.7;
    const angle = Math.PI / 6;
    const sideAngle = Math.PI / 4;

    let leftChildMat = mat4.create();
    mat4.copy(leftChildMat, nextOriginMatrix);
    mat4.rotate(leftChildMat, leftChildMat, angle, [0, 0, 1]);
    this.generateTree(depth - 1, nextRadius, nextHeight, leftChildMat);

    let backChildMat = mat4.create();
    mat4.copy(backChildMat, nextOriginMatrix);
    mat4.rotate(backChildMat, backChildMat, sideAngle, [1, 0, 0]);
    this.generateTree(depth - 1, nextRadius, nextHeight, backChildMat);

    let rightChildMat = mat4.create();
    mat4.copy(rightChildMat, nextOriginMatrix);
    mat4.rotate(rightChildMat, rightChildMat, -angle, [0, 0, 1]);
    this.generateTree(depth - 1, nextRadius, nextHeight, rightChildMat);

    let frontChildMat = mat4.create();
    mat4.copy(frontChildMat, nextOriginMatrix);
    mat4.rotate(frontChildMat, frontChildMat, -sideAngle, [1, 0, 0]);
    this.generateTree(depth - 1, nextRadius, nextHeight, frontChildMat);
  }

  display() {
    this.scene.pushMatrix();

    this.scene.translate(this.x, 0, this.z);

    this.trunkMaterial.apply();
    for (let i = 0; i < this.branches.length; i++) {
      this.scene.pushMatrix();
      this.scene.multMatrix(this.branches[i].matrix);
      this.trunkPrimitive.display();
      this.scene.popMatrix();
    }

    this.leafMaterial.apply();
    for (let i = 0; i < this.leaves.length; i++) {
      this.scene.pushMatrix();
      this.scene.multMatrix(this.leaves[i].matrix);
      this.leafPrimitive.display();
      this.scene.popMatrix();
    }

    this.scene.popMatrix();
  }
}
