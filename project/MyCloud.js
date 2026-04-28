import { CGFobject, CGFappearance } from "../lib/CGF.js";
import { MyQuad } from "./MyQuad.js";

export class MyCloud extends CGFobject {
    constructor(scene, texturesArray) {
        super(scene);
        this.scene = scene;
        this.textures = texturesArray;
        

        this.quad = new MyQuad(scene);
        
        this.material = new CGFappearance(scene);
        this.material.setAmbient(1, 1, 1, 1);
        this.material.setDiffuse(1, 1, 1, 1);
        
        this.reset();
    }

    isReady() {
        return this.material.texture && this.material.texture.texID !== -1;
    }

    reset() {
        this.x = -50 - Math.random() * 20; 
        this.y = 60 + Math.random() * 5;
        this.z = -30 + Math.random() * 80;
        

        this.speedX = 0.05 + Math.random() * 0.1;
        
        // pick random texture
        let randomIndex = Math.floor(Math.random() * this.textures.length);
        this.material.setTexture(this.textures[randomIndex]);
        this.material.setTextureWrap('REPEAT', 'REPEAT');
    }

    update(deltaTime) {

        this.x += this.speedX * deltaTime;

        if (this.x > 50) {
            this.reset();
        }
    }

    display() {
        this.scene.pushMatrix();
        
        this.scene.translate(this.x, this.y, this.z);

        this.scene.scale(10, 10, 10); 
        
        this.scene.rotate(-Math.PI / 2, 1, 0, 0); 

        this.material.apply();
        this.quad.display();
        
        this.scene.popMatrix();
    }
}