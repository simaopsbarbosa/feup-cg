import { CGFobject } from '../lib/CGF.js';

import { MyDiamond } from "./MyDiamond.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";
import { MyTriangleBig } from "./MyTriangleBig.js";


/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangram extends CGFobject {
    constructor(scene) {
        super(scene);

        this.diamond = new MyDiamond(scene);
        this.triangle = new MyTriangle(scene);
        this.parallelogram = new MyParallelogram(scene);
        this.triangleSmall = new MyTriangleSmall(scene);
        this.triangleBig = new MyTriangleBig(scene);

    }

    display() {
        // Blue triangle
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI / 2, 0, 0, 1);
        this.scene.translate(-2, -2, 0);
        this.triangleBig.display();
        this.scene.popMatrix();

        // Orange triangle
        this.scene.pushMatrix();
        this.scene.translate(0, 4, 0);
        this.scene.rotate(Math.PI / 2, 0, 0, 1);
        this.triangleBig.display();
        this.scene.popMatrix();
        
        // Pink triangle
        this.scene.pushMatrix();
        this.scene.translate(-1, 1, 0);
        this.scene.rotate(Math.PI / 2, 0, 0, 1);
        this.triangle.display();
        this.scene.popMatrix();

        // Yellow parallelogram
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.translate(-1.4, -1.4, 0);
        this.scene.rotate(Math.PI / 4, 0, 0, 1);
        this.parallelogram.display();
        this.scene.popMatrix();

        // Green diamond
        this.scene.pushMatrix();
        let translateMatrix = [1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            -1.3, -0.7, 0, 1];
        this.scene.multMatrix(translateMatrix);
        // this.scene.translate(-1.3, -0.70, 0);

        let rotateMatrix = [Math.cos(Math.PI / 4), -Math.sin(Math.PI / 4), 0, 0,
        Math.sin(Math.PI / 4), Math.cos(Math.PI / 4), 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1];
        this.scene.multMatrix(rotateMatrix);
        this.diamond.display();
        this.scene.popMatrix();

        // Purple triangle
        this.scene.pushMatrix();
        this.scene.translate(2.1, -0.7, 0);
        this.scene.rotate(3 * Math.PI / 4, 0, 0, 1);
        this.triangleSmall.display();
        this.scene.popMatrix();

        // Red triangle
        this.scene.pushMatrix();
        this.scene.translate(2.8, -0.4, 0);
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.triangleSmall.display();
        this.scene.popMatrix();
    }
}

