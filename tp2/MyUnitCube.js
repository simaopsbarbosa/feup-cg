import { CGFobject } from '../lib/CGF.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyDiamond extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [
            0.5, -0.5, -0.5,	//0
            0.5, 0.5, -0.5,	    //1
            0.5, 0.5, 0.5,	    //2
            0.5, -0.5, 0.5,	    //3
            -0.5, -0.5, 0.5,	//4
            -0.5, 0.5, 0.5,	    //5
            -0.5, 0.5, -0.5,	//6
            -0.5, -0.5, -0.5,	//7
        ];

        //Counter-clockwise reference of vertices
        this.indices = [
            // front face
            0, 1, 2,
            1, 2, 3, 
    
            // right face
            1,6,5,
            1,5,2,
        ];

        //The defined indices (and corresponding vertices)
        //will be read in groups of three to draw triangles
        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }
}

