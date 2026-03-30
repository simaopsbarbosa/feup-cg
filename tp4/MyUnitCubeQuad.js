import { CGFappearance, CGFobject } from '../lib/CGF.js';

import { MyQuad } from './MyQuad.js';


/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCubeQuad extends CGFobject {
    constructor(scene, topTexture = null, frontTexture = null, rightTexture = null, backTexture = null, leftTexture = null, bottomTexture = null) {
        super(scene);
        this.quad = new MyQuad(scene);

        this.faceAppearance = new CGFappearance(this.scene);
        this.faceAppearance.setAmbient(0.1, 0.1, 0.1, 1);
        this.faceAppearance.setDiffuse(0.9, 0.9, 0.9, 1);
        this.faceAppearance.setSpecular(0.1, 0.1, 0.1, 1);
        this.faceAppearance.setShininess(10.0);

        this.topTexture = topTexture;
        this.frontTexture = frontTexture;
        this.rightTexture = rightTexture;
        this.backTexture = backTexture;
        this.leftTexture = leftTexture;
        this.bottomTexture = bottomTexture;
    }

    applyTexture(texture) {
        this.faceAppearance.setTexture(texture);
        this.faceAppearance.setTextureWrap('REPEAT', 'REPEAT');
        this.faceAppearance.apply();

        if (texture) {
            const filter = this.scene.textureFiltering ? this.scene.gl.NEAREST : this.scene.gl.LINEAR;
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, filter);
        }
    }

    display() {
        // top face (+Y)
        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, 0);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.applyTexture(this.topTexture);
        this.quad.display();
        this.scene.popMatrix();

        // front face (+Z)
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.5);
        this.applyTexture(this.frontTexture);
        this.quad.display();
        this.scene.popMatrix();

        // right face (+X)
        this.scene.pushMatrix();
        this.scene.translate(0.5, 0, 0);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.applyTexture(this.rightTexture);
        this.quad.display();
        this.scene.popMatrix();

        // back face (-Z)
        this.scene.pushMatrix();
        this.scene.translate(0, 0, -0.5);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.applyTexture(this.backTexture);
        this.quad.display();
        this.scene.popMatrix();

        // left face (-X)
        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0, 0);
        this.scene.rotate(-Math.PI / 2, 0, 1, 0);
        this.applyTexture(this.leftTexture);
        this.quad.display();
        this.scene.popMatrix();

        // bottom face (-Y)
        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, 0);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.applyTexture(this.bottomTexture);
        this.quad.display();
        this.scene.popMatrix();

    }
}

